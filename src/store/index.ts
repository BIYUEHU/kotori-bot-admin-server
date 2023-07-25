import { storeStateType } from '@/func';
import { defineStore } from 'pinia';



/* 定义容器 */
export const useMainStore = defineStore('main', {
    state: (): storeStateType => {
        return {
            state: {
                aside: null
            },
            temp: {
                dataServer: null,
                dataBot: null
            },
            token: ''
        }
    },

    persist: {
        storage: localStorage
    },

    getters: {},

    actions: {
        changeStateAside() {
            this.state.aside = !this.state.aside
        }
    }
});
