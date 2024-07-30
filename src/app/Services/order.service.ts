import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Models/Order/order';
import { Observable } from 'rxjs';
import { OrderDetails } from '../Models/Order/orderDetails';
import { createUpdateOrder } from '../Models/Order/createUpdateOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://localhost:7223/api';


  constructor(private http: HttpClient) {

  }
  getItems(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/Orders/GetOrders`);
  }

  getOrder(id: number): Observable<OrderDetails> {

    return this.http.get<OrderDetails>(`${this.apiUrl}/Orders/GetOrder/${id}`);

  }

  getOrderForEdit(id: number): Observable<createUpdateOrder> {

    return this.http.get<createUpdateOrder>(`${this.apiUrl}/Orders/GetOrderForEdit/${id}`);


  }


  createOrder(order: createUpdateOrder): Observable<any> {

    return this.http.post<createUpdateOrder>(`${this.apiUrl}/Orders/CreateOrder`, order)
  }

  updateOrder(id: number, order: createUpdateOrder): Observable<any> {

    return this.http.put<createUpdateOrder>(`${this.apiUrl}/Orders/EditOrder/${id}`, order);
  }


  deleteOrder(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/Orders/DeleteOrder/${id}`);
  }

}
