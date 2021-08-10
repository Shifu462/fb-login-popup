<template>
    <form class="login-form">
        <section class="user-icon-section">
            <img src="@/assets/user-profile.svg" width="248" height="248" />
        </section>

        <section class="form-section">
            <label for="email">Email</label>
            <input id="email" type="email" />

            <label for="password">Password</label>
            <input id="password" type="password" />

            <VButton @click="e => e.preventDefault()">Login</VButton>
        </section>
    </form>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import VButton from '@/components/VButton.vue';

    @Component({
        components: {
            VButton,
        }
    })
    export default class LoginForm extends Vue {
    }
</script>

<style lang="scss" scoped>
    .login-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    label {
        font-size: 14px;
        font-weight: bold;
    }

    input {
        background-color: #f7f7f7;
        border: 0;

        font-size: 18px;
        height: 48px;
    }

    .user-icon-section {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #5988d9;
    }

    .form-section {
        display: flex;
        flex-direction: column;

        padding: 48px 20px;
    }
</style>
