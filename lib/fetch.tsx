export const fetchSymbols = async (): Promise<TokenApiResponse> => {
  const response = await fetch("https://api.pancakeswap.info/api/v2/tokens");
  return (await response.json()) as TokenApiResponse;
};

// API Price State
export interface PriceApiList {
  /* eslint-disable camelcase */
  [key: string]: {
    name: string;
    symbol: string;
    price: string;
    price_BNB: string;
  };
}

export interface TokenApiResponse {
  /* eslint-disable camelcase */
  updated_at: string;
  data: PriceApiList;
}
