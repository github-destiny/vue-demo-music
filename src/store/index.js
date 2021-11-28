import vue from 'vue';
import vuex from 'vuex'

vue.use(vuex)

const actions = {

}

const mutations = {
    saveCookieAndToken(state, data){
        console.log(data);
        this.state.cookie = data.cookie;
        this.state.token = data.token;
    },
    setCurrentUrl(state, data){
        state.current_url = data
    },
    setCurrentId(state, data){
        state.current_id = data;
    },
    setLastId(state, id){
        state.last_id = id;
    },
    changePlayState(state, data){
        state.play_state = data;
    },
    updateImgSrc(state, src){
        state.img_src = src;
    }
}

const state = {
    cookie : localStorage.getItem('cookies'),
    token : localStorage.getItem('token'),
    current_id : null,
    current_list : [],
    current_url : '',
    play_state : false,
    last_id : null,
    img_src : 'https://fgo.wiki/images/thumb/e/e3/%E6%A3%AE%E5%85%B0%E4%B8%B8-%E5%90%89%E5%B0%94.jpg/1200px-%E6%A3%AE%E5%85%B0%E4%B8%B8-%E5%90%89%E5%B0%94.jpg'
}

const getters = {

}

export default new vuex.Store({
    actions,
    mutations,
    state,
    getters,
})


