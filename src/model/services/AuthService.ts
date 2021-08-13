import { StoreState } from '@/store';
import { Store } from 'vuex';
import { UserCredentials } from '../types';
import { ValidationService } from './ValidationService';

type HttpCode = 400 | 200;

type LoginResponseBody = {
    EmailError: string | null,
    PasswordError: string | null,
};

type HttpResponse<TBody> = {
    Code: HttpCode,
    Body?: TBody,
};

export class AuthService {
    readonly #validationService = new ValidationService();

    constructor(private readonly $store: Store<StoreState>) {
    }

    public login(credentials: UserCredentials): boolean {
        const loginResult = this.#backendLogin(credentials);

        if (loginResult.Code !== 200) {
            this.$store.commit('addLoginFail');
            return false;
        }

        this.$store.commit('addLoginSuccess');
        return true;
    }

    /**
     * Будем считать, что примерно такой код будет на бэкенде.
     * Понятно, что оттуда придёт также токен, но для простоты 400 или 200.
    */
    #backendLogin(credentials: UserCredentials): HttpResponse<LoginResponseBody> {
        // На бэкенде мы захотим повторно валидировать данные.
        const emailValidationError = this.#validationService.validateEmail(credentials.Email);
        const passwordValidationError = this.#validationService.validatePassword(credentials.Password);

        if (emailValidationError || passwordValidationError) {
            return {
                Code: 400,
                Body: {
                    EmailError: emailValidationError,
                    PasswordError: passwordValidationError,
                },
            };
        }

        // TODO: сверять с users.json

        return {
            Code: 200,
        };
    }
}
