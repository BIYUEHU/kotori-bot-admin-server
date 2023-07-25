<template>
    <div>
        <div class="sidebar-header" :style="{ left: asideWidth }">
            <div>
                <el-button style="margin-right: 5px;" :icon="Menu" @click="store.changeStateAside()" />
                <span>{{ screenWidthType ? 'Kotori-Admin' : 'Kotori' }}</span>
            </div>

            <div>
                <el-button class="bottom" :icon="FullScreen" @click="changeScreen" />

                <span style="width: 40px;height: 40px">
                    <el-dropdown class="dropdown">
                        <el-avatar shape="square" :size="45"
                            src="https://storage.live.com/users/0x50a58ccfeb030620/myprofile/expressionprofile/profilephoto:UserTileStatic/p?ck=1&ex=720&sid=00EB8D2F27E261FD3F359CD026A8607A&fofoff=1" />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </span>
            </div>
        </div>
        <div class="sidebar-aside" :style="{ width: asideWidth }">
            <el-menu :default-active="defaultActive" :collapse="store.state.aside" background-color="#4082ac"
                text-color="#ffffff" style="height:100%" @select="select">
                <el-menu-item v-for="item in AsideData" :key="item.id" :index="item.id">
                    <el-tooltip v-if="store.state.aside" class="box-item" effect="dark" :content="item.text"
                        placement="right">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                    </el-tooltip>
                    <el-icon v-else>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.text }}</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="sidebar-main" :style="{ left: asideWidth }">
            <router-view />
        </div>
    </div>
</template>

<style scpoed>
a {
    text-decoration: none;
}

.dropdown:hover {
    border-color: blue !important;
}
</style>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/store';
import router from '@/router';
import { useRoute } from 'vue-router';
import {
    DataLine, FolderRemove, Setting, Notification, Menu, FullScreen, Tickets, User
} from '@element-plus/icons-vue'
import screenfull from 'screenfull';
import { getDataBot } from '@/http';
import { ElMessage } from 'element-plus';

const store = useMainStore();
const screenWidthType = document.body.clientWidth > 630;

/* token验证 */
(async () => {
    try {
        const result = (await getDataBot());
        if (result.data.code !== 500) {
            router.push('/login');
            return;
        };
    } catch {
        ElMessage.error('后端配置错误！');
    }
})();

/* 第一次进入网站根据设备宽带设置Aside默认值 */
if (store.state.aside === null) {
    store.state.aside = !screenWidthType;
}

const asideWidth = computed(() => {
    return store.state.aside ? '70px' : '200px';
})

const AsideData = [
    {
        id: '1',
        text: '数据中心',
        icon: DataLine,
        path: 'index'
    },
    {
        id: '2',
        text: '日志监控',
        icon: Tickets,
        path: 'log'
    },
    {
        id: '3',
        text: '插件管理',
        icon: FolderRemove,
        path: 'plugins'
    },
    {
        id: '4',
        text: '配置查看',
        icon: Setting,
        path: 'config'
    },
    {
        id: '5',
        text: '账号管理',
        icon: User,
        path: 'account'
    },
    {
        id: '6',
        text: '关于信息',
        icon: Notification,
        path: 'about'
    }
];

const route = useRoute();
const defaultActive = ref<string>(AsideData.find(item => '/' + item.path == route.path)?.id ?? '1');

const exitLogin = () => {
    store.token = '';
    router.push('/login');
}

const select = (id: string) => {
    const data = AsideData.find(item => id === item.id);
    router.push(data?.path ?? '')
}

const changeScreen = () => screenfull.isFullscreen ? screenfull.exit() : screenfull.request();

</script>
