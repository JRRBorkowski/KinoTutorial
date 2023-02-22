import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserOrders } from 'src/app/types';
import { CartService } from './ordered-tickets.service';


@Component({
  selector: 'app-user-orders',
  templateUrl: './ordered-tickets.component.html',
  styleUrls: ['./ordered-tickets.component.scss'],
})

export class OrdersComponent implements OnInit, OnDestroy {
  constructor(
    private service: CartService
  ) {}
  
  private userId = 1;
  private subscriptions = new Subscription();
  userOrders: UserOrders[] = [];

  getOrders() {
    const sub = this.service.getCart(this.userId).subscribe(
      (response) => {
        this.userOrders = response;
      });
    this.subscriptions.add(sub);
  }

  ngOnInit(): void {
    this.service.getCart(this.userId)
}

ngOnDestroy() {
  this.subscriptions.unsubscribe();
}
}