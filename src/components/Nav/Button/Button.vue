<template>
    <span class="btn-container">
        <router-link :to="to" exact-active-class="bg">{{content}}</router-link>
    </span>
</template>

<script>
    export default {
        name: "Button",
        props : ['to', 'content']
    }
</script>

<style scoped>
    .btn-container {
        margin-right: 15px;
        font-size: 15px;
        line-height: 100%;
    }
    .btn-container a{
        color: rgba(0,0,0,0.4);
        border: 1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
        padding: 5px 10px;
    }
    .btn-container a:hover{
        color: #ddd;
        border: 1px solid #ddd;
    }
    .btn-container .bg{
        color: #ddd;
        border-color: #ddd;
    }
</style>
