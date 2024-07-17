import { Component } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  customers: Customer[] = [];
  constructor(private dataService: DataService) { }
  ngOnInit(): void {
    this.dataService.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;

    });
  }

}
