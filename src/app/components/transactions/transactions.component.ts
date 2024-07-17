import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Customer } from 'src/app/interfaces/customer';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  transactions: any[] = [];
  transactionChart: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
        this.filteredCustomers = data; // Initially, show all customers
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  filterCustomers(event: any): void {
    const filterValue = event.target.value;
    if (filterValue) {
      this.filteredCustomers = this.customers.filter(customer => customer.name === filterValue);
    } else {
      this.filteredCustomers = this.customers;
    }
  }

  selectCustomer(customer: Customer): void {
    this.dataService.getTransactionsByCustomerId(customer.id).subscribe(
      (data: any[]) => {
        this.transactions = data;
        this.updateChart();
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  updateChart(): void {
    const labelData = this.transactions.map(t => t.date);
    const amountData = this.transactions.map(t => t.amount);

    if (this.transactionChart) {
      this.transactionChart.destroy();
    }

    this.transactionChart = new Chart('transactionChart', {
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [{
          label: 'Transaction Amount',
          data: amountData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
