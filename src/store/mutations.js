import { Notify } from 'vant';
export default {
    changCityName(state,data){
        state.cityName = data.name;
        state.cityId = data.cityId;
    },
    hideTab(state) {
        state.isShowTab = false;
    },
    showTab(state) {
        state.isShowTab = true
    },
    // 影院赋值
    setCinmaList(state,list) {
        state.cinemaList = list
    },
    // 清空影院
    cinemaEmpty(state) {
        state.cinemaList = [];
    },
    // 设置Token
    setToken(state,token) {
        state.token = token;
    },
    // 判断是否有token
    isToken(state,parm) {
        console.log(state.token)
        if(state.token == '') {
            parm.router.push('/login');
        }else {
           parm.router.push(parm.path);
        }
    },
    // 退出登录
    backLogin(state) {
        state.token = '';
    }
}