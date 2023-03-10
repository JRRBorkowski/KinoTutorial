export interface Movie {
  id: number;
  image: string;
  title: string;
  genre: string;
  length: string;
  ageRest: string;
  description: string;
  scores: Score[];
  director: string;
  actors: string[];
  boxOff: number;
  premiere: boolean;
  dateIds: number[];
}

export interface Score {
  userId: number;
  score: number;
}

export interface Showing {
  id: number;
  hour: string;
  screen: string;
  reservedSeats: string[];
  priceList: Price[];
  movieId: number;
}

export interface Screen {
  colu: string[];
  id: number;
  name: string;
  rows: number;
}

export interface DbDate {
  id: number;
  date: string;
}

export interface Price {
  type: string;
  price: number;
}
