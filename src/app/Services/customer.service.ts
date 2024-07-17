import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { customer } from '../Models/Customer/customer';
import { createUpdateCustomer } from '../Models/Customer/createUpdateCustomer';
import { customerDetails } from '../Models/Customer/customerDetails';
import { LookUp } from '../Models/LookUp';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'https://localhost:7223/api';


  constructor(private http: HttpClient) {

  }
  getItems(): Observable<customer[]> {
    return this.http.get<customer[]>(`${this.apiUrl}/Customers/GetCustomers`);
  }

  getCustomer(id: number): Observable<customerDetails> {

    return this.http.get<customerDetails>(`${this.apiUrl}/Customers/GetCustomer/${id}`);

  }

  getCustomerForEdit(id: number): Observable<createUpdateCustomer> {

    return this.http.get<createUpdateCustomer>(`${this.apiUrl}/Customers/GetCustomerForEdit/${id}`);


  }


  createCustomer(customer: createUpdateCustomer): Observable<any> {

    return this.http.post<createUpdateCustomer>(`${this.apiUrl}/Customers/CreateCustomer`, customer)
  }

  updateCustomer(id: number, customer: createUpdateCustomer): Observable<any> {

    return this.http.put<createUpdateCustomer>(`${this.apiUrl}/Customers/UpdateCustomer/${id}`, customer);
  }


  deleteCustomer(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/Customers/DeleteCustomer/${id}`);
  }
  getCustomerLookup(): Observable<LookUp[]> {

    return this.http.get<LookUp[]>(`${this.apiUrl}/Customers/GetCustomerLookup`);
  }



}