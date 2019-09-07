export default class PagedResult<T> {
    public items: T[] = [];
    public page: number = 0;
    public size: number = 0;
    public total: number = 0;
}
