import http from "/@/utils/https";
export default {
    // 影院请求
    // data: cityId 城市id  index 下表 默认1
    getCinema({ commit }, data) {
        return http({
            url: `gateway?cityId=${data.cityId}&ticketFlag=${data.index}&k=471474`,
            headers: {
                "X-Host": "mall.film-ticket.cinema.list",
            },
        }).then((res) => {
            res.data.data.cinemas.forEach(item => {
                let money = item.lowPrice / 100
                item.lowPrice = money.toFixed(2)
            });
            commit('setCinmaList', res.data.data.cinemas)
        });
    },
    postDateList({commit}, data) {
        data.cinemaIds = data.cinemaIds.toString()
        return http({
            url:`https://m.maizuo.com/gateway?k=7218818`,
            data:data,
            headers:{
                'X-Host': 'mall.film-ticket.cinema.batch-cinema'
            },
            method:"POST"
        }).then(res=> {
            let result = res.data.data.cinemas;
            commit('setCinmaList',result)
        })
    }
}