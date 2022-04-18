<template>
    <div
        class="absolute inset-0 z-20 flex items-center justify-center bg-white/80 dark:bg-black/80 px-2"
        @click.self.stop="handleClose"
    >
        <div
            class="relative w-full max-w-xs rounded-md border border-sky-500 bg-white p-4 shadow-md dark:bg-black md:max-w-lg overflow-hidden"
        >
            <x-icon
                class="absolute top-4 right-2 inline-block h-6 w-6 hover:cursor-pointer text-inherit hover:text-black/40 dark:hover:text-white/40"
                @click.self.stop="handleClose"
                v-if="showXIcon"
            />
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { XIcon } from '@heroicons/vue/solid';
import { defineComponent } from 'vue';
export default defineComponent({
    components: { XIcon },
    emits: ['close'],
    props: {
        autoClose: Boolean,
        autoCloseMs: {
            type: Number,
            default: 650,
        },
        showXIcon: {
            type: Boolean,
            default: true,
        },
    },
    data: () => ({
        timer: 0,
    }),
    mounted() {
        if (this.autoClose) {
            this.timer = window.setTimeout(this.handleClose, this.autoCloseMs);
        }
    },
    beforeUnmount() {
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
    },
    methods: {
        handleClose() {
            this.$emit('close');
        },
    },
});
</script>
