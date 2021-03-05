import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from "../../../services/item.service";


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass']
})
export class ListItemComponent implements OnInit {
  public queryParam = {};
  public data:any;
  public categories = [];
  items = [];  

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    public ItemService: ItemService
  ) {}

  ngOnInit(): void {  
    this.route.data.subscribe(data => {  
      this.data = data.routeResolver;
      this.categories = data.routeResolver.categories; 
      this.items = data.routeResolver.items;
    }); 
  } 
}
