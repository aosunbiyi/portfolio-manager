import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CurrencyPipe } from '@angular/common';


import { AppComponent } from './app.component';
import { AccountService } from './services/account.service';
import { InvestmentsComponent } from './investments/investments.component';
import { TickerComponent } from './ticker/ticker.component';
import { StocksComponent } from './stocks/stocks.component';
import { AlertComponent } from './alert/alert.component';

import { LocalStorageService } from "./services/local-storage.service";
import { StocksInterceptor } from "./services/interceptor.service";
import { AlertService } from "./services/alert.service";
import { StocksService } from "./services/stocks.service";

@NgModule({
  declarations: [
    AppComponent,
    InvestmentsComponent,
    TickerComponent,
    StocksComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    HttpClientModule
  ],
  providers: [
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StocksInterceptor,
      multi: true
    },
    LocalStorageService,
    CurrencyPipe,
    AlertService,
    StocksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
