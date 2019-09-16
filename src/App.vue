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
                <p>&copy; {{year}} Ellaism Community Developers.<br/>
                    <small class="has-text-grey">{{`Cinder v${version}`}}<br/>
                        <a href="https://github.com/majordutch/Cinder" rel="nofollow">
                            <b-icon pack="fab" icon="fa-github"/>
                        </a></small></p>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import MainNav from '@/components/MainNav.vue';
import VersionInfo from './VersionInfo';

@Component({
    components: {
        MainNav,
    },
})
export default class App extends Vue {

    get version(): string {
        return VersionInfo.Version;
    }

    get year(): string {
        return new Date().getFullYear().toString();
    }
}
</script>

<style>
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
