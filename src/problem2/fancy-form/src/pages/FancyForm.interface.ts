export interface ICurrencyOption {
  label: string;
  value: string;
  icon: string;
}

export interface IToken {
  currency: string;
  price: number;
  date: string;
}

export interface IFancyForm {
  amount: number;
}
