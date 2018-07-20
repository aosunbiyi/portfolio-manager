import { Component, OnInit, DoCheck } from '@angular/core';
import { AccountService } from "../services/account.service";

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit, DoCheck {

  cost: number;
  value: number;
  change: number;
  stocks: any = [];

  ngDoCheck(): void {
    if (this.accountService.stocks.length !== this.stocks.lenght) {
      this.stocks = this.accountService.stocks;
    }
    if (this.cost !== this.accountService.cost || this.value !== this.accountService.value) {
      this.cost = this.accountService.cost;
      this.value = this.accountService.value;
      this.change = this.accountService.value - this.accountService.cost;
    }
  }

  sell(index): void{
     this.accountService.sell(index);
  }

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

}
