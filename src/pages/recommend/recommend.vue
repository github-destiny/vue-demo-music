<template>
    <div class="recommend-container">
        <span>今日推荐</span>

    </div>
</template>

<script>
    import api from '../../api/Api'
    export default {
        mounted(){
            api.recommend().then((data)=>{
                console.log(data);
            })
        }
    }
</script>

<style lang="less" scoped>
    .recommend-container {
        width: 100%;
        height: 100%;
    }
</style>
