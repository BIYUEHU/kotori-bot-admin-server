import { defineStore } from 'pinia';

interface stateType {
    aside: null | boolean
}

interface state {
    state: stateType,
    token: string
}

/* 定义容器 */
export const useMainStore = defineStore('main', {
    state: (): state => {
        return {
            state: {
                aside: null
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
