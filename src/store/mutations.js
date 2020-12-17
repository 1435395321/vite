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
    }
}