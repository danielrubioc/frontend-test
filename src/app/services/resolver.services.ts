import { Injectable } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 


import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class RouteResolver implements Resolve<any> {
   constructor(
      public itemService: ItemService,
      private route: ActivatedRoute,
   ) { }

   resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
      return this.itemService.getItemById(route.params.id).pipe(
         catchError((error) => {
            return of('No data');
         })
      )
   } 
} 