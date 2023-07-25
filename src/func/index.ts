export type resCodeType = 500 | 501 | 502 | 503 | 504;
export type resMessageType = 'success' | 'fail:parameter cannot be empty' | 'fail:parameter error' | 'fail:error' | 'fail:server reject' | string;

export interface resData {
    code: resCodeType
    message: resMessageType
    data: object | null | object[]
}

export interface optionType {
    value: string,
    label: string
}

export type ApiType = Promise<{ data: resData }>;
