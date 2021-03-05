import { Injectable } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';   
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class RouteResolverItems implements Resolve<any> {
   constructor(
      public itemService: ItemService,
      private route: ActivatedRoute,
      private router: Router,
   ) { }

   resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    let query_srt:string = '';     
 
    if ( 'search' in route.queryParams) { 
        query_srt += '?q=' + route.queryParams['search'];
        if(route.queryParams['search'].startsWith('MLA')){
            this.router.navigateByUrl('items/'+ route.queryParams['search']);
        }
    } else { 
        query_srt = Object.keys(route.queryParams).map(key => `?${key}=${route.queryParams[key]}`).join('&');
    } 
    
    return this.itemService.getItems(query_srt).pipe(
        catchError((error) => {
           return of('No data');
        })
    )
    
   } 
} 