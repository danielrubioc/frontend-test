import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from "../../../services/item.service";


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass']
})
export class ListItemComponent implements OnInit {
  public queryParam = {};
  public data:any;
  categories = [];
  items = [];

  constructor(    
    private route: ActivatedRoute,
    public ItemService: ItemService
  ) { }

  ngOnInit(): void { 
    this.route.queryParams.subscribe(params => {  
      let query_srt:string = '';

      Object.keys(params).forEach(function eachKey(key) {
        if (key === 'search') { 
          query_srt += '?q=' + params[key]  
        } else {
          query_srt += '?' + key + '=' + params[key]  
        } 
      }); 

      this.getItems(query_srt); 
    }); 
 
  }
 
  getItems(params: string): void {
    this.ItemService.getItems(params)
        .subscribe(
            result => { 
              this.data = result;
              this.categories = this.data.categories;
              this.items = this.data.items;

            },
            error => console.log("Error :: " + error)
        )
  }
}
