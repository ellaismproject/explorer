export default class Address {
    public hash: string | null = null;
    public name: string | null = null;
    public website: string | null = null;
    public tags: string[] | null = null;
    public balance: number | null = null;
    public blocksMined: number | null = null;
    public transactionCount: number | null = null;
    public timestamp: number | null = null;
    public balanceHistory: { [key: string]: number } | null = null;
}
