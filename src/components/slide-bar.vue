<template>
    <div>
        <input class="w-full" type="range" v-model="len" min="6" max="60" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    emits: ['change'],
    data: () => ({
        len: 10,
    }),
    watch: {
        len(newLen: string) {
            this.$emit('change', parseInt(newLen));
        },
    },
});
</script>
