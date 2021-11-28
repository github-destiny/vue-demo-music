<template>
    <div class="nav-container">
        <Button to="/home" content="主页"/>
        <Button to="/recommend" content="推荐"/>
        <Button to="/listened" content="我听过的"/>
        <Button to="/search" content="搜索"/>
    </div>
</template>

<script>
    import Button from "./Button/Button";
    export default {
        components : {
            Button
        }
    }
</script>

<style lang="less" scoped>
    .nav-container {
        position: absolute;
        left: 2%;
    }
</style>
