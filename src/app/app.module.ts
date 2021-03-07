import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListItemComponent } from './modules/items/list-item/list-item.component';
import { DetailItemComponent } from './modules/items/detail-item/detail-item.component';
  
@NgModule({
  declarations: [
    AppComponent, 
    ListItemComponent,
    DetailItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [  
    CommonModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
