import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-definations-main',
  templateUrl: './definations-main.component.html',
  styleUrls: ['./definations-main.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class DefinationsMainComponent implements OnInit {

  menuItems:MenuItem[]=[]
  ItemList=[
    {
      name:'Sub Personas'
    }
    ,{
      name:'Activity'
    }
    ,{
      name:'Locations'
    }
    ,{
      name:'Functions'
    }
    ,{
      name:'Goals'
    }
  ]
  constructor() { 
    this.menuItems =[
      { label: 'Definitions',url:'#/definitions',target:'_self' },
    ]}

  ngOnInit(): void {
  }

}
