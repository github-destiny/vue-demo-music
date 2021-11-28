<template>
  <div id="app">
    <!--背景与遮罩-->
    <Background :imgsrc="img_src"/>
    <div class="header">
      在线音乐播放器
    </div>
    <div class="controllers">
      <Nav/>
    </div>
    <div class="view-container">
      <div class="left">
        <router-view></router-view>
      </div>
      <div class="right">
        <Info/>
      </div>
    </div>
    <div class="player">
        <Player/>
    </div>
    <audio :src="current_url" ref="audio" style="display: none"></audio>
  </div>
</template>

<script>

  import Background from "./components/Background/Background";
  import Nav from './components/Nav/Nav';
  import Player from "./components/Player/Player";
  import Info from './components/Info/Info'
  import {mapState} from "vuex";

  export default {
    name: 'App',
    components: {
      Background,
      Nav,
      Player,
      Info
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    updated() {
      let play_state = this.$store.state.play_state;
      let audio = this.$refs.audio;
      if(play_state){
        audio.play();
      }else{
        audio.pause();
      }
    },
    computed: {
      ...mapState(['current_url', 'img_src'])
    }
  };
</script>

<style lang="less">
    @import './styles/reset';
    @import './styles/app';
</style>
