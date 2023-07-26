export interface storeStateType {
    state: {
        aside: null | boolean
    },
    temp: {
        dataBot: DataBotType | null
        dataServer: DataServerType | null
    },
    token: string
}

export type resCodeType = 500 | 501 | 502 | 503 | 504;
export type resMessageType = 'success' | 'fail:parameter cannot be empty' | 'fail:parameter error' | 'fail:error' | 'fail:server reject' | string;
export type resDataDataType = object | any[] | null;

export interface resData<T = resDataDataType> {
    code: resCodeType
    message: resMessageType
    data: T
}

export interface optionType {
    value: string,
    label: string
}

export type ApiType<T = resDataDataType> = Promise<{ data: resData<T> }>;

export type HttpDataType = [ApiType<DataBotType>, ApiType<DataKotoriType>, ApiType<DataServerType>, ApiType<DataEnvType>];

export interface PostLoginType {
    token: string
}

export interface DataServerType {
    cpu: {
        arch: 'x64' | 'x86',
        model: string,
        speed: number,
        num: number,
        rate: number,
        ratearr: number[]
    },
    network: {
        num: number
    },
    os: {
        type: string,
        plate: string,
        time: string,
        hostname: string
        dir: string
    },
    ram: {
        rate: number
        total: number,
        unused: number,
        used: number
    }
}

export interface DataBotType {
    self_id: number,
    connect: number,
    heartbeat: number,
    status: {
        app_initialized: boolean,
        app_enabled: boolean,
        plugins_good: boolean | null,
        app_good: boolean,
        online: boolean
        stat: {
            packet_received: number,
            packet_sent: number,
            packet_lost: number,
            message_received: number,
            message_sent: number,
            disconnect_times: number,
            lost_times: number,
            last_message_time: number
        }
    }
}

export interface DataEnvType {
    node: string,
    typescript: string,
    tsnode: string
}

export interface DataKotoriType {
    name: string,
    version: string,
    description: string,
    main: string,
    types: string,
    scripts: {
        start: string,
        dev: string,
        test: string,
        build: string,
        cover: string
    },
    author: string,
    license: string,
    bugs: {

        url: string
    },
    homepage: string,
    dependencies: {
        [key: string]: string
    },
    devDependencies: {
        [key: string]: string
    }
}

export interface DataConfigType {
    content: string
}

export interface PluginFileType extends DataConfigType { };

export interface LogViewType extends DataConfigType { };

export interface PluginInfoType {
    name: string,
    src: string,
    info: {
        name?: string,
        descr?: string,
        icon?: string,
        version?: string,
        author?: string,
        license?: string
    }
}