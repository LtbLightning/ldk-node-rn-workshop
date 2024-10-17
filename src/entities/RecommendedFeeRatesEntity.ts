export class RecommendedFeeRatesEntity {
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
  noPriority: number;

  constructor({
    highPriority,
    mediumPriority,
    lowPriority,
    noPriority,
  }: {
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
    noPriority: number;
  }) {
    this.highPriority = highPriority;
    this.mediumPriority = mediumPriority;
    this.lowPriority = lowPriority;
    this.noPriority = noPriority;
  }

  // Optional: If you want a method to compare instances for equality
  equals(other: RecommendedFeeRatesEntity): boolean {
    return (
      this.highPriority === other.highPriority &&
      this.mediumPriority === other.mediumPriority &&
      this.lowPriority === other.lowPriority &&
      this.noPriority === other.noPriority
    );
  }

  // Optional: If you want to log or serialize the object
  toString(): string {
    return `RecommendedFeeRatesEntity(highPriority: ${this.highPriority}, mediumPriority: ${this.mediumPriority}, lowPriority: ${this.lowPriority}, noPriority: ${this.noPriority})`;
  }
}
