<template>
    <div class="sidebar-header" :style="{ left: asideWidth }">
        <div>
            <el-button style="margin-right: 5px;" :icon="Menu" @click="store.changeStateAside()" />
            <span>{{ screenWidthType ? 'Kotori-Admin' : 'Kotori' }}</span>
        </div>

        <div>
            <span>{{ topTips }} </span>
            <el-button class="bottom" :icon="FullScreen" @click="changeScreen" />
            <span style="width: 40px;height: 40px">
                <el-dropdown class="dropdown">
                    <el-avatar shape="square" :size="45" src="/favicon.ico" />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </span>
        </div>
    </div>
</template>

<style scoped>
.dropdown:hover {
    border-color: blue !important;
}
</style>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/store';
import router from '@/router';
import { Menu, FullScreen } from '@element-plus/icons-vue'
import screenfull from 'screenfull';
import { getDataEnv, getDataKotori } from '@/http';

const store = useMainStore();
const screenWidthType = document.body.clientWidth > 630;
const topTips = ref<string>('');


/* 第一次进入网站根据设备宽带设置Aside默认值 */
if (store.state.aside === null) {
    store.state.aside = !screenWidthType;
}

const asideWidth = computed(() => {
    return store.state.aside ? '70px' : '200px';
});

/* 加载顶部数据 */
getDataKotori().then(res => topTips.value += '框架版本: ' + res.data.data.version);
getDataEnv().then(res => topTips.value += ' Node: ' + res.data.data.node + ' ');


const exitLogin = () => {
    store.token = '';
    router.push('/login');
}

const changeScreen = () => screenfull.isFullscreen ? screenfull.exit() : screenfull.request();
</script>
