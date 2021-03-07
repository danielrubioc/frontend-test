import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'frontend-test'; 
  childCurrentValue:any;
  categoriesBreadCrumbs:any;
  searchForm = this.formBuilder.group({
    search: ''
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {} 

  onSubmit(): void { 
    this.router.navigate(['items'], {queryParams: {search: this.searchForm.value.search}}); 
  }
}
