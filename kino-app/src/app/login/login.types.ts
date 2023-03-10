import { Movie } from '../movies/movies.types';

export interface User {
  id: number;
  userName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  role: 'User' | 'Admin';
  userPhoneNumber: string;
  userInvoiceDetails: {
    userNIP: string;
    userStreet: string;
    userPostCode: string;
    userCity: string;
  };
  userWatchlist: Movie[];
}
