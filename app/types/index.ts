export interface TorobProduct {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  link: string;
  description?: string;
  category?: string;
}

export interface SearchResponse {
  results: TorobProduct[];
  total: number;
  page: number;
}
