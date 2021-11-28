<template>
    <div class="listened-container">
        <DataContent :current_list="listened"/>
    </div>
</template>

<script>
    import DataContent from "../../components/DataContent/DataContent";
    import {mapState} from 'vuex'

    export default {
        components : {
            DataContent
        },
        computed : {
            ...mapState(['listened'])
        },
        mounted(){

        }
    }
</script>

<style lang="less" scoped>
    .listened-container {
        width: 100%;
        height: 100%;
    }
</style>
