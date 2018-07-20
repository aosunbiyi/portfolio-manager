import { Injectable } from '@angular/core';
import { Stock } from './stocks.model';
import { LocalStorageService } from "./local-storage.service";
import { AlertService } from "./alert.service";
import { CurrencyPipe } from "@angular/common";

const defaultBalance = 10000;


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _balance = defaultBalance;
  private _cost = 0;
  private _value = 0;
  private _stocks: Stock[] = [];

  get balance(): number { return this._balance; }
  get cost(): number { return this._cost; }
  get value(): number { return this._value; }
  get stocks(): Stock[] { return this._stocks; }

  constructor(private localStorageService: LocalStorageService,
    private alertService: AlertService,
    private currencyPipe: CurrencyPipe) { }

  init() {
    this._stocks = this.localStorageService.get('stocks', []);
    this._balance = this.localStorageService.get('balance', defaultBalance);
    this._cost = this.localStorageService.get('cost', 0);
  }

  private cacheValues() {
    this.localStorageService.set('stocks', this.stocks);
    this.localStorageService.set('balance', this.balance);
    this.localStorageService.set('cost', this.cost);
  }

  purchase(stock: Stock): void {
    stock = Object.assign({}, stock);
    if (stock.price < this.balance) {
      this._balance = this.debit(stock.price, this.balance);
      stock.cost = stock.price;
      this._cost = this.credit(stock.price, this.cost);
      stock.change = 0;
      this._stocks.push(stock);
      this.calculateValue();
      this.cacheValues();
      this.alertService.alert(`You bought ${stock.symbol} for `+ this.currencyPipe.transform(stock.price,'USD',true,'.2'), 'success');
    } else {
      this.alertService.alert(`You have insufficient fund to buy `+ this.currencyPipe.transform(stock.price,'USD',true,'.2'), 'danger');
    }
  }

  sell(index: number): void {
    const stock = this.stocks[index];
    if (stock) {
      this._balance = this.credit(stock.price, this.balance);
      this.stocks.splice(index, 1);
      this._cost = this.debit(stock.cost, this.cost);
      this.calculateValue();
      this.cacheValues();
      this.alertService.alert(`You sold ${stock.symbol} for $${stock.price}`, 'success');
    }
    else {
      this.alertService.alert(`You do not own the ${stock.symbol} stock.`, 'danger');
    }

  }

  private debit(amount: number, balance: number): number {
    return (this.convertToPercent(balance) - this.convertToPercent(amount)) / 100;
  }

  private credit(amount: number, balance: number): number {
    return (this.convertToPercent(balance) - this.convertToPercent(amount)) / 100;
  }

  private convertToPercent(value: number): number {
    return value * 100;
  }

  reset() {
    this._stocks = [];
    this._balance = defaultBalance;
    this._value = this._cost = 0;
    this.cacheValues();
  }


  calculateValue() {
    // tslint:disable-next-line:arrow-return-shorthand
    this._value = this.stocks.map(stock => stock.price).reduce((a, b) => { return a + b; }, 0);
  }



}
