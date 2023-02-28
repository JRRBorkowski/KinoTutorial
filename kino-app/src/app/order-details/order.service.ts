import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserOrder } from '../types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  getOrderDetails(orderId: number) {
    return this.http.get<UserOrder>(`http://localhost:3000/orders/${orderId}`);
  }

  postOrderDetails(data: UserOrder) {
    return this.http.post<UserOrder>('http://localhost:3000/orders/', data);
  }

  constructor(private http: HttpClient) {}
}
