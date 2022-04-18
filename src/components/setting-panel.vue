<template>
    <div class="flex flex-col gap-y-1">
        <label class="w-fit cursor-pointer">
            <input
                class="form-checkbox cursor-pointer"
                type="checkbox"
                @change="handleUseAlphaChange"
                :value="useAlpha"
                :checked="useAlpha"
            />
            <span class="align-middle"> 使用英文字母 </span>
        </label>
        <label
            class="w-fit"
            :class="{
                'opacity-30': !useAlpha,
                'cursor-pointer': useAlpha,
                'cursor-not-allowed': !useAlpha,
            }"
        >
            <input
                class="form-checkbox cursor-pointer disabled:cursor-not-allowed"
                type="checkbox"
                @change="handleFirstCharUseUpperCaseChange"
                :value="firstCharUseUpperCase"
                :checked="firstCharUseUpperCase"
                :disabled="!useAlpha"
            />
            <span class="align-middle"> 首字母大寫 </span>
        </label>
        <hr class="my-3" />
        <label class="w-fit cursor-pointer">
            <input
                class="form-checkbox cursor-pointer"
                type="checkbox"
                @change="handleUseSymbolChange"
                :value="useSymbol"
                :checked="useSymbol"
            />
            <span class="align-middle"> 使用符號 </span>
        </label>
        <div class="flex flex-wrap gap-2" :class="{ 'opacity-30': !useSymbol }">
            <label
                class="w-fit"
                :class="{
                    'cursor-pointer': useSymbol,
                    'cursor-not-allowed': !useSymbol,
                }"
                v-for="sym in symbols"
                :key="sym.char"
            >
                <input
                    class="form-checkbox cursor-pointer disabled:cursor-not-allowed"
                    type="checkbox"
                    @change="
                        () => {
                            sym.allow = !sym.allow;
                            hanldeSymbolExcludeChange();
                        }
                    "
                    :value="sym.allow"
                    :checked="sym.allow"
                    :disabled="!useSymbol"
                />
                <span class="p-2 align-middle">
                    {{ sym.char }}
                </span>
            </label>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const useAlpha = computed(() => store.state.rules.useAlpha);
const useSymbol = computed(() => store.state.rules.useSymbol);
const firstCharUseUpperCase = computed(
    () => store.state.rules.firstCharUseUpperCase
);
const allSymbols = store.state.allSymbols as Array<string>;
const symbols = allSymbols.map((e) => {
    const allow = !store.state.rules.excludeSymbol.includes(e) as boolean;
    return { char: e, allow };
});

function handleUseAlphaChange() {
    store.commit('useAlpha', !useAlpha.value);
}

function handleUseSymbolChange() {
    store.commit('useSymbol', !useSymbol.value);
}

function handleFirstCharUseUpperCaseChange() {
    store.commit('setFirstCharUseUpperCase', !firstCharUseUpperCase.value);
}

function hanldeSymbolExcludeChange() {
    const excludeChars = symbols
        .filter((sym) => !sym.allow)
        .map((sym) => sym.char);
    store.commit('setExcludeSymbols', excludeChars);
}
</script>
