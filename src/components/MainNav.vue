<template>
    <b-navbar type="is-dark" fixed-top wrapper-class="container">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ name: 'home' }">
                <img src="../assets/logo.png" v-bind:alt="$t('navigation.ellaism')"/>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{ name: 'home' }">
                {{ $t('navigation.latest_blocks') }}
            </b-navbar-item>
            <b-navbar-dropdown v-bind:label="$t('navigation.stats')">
                <b-navbar-item tag="router-link" :to="{ name: 'richest' }">
                    <span>
                        <b-icon pack="fas" icon="coins"></b-icon>
                        {{ $t('navigation.stats_subnav.richest') }}
                    </span>
                </b-navbar-item>
            </b-navbar-dropdown>
            <b-navbar-dropdown v-bind:label="$t('navigation.community')">
                <b-navbar-item tag="div">
                    <strong>{{ $t('navigation.community_subnav.official') }}</strong>
                </b-navbar-item>
                <b-navbar-item href="https://ellaism.io">
                    <span>
                        <b-icon pack="fas" icon="globe"></b-icon>
                        {{ $t('navigation.community_subnav.website') }}
                    </span>
                </b-navbar-item>
                <b-navbar-item href="https://github.com/ellaism" rel="nofollow">
                    <span>
                        <b-icon pack="fab" icon="github"></b-icon>
                        {{ $t('navigation.community_subnav.github') }}
                    </span>
                </b-navbar-item>
                <hr class="dropdown-divider">
                <b-navbar-item tag="div">
                    <strong>{{ $t('navigation.community_subnav.community') }}</strong>
                </b-navbar-item>
                <b-navbar-item href="https://discordapp.com/invite/gz9tURY" rel="nofollow">
                    <span>
                        <b-icon pack="fab" icon="discord"></b-icon>
                        {{ $t('navigation.community_subnav.discord') }}
                    </span>
                </b-navbar-item>
                <b-navbar-item href="https://www.reddit.com/r/ellaism/" rel="nofollow">
                    <span>
                        <b-icon pack="fab" icon="reddit"></b-icon>
                        {{ $t('navigation.community_subnav.reddit') }}
                    </span>
                </b-navbar-item>
                <b-navbar-item href="https://t.me/ellaismcoin" rel="nofollow">
                    <span>
                        <b-icon pack="fab" icon="telegram"></b-icon>
                        {{ $t('navigation.community_subnav.telegram') }}
                    </span>
                </b-navbar-item>
                <b-navbar-item href="https://twitter.com/EllaismCore" rel="nofollow">
                    <span>
                        <b-icon pack="fab" icon="twitter"></b-icon>
                        {{ $t('navigation.community_subnav.twitter') }}
                    </span>
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
        <template slot="end">
            <b-navbar-item tag="div">
                <MainNavSearch/>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import MainNavSearch from '@/components/MainNavSearch.vue';

@Component({
    components: {
        MainNavSearch,
    },
})
export default class MainNav extends Vue {
}
</script>

<style scoped>
    .navbar.is-dark .navbar-brand > a.navbar-item:focus,
    .navbar.is-dark .navbar-brand > a.navbar-item:hover,
    .navbar.is-dark .navbar-brand > a.navbar-item.is-active {
        background-color: transparent !important;
    }

    .navbar a.navbar-item .icon {
        margin-right: 0.5rem;
    }
</style>
