export default {
    changCityName(state,data){
        state.cityName = data.name;
        state.cityId = data.cityId;
    }
}