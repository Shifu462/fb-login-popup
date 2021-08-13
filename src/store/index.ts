import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export type Counts = {
    Successful: number,
    Failed: number,
}

// На реальном проекте использовал бы Vuex modules, namespaces, но для простоты будет один state для всего.
export type StoreState = {
    LoginSuccessCounts: Counts,
};

const getBrowserState = () => {
    const browserStateJson = localStorage.getItem('login-state');

    return browserStateJson
        ? JSON.parse(browserStateJson) as StoreState
        : null;
};
const updateBrowserState = (state: StoreState) => localStorage.setItem('login-state', JSON.stringify(state));

export default new Vuex.Store<StoreState>({
    state: getBrowserState() || {
        LoginSuccessCounts: {
            Successful: 0,
            Failed: 0,
        }
    },
    mutations: {
        // На реальном проекте названия мутаций вынес бы в константы.
        addLoginSuccess(state: StoreState) {
            state.LoginSuccessCounts.Successful++;
            updateBrowserState(state);
        },

        addLoginFail(state: StoreState) {
            state.LoginSuccessCounts.Failed++;
            updateBrowserState(state);
        },
    },
});
