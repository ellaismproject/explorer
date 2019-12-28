<template>
    <i18n path="currency_ella" tag="div">
        <span slot="amount">
            <i18n-n :value="syncedBalance" :format="syncedFormat">
                <template v-slot:decimal="slotProps">
                    <span class="has-text-weight-semibold">{{ slotProps.decimal }}</span>
                </template>
                <template v-slot:fraction="slotProps">
                    <span class="has-text-grey-light">{{ slotProps.fraction }}</span>
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
