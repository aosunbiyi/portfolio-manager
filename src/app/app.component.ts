import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from './services/account.service';
import { Stock } from "./services/stocks.model";
import { StocksService } from "./services/stocks.service";
import { AlertService } from "./services/alert.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StocksService]
})
export class AppComponent implements OnInit, OnDestroy {
  refresh: boolean = true;
  stocks: Stock[] = [];
  interval: any;



  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.accountService.init();
    this.load();
    this.interval = setInterval(() => {
      if (this.refresh) {
        this.load();
      }
    }, 15000);
  }
  constructor(private accountService: AccountService, private stockService: StocksService, private alertService: AlertService) {
    this.accountService.reset();
    
  }
  toggleRefresh(): void {
    this.refresh = !this.refresh;
    let onOff = (this.refresh) ? 'on' : 'off';
    this.alertService.alert(`You have turned automatic refresh ${onOff}`,'info',0);
  }

  reset(): void {
    this.accountService.reset();
    this.alertService.alert(`You have reset your portfolio!`);
  }

  private load(): void {
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    }, error => {
      console.error(`There was an error loading stocks: ${error}`);
    });

  }

}
