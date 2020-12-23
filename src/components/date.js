//补位，如果为单数，则在前面加0
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/**
 * @param {时间戳} timestamp 转换年-月-日
 * 时间戳为10位  需*1000，时间戳为13位的话就不需要*1000
 */
const timestampToYmd = (timestamp) => {
    let date = new Date(timestamp)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return [year, month, day].map(formatNumber).join('-')
}
/**
 * @param {时间戳} timestamp 转换月-日
 * 时间戳为10位  需*1000，时间戳为13位的话就不需要*1000
 */
const timestampToMd = (timestamp) => {
    let date = new Date(timestamp)
    let month = date.getMonth() + 1
    let day = date.getDate()
    return [month, day].map(formatNumber).join('-')
}
/**
 * @param {时间戳} timestamp 转 b
 * 时间戳为10位  需*1000，时间戳为13位的话就不需要*1000
 */
const timestampToD = (timestamp) => {
    let date = new Date(timestamp)
    let day = date.getDate()
    return [day].map(formatNumber).join('-')
}
/**
 * @param {时间戳} timestamp 转换时分秒
 */
const timestampToHms = timestamp => {
    let date = new Date(timestamp)
    const hour = date.getHours()
    const minute = date.getMinutes() + 1
    const second = date.getSeconds()
    return [hour, minute, second].map(formatNumber).join(':')
}
/**
 * @param {时间戳} timestamp 转换星期
 */
const timestampToDay = timestamp => {
    let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let date = new Date(timestamp)
    let day = date.getDay()
    return weekDay[day]
}
// 日期转换周大写
const week = (weekNum) => {
    let week = '';
    switch (weekNum.substring(2, 1)) {
        case "1":
            week = weekNum.replace("周1", "周一");
            break;
        case "2":
            week = weekNum.replace("周2", "周二");
            break;
        case "3":
            week = weekNum.replace("周3", "周三");
            break;
        case "4":
            week = weekNum.replace("周4", "周四");
            break;
        case "5":
            week = weekNum.replace("周5", "周五");
            break;
        case "6":
            week = weekNum.replace("周6", "周六");
            break;
        case "7":
            week = weekNum.replace("周7", "周日");
            break;
    }
    return week
}
export {
    timestampToDay,
    timestampToHms,
    timestampToYmd,
    timestampToMd,
    timestampToD,
    week
}