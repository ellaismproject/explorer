<template>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link :to="{ name: 'home'}" class="navbar-item">
                    <img src="../assets/logo.png" alt="Ellaism"/>
                </router-link>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarMainNav">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarMainNav" class="navbar-menu">
                <div class="navbar-start">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">Community</a>
                        <div class="navbar-dropdown">
                            <a href="https://ellaism.io/" class="navbar-item">Ellaism Website</a>
                            <a href="https://github.com/ellaism" rel="nofollow" class="navbar-item">Ellaism GitHub</a>
                            <hr class="dropdown-divider">
                            <a href="https://discordapp.com/invite/gz9tURY" rel="nofollow"
                               class="navbar-item">Discord</a>
                            <a href="https://t.me/ellaismcoin" rel="nofollow" class="navbar-item">Telegram</a>
                            <a href="https://twitter.com/EllaismCore" rel="nofollow" class="navbar-item">Twitter</a>
                        </div>
                    </div>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <MainNavSearch/>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import MainNavSearch from '@/components/MainNavSearch.vue';

@Component({
    components: {
        MainNavSearch,
    },
})
export default class MainNav extends Vue {
}
</script>
