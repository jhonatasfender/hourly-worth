export interface Currency {
  code: string;
  name: string;
  locale: string;
}

export const currencies: Currency[] = [
  { code: 'BRL', name: 'Real Brasileiro (R$)', locale: 'pt-BR' },
  { code: 'USD', name: 'Dólar Americano ($)', locale: 'en-US' },
  { code: 'EUR', name: 'Euro (€)', locale: 'de-DE' },
  { code: 'GBP', name: 'Libra Esterlina (£)', locale: 'en-GB' },
  { code: 'JPY', name: 'Iene Japonês (¥)', locale: 'ja-JP' },
]; 