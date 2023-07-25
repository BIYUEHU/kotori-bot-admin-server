import axios from 'axios';
import { ApiType } from '@/func';
import config from '@/config.json';

const URL = `http://${config.host}:${config.port}/api/`;

const getToken = (): string => {
    return localStorage.getItem('main') ? (JSON.parse(<string>localStorage.getItem('main')).token) : '';
}
const reqGet = async (url: string, params?: object): ApiType => axios.get(`${URL}${url}`, {
    params: {
        token: getToken(),
        ...params
    }
});


export const postLogin = (user: string, pwd: string): ApiType => {
    return reqGet('account/login', { user, pwd });
}

export const getDataBot = (): ApiType => {
    return reqGet('data/Bot');
}

export const getDataKotori = (): ApiType => {
    return reqGet('data/Kotori');
}

export const getDataServer = (): ApiType => {
    return reqGet('data/Server');
}

export const getDataEnv = (): ApiType => {
    return reqGet('data/Env');
}

export const getDataConfig = (): ApiType => {
    return reqGet('data/config');
}

export const getData = (): ApiType[] => {
    return [getDataBot(), getDataKotori(), getDataServer(), getDataEnv()];
}

export const getPluginInfo = (): ApiType => {
    return reqGet('plugin/info');
}

export const getPluginFile = (path: string, op: string = 'get'): ApiType => {
    return reqGet('plugin/file', { path, op });
}

export const getLogList = (): ApiType => {
    return reqGet('log/list');
}

export const getLogView = (num: string | number): ApiType => {
    return reqGet('log/view', { num });
}
