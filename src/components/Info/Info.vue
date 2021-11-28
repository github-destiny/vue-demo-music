<template>
    <div class="info-container">
        <div class="img-container">
            <img :src="imgsrc" alt="">
        </div>
        <div class="lyrics">
            现在没有歌词哦~
        </div>
    </div>
</template>

<script>
    export default {
        name: "Info",
        data(){
            return {
                imgsrc : 'https://netease-music.fe-mm.com/img/player_cover.373e0739.png'
            }
        }
    }
</script>

<style scoped>
    .info-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .img-container{
        height: 20%;
    }
    .info-container img {
        width: 186px;
        height: 186px;
    }
    .lyrics{
        height: 80%;
    }
</style>
