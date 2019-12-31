<template>
    <i18n path="currency_ella" tag="div">
        <span class="amount" slot="amount">
            <i18n-n :value="syncedBalance" :format="syncedFormat">
                <template v-slot:decimal="slotProps">
                    <span class="is-decimal">{{ slotProps.decimal }}</span>
                </template>
                <template v-slot:fraction="slotProps">
                    <span class="is-fraction">{{ slotProps.fraction }}</span>
                </template>
            </i18n-n>
        </span>
    </i18n>
</template>

<script lang="ts">
    import {Component, PropSync, Vue} from 'vue-property-decorator';

    @Component({})
    export default class CurrencyElla extends Vue {
        @PropSync('balance')
        public readonly syncedBalance!: number;
        @PropSync('format')
        public readonly syncedFormat!: string;
    }
</script>

<style lang="sass" scoped>
    @import "~bulma/sass/utilities/initial-variables"
    @import "~bulma/sass/utilities/mixins"

    .is-decimal
        font-weight: bold

    .is-fraction
        color: $grey-light

    +mobile
        .amount .is-fraction, .amount .is-decimal
            display: none
</style>
