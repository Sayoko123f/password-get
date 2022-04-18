<template>
    <header
        class="flex h-12 items-center justify-center border-b border-black/10 bg-white/60 dark:border-white/40 dark:bg-black md:justify-end md:px-8"
    >
        <ul class="flex gap-x-2">
            <li>
                <button class="text-blue-500 hover:text-blue-300">
                    <sun-icon
                        v-if="!isDarktheme"
                        class="inline-block h-6 w-6"
                        @click="toggleThemeToDark"
                    />
                    <moon-icon
                        v-if="isDarktheme"
                        class="inline-block h-6 w-6"
                        @click="toggleThemeToLight"
                    />
                </button>
            </li>
            <li>
                <button class="hover:text-black/40 dark:hover:text-white/40">
                    <clipboard-list-icon class="inline-block h-6 w-6" @click="openHistoryModal"/>
                </button>
            </li>
            <li>
                <button class="hover:text-black/40 dark:hover:text-white/40">
                    <cog-icon
                        class="inline-block h-6 w-6"
                        @click="openSettingModal"
                    />
                </button>
            </li>
        </ul>
    </header>
    <!-- Setting Modal -->
    <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <overlay-modal
            v-if="isSettingModalOpened || isHistoryModalOpened"
            @close="closeModal"
        >
            <setting-panel v-if="isSettingModalOpened" />
            <history-record v-else-if="isHistoryModalOpened" />
        </overlay-modal>
    </Transition>
</template>

<script setup lang="ts">
import OverlayModal from './overlay-modal.vue';
import { ref } from 'vue';
import {
    MoonIcon,
    SunIcon,
    CogIcon,
    ClipboardListIcon,
} from '@heroicons/vue/solid';
import SettingPanel from './setting-panel.vue';
import HistoryRecord from './history-record.vue';

const isSettingModalOpened = ref(false);
const isHistoryModalOpened = ref(false);
const isDarktheme = ref(document.documentElement.classList.contains('dark'));

function toggleThemeToDark() {
    localStorage.theme = 'dark';
    isDarktheme.value = true;
    document.documentElement.classList.add('dark');
}

function toggleThemeToLight() {
    localStorage.theme = 'light';
    isDarktheme.value = false;
    document.documentElement.classList.remove('dark');
}

function closeModal() {
    isSettingModalOpened.value = false;
    isHistoryModalOpened.value = false;
}
function openSettingModal() {
    isSettingModalOpened.value = true;
}
function openHistoryModal() {
    isHistoryModalOpened.value = true;
}
</script>
