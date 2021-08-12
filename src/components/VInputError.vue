<template functional>
    <span class="v-input-error" v-text="props.message" />
</template>

<style lang="scss">
    // style scoped не работает для <template functional> :(.

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
