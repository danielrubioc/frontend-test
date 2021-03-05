import { NgModule } from '@angular/core';
// Required services for navigation
import { RouterModule, Routes } from '@angular/router';

// Import all the components for which navigation
import { ListItemComponent } from './modules/items/list-item/list-item.component';
import { DetailItemComponent } from './modules/items/detail-item/detail-item.component'; 

import { RouteResolver } from './resolvers/resolver.by.id.service';
import { RouteResolverItems } from './resolvers/resolver.all.services';


const routes: Routes = [
  {
    path: 'items', 
    component: ListItemComponent,
    resolve:{
      routeResolver: RouteResolverItems
    }
  },
  {
    path: 'items/:id',
    component: DetailItemComponent,
    resolve: {
      routeResolver: RouteResolver
    },
  },
  { 
    path: '**', 
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteResolver,RouteResolverItems]
})
export class AppRoutingModule { }
