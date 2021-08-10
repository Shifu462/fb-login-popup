<template>
    <div class="popup-container" v-if="isVisible">
        <div class="popup">
            <slot />
        </div>

        <div class="popup-overflow" @click="toggle(false)" />
    </div>
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
    .popup-container,
    .popup-overflow {
        position: absolute;
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
        background-color: rgba($color: #000000, $alpha: .05);
    }

    .popup {
        position: absolute;
        z-index: 999;
        border-radius: 10px;
        overflow: hidden;

        background: white;
    }

</style>