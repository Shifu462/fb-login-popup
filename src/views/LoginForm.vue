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
                :validationError="emailValidationError"
            />

            <VInput v-model="form.Password"
                label="Password"
                id="password"
                type="password"
                :validationError="passwordValidationError"
            />

            <VButton @click="onLoginClick">Login</VButton>
        </section>
    </form>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import VButton from '@/components/VButton.vue';
    import VInput from '@/components/VInput.vue';
    import { AuthService, ValidationService } from '@/model/services';
    import { UserCredentials } from '@/model/types';

    @Component({
        components: {
            VButton,
            VInput,
        },
    })
    export default class LoginForm extends Vue {
        readonly authService = new AuthService(this.$store);
        readonly validationService = new ValidationService();

        readonly form: UserCredentials = {
            Email: '',
            Password: '',
        };

        emailValidationError: string | null = null;
        passwordValidationError: string | null = null;

        onLoginClick(evt: Event) {
            evt.preventDefault();

            if (!this.validate()) return;

            this.authService.login(this.form);
        }

        validate() {
            this.emailValidationError = this.validationService.validateEmail(this.form.Email);
            this.passwordValidationError = this.validationService.validatePassword(this.form.Password);

            return this.emailValidationError || this.passwordValidationError;
        }
    }
</script>

<style lang="scss" scoped>
    .login-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    ::v-deep .input:not(:first-child) {
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
    }

    .form-section {
        display: flex;
        flex-direction: column;

        padding: 48px 20px;
    }
</style>
