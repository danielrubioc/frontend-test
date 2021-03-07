import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
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
  public items = [];  

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    public ItemService: ItemService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {  
      this.data = data.routeResolver;
      this.categories = data.routeResolver.categories; 
      this.items = data.routeResolver.items;
    }); 

    this.router.events.subscribe( (event: Event) => { 
      if (event instanceof NavigationEnd) { 
        let query_srt = "";
        this.route.queryParams.subscribe(element => { 
          if ( 'search' in element) { 
              query_srt += '?q=' + element['search'];
              if(element['search'].startsWith('MLA')){
                this.router.navigateByUrl('items/'+ element['search']);
              }
          }else {
            query_srt += Object.keys(element).map(key => `?${key}=${element[key]}`).join('&'); 
          } 
        });  
        this.getItems(query_srt); 
      }
    })
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
