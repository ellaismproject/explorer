<template>
    <div v-if="isLoading">
        <PageLoader/>
    </div>
    <div v-else-if="block !== null" class="block-page">
        <h1 class="title is-4 is-spaced">Block Height <small class="has-text-grey">{{`#${block.blockNumber}`}}</small></h1>
        <BlockDetail :block="block" />
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import BlockDetail from '@/components/BlockDetail.vue';
import PageLoader from '@/components/PageLoader.vue';
import Block from '@/models/Block';
import CinderApiService from '@/services/CinderApiService';
import Transaction from '@/models/Transaction';
import store from '@/Store';
import {mapState} from 'vuex';

@Component({
    components: {
        BlockDetail,
        PageLoader,
    },
    computed: mapState([
        'isLoading',
    ]),
})
export default class BlockPage extends Vue {
    public isLoading!: boolean;
    public block: Block | null = null;
    private api = new CinderApiService();

    @Watch('$route.params.hash')
    public async pageNavigated(blockNumber: string) {
        await this.getBlockAndTransactions(blockNumber);
    }

    public async created() {
        await this.getBlockAndTransactions(this.$route.params.blockNumber);
    }

    private async getBlockAndTransactions(blockNumber: string): Promise<void> {
        store.commit('toggleLoader', true);
        await this.getBlock(blockNumber);
        store.commit('toggleLoader', false);
    }

    private async getBlock(blockNumber: string): Promise<void> {
        try {
            this.block = await this.api.getBlockByNumber(blockNumber);
        } catch (e) {
            if (e!.response!.status === 204) {
                await this.$router.push('/');
            }
        }
    }
}
</script>
