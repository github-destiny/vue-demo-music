<template>
    <div class="background-container" ref="bg">
        <img :src="imgsrc" alt="">
    </div>
</template>

<script>
    export default {
        props : ['imgsrc'],
    }
</script>

<style lang="less" scoped>
    .background-container {
        position: absolute;
        width: 100vw;
        height: 100vh;
        filter: blur(15px);
        -webkit-filter: blur(15px);
        -moz-filter: blur(15px);
        -ms-filter: blur(15px);
        z-index: -9999;
    }
    .background-container img {
        width: 100%;
        height: 100%;
    }
    .background-container:after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: "";
        background-color: #1c1c1c;
        opacity: 0.2;
        z-index: 1;
    }
</style>
