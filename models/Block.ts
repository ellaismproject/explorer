export default class Block {
    public blockNumber: string | undefined;
    public hash: string | null = null;
    public parentHash: string | null = null;
    public nonce: string | null = null;
    public extraData: string | null = null;
    public difficulty: string | null = null;
    public totalDifficulty: string | null = null;
    public size: number | null = null;
    public miner: string | null = null;
    public minerDisplay: string | null = null;
    public gasLimit: number | null = null;
    public gasUsed: number | null = null;
    public timestamp: number | null = null;
    public transactionCount: number = 0;
    public uncles: string[] | null = null;
    public uncleCount: number = 0;
    public sha3Uncles: string | null = null;
}
