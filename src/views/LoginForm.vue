<template>
    <form class="login-form">
        <section class="user-icon-section">
            <!-- TODO: сделать css background-image -->
            <img src="@/assets/user-profile.svg" width="248" height="248" />
        </section>

        <section class="form-section">
            <VInput v-model="form.Email"
                label="Email"
                id="email"
                type="email"
                :validationError="loginResult && loginResult.EmailError"
            />

            <VInput v-model="form.Password"
                label="Password"
                id="password"
                type="password"
                :validationError="loginResult && loginResult.PasswordError"
            />

            <VButton @click="onLoginClick">Login</VButton>

            <VInputError
                v-if="loginResult && loginResult.CommonError"
                :message="loginResult.CommonError"
            />
        </section>
    </form>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import VButton from '@/components/VButton.vue';
    import VInput from '@/components/VInput.vue';
    import { AuthService, LoginResult, ValidationService } from '@/model/services';
    import { UserCredentials } from '@/model/types';
    import VInputError from '@/components/VInputError.vue';

    @Component({
        components: {
            VButton,
            VInput,
            VInputError,
        },
    })
    export default class LoginForm extends Vue {
        readonly authService = new AuthService(this.$store);
        readonly validationService = new ValidationService();

        readonly form: UserCredentials = {
            Email: '',
            Password: '',
        };

        loginResult: LoginResult | null = null;

        onLoginClick(evt: Event) {
            evt.preventDefault();

            if (!this.validate()) {
                console.log(this.loginResult);
                return;
            }

            this.loginResult = this.authService.login(this.form);
            if (!(
                this.loginResult?.CommonError
                || this.loginResult?.EmailError
                || this.loginResult?.PasswordError)
            ) {
                this.loginResult = null;
                this.$emit('success');
            }
        }

        validate() {
            this.loginResult = {
                CommonError: null,
                EmailError: this.validationService.validateEmail(this.form.Email),
                PasswordError: this.validationService.validatePassword(this.form.Password),
            };

            return !this.loginResult.EmailError && !this.loginResult.PasswordError;
        }
    }
</script>

<style lang="scss" scoped>
    .login-form {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    ::v-deep .v-input-container:not(:first-child) {
        margin-top: 35px;
    }

    ::v-deep .primary {
        margin-top: 25px;
    }

    .user-icon-section {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #5988d9;
        width: 50%;

        background-size: 250px;
    }

    .form-section {
        display: flex;
        flex-direction: column;

        padding: 48px 20px;
        width: 50%;
    }
</style>
