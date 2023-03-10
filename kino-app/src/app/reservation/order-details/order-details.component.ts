import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './order.service';
import { UserOrder, UserOrderTicket } from '../reservation.types';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  orderDetails?: UserOrder;
  ticket?: UserOrderTicket;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderService.getOrderDetails(params['id']).subscribe((data) => {
        this.orderDetails = data;
      });
    });
  }
}
