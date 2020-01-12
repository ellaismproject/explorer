<template>
    <div class="has-text-weight-bold">
        <i18n v-if="balanceDisplay !== 0" path="currency_ella" tag="span" :class="isPositive ? 'pos' : 'neg'">
            <span class="operator" slot="operator">
                <span v-if="isPositive">+</span>
                <span v-else>-</span>
            </span>
            <span class="amount" slot="amount">
                <i18n-n :value="balanceDisplay" format="crypto">
                    <template v-slot:decimal="slotProps">
                        <span class="is-decimal">{{ slotProps.decimal }}</span>
                    </template>
                    <template v-slot:fraction="slotProps">
                        <span class="is-fraction">{{ slotProps.fraction }}</span>
                    </template>
                </i18n-n>
            </span>
        </i18n>
        <span v-else>-</span>
    </div>
</template>

<script lang="ts">
    import {Component, PropSync, Vue} from 'vue-property-decorator';

    @Component({})
    export default class BalanceHistory extends Vue {
        @PropSync('type')
        public readonly syncedType!: string;
        @PropSync('balance')
        public readonly syncedBalance!: number;
        @PropSync('history')
        public readonly syncedBalanceHistory!: { [key: string]: number };

        get balanceDifference(): number {
            if (isNaN(this.syncedBalanceHistory[this.syncedType])) {
                return 0;
            }

            return this.syncedBalance - this.syncedBalanceHistory[this.syncedType];
        }

        get isPositive():boolean {
            return this.balanceDifference > 0;
        }

        get balanceDisplay(): number {
            return Math.abs(this.balanceDifference);
        }
    }
</script>

<style lang="sass" scoped>
    @import "~bulma/sass/utilities/initial-variables"

    .pos
        color: $green

    .neg
        color: $red

    .is-decimal, .is-fraction
        display: none
</style>
