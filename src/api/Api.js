import axios from 'axios';
import store from '../store'

const base_url = 'http://47.93.16.214:3000';

const api = {
    /**
     * 查询API
     * @param keywords
     * @param offset
     */
    async search(keywords, offset){
        let res = null;
        await axios.get(`${base_url}/cloudsearch?keywords=${keywords}&offset=${offset}`).then(r => {
            res = r;
        }, (error)=>{
            res = error.response.data;
        })
        return res;
    },
    /**
     * 获取推荐列表
     */
    async recommend(){
        await axios.get(`${base_url}/recommend/songs?cookie=${store.state.cookie}`).then((response)=>{
            console.log(response);
        }, (error)=>{
            console.log(error.response.data);
        })
    },
    /**
     * 登录
     * @param cellphone 手机号
     * @param password 密码
     */
    login(cellphone, password){
        axios.get(`${base_url}/login/cellphone?phone=${cellphone}&password=${password}`).then(
            (response)=>{
                let cookie = response.data.cookie;
                let token = response.data.token;
                localStorage.setItem('cookies', cookie);
                localStorage.setItem('token', token)
                store.commit('saveCookieAndToken', {cookie : cookie, token : token})
            },
            (error) => {
                console.log(error.response.data);
            }
        )
    },
    /**
     * 默认搜索词
     */
    async defaultSearch(){
        let res = null;
        await axios.get(`${base_url}/search/default`).then((response)=>{
            res = response.data;
        }, (error)=>{
            res = error.response.data;
        })
        return res;
    },
    /**
     * 获取热搜列表
     */
    async hotSearch(){
        let res = null;
        await axios.get(`${base_url}/search/hot`).then((response)=>{
            res = response.data;
        }, (error)=>{
            res = error.response.data;
        })
        return res;
    },
    async getUrl(id){
        let res = null;
        await axios.get(`${base_url}/song/url?id=${id}`).then((response)=>{
            res = response.data;
        }, (error)=>{
            res = error.response.data;
        })
        return res;
    }
}
export default api;
