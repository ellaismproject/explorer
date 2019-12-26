<template>
    <div class="page block-height-page">
        <b-loading :is-full-page="false" :active.sync="isLoading"/>
        <div v-if="block !== null">
            <i18n path="page.block_height.title" tag="h1" class="title is-4 is-spaced">
                <small slot="blockNumber" class="has-text-grey">{{`#${block.blockNumber}`}}</small>
            </i18n>
            <BlockDetail :block="block"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import BlockDetail from '@/components/BlockDetail.vue';
    import Block from '@/models/Block';
    import CinderApiService from '@/services/CinderApiService';
    import {MetaInfo} from 'vue-meta';

    @Component<BlockPage>({
        components: {
            BlockDetail,
        },
        metaInfo(): MetaInfo {
            return {
                title: this.block !== null
                    ? `${this.$t('page.block_height.meta_title')} #${this.block.blockNumber}`
                    : undefined,
                titleTemplate: undefined,
            };
        },
    })
    export default class BlockPage extends Vue {
        public block: Block | null = null;
        public isLoading: boolean = false;
        private api = new CinderApiService();

        @Watch('$route.params.hash')
        public async pageNavigated(blockNumber: string) {
            this.isLoading = true;
            await this.getBlock(blockNumber);
            this.isLoading = false;
        }

        public async created() {
            this.isLoading = true;
            await this.getBlock(this.$route.params.blockNumber);
            this.isLoading = false;
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
