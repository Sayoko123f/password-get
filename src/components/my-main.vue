<template>
    <main class="h-[calc(100vh-3rem)]">
        <h1 class="py-4 text-center text-3xl font-bold">密碼產生器</h1>
        <div class="container mx-auto">
            <div
                class="mx-auto flex h-20 max-w-md items-center justify-start overflow-hidden whitespace-nowrap rounded bg-black/5 px-4 text-center shadow-md dark:bg-white/5"
            >
                <p
                    class="relative w-full select-all overflow-x-auto rounded border border-black/20 bg-white/30 p-2 dark:border-white/20 dark:bg-black/30"
                >
                    <duplicate-icon
                        class="absolute right-2 inline-block h-6 w-6 cursor-pointer hover:text-black/50 dark:hover:text-white/50"
                        @click="handleCopy"
                    />
                    <span class="block max-w-[90%] overflow-clip">{{
                        password
                    }}</span>
                </p>
            </div>
        </div>
        <div class="py-4 text-center">
            <button
                class="btn-grad rounded-lg shadow-inner"
                @click.stop="handleRefreshClick"
            >
                <refresh-icon class="inline-block h-8 w-8" />
            </button>
        </div>
        <p class="pt-4 text-center">密碼長度：{{ password.length }}</p>
        <slide-bar
            class="mx-auto w-60 md:w-full md:max-w-xs"
            @change="changeLen"
        />
        <!-- Copy Tip -->
        <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-300 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <overlay-modal
                v-if="isCopyTipModelOpened"
                :auto-close="true"
                :show-x-icon="false"
                @close="() => (isCopyTipModelOpened = false)"
            >
                <div class="text-center text-2xl font-bold">複製成功</div>
            </overlay-modal>
        </Transition>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import slideBar from './slide-bar.vue';
import { DuplicateIcon } from '@heroicons/vue/outline';
import { RefreshIcon } from '@heroicons/vue/solid';
import OverlayModal from './overlay-modal.vue';
const store = useStore();

const isCopyTipModelOpened = ref(false);

const changeLen = (len: number) => {
    store.commit('setPasswordLength', len);
    store.commit('generatePassword');
};

const password = computed(() => store.state.password);

onMounted(() => {
    store.commit('generatePassword');
});

const copyToClipboard = (str: string) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
};

const handleCopy = async () => {
    try {
        await copyToClipboard(password.value);
        isCopyTipModelOpened.value = true;
        store.commit('addCopyHistory', password.value);
    } catch (err) {
        window.alert('您的瀏覽器不支援剪貼簿功能:(');
        console.error(err);
    }
};

function handleRefreshClick() {
    store.commit('generatePassword');
}
</script>
