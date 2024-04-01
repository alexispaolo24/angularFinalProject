import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrl: './pending-orders.component.scss'
})
export class PendingOrdersComponent {
  pendingOrders: any[] = []

  constructor(private orderService: OrderService){}

  ngOnInit() {
    this.pendingOrders = this.orderService.getPendingOrders()
    console.log(this.pendingOrders)
  }
}
