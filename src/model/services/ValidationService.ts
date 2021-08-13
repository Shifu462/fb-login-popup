import { Email, Password } from '@/model/types';

type ValidationExpression<T extends string = string> = (str: T) => boolean;

type ValidationRule<T extends string> = {
    test: ValidationExpression<T>,
    message: string,
};

// Простая регулярка, в продакшне посложнее была бы.
const EmailValidationRegex = /^\w+@\w+\.\w+$/;

export class ValidationService {

    #emailValidationRules: ValidationRule<Email>[] = [
        {
            test: email => !!email,
            message: 'This field is required.',
        },
        {
            test: email => EmailValidationRegex.test(email),
            message: 'Not valid E-mail address.',
        },
    ];

    #passwordValidationRules: ValidationRule<Password>[] = [
        {
            test: password => !!password,
            message: 'This field is required.',
        },
        {
            test: password => !!(password.length > 3),
            message: 'Password must be strong enough.',
        },
    ];

    private validate<T extends string>(item: T, rules: ValidationRule<T>[]): string | null {
        return rules.find(x => !x.test(item))?.message || null;
    }

    public validateEmail(email: Email): string | null {
        return this.validate(email, this.#emailValidationRules);
    }

    public validatePassword(password: Password): string | null {
        return this.validate(password, this.#passwordValidationRules);
    }
}
