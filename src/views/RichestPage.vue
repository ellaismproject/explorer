import {SortType} from "@/models/SortType";
<template>
    <div class="page richest-page">
        <b-loading :is-full-page="false" :active.sync="isLoading"/>
        <h1 class="title is-4 is-spaced">{{ $t('page.richest.title') }}</h1>
        <b-table class="is-striped is-hoverable is-fullwidth" :data="addresses" paginated backend-pagination
                 @page-change="onPageChange" :total="total" :per-page="perPage" icon-pack="fas">
            <template slot-scope="props">
                <b-table-column field="rank" label="Rank">
                    {{ props.row.rank }}
                </b-table-column>
                <b-table-column field="hash" label="Address">
                    <router-link :to="{ name: 'address', params: { hash: props.row.hash }}">{{ props.row.hash }}
                    </router-link>
                </b-table-column>
                <b-table-column field="balance" label="Balance">
                    {{ props.row.balance }}
                </b-table-column>
            </template>
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon pack="fas" icon="coins" size="is-large"/>
                        </p>
                        <p>No addresses found.</p>
                    </div>
                </section>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CinderApiService from '@/services/CinderApiService';
    import Richest from '@/models/Richest';
    import {MetaInfo} from 'vue-meta';

    @Component({
        metaInfo(): MetaInfo {
            return {
                title: this.$t('page.richest.meta_title').toString(),
                titleTemplate: this.$t('page.richest.meta_title_template').toString(),
            };
        },
    })
    export default class RichestPage extends Vue {
        public currentPage: number = 1;
        public perPage: number = 100;
        public total: number = 0;
        public addresses: Richest[] = [];
        public isLoading: boolean = false;
        private api = new CinderApiService();

        public async created() {
            this.isLoading = true;
            await this.getRichest();
            this.isLoading = false;
        }

        public async onPageChange(page: number) {
            this.isLoading = true;
            this.currentPage = page;
            await this.getRichest();
            this.isLoading = false;
        }

        private async getRichest(): Promise<void> {
            try {
                const data = await this.api.getRichest(this.currentPage, this.perPage);
                this.total = data.total;
                this.addresses = data.items;
            } catch (e) {
            }
        }
    }
</script>
