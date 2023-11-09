import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tools-and-apps',
  templateUrl: './tools-and-apps.component.html',
  styleUrls: ['./tools-and-apps.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ToolsAndAppsComponent implements OnInit {

  menuItems:MenuItem[]=[]
  ItemList=[
    {
      name:'GLOVE'
    },
    {
      name:'GUide'
    },
    {
      name:'GUAGE'
    },
    {
      name:'ATMA'
    }
  ]
  
  constructor() { 
    this.menuItems =[
      { label: 'Assets',url:'#/assets',target:'_self' },
      { label: 'Tools and Apps',url:'#/assets/tool-and-apps',target:'_self' },
    ]
  }

  ngOnInit(): void {
  }

}
