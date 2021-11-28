<template>
    <div class="progress-container">
        <div class="progress-bar-bg" ref="bg" @click="checkCircle($el, $event)">
            <div class="circle" ref="circle" v-drag>

            </div>
            <div class="played" ref="played">

            </div>
        </div>
        <button @click="play(second)">play</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                offset : 0,
                container_width : 0,
                playing : false
            }
        },
        props : ['duration'],
        methods : {
            cons(info){
                console.log(info);
            },
            checkCircle(el, event){
                this.playing = false;
                let x = event.clientX;
                let played = this.$refs.played;
                let circle = this.$refs.circle;
                circle.style.left = (x - this.offset) + 'px';
                played.style.width = (x - this.offset) + 'px';
            },
            play(second){
                this.playing = true;
                let played = this.$refs.played;
                let count = 1;
                let circle = this.$refs.circle;
                this.timeout = setInterval(()=>{
                    if(count >= second){
                        clearInterval(this.timeout)
                        this.playing = false;
                    }
                    circle.style.left = (count / second) * 100 + '%';
                    played.style.width = (count++ / second) * 100 + '%';
                    console.log(count);
                }, 1000)
            }
        },
        mounted() {
            let circle = this.$refs.circle;
            let bg = this.$refs.bg;
            this.container_width = bg.clientWidth;
            let ol = circle.offsetLeft;
            let bl = bg.offsetLeft;
            this.offset = bl - ol;
        },
        beforeDestroy() {
            if(this.timeout !== null){
                clearInterval(this.timeout);
            }
        },
        directives : {
            drag : {
                inserted : function (el) {
                    let x = 0, l = 0;
                    let isDown = false;
                    let maxWidth = el.parentElement.clientWidth;
                    el.onmousedown = function (e) {
                        x = e.clientX;
                        l = el.offsetLeft;
                        isDown = true;
                    }
                    // 鼠标移动
                    window.onmousemove = function (e) {
                        if(isDown === false){
                            return;
                        }
                        let nx = e.clientX;
                        let nl = nx - (x - l);
                        if(nl <= 0){
                            nl = 0;
                        }
                        if(nl >= maxWidth){
                            nl = maxWidth;
                        }
                        el.style.left = nl + 'px';
                        let played = el.parentElement.childNodes.item(1);
                        played.style.width = nl + 'px';
                    }
                    window.onmouseup = function () {
                        isDown = false;
                    }
                }
            },
        },
        computed : {
            second(){
                if(typeof this.duration === 'number'){
                    return this.duration;
                }
                let res = 0;
                if(typeof this.duration === 'string' && this.duration.indexOf(':') !== -1){
                    let arr = this.duration.split(':');
                    let min = parseInt(arr[0]);
                    let second = parseInt(arr[1]);
                    res = min * 60 + second;
                }
                return res;
            }
        }
    }
</script>

<style lang="less" scoped>
    .progress-container {
        height: 300px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
    .progress-bar-bg {
        width: 80%;
        height: 0;
        border-top: 2px solid gray;
    }
    .circle {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: #e51;
        position: absolute;
        top: -4px;
        left: 0;
    }
    .played {
        width: 0;
        margin-top: -1.5px;
        height: 0;
        border-top: 2px solid #fff;
    }
</style>
