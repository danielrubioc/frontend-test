import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListItemComponent } from './components/items/list-item/list-item.component';
import { DetailItemComponent } from './components/items/detail-item/detail-item.component';
 
@NgModule({
  declarations: [
    AppComponent, 
    ListItemComponent,
    DetailItemComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
