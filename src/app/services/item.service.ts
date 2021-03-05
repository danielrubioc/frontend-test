import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
 


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private searchUrl = 'http://localhost:8000/api/items';  // URL to web api

  constructor(private http: HttpClient) { } 
  /** GET items from the server */
  getItems(params: string = '?q=') { 
    return this.http.get( this.searchUrl + params);
  }

  getItemById(id:any){
    return this.http.get( this.searchUrl+'/'+id); 
  }
}
