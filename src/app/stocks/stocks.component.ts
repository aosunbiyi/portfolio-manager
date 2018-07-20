import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from "../services/account.service";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  @Input() stocks: any;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  buy(stock): void {
    this.accountService.purchase(stock);
  }

}
