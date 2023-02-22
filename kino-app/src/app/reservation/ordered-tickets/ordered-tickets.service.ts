import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserOrders } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders(id : number) {
    return this.http.get<UserOrders[]>(`http://localhost:3000/users/${id}/orders`);
  }
}
