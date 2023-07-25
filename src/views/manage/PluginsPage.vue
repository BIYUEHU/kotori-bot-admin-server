<template>
    <div v-loading="!pluginData">
        <h2>插件管理</h2>
        <el-card>
            <el-table :data="pluginData" style="width:100">
                <el-table-column prop="name" label="ID" min-width="80" />
                <el-table-column prop="src" label="入口文件" min-width="100" />
                <el-table-column prop="info.name" label="名字" width="100" />
                <el-table-column prop="info.descr" label="描述" min-width="100" />
                <el-table-column prop="info.icon" label="图标" width="100" />
                <el-table-column prop="info.version" label="版本" width="100" />
                <el-table-column prop="info.author" label="作者" width="100" />
                <el-table-column prop="info.license" label="协议" width="100" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button link v-loading="false" type="primary" size="small"
                            @click="viewCode(scope.$index)">查看源码</el-button><br>
                        <el-button link v-loading="false" type="primary" size="small"
                            @click="viewConfig(scope.$index)">查看配置</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
    <div>
        <el-dialog v-model="dialogViewCode" v-loading="dialogViewCodeState" title="查看内容">
            <div>
                <codemirror aria-readonly v-model="code" :style="{ maxHeight: '600px', height: '500px' }" :autofocus="true"
                    :indent-with-tab="true" :tabSize="4" :extensions="extensions" /><br>
            </div>
            <span class="dialog-footer">
                <el-button type="primary" @click="dialogViewCode = false">
                    确认
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Codemirror } from "vue-codemirror";
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark'
import { getPluginInfo, getPluginFile } from '@/http/index';
import { ElMessage } from 'element-plus';
import { PluginInfoType } from '@/func';

const pluginData = ref<PluginInfoType[] | false>(false), code = ref<string>(''),
    dialogViewCode = ref<boolean>(false), dialogViewCodeState = ref<boolean>(true);
const extensions = [javascript(), oneDark];

getPluginInfo().then(res => {
    pluginData.value = res.data.data;
});


const viewCode = async (index: number) => {
    dialogViewCode.value = dialogViewCodeState.value = true;
    code.value = ''
    let pluginId = (<PluginInfoType[]>pluginData.value)[index].name;
    pluginId = pluginId.includes('.ts') ? pluginId : `${pluginId}/index.ts`;
    code.value = (<{ content: string }>(await getPluginFile(pluginId)).data.data).content;
    dialogViewCodeState.value = false;
}

const viewConfig = async (index: number) => {
    let pluginId = (<PluginInfoType[]>pluginData.value)[index].name;
    code.value = ''
    if (!pluginId.includes('.ts')) {
        pluginId = `${pluginId}/config.ts`;
        code.value = (<{ content: string }>(await getPluginFile(pluginId)).data.data).content;
    }
    if (!!code.value) {
        dialogViewCode.value = true;
        dialogViewCodeState.value = false;
    } else {
        ElMessage.warning('该插件没有配置文件')
    }

}

</script>