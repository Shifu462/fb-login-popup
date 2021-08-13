import { ValidationService } from '@/model/services'

const validationService = new ValidationService();

describe('ValidationService', () => {
    it('validates empty email with error', () => {
        expect(
            validationService.validateEmail('')
        ).not.toBeNull();
    })

    it('validates valid email without errors', () => {
        expect(
            validationService.validateEmail('aaa@aaa.com')
        ).toBeNull();
    })

    it('validates invalid email with error', () => {
        expect(
            validationService.validateEmail('aaa@')
        ).not.toBeNull();
    })

    it('validates empty password with error', () => {
        expect(
            validationService.validatePassword('')
        ).not.toBeNull();
    })

    it('validates valid password without errors', () => {
        expect(
            validationService.validatePassword('aaaaaa')
        ).toBeNull();
    })

    it('validates invalid password with error', () => {
        expect(
            validationService.validatePassword('aa')
        ).not.toBeNull();
    })
})
