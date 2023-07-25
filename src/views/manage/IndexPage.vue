<template>
    <div v-loading="!isShow">
        <h2>数据中心</h2>
        <el-col md="6" xs="12">
            <el-card>
                <h3><small>[实时]</small>BOT数据</h3>
                <div v-if="isShow">
                    <span>连接时间：<mark>{{ timestampToTime(dataBot!.connect) }}</mark></span>
                    <span> 心跳时间：{{ timestampToTime(dataBot!.heartbeat) }}</span>
                    <span> BOTQQ：{{ dataBot?.self_id }}</span>
                </div>
                <div v-if="isShow">
                    <el-checkbox :checked="dataBot?.status.app_initialized" label="Gocq初始化完毕" />
                    <el-checkbox :checked="dataBot?.status.app_enabled" label="Gocq是否可用" />
                    <el-checkbox :checked="dataBot?.status.plugins_good" label="Gocq插件正常" />
                    <el-checkbox :checked="dataBot?.status.app_good" label="Gocq程序正常" />
                    <el-checkbox :checked="dataBot?.status.online" label="Gocq在线" />
                </div>
                <p v-if="isShow">
                    <span>收包数：<span v-html="viewState(dataBot!.status.stat.packet_received, store.temp.dataBot!.status.stat.packet_received)
                        "></span></span>
                    <span> 发包数：<span
                            v-html="viewState(dataBot!.status.stat.packet_sent, store.temp.dataBot!.status.stat.packet_sent)"></span></span>
                    <span> 丢包数：<span
                            v-html="viewState(dataBot!.status.stat.packet_lost, store.temp.dataBot!.status.stat.packet_lost)"></span></span>
                    <span> 消息接收数：<span v-html="viewState(dataBot!.status.stat.message_received,
                        store.temp.dataBot!.status.stat.message_received)"></span></span>
                    <span> 消息发送数：<span v-html="viewState(dataBot!.status.stat.message_sent, store.temp.dataBot!.status.stat.message_sent)
                        "></span></span>
                </p>
                <p v-if="isShow">
                    <span>连接断开数：{{ store.temp.dataBot?.status.stat.disconnect_times }}</span>
                    <span> 连接丢失数数：{{ store.temp.dataBot?.status.stat.lost_times }}</span>
                    <span> 最后一次消息时间：{{ timestampToTime(store.temp.dataBot!.status.stat.last_message_time) }}</span>
                </p>
            </el-card>
        </el-col><br>
        <el-col md="6" xs="12">
            <el-card>
                <h3>框架信息</h3>
                <div>
                    <span><strong>作者：{{ dataKotori?.author }}</strong></span>
                    <span><strong> 协议：{{ dataKotori?.license }}</strong></span>
                    <span><strong> 版本：{{ dataKotori?.version }}</strong></span><br>
                    <a href="https://github.com/biyuehu/kotori-bot" target="_blank"><el-button
                            type="primary">仓库地址</el-button></a>
                </div>
            </el-card>
        </el-col><br>
        <el-col md="6" xs="12">
            <el-card>
                <h3><small>[实时]</small>服务器统计</h3>
                <p v-if="isShow">
                    <span>CPU占用率：<span
                            v-html="viewState(dataServer!.cpu.rate, store.temp.dataServer!.cpu.rate, dataServer!.cpu.rate.toFixed(2) + '%')"></span></span>
                    <span> CPU核心数据：</span><br>
                    <span v-for="(key, index) in dataServer?.cpu.ratearr" :key="key"> 核心{{ index + 1 }}：<span
                            v-html="viewState(key, store.temp.dataServer!.cpu.ratearr[index], key.toFixed(2) + '%')"></span></span>
                </p>
                <p v-if="isShow">
                    <span>内存占用率：<span
                            v-html="viewState(dataServer!.ram.rate, store.temp.dataServer!.ram.rate, dataServer!.ram.rate.toFixed(2) + '%')"></span></span>
                    <span> 内存总量：<span
                            v-html="viewState(dataServer!.ram.total, store.temp.dataServer!.ram.total, dataServer!.ram.total.toFixed(2) + 'GB')"></span></span>
                    <span> 未使用内存：<span
                            v-html="viewState(dataServer!.ram.unused, store.temp.dataServer!.ram.unused, dataServer!.ram.unused.toFixed(2) + 'GB')"></span></span>
                    <span> 使用内存：<span
                            v-html="viewState(dataServer!.ram.used, store.temp.dataServer!.ram.used, dataServer!.ram.used.toFixed(2)) + 'GB'"></span></span>
                </p>
                <div>
                    <span>CPU架构：{{ dataServer?.cpu.arch }}</span>
                    <span> CPU型号：{{ dataServer?.cpu.model }}</span>
                    <span> CPU频率：{{ dataServer?.cpu.speed.toFixed(2) }}</span>
                    <span> CPU核心数：{{ dataServer?.cpu.num }}Ghz</span>
                </div>
                <div>
                    <span>系统内核：{{ dataServer?.os.time }}</span>
                    <span> 系统平台：{{ dataServer?.os.plate }}</span>
                    <span> 主机名称：{{ dataServer?.os.hostname }}</span>
                    <span> 开机时间：{{ dataServer?.os.time }}</span>
                    <span> 系统目录：{{ dataServer?.os.dir }}</span>
                    <span> 网卡数量：{{ dataServer?.network.num }}</span>
                </div>
            </el-card>
        </el-col><br>
        <el-col md="6" xs="12">
            <el-card>
                <h3>环境变量</h3>
                <span>Node版本：{{ dataEnv?.node }}</span>
                <span> TypeScript版本：{{ dataEnv?.typescript }}</span>
                <span> Ts-Node版本：{{ dataEnv?.tsnode }}</span>
            </el-card>
        </el-col>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getData, getDataBot, getDataServer } from '@/http';
import { DataBotType, DataEnvType, DataKotoriType, DataServerType, timestampToTime } from '@/func';
import config from '@/../public/config.js';
import { useMainStore } from '@/store';

const store = useMainStore();

const dataBot = ref<DataBotType>();
const dataKotori = ref<DataKotoriType>();
const dataServer = ref<DataServerType>();
const dataEnv = ref<DataEnvType>();
const isShow = ref<boolean>(false);

(async () => {
    const data = getData();
    dataBot.value = (await data[0]).data.data;
    store.temp.dataBot || (store.temp.dataBot = dataBot.value);
    dataKotori.value = (await data[1]).data.data;
    dataServer.value = (await data[2]).data.data;
    store.temp.dataServer || (store.temp.dataServer = dataServer.value);
    dataEnv.value = (await data[3]).data.data;
    setTimeout(() => isShow.value = true, 500)
})();

setInterval(async () => {
    if (store.temp.dataBot == dataBot.value) store.temp.dataBot = JSON.parse(JSON.stringify(dataBot.value));
    dataBot.value = (await getDataBot()).data.data;
    if (store.temp.dataServer == dataServer.value) store.temp.dataServer = JSON.parse(JSON.stringify(dataServer.value));
    dataServer.value = (await getDataServer()).data.data;
}, config.app.updatetime);

const viewState = (num: number, lastnum: number, viewcontent?: string | number): string => {
    viewcontent = viewcontent ?? num;
    if (num > lastnum) return `<span style="color:lightgreen">↑${viewcontent}</span>`;
    if (num < lastnum) return `<span style="color:red">↓${viewcontent}</span>`;
    return `<span style="color:purple">${viewcontent}</span>`;
}
</script>