import { NgModule } from '@angular/core';
// Required services for navigation
import { RouterModule, Routes } from '@angular/router';

// Import all the components for which navigation
import { ListItemComponent } from './components/items/list-item/list-item.component';
import { DetailItemComponent } from './components/items/detail-item/detail-item.component'; 


const routes: Routes = [
  {
    path: 'items', 
    component: ListItemComponent
  },
  {
    path: 'items/:id',
    component: DetailItemComponent
  },
  { 
    path: '**', 
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
