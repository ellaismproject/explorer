<template>
    <div class="page maintenance-page">
        <section class="hero is-fullheight-with-navbar">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                        {{ $t('page.maintenance.title') }}
                    </h1>
                    <h2 class="subtitle">
                        {{ $t('page.maintenance.sub_title') }}
                    </h2>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        metaInfo() {
            return {
                title: this.$t('page.maintenance.meta_title').toString(),
            };
        },
    })
    export default class MaintenancePage extends Vue {
    }
</script>
