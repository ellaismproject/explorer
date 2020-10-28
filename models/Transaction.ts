export default class Transaction {
    public blockHash: string | null = null;
    public blockNumber: string | null = null;
    public hash: string | null = null;
    public addressFrom: string | null = null;
    public timestamp: number | null = null;
    public transactionIndex: number | null = null;
    public value: number | null = null;
    public addressTo: string | null = null;
    public gas: string | null = null;
    public gasPrice: string | null = null;
    public input: string | null = null;
    public nonce: string | null = null;
    public failed: boolean = false;
    public receiptHash: string | null = null;
    public gasUsed: string | null = null;
    public cumulativeGasUsed: string | null = null;
    public error: string | null = null;
}
