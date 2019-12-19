<template>
    <div v-if="syncedBlocks !== null" class="table-container">
        <b-table class="is-striped is-hoverable is-fullwidth" :data="syncedBlocks">
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
                        <p>No blocks found.</p>
                    </div>
                </section>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, PropSync} from 'vue-property-decorator';
    import Block from '@/models/Block';

    @Component({})
    export default class BlockList extends Vue {
        @PropSync('blocks')
        public readonly syncedBlocks?: Block[];
    }
</script>
