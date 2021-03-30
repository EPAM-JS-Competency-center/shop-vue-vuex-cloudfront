<template>
    <div aria-hidden="true">
        {{ appVersion }}
    </div>
</template>

<style scoped>
    div {
        position: fixed;
        z-index: 100;
        right: 20px;
        bottom: 20px;
        opacity: 0.4;
    }
</style>

<script lang="ts">
import Vue from 'vue';
    
    export default Vue.extend({
        props: {
            value: Number
        },
        computed: {
            appVersion () {
                return `App ver. ${this.value || 0}`;
            }
        }
    })
</script>