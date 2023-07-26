import { getDataBot } from "@/http";
import router from "@/router";
import { ElMessage } from "element-plus";

export const BTC = 'bc1qe0kn3hkqls54rfrjkj5ezcyvtk8suxcy0lfz3r';

export const packageList = [
    'axios',
    'codemirror',
    'vue-codemirror',
    'vue-router',
    'vue-particles',
    'screenfull',
    '@codemirror/lang-javascript',
    '@codemirror/lang-json',
    '@codemirror/theme-one-dark',
    'pinia-plugin-persistedstate',
    'js-base64'
];

export function timestampToTime(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}

export function viewState(num: number, lastnum: number, viewcontent?: string | number): string {
    viewcontent = viewcontent ?? num;
    if (num > lastnum) return `<span style="color:lightgreen">↑${viewcontent}</span>`;
    if (num < lastnum) return `<span style="color:red">↓${viewcontent}</span>`;
    return `<span style="color:purple">${viewcontent}</span>`;
}

export async function verifyToken(callback?: Function) {
    try {
        const result = (await getDataBot());
        if (result.data.code === 500) {
            router.push('/index');
            return;
        }
        callback ? callback() : router.push('/login');
    } catch (error) {
        ElMessage.error('API请求失败！请检查配置和后端服务器');
        console.error(error);
    }
};