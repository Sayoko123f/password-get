import { createStore } from 'vuex';
import {
    getPassword,
    defaultRules,
    symbols as allSymbols,
} from './password-generator';


export interface ICopyHistory {
    date: string;
    password: string;
}

export const store = createStore({
    state: () => ({
        password: '',
        rules: defaultRules,
        allSymbols,
        copyHistory: JSON.parse(
            localStorage.getItem('copyHistory') || '[]'
        ) as Array<ICopyHistory>,
    }),
    mutations: {
        useAlpha(state, payload: boolean) {
            state.rules.useAlpha = payload;
        },
        useSymbol(state, payload: boolean) {
            state.rules.useSymbol = payload;
        },
        setPasswordLength(state, payload: number) {
            state.rules.length = payload;
        },
        setExcludeSymbols(state, payload: Array<string>) {
            state.rules.excludeSymbol = payload;
        },
        generatePassword(state) {
            state.password = getPassword(state.rules);
        },
        setFirstCharUseUpperCase(state, payload: boolean) {
            state.rules.firstCharUseUpperCase = payload;
        },
        addCopyHistory(state, password: string) {
            const arr = [{ date: getDate(), password }, ...state.copyHistory];
            localStorage.setItem('copyHistory', JSON.stringify(arr));
            state.copyHistory = arr;
        },
        clearCopyHistory(state) {
            localStorage.removeItem('copyHistory');
            state.copyHistory = [];
        },
    },
});

function getDate() {
    return new Intl.DateTimeFormat('zh-TW').format(new Date());
}
