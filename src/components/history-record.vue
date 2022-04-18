<template>
    <div class="">
        <p class="py-4 text-center">歷史複製紀錄</p>
        <div class="flex max-h-96 flex-col gap-2 overflow-y-auto">
            <div
                class="flex flex-row flex-nowrap gap-2 px-1"
                v-for="(item, i) in copyHistorys"
                :key="i"
            >
                <span class="opacity-60">{{ item.date }}</span>
                <span class="select-all overflow-x-auto whitespace-nowrap">{{
                    item.password
                }}</span>
            </div>
        </div>
        <div class="mt-2 text-center text-orange-500 dark:text-orange-300">
            <button
                class="px-2 py-1 opacity-60 hover:opacity-100"
                @click="clearCopyHistory"
            >
                清除所有紀錄
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const copyHistorys = computed(() => store.state.copyHistory);

function clearCopyHistory() {
    console.log(store.state.copyHistory);
    store.commit('clearCopyHistory');
    console.log(store.state.copyHistory);
}
</script>
