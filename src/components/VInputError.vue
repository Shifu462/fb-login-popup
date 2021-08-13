<script lang="tsx">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'VInputError',
        functional: true,
        props: {
            message: {
                type: String,
                required: true,
            },
        },
        render(h, context) {
            const { message } = context.props;

            return <span class="v-input-error">{message}</span>;
        },
    });
</script>

<style lang="scss">
    // style scoped не работает :(.

    .v-input-error {
        display: flex;
        align-items: center;

        height: 16px;

        &::before {
            content: '';
            display: inline-block;
            margin-right: 10px;
            width: 16px;
            height: 16px;

            background-image: url('../assets/error.svg');
        }
    }
</style>
