export default class Richest {
    public rank: number | null = null;
    public name: string | null = null;
    public tags: string[] | null = null;
    public hash: string | null = null;
    public balance: number | null = null;
    public balanceHistory: { [key: string]: number } | null = null;
}
