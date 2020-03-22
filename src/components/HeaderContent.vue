<template>
    <header>
        <b-navbar class="is-nav" wrapper-class="container">
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ name: 'home' }">
                    <img src="../assets/ellaism-logo-color-name.svg" v-bind:alt="$t('ellaism')"/>
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
                <b-navbar-dropdown v-bind:label="$t('navigation.resource')">
                    <b-navbar-item tag="div">
                        <strong>{{ $t('navigation.resource_subnav.official') }}</strong>
                    </b-navbar-item>
                    <b-navbar-item href="https://ellaism.io">
                    <span>
                        <b-icon pack="fas" icon="globe"></b-icon>
                        {{ $t('navigation.resource_subnav.website') }}
                    </span>
                    </b-navbar-item>
                    <b-navbar-item href="https://stats.ellascout.com">
                    <span>
                        <b-icon pack="fas" icon="heartbeat"/>
                        {{ $t('navigation.resource_subnav.network_status') }}
                    </span>
                    </b-navbar-item>
                    <b-navbar-item href="https://github.com/ellaismproject" rel="nofollow">
                    <span>
                        <b-icon pack="fab" icon="github"></b-icon>
                        {{ $t('navigation.resource_subnav.github') }}
                    </span>
                    </b-navbar-item>
                    <hr class="dropdown-divider">
                    <b-navbar-item tag="div">
                        <strong>{{ $t('navigation.resource_subnav.community') }}</strong>
                    </b-navbar-item>
                    <b-navbar-item href="https://discordapp.com/invite/gz9tURY" rel="nofollow">
                    <span>
                        <b-icon pack="fab" icon="discord"></b-icon>
                        {{ $t('navigation.resource_subnav.discord') }}
                    </span>
                    </b-navbar-item>
                    <b-navbar-item href="https://www.reddit.com/r/ellaism/" rel="nofollow">
                    <span>
                        <b-icon pack="fab" icon="reddit"></b-icon>
                        {{ $t('navigation.resource_subnav.reddit') }}
                    </span>
                    </b-navbar-item>
                    <b-navbar-item href="https://t.me/ellaismproject" rel="nofollow">
                    <span>
                        <b-icon pack="fab" icon="telegram"></b-icon>
                        {{ $t('navigation.resource_subnav.telegram') }}
                    </span>
                    </b-navbar-item>
                    <b-navbar-item href="https://twitter.com/ellacommunity" rel="nofollow">
                    <span>
                        <b-icon pack="fab" icon="twitter"></b-icon>
                        {{ $t('navigation.resource_subnav.twitter') }}
                    </span>
                    </b-navbar-item>
                </b-navbar-dropdown>
            </template>
            <template slot="end" v-if="searchEnabled">
                <b-navbar-item tag="div">
                    <HeaderSearch/>
                </b-navbar-item>
            </template>
        </b-navbar>
    </header>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import LocaleChanger from '@/components/LocaleChanger.vue';
    import HeaderSearch from '@/components/HeaderSearch.vue';

    @Component({
        components: {HeaderSearch, LocaleChanger},
    })
    export default class HeaderContent extends Vue {
        public get searchEnabled() {
            return process.env.VUE_APP_MAINTENANCE_ENABLED !== '1';
        }
    }
</script>

<style>
    .navbar.is-nav .navbar-brand > a.navbar-item:focus,
    .navbar.is-nav .navbar-brand > a.navbar-item:hover,
    .navbar.is-nav .navbar-brand > a.navbar-item.is-active,
    .navbar a.navbar-item.no-highlight:focus,
    .navbar a.navbar-item.no-highlight:hover,
    .navbar a.navbar-item.no-highlight.is-active {
        background-color: transparent !important;
    }

    .navbar a.navbar-item .icon {
        margin-right: 0.5rem;
    }

    .navbar .navbar-start {
        flex-grow: 1;
        justify-content: center;
    }
</style>
