import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
 


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private searchUrl = 'http://localhost:8000/api/items';  // URL to web api

  constructor(private http: HttpClient) { }

  /*getItems(){
    let items = {}; 
    this.http.get('https://api.mercadolibre.com/sites/MLA/search?q=:query').subscribe((response: any) => {  
        this.items = response.results;
        
    });
  
    getItems(params: string = '?q=') {
      return this.http.get('https://api.mercadolibre.com/sites/MLA/search'+ params).subscribe((response) => {  
        console.log(response);
      });
    }

    getItems() {
      this.http.get('https://api.mercadolibre.com/sites/MLA/search?q=:query');
    }

  }*/


  /** GET items from the server */
  getItems(params: string = '?q=') { 
    return this.http.get( this.searchUrl + params);
  }

  getItemById(id:Number){
    return this.http.get( this.searchUrl+'/'+id); 
  }
}
