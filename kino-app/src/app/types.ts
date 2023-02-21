export interface Movie {
    id: number,
    title: string,
    description: string,
    shortDescription: string,
    imageSource: string,
    viewings: string[],
    premiere: boolean
    score: number[]
}

export interface MoviesFromDb {
    id: number;
    image: string;
    title: string;
    genre: string;
    length: string;
    ageRest: string;
    description: string;
    score: number[];
    director: string;
    actors: string[];
    boxOff: number;
    premiere: boolean;
  }

export interface User {
    id: number,
    userName: string,
    userLastName: string,
    userEmail: string,
    userPassword: string,
    role: "User" | "Admin",
    userPhoneNumber: string,
    userInvoiceDetails: 
      {
        userNIP: string,
        userStreet: string,
        userPostCode: string,
        userCity: string
      }[]
    userWatchlist: []
}

export interface Prices {
    type: string;
    price: number;
  }

export interface Showing {
    id: number;
    hour: string;
    screen: string;
    reservedSeats: string[];
    prices: Prices[];
    filmId: number;
  }

  export interface Screen {
      colu: string[],
      id: number,
      name: string,
      rows: number,
    }

