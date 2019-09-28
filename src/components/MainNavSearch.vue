<template>
    <div class="field has-addons">
        <div class="control">
            <input v-model="query" class="input" type="text" v-bind:placeholder="$t('navigation.search.placeholder')"/>
        </div>
        <div class="control">
            <button class="button is-light" :class="{ 'is-loading': isLoading }" v-on:click="search">
                {{ $t('navigation.search.button') }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CinderApiService from '@/services/CinderApiService';
import {SearchResultType} from '@/models/SearchResultType';
import SearchResult from '@/models/SearchResult';

@Component({})
export default class MainNavSearch extends Vue {
    public isLoading: boolean = false;
    public isError: boolean = false;
    public query: string = '';
    private api = new CinderApiService();

    public async search() {
        if (this.query.length < 1) {
            return;
        }

        this.isLoading = true;
        let result: SearchResult | null = null;
        try {
             result = await this.api.search(this.query);
        } catch (e) {
            this.isError = true;
        }

        this.query = '';
        this.isLoading = false;

        if (this.isError || result === null) {
            return;
        }

        let url: string | null = null;
        switch (result.type) {
            case SearchResultType.AddressHash:
                url = `/address/${result.id}`;
                break;
            case SearchResultType.BlockHash:
                url = `/block/${result.id}`;
                break;
            case SearchResultType.BlockNumber:
                url = `/block-height/${result.id}`;
                break;
            case SearchResultType.TransactionHash:
                url = `/transaction/${result.id}`;
                break;
            default:
                return;
        }

        await this.$router.push(url);
    }
}
</script>
