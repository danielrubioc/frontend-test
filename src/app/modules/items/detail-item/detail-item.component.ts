import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from "../../../services/item.service";

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.sass']
})
export class DetailItemComponent implements OnInit {
  public queryParam = {};
  public data:any;
  public categories:any;
  public item = {
    "picture" : "",
    "description": "",
    "condition": "",
    "sold_quantity": 0,
    "title": "",
    "amount": 0
  };

  constructor( 
    private route: ActivatedRoute,
    public ItemService: ItemService
  ) {}

  ngOnInit(): void {   
    this.route.data.subscribe(data => { 
      this.item.picture = data.routeResolver.item.picture;
      this.item.description = data.routeResolver.item.description;
      this.item.title = data.routeResolver.item.title;
      this.item.sold_quantity = data.routeResolver.item.sold_quantity;
      this.item.amount = data.routeResolver.item.amount; 
      this.item.condition = data.routeResolver.item.condition;
      this.categories = data.routeResolver.categories; 
    });
  } 
}
