import axios, {AxiosInstance} from 'axios';
import Address from '@/models/Address';
import Block from '@/models/Block';
import Transaction from '@/models/Transaction';
import SearchResult from '@/models/SearchResult';
import PagedResult from '@/paging/PagedResult';
import {SortType} from '@/models/SortType';
import Richest from '@/models/Richest';

interface ICallTrackApiService {
    getAddressByHash(hash: string): Promise<Address>;

    getBlockByHash(hash: string): Promise<Block>;

    getBlockByNumber(blockNumber: string): Promise<Block>;

    getBlocks(page: number | null, size: number | null, sort: SortType): Promise<PagedResult<Block>>;

    getTransactions(page: number | null, size: number | null, sort: SortType): Promise<PagedResult<Transaction>>;

    getTransactionByHash(hash: string): Promise<Transaction>;

    getTransactionsByBlockHash(hash: string): Promise<Transaction[]>;

    getTransactionsByAddressHash(hash: string, page: number | null, size: number | null,
                                 sort: SortType): Promise<PagedResult<Transaction>>;

    search(query: string): Promise<SearchResult>;
}

export default class CallTrackApiService implements ICallTrackApiService {
    private baseUrl: string = process.env.VUE_APP_API_URI;
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: this.baseUrl,
            validateStatus: (status) => {
                return status >= 200 && status < 300 && status !== 204;
            },
        });
    }

    public async getAddressByHash(hash: string): Promise<Address> {
        const url: string = `${this.baseUrl}/v1/address/${hash}`;
        const response = await this.client.get(url);

        return response.data;
    }

    public async getBlockByHash(hash: string): Promise<Block> {
        const url: string = `${this.baseUrl}/v1/block/${hash}`;
        const response = await this.client.get(url);

        return response.data;
    }

    public async getBlockByNumber(blockNumber: string): Promise<Block> {
        const url: string = `${this.baseUrl}/v1/block/height/${blockNumber}`;
        const response = await this.client.get(url);

        return response.data;
    }

    public async getBlocks(page: number | null, size: number | null,
                           sort: SortType = SortType.Ascending): Promise<PagedResult<Block>> {
        const url: string = `${this.baseUrl}/v1/block?page=${page}&size=${size}&sort=${sort}`;
        const response = await this.client.get(url);

        return response.data;
    }

    public async getTransactions(page: number | null, size: number | null,
                                 sort: SortType = SortType.Ascending): Promise<PagedResult<Transaction>> {
        const url: string = `${this.baseUrl}/v1/transaction?page=${page}&size=${size}&sort=${sort}`;
        const response = await this.client.get(url);

        return response.data;
    }

    public async getTransactionByHash(hash: string): Promise<Transaction> {
        const url: string = `${this.baseUrl}/v1/transaction/${hash}`;
        const response = await this.client.get(url);

        return response.data;
    }

    public async getTransactionsByBlockHash(hash: string): Promise<Transaction[]> {
        const url: string = `${this.baseUrl}/v1/transaction/block/${hash}`;
        const response = await this.client.get(url);

        return response.data;
    }

    public async getTransactionsByAddressHash(hash: string, page: number | null, size: number | null,
                                              sort: SortType = SortType.Ascending): Promise<PagedResult<Transaction>> {
        const url: string = `${this.baseUrl}/v1/transaction/address/${hash}?page=${page}&size=${size}&sort=${sort}`;
        const response = await this.client.get(url);

        return response.data;
    }

    public async search(query: string): Promise<SearchResult> {
        const url: string = `${this.baseUrl}/v1/search?query=${query}`;
        const response = await this.client.get(url);

        return response.data;
    }

    public async getRichest(page: number | null, size: number | null): Promise<PagedResult<Richest>> {
        const url: string = `${this.baseUrl}/v1/stats/richest?page=${page}&size=${size}`;
        const response = await this.client.get(url);

        return response.data;
    }
}
