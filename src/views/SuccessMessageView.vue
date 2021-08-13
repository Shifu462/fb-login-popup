<template functional>
    <section class="success-container">
        <div class="icon" />
        <div class="message">Success!</div>
    </section>
</template>

<style lang="scss" scoped>
    .success-container {
        width: 750px;
        height: 364px;
        text-transform: uppercase;
        background-color: #65b878;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .icon {
        display: block;
        width: 167px;
        height: 167px;

        // Не смог выгрузить галочку как svg.
        background: url('../assets/thumb-up.svg') no-repeat;
        background-size: contain;
    }

    .message {
        color: white;
        font-size: 30px;
        margin-top: 20px;
    }
</style>