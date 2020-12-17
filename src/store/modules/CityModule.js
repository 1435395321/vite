const module = {
    namespaced: true,
    state: {
        cityId: "310100",
        cityName: "上海",
    },
    mutations: {
        changCityName(state, data) {
            state.cityName = data.name;
            state.cityId = data.cityId;
        },
    },
    actions: {}
}
export default module