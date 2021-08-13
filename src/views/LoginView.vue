<template>
    <div class="view">
        <VButton type="primary" @click="openPopup">
            <div class="btn-content">
                <!-- TODO: сделать css background-image -->
                <img src="@/assets/user-profile.svg" width="36" height="36" />
                <span>Login</span>
            </div>
        </VButton>

        <VButton type="success">
            <div class="btn-content">
                <!-- TODO: сделать css background-image -->
                <img src="@/assets/thumb-up.svg" width="36" height="36" />
                <span v-text="loginCounts.Successful" />
            </div>
        </VButton>

        <VButton type="danger">
            <div class="btn-content">
                <!-- TODO: сделать css background-image -->
                <img src="@/assets/thumb-down.svg" width="36" height="36" />
                <span v-text="loginCounts.Failed" />
            </div>
        </VButton>

        <VPopup class="login-popup" ref="loginPopup">
            <LoginForm v-if="!isSuccess" @success="onLoginSuccess" />
            <SuccessMessageView v-else />
        </VPopup>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Ref } from 'vue-property-decorator';
    import { Counts } from '@/store';
    import VButton from '@/components/VButton.vue';
    import VPopup from '@/components/VPopup.vue';
    import LoginForm from './LoginForm.vue';
    import SuccessMessageView from './SuccessMessageView.vue';

    @Component({
        components: {
            VButton,
            VPopup,
            LoginForm,
            SuccessMessageView,
        },
    })
    export default class LoginView extends Vue {
        @Ref()
        loginPopup!: VPopup;

        isSuccess = false;

        get loginCounts(): Counts {
            return this.$store.state.LoginSuccessCounts;
        }

        openPopup() {
            this.loginPopup.toggle(true);
        }

        onLoginSuccess() {
            this.isSuccess = true;

            setTimeout(
                () => {
                    this.loginPopup.toggle(false);
                    this.isSuccess = false;
                },
                3000
            );
        }
    }
</script>

<style lang="scss" scoped>
    .view {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;
    }

    .btn-content {
        display: flex;
        flex-direction: row;
        align-items: center;

        *:not(:first-child) {
            margin-left: 15px;
        }
    }

    ::v-deep .popup {
        display: flex;
        width: 750px;
    }
</style>
