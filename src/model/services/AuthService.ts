import { StoreState } from '@/store';
import { Store } from 'vuex';
import { UserCredentials } from '../types';
import { ValidationService } from './ValidationService';

const USERS_JSON: { Users: UserCredentials[] } = require('@/users.json');

type HttpCode = 200 | 400 | 403;

type HttpResponse<TBody> = {
    Code: HttpCode,
    Body?: TBody,
};

export type LoginResult = {
    CommonError: string | null,
    EmailError: string | null,
    PasswordError: string | null,
};

export class AuthService {
    readonly #usersList = USERS_JSON.Users;
    readonly #validationService = new ValidationService();

    constructor(private readonly $store: Store<StoreState>) {
    }

    public login(credentials: UserCredentials): LoginResult | null {
        const loginResponse = this.backendLogin(credentials);

        if (loginResponse.Code !== 200) {
            this.$store.commit('addLoginFail');
            return loginResponse.Body || null;
        }

        this.$store.commit('addLoginSuccess');
        return loginResponse.Body || null;
    }

    /**
     * Будем считать, что примерно такой код будет на бэкенде.
     * Понятно, что оттуда придёт также токен, но для простоты будем ориентироваться по HttpCode.
    */
    private backendLogin(credentials: UserCredentials): HttpResponse<LoginResult> {
        // На бэкенде мы захотим повторно валидировать данные.
        const emailValidationError = this.#validationService.validateEmail(credentials.Email);
        const passwordValidationError = this.#validationService.validatePassword(credentials.Password);

        if (emailValidationError || passwordValidationError) {
            return {
                Code: 400,
                Body: {
                    CommonError: null,
                    EmailError: emailValidationError,
                    PasswordError: passwordValidationError,
                },
            };
        }

        const userWithSuchCredentialsExists = this.#usersList
            .some(u =>
                u.Email === credentials.Email
                && u.Password === credentials.Password
            );

        if (!userWithSuchCredentialsExists) {
            return {
                Code: 403,
                Body: {
                    CommonError: 'Email or password incorrect.',
                    EmailError: null,
                    PasswordError: null,
                }
            }
        }

        return {
            Code: 200,
        };
    }
}
