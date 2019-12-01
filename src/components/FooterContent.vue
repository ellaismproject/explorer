<template>
    <footer class="footer">
        <div class="footer-bottom">
            <div class="container">
                <div class="level">
                    <div class="level-left">
                        <i18n path="footer.copyright" tag="p">
                            <span slot="symbol">&copy;</span>
                            <span slot="year">{{year}}</span>
                        </i18n>
                    </div>
                    <div class="level-right">
                        <a href="https://stats.ellascout.com">
                            <b-icon pack="fas" icon="circle" size="is-small"/>
                            {{ $t('footer.network_status') }}</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({})
    export default class FooterContent extends Vue {
        get year(): string {
            return new Date().getFullYear().toString();
        }
    }
</script>

<style lang="sass" scoped>
    @import "~bulma/sass/utilities/all"

    .footer
        padding-top: 0

    .footer-bottom
        color: #9D9D9D
        padding: 1.5rem
        background-color: #242424

        a
            color: #9D9D9D

            span.icon
                color: $primary
                width: 1.5rem

    +mobile
        .footer-bottom
            text-align: center
</style>
