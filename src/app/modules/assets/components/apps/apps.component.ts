import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';


@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class AppsComponent implements OnInit {

  menuItems:MenuItem[]=[]
  ItemList=[
    {
      name:'Configuration'
    },
    {
      name:'Data Manegment'
    },
    {
      name:'Master Data'
    },
  ]
  constructor() { 
    this.menuItems =[
      { label: 'Assets',url:'#/',target:'_self' },
      { label: 'Tools and Apps',url:'#/',target:'_self' },
      { label: 'guage',url:'#/',target:'_self' },
    ]
  }

  ngOnInit(): void {
  }

}
