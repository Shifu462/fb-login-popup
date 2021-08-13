<template>
    <transition name="fade">
        <div class="popup-container" v-show="isVisible">
            <div class="popup">
                <button class="close-popup-cross" @click="toggle(false)"></button>

                <slot />
            </div>

            <div class="popup-overflow" @click="toggle(false)" />
        </div>
    </transition>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';

    @Component({})
    export default class VPopup extends Vue {
        isVisible = false;

        toggle(isVisible?: boolean) {
            this.isVisible = isVisible ?? !this.isVisible;
        }
    }
</script>

<style lang="scss" scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .popup-container,
    .popup-overflow {
        position: fixed;
        width: 100%;
        height: 100%;
    }

    .popup-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .popup-overflow {
        backdrop-filter: blur(2px);
        background-color: rgba($color: #000000, $alpha: 0.05);
    }

    .popup {
        position: absolute;
        z-index: 999;
        border-radius: 10px;
        overflow: hidden;

        display: flex;
        width: 750px;

        background: white;
    }

    .close-popup-cross {
        cursor: pointer;

        position: absolute;
        top: 15px;
        right: 15px;

        width: 24px;
        height: 24px;

        border: none;
        background: url('../assets/close-popup-cross.svg') no-repeat;
    }

    @media screen and (max-width: 800px) {
        .popup {
            border-radius: 0;
            width: 100%;
            height: 100%;
        }

        .close-popup-cross {
            background-image: url('../assets/close-popup-cross-mobile.svg');
        }
    }
</style>