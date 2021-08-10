<template>
    <div id="app">
        <LoginView />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import LoginView from '@/views/LoginView.vue';

    @Component({
        components: {
            LoginView,
        },
    })
    export default class App extends Vue {}
</script>

<style lang="scss">
    #app {
        font-family: Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
</style>
