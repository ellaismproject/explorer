import {SortType} from "@/models/SortType";
<template>
    <div class="home-page">
        <h1 class="title is-4 is-spaced">{{ $t('page.home.title') }}</h1>
        <b-table class="is-striped is-hoverable is-fullwidth" :data="blocks" paginated backend-pagination
                 @page-change="onPageChange" :total="total" :per-page="perPage" icon-pack="fas" :loading="isLoading">
            <template slot-scope="props">
                <b-table-column field="blockNumber" label="Height">
                    <router-link :to="{ name: 'block', params: { hash: props.row.hash }}">{{ props.row.blockNumber }}
                    </router-link>
                </b-table-column>
                <b-table-column field="miner" label="Relayed By">
                    <router-link :to="{ name: 'address', params: { hash: props.row.miner }}">
                        {{ props.row.minerDisplay || 'Unknown' }}
                    </router-link>
                </b-table-column>
                <b-table-column field="timestamp" label="Age">
                    {{ moment.unix(props.row.timestamp).fromNow() }}
                </b-table-column>
                <b-table-column field="transactionCount" label="Transactions" numeric>
                    {{ props.row.transactionCount }}
                </b-table-column>
                <b-table-column field="size" label="Size" numeric>
                    {{ props.row.size }}
                </b-table-column>
                <b-table-column field="hash" label="Block Hash">
                    <router-link :to="{ name: 'block', params: { hash: props.row.hash }}"
                                 class="is-extra-large-hash text-truncate">{{ props.row.hash }}
                    </router-link>
                </b-table-column>
            </template>
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon pack="fas" icon="cubes" size="is-large"/>
                        </p>
                        <p>No blocks found.</p>
                    </div>
                </section>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Block from '@/models/Block';
    import CinderApiService from '@/services/CinderApiService';
    import {SortType} from '@/models/SortType';

    @Component({})
    export default class HomePage extends Vue {
        public currentPage: number = 1;
        public perPage: number = 20;
        public total: number = 0;
        public blocks: Block[] = [];
        public isLoading: boolean = false;
        private api = new CinderApiService();

        public async created() {
            this.isLoading = true;
            await this.getRecentBlocks();
            this.isLoading = false;
        }

        public async onPageChange(page: number) {
            this.isLoading = true;
            this.currentPage = page;
            await this.getRecentBlocks();
            this.isLoading = false;
        }

        private async getRecentBlocks(): Promise<void> {
            try {
                const data = await this.api.getBlocks(this.currentPage, this.perPage, SortType.Descending);
                this.total = data.total < 1000 ? data.total : 1000;
                this.blocks = data.items;
            } catch (e) {
            }
        }
    }
</script>
