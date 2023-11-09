import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-persona-main',
  templateUrl: './persona-main.component.html',
  styleUrls: ['./persona-main.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class PersonaMainComponent implements OnInit {
  menuItems:MenuItem[]=[]
  ItemList=[
    {
      name:'Definitions'
    }
    ,{
      name:'Assets'
    }
    ,{
      name:'Governance'
    }
  ]
  constructor() { 
    this.menuItems =[
      // { label: 'Governance',url:'#/',target:'_self' },
    ]
  }

  ngOnInit(): void {
  }

}
