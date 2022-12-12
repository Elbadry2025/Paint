import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PaintComponent } from './paint/paint.component';

import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { SendService } from './Service/send.service';
import { HttpClientModule } from '@angular/common/http';
import { RecieveService } from './Service/recieve.service';


@NgModule({
  declarations: [
    AppComponent,
    PaintComponent
  ],
  imports: [
    BrowserModule,
    MatButtonToggleModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule
  ],
  providers: [
    SendService,
    RecieveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
