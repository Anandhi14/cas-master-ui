import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-assests-main',
  templateUrl: './assests-main.component.html',
  styleUrls: ['./assests-main.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class AssestsMainComponent implements OnInit {

  menuItems:MenuItem[]=[]
  ItemList=[
    {
      name:'Tools & App'
    }
  ]
  constructor() { 
    this.menuItems =[
      { label: 'Assets',url:'#/assets',target:'_self' },
    ]
  }


  ngOnInit(): void {
  }

}
