<template>
    <div>
        <HeaderCom />
        <AsideCom :style="{ width: asideWidth }" />
        <div class="sidebar-main" :style="{ left: asideWidth }" >
            <router-view />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useMainStore } from '@/store';
import router from '@/router';
import { getDataBot } from '@/http';
import { ElMessage } from 'element-plus';
import HeaderCom from '@/components/HeaderCom.vue';
import AsideCom from '@/components/AsideCom.vue';

const store = useMainStore();
const screenWidthType = document.body.clientWidth > 630;

/* 第一次进入网站根据设备宽带设置Aside默认值 */
if (store.state.aside === null) {
    store.state.aside = !screenWidthType;
}

const asideWidth = computed(() => {
    return store.state.aside ? '70px' : '200px';
});

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
</script>
