import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-successpage',
  templateUrl: './successpage.component.html',
  styleUrls: ['./successpage.component.scss'],
})
export class SuccesspageComponent implements OnInit {
  orderId?: string | null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId');
  }
}
