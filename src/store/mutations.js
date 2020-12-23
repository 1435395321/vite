import { Notify } from 'vant';
export default {
    // 城市选择
    changCityName(state,data){
        state.cityName = data.name;
        state.cityId = data.cityId;
    },
    // 隐藏Tab
    hideTab(state) {
        console.log(11)
        state.isShowTab = false;
    },
    // 显示Tab
    showTab(state) {
        state.isShowTab = true
    },
    // 设置标题
    setNavTitle(state,title) {
        state.navTitle = title
    },
    // 影院赋值
    setCinmaList(state,list) {
        state.cinemaList = list
    },
    // 清空影院
    cinemaEmpty(state) {
        state.cinemaList = [];
    },

    cinemaDate(state,dateList){
        let a= [];
        dateList.forEach(list => {
            state.cinemaList.forEach(item=> {
                if(list.cinemaId == item.cinemaId){
                   a.push(item)
                }
            })
        });
        state.cinemaList = a;
    },
    // 设置Token
    setToken(state,token) {
        state.token = token;
    },
    // 判断是否有token
    isToken(state,parm) {
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