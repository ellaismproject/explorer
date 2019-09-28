import {SortType} from "@/models/SortType";
<template>
    <div v-if="isLoading">
        <PageLoader/>
    </div>
    <div v-else class="index-page">
        <h1 class="title is-4 is-spaced">{{ $t('page.home.title') }}</h1>
        <BlockList :blocks="blocks"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BlockList from '@/components/BlockList.vue';
import PageLoader from '@/components/PageLoader.vue';
import Block from '@/models/Block';
import CinderApiService from '@/services/CinderApiService';
import {SortType} from '@/models/SortType';
import store from '@/Store';
import {mapState} from 'vuex';

@Component({
    components: {
        BlockList,
        PageLoader,
    },
    computed: mapState([
        'isLoading',
    ]),
})
export default class HomePage extends Vue {
    public isLoading!: boolean;
    public blocks: Block[] | null = null;
    private api = new CinderApiService();

    public async created() {
        store.commit('toggleLoader', true);
        await this.getRecentBlocks();
        store.commit('toggleLoader', false);
    }

    private async getRecentBlocks(): Promise<void> {
        try {
            const data = await this.api.getBlocks(1, 20, SortType.Descending);
            this.blocks = data.items;
        } catch (e) {
        }
    }
}
</script>
