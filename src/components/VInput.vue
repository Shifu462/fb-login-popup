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
            className: {
                type: String,
                default: '',
            },
            validationError: {
                type: [String, null] as PropType<string | null>,
                default: null,
            },
        },
        render(h, context) {
            const { id, type, label, validationError, value, className } = context.props;
            const inputListener = context.listeners.input as Function;

            return (
                <section class={'input ' + className}>
                    {label && <label for={id}>{label}</label>}
                    <input
                        id={id}
                        type={type}
                        value={value}
                        on={{
                            // Не нашёл тип ивента для change :(.
                            change: (evt: Event) => inputListener((evt.target! as any).value),
                        }}
                    />

                    {validationError && (
                        <section>
                            <VInputError props={{ message: validationError! } as any} />
                        </section>
                    )}
                </section>
            );
        },
    });
</script>

<style lang="scss" scoped>
    .input {
        display: flex;
        flex-direction: column;
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
</style>
