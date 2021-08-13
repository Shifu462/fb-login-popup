<script lang="tsx">
    import Vue, { PropType } from 'vue';
    import VInputError from './VInputError.vue';

    export default Vue.extend({
        name: 'VInput',
        functional: true,
        props: {
            id: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                default: '',
            },
            label: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: 'text',
            },
            validationError: {
                type: [String, null] as PropType<string | null>,
                default: null,
            },
        },
        render(h, context) {
            const { id, type, label, validationError, value } = context.props;
            const inputListener = context.listeners.input as Function;

            return (
                <section class="v-input-container">
                    {label && <label for={id}>{label}</label>}
                    <div class={'input-wrapper' + (validationError ? ' error-input-wrapper' : '')}>
                        <input
                            id={id}
                            type={type}
                            value={value}
                            class={validationError ? 'input-error' : ''}
                            on={{
                                // Не нашёл тип ивента для change :(.
                                change: (evt: Event) => inputListener((evt.target! as any).value),
                            }}
                        />
                    </div>

                    <section class="error-message">{validationError && <VInputError props={{ message: validationError! } as any} />}</section>
                </section>
            );
        },
    });
</script>

<style lang="scss" scoped>
    .v-input-container {
        display: flex;
        flex-direction: column;
    }

    label {
        font-size: 14px;
        font-weight: bold;

        & + .input-wrapper {
            margin-top: 14px;
        }
    }

    input {
        background-color: #f7f7f7;
        border: 1px solid rgba(255, 255, 255, 0);
        border-radius: 3px;

        font-size: 18px;
        height: 48px;
        width: 100%;

        &.input-error {
            border-color: #db6969;
        }
    }

    .error-input-wrapper {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            right: 10px;
            top: 15px;

            width: 23px;
            height: 23px;
            background: url('../assets/error-exclamation.svg') no-repeat;
        }
    }

    .error-message {
        margin-top: 10px;
        height: 16px;
    }
</style>
