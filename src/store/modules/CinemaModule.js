import http from "/@/utils/https";
const module = {
    namespaced: true,
    state: {
        cinemaList: [],
    },
    mutations: {
        // 影院赋值
        setCinmaList(state, list) {
            state.cinemaList = list
        },
        // 清空影院
        cinemaEmpty(state) {
            state.cinemaList = [];
        }
    },
    actions: {
        getCinema({ commit }, cityId) {
            return http({
                url: `gateway?cityId=${cityId}&ticketFlag=1&k=471474`,
                headers: {
                    "X-Host": "mall.film-ticket.cinema.list",
                },
            }).then((res) => {
                res.data.data.cinemas.forEach(item => {
                    item.lowPrice = parseInt(item.lowPrice / 100).toFixed(2)
                });
                commit('setCinmaList', res.data.data.cinemas)
            });
        }
    }
}
export default module