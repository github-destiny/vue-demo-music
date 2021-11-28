<template>
    <div class="list" v-show="current_list.length !== 0">
        <div class="list-header">
            <span class="list-header-item">歌曲名</span>
            <span class="list-header-item">歌手</span>
            <span class="list-header-item">专辑</span>
        </div>
        <div class="list-content" @scroll="scroll($event)">
            <div class="line" v-for="(item, index) in current_list" :key="item.id">
                    <span class="no" @click="play(item)">
                        <span class="num">{{++index}}</span>
                        <i class="iconfont" :class="{'icon-bofang' : current_id !== item.id, 'icon-zanting' : current_id === item.id}" :ref="item.id"></i>
                    </span>
                <span class="list-item" :title="item.name">{{item.name}}</span>
                <span class="list-item" :title="item.ar[0].name">{{item.ar[0].name}}</span>
                <span class="list-item" :title="item.al.name">{{item.al.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from "../../api/Api";
    import {mapState} from 'vuex';
    export default {
        props : ['current_list'],
        data(){
            return {
                offset : 0
            }
        },
        methods : {
            play(item){
                this.$store.commit('updateImgSrc', item.al.picUrl);
                // 初始化本地存储
                let local = localStorage.getItem('listened');
                if(local === null){
                    localStorage.setItem('listened', JSON.stringify([]));
                }
                // 更新本地存储
                this.$store.commit('updateLocalStorage', item);
                Api.getUrl(item.id).then(data =>{
                    // 更新current_id
                    if(!this.$store.state.current_id){
                        this.$store.commit('setCurrentId', item.id);
                        // 获取url，进行播放
                        this.$store.commit('setCurrentUrl', data.data[0].url);
                        // 使当前播放状态设置为true
                        this.$store.commit('changePlayState', true);
                        return;
                    }
                    // 如果当前点击的是同一首歌曲
                    if(this.$store.state.current_id === item.id){
                        let ref = this.$refs[item.id];
                        let classList = ref[0].classList;
                        if(classList.contains('icon-bofang')){
                            classList.remove('icon-bofang');
                            classList.add('icon-zanting');
                        }else{
                            classList.remove('icon-zanting');
                            classList.add('icon-bofang');
                        }
                        // 修改当前歌曲播放状态
                        this.$store.commit('changePlayState', !this.$store.state.play_state);
                        return;
                    }
                    // 如果当前有播放同时又点击了新的歌曲
                    if(this.$store.state.current_id){
                        // 更新last_id
                        this.$store.commit('setLastId', this.$store.state.current_id);
                        // 更新current_id
                        this.$store.commit('setCurrentId', item.id);
                        // 更新url
                        this.$store.commit('setCurrentUrl', data.data[0].url);
                        // 更新图标
                        let ele = this.$refs[item.id];
                        ele[0].classList.remove('icon-bofang');
                        // 播放器状态重新置为true
                        this.$store.commit('changePlayState', true);
                    }
                })
            },
            scroll(event){
                // 滚动条总高度
                let scrollHeight = event.srcElement.scrollHeight;
                // 滚动后据顶部高度
                let scrollTop = event.srcElement.scrollTop;
                // 显示高度
                let clientHeight = event.srcElement.clientHeight;
                if(scrollTop + clientHeight > scrollHeight - this.$store.state.REFRESH_HEIGHT){
                    // 通知加载新的数据
                    Api.search(this.$store.state.last_search, ++this.offset).then(data => {
                        let songs = data.data.result.songs;
                        this.$store.commit('updateCurrentList', songs);
                        console.log(`加载了${this.offset}次`);
                    })
                }
               // console.log(scrollHeight, scrollTop, clientHeight);
            }
        },
        mounted(){
            // console.log(this);
        },
        computed : {
            ...mapState(['current_url', 'current_id', ])
        }
    }
</script>

<style lang="less" scoped>
    .list {
        height: 80%;
        margin-left: 2%;
    }
    .list-header {
        height: 10%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .list-header-item{
        width: 33%;
        color: #fff;
        font-size: 15px;
        line-height: 53.2px;
        margin-left: 2.5%;
    }
    .list-header-item:first-child{
        padding-left: 20px;
    }
    .list-content {
        height: 90%;
        overflow: auto;
        color: #ffffff;
        font-weight: lighter;
    }
    .list-content::-webkit-scrollbar {
        width: 4px;
    }
    .list-content::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .list-content::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);

    }
    .line {
        width: 100%;
        height: 12.5%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        text-align: center;
        line-height: 47.88px;
    }
    .line > .no{
        width: 5%;
        cursor: pointer;
    }
    .no > .iconfont{
        display: none;
    }
    .line:hover .num{
        display: none;
    }
    .line:hover .iconfont{
        display: block;
    }
    .iconfont {
        font-size: 20px;
        color: #fff;
    }
    .list-item {
        width: 33%;
        height: 100%;
        text-align: left;
        border-top: 1px solid gray;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
