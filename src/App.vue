<template>
    <div id="app">
        <HeaderContent/>

        <section class="section">
            <div class="container">
                <router-view/>
            </div>
        </section>

        <FooterContent/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import VersionInfo from '@/VersionInfo';
    import {MetaInfo} from 'vue-meta';
    import FooterContent from '@/components/FooterContent.vue';
    import HeaderContent from '@/components/HeaderContent.vue';

    @Component({
        components: {
            HeaderContent,
            FooterContent,
        },
        metaInfo(): MetaInfo {
            return {
                title: 'Blockchain Explorer',
                titleTemplate: '%s | Search the Ellaism Blockchain',
            };
        },
    })
    export default class App extends Vue {
    }
</script>

<style lang="sass">
    @import "~bulma/sass/utilities/initial-variables"
    @import "~bulma/sass/utilities/functions"

    $link: #3D996F

    $footer-background-color: #313131
    $footer-padding: 3rem 0 0

    $ella: #3D996F
    $ella-invert: findColorInvert($ella)

    @import "~bulma/sass/utilities/derived-variables"
    $addColors: ("ella":($ella, $ella-invert))
    $colors: map-merge($colors, $addColors)

    $navbar-item-img-max-height: 2.25rem

    @import "~bulma"
    @import "~buefy/src/scss/buefy"

    body
        cursor: default

    .text-truncate
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap

    .is-medium-hash
        display: inline-block
        max-width: 220px

    .is-large-hash
        display: inline-block
        max-width: 320px

    .is-extra-large-hash
        display: inline-block
        max-width: 420px

    .is-no-wrap
        white-space: nowrap

    #app section.section, #app section.section .page
        min-height: 100vh
</style>
