// 数组去重
export const arrayToHeavy = (arr) => {
    let s1 = new Set(arr)
    return [...s1];
}