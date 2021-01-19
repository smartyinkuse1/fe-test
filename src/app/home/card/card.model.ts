export interface Card {
  id?: number;
  number: string;
  holder: string;
  expiry: Date;
  cvv?: string;
  amount: number;
}
