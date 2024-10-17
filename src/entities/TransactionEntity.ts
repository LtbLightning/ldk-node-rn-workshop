export class TransactionEntity {
  id: string;
  receivedAmountSat: number;
  sentAmountSat: number;
  timestamp: number | null;

  constructor({
    id,
    receivedAmountSat = 0,
    sentAmountSat = 0,
    timestamp,
  }: {
    id: string;
    receivedAmountSat?: number;
    sentAmountSat?: number;
    timestamp: number | null;
  }) {
    this.id = id;
    this.receivedAmountSat = receivedAmountSat;
    this.sentAmountSat = sentAmountSat;
    this.timestamp = timestamp;
  }

  equals(other: TransactionEntity): boolean {
    return (
      this.id === other.id &&
      this.receivedAmountSat === other.receivedAmountSat &&
      this.sentAmountSat === other.sentAmountSat &&
      this.timestamp === other.timestamp
    );
  }

  toString(): string {
    return `TransactionEntity(id: ${this.id}, receivedAmountSat: ${this.receivedAmountSat}, sentAmountSat: ${this.sentAmountSat}, timestamp: ${this.timestamp})`;
  }
}
