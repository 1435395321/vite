import http from "/@/utils/https";
export default {
    // 影院请求
    getCinema({ commit }, cityId) {
        return http({
            url: `gateway?cityId=${cityId}&ticketFlag=1&k=471474`,
            headers: {
                "X-Host": "mall.film-ticket.cinema.list",
            },
        }).then((res) => {
            res.data.data.cinemas.forEach(item => {
                item.lowPrice = parseInt(item.lowPrice/100).toFixed(2)
            });
            commit('setCinmaList', res.data.data.cinemas)
        });
    }
}