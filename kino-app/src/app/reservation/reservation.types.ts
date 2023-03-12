export interface UserOrder {
  id: number;
  userName: string;
  userLastName: string;
  userMail: string;
  discountCode: string;
  userPhoneNumber: string;
  paidAt: string;
  ticket: UserOrderTicket[];
  userId: number;
}

export interface UserOrderTicket {
  id: number;
  showId: number;
  title: string;
  date: string;
  hour: string;
  seat: UserOrderSeat;
}

export interface UserOrderSeat {
  positon: string;
  type: string;
  price: number;
}
