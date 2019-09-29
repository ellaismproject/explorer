<template>
    <div id="app">
        <header>
            <MainNav/>
        </header>

        <section class="section">
            <div class="container">
                <router-view/>
            </div>
        </section>

        <footer class="footer">
            <div class="content has-text-centered">
                <p>&copy; {{ `${appYear} ${$t('ellaism')}` }}</p>
                <p class="has-text-grey" style="max-width: 560px; margin: 0 auto;">{{ $t('footer_message') }}</p>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import MainNav from '@/components/MainNav.vue';
import VersionInfo from '@/VersionInfo';
import {MetaInfo} from 'vue-meta';

@Component({
    components: {
        MainNav,
    },
    metaInfo(): MetaInfo {
        return {
            title: 'Blockchain Explorer',
            titleTemplate: '%s | Search the Ellaism Blockchain',
        };
    },
})
export default class App extends Vue {
    get appVersion(): string {
        return VersionInfo.Version;
    }

    get appYear(): string {
        return new Date().getFullYear().toString();
    }
}
</script>

<style>
    body {
        cursor: default;
    }

    .text-truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .is-medium-hash {
        display: inline-block;
        max-width: 220px;
    }

    .is-large-hash {
        display: inline-block;
        max-width: 320px;
    }

    .is-extra-large-hash {
        display: inline-block;
        max-width: 420px;
    }

    .is-no-wrap {
        white-space: nowrap;
    }
</style>
