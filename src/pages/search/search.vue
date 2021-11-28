<template>
    <div class="search-container">
        <div class="hot-search">
            <span class="default">
                <span>大家都在搜:</span>
                <span class="item" v-for="(item, index) in hots" :key="index" @click="search(item.first)">
                    {{item.first}}
                </span>
            </span>
            <input type="text" placeholder="音乐/歌手" v-model="current_keyword" class="input" @keydown.enter="search(current_keyword)">
        </div>
        <DataContent :current_list="current_list"/>
    </div>
</template>

<script>
    import Api from '../../api/Api'
    import DataContent from '../../components/DataContent/DataContent'
    export default {
        components : {
            DataContent,
        },
        data(){
            return {
                current_keyword : '',
                hots : [],
                current_list : [],
                current_offset : 0,
                current_play_url : '',
                last_id : '',
                icon_class : {
                    'icon-bofang' : true,
                    'icon-zanting' : false
                }
            }
        },
        methods : {
            search(keyword){
                this.current_keyword = keyword
                Api.search(this.current_keyword, this.current_offset).then((data)=>{
                    this.current_list = data.data.result.songs;
                })
            },
        },
        mounted(){
            let dk = Api.defaultSearch();
            Api.hotSearch().then((data)=>{
                this.hots = data.result.hots.slice(0, 5);
            })
            dk.then((data)=>{
                this.default_keyword = data.data.realkeyword;
            })
        },
    }
</script>

<style lang="less" scoped>
    @import '../../assets/font/iconfont.css';
    .search-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .hot-search {
        height: 10%;
        background-color: rgba(0,0,0,0.4);
        margin-left: 2%;
        padding: 5px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-family: 微软雅黑;
    }
    .default {
        color: #fff;
        font-size: 15px;
        line-height: 53.2px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .input {
        width: 65%;
        height: 95%;
        background: none;
        font-size: 15px;
        color: #fff;
        outline: medium;
        border: 1px solid #ddd;
        padding-left: 15px;
    }
    input::placeholder{
        color: #ffffff;
    }
    .item {
        color: #ddd;
        opacity: 0.5;
        cursor: pointer;
    }
    .item:hover{
        opacity: 1;
    }

</style>
