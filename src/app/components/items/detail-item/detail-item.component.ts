import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ItemService } from "../../../services/item.service";

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.sass']
})
export class DetailItemComponent implements OnInit {
  public queryParam = {};
  public data:any;
  categories = [];
  item = [];

  constructor( 
    private route: ActivatedRoute,
    public ItemService: ItemService
  ) {}

  ngOnInit(): void { 
    console.log(this.route);
    this.route.params.subscribe(param => {   
      this.getItemById(param.id); 
    }); 
 
  }
 
  getItemById(id: Number): void {
    this.ItemService.getItemById(id)
        .subscribe(
            result => { 
              this.data = result; 
              this.categories = this.data.categories;
              this.item = this.data.item; 
            },
            error => console.log("Error :: " + error)
        )
  }

}
