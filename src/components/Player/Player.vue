<template>
    <div class="player-container">
        <div class="controls">
            <i class="iconfont icon-shangyishoushangyige"></i>
            <i @click="play_state++" v-show="play_state % 2 === 0" ref="play" class="iconfont icon-bofang play"></i>
            <i @click="play_state++" v-show="play_state % 2 === 1" ref="play" class="iconfont icon-zanting play"></i>
            <i class="iconfont icon-xiayigexiayishou"></i>
        </div>
        <div class="progress_bar">
            <ProgressBar class="bar"/>
        </div>
        <div class="setting">
            <div class="play_mode">
                <i @click="play_mode++" v-show="play_mode % 3 === 0" class="iconfont icon-suijibofang"></i>
                <i @click="play_mode++" v-show="play_mode % 3 === 1" class="iconfont icon-danquxunhuan"></i>
                <i @click="play_mode++" v-show="play_mode % 3 === 2" class="iconfont icon-liebiaoxunhuan"></i>
            </div>
            <i class="iconfont icon-yinliang"></i>
            <div class="line_yinliang">

            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import ProgressBar from '../ProgressBar/ProgressBar'
    export default {
        data(){
            return {
                play_mode : 0,
                play_state : 0,
            }
        },
        computed : {
            ...mapState(['current_id'])
        },
        mounted() {

        },
        components : {
            ProgressBar
        }
    }
</script>

<style lang="less" scoped>
    .player-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .iconfont {
        font-size: 35px;
        color: #fff;
    }
    .controls {
        width: 20%;
        display: flex;
        justify-content: center;
    }
    .play {
        margin: 0 15px;
    }
    .progress_bar{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 65%;
        height: 10%;
    }
    .line{
        width: 95%;
        border-top: 2px solid #ddd;
    }
    .setting {
        width: 15%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .play_mode{
        margin-right: 10px;
    }
    .line_yinliang {
        width: 60%;
        height: 1px;
    }
    .audio-currentTime-bar {
        height: 1px;
    }
    .audio-circle {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        color: #e51;
    }
    .bar{
        position: absolute;
        display: none;
    }
</style>
