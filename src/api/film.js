import {get} from '../utils/axios'
// 电影列表
export const RfilmList = (p) => get('gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=8297847',p);