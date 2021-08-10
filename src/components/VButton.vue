<script lang="tsx">
    import Vue, { PropType } from 'vue';

    type ButtonType = 'primary' | 'success' | 'danger';
    const defaultButtonType: ButtonType = 'primary';

    export default Vue.extend({
        name: 'VButton',
        functional: true,
        props: {
            type: {
                type: String as PropType<ButtonType>,
                default: defaultButtonType,
            },
        },
        render(h, context) {
            return (
                <button {...{ on: context.listeners }} class={context.props.type}>
                    {context.children[0]}
                </button>
            );
        },
    });
</script>

<style lang="scss" scoped>
    button {
        cursor: pointer;

        border: 0;
        border-radius: 10px;
        font-size: 20px;
        padding: 6px 10px;

        color: white;
        text-align: center;
        font-weight: bold;

        &:hover {
            filter: brightness(85%);
        }
    }

    .primary {
        background-color: #5988d9;
    }
    .success {
        background-color: #28a745;
    }
    .danger {
        background-color: #dc3545;
    }
</style>
