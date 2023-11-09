import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { GovernanceService } from '../services/governance.service';

@Component({
  selector: 'app-governance-main',
  templateUrl: './governance-main.component.html',
  styleUrls: ['./governance-main.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class GovernanceMainComponent implements OnInit {
  menuItems:MenuItem[]=[]
  loader =false
  ItemList=[

  ]
  ItemList1=[

  ]
  constructor(private GovernanceService:GovernanceService) { 
    this.menuItems =[
      { label: 'Governance',url:'#/governance',target:'_self' },
    ]
  }

  ngOnInit(): void {
    this.ItemList=[

    ]
    this.getprocesscount()
    this.getmetricscount()
    this.ItemList =this.ItemList1
   
    this.sortItemList1Alphabetically(this.ItemList)
  }
getprocesscount(){
  this.loader=true
  this.GovernanceService.getProcessCount().subscribe({
    next: (res: any) => {
      console.log("cr")
     
      
            this.ItemList1.push(res)
        // this.loader=false
        this.sortItemList1Alphabetically(this.ItemList1)
        console.log(this.ItemList,"metricCategoryList")
  this.loader=false
    },
    error: (err: any) => {
    // this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader=false
  }
  })
}
getmetricscount(){
  this.loader=true
  this.GovernanceService.getMetricsCount().subscribe({
    next: (res: any) => {
      console.log("cr")
     
      
            this.ItemList1.push(res)
        // this.loader=false
        console.log(this.ItemList,"metricCategoryList")
        this.sortItemList1Alphabetically(this.ItemList1)
  this.loader=false
    },
    error: (err: any) => {
    // this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader=false
  }
  })
}
sortItemList1Alphabetically(list) {
  list.sort((a, b) => a.name.localeCompare(b.name));
}

}
