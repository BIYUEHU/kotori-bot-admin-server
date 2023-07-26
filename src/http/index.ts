import axios from 'axios';
import { ApiType, DataBotType, DataEnvType, DataKotoriType, DataServerType, DataConfigType, PluginInfoType, PluginFileType, LogViewType, PostLoginType, HttpDataType } from '@/func';
import config from '@/../public/config.js'

const HOST = config.host ? config.host : 'localhost';
const URL = config.port ? `http://${HOST}:${config.port}/api/` : '/api/';

const getToken = (): string => {
    return localStorage.getItem('main') ? (JSON.parse(<string>localStorage.getItem('main')).token) : '';
}
const reqGet = async (url: string, params?: object): ApiType<any> => axios.get(`${URL}${url}`, {
    params: {
        token: getToken(),
        ...params
    }
});

export const postLogin = (user: string, pwd: string): ApiType<PostLoginType> => {
    return reqGet('account/login', { user, pwd });
}

export const getDataBot = (): ApiType<DataBotType> => {
    return reqGet('data/Bot');
}

export const getDataKotori = (): ApiType<DataKotoriType> => {
    return reqGet('data/Kotori');
}

export const getDataServer = (): ApiType<DataServerType> => {
    return reqGet('data/Server');
}

export const getDataEnv = (): ApiType<DataEnvType> => {
    return reqGet('data/Env');
}

export const getDataConfig = (): ApiType<DataConfigType> => {
    return reqGet('data/config');
}

export const getData = (): HttpDataType => {
    return [getDataBot(), getDataKotori(), getDataServer(), getDataEnv()];
}

export const getPluginInfo = (): ApiType<PluginInfoType[]> => {
    return reqGet('plugin/info');
}

export const getPluginFile = (path: string, op: string = 'get'): ApiType<PluginFileType> => {
    return reqGet('plugin/file', { path, op });
}

export const getLogList = (): ApiType<string[]> => {
    return reqGet('log/list');
}

export const getLogView = (num: string | number): ApiType<LogViewType> => {
    return reqGet('log/view', { num });
}
