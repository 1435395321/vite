import axios from 'axios'; // 引入axios
const instace = axios.create({
    baseURL:'https://m.maizuo.com/',
    timeout:10000,
    headers:{
        'X-Client-Info':'{"a":"3000","ch":"1002","v":"5.0.4","e":"1606190044635290087587841","bc":"310100"}'
    }
})
export default instace