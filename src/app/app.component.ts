import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'frontend-test'; 
  childCurrentValue:any;
  categoriesBreadCrumbs:any;

  onActivate(selected:any) { 
    selected.categoriesToParent.subscribe((data:any) => { 
      this.categoriesBreadCrumbs = data;
    })
  }


}
