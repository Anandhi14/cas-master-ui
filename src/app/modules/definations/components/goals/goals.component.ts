import { Component, ElementRef, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  providers: [MessageService,ConfirmationService]

})
export class GoalsComponent implements OnInit, AfterViewInit {
  @ViewChild('processDetailPopup')processDetailPopup:ElementRef
  fileName
  menuItems:MenuItem[]=[]

 goals:Goal={
  

 } as Goal
 
  constructor() { 
    this.menuItems =[
      { label: 'Definitions',url:'#/definitions',target:'_self' },
      { label: 'Goals',url:'#/definitions/goals',target:'_self' },
    ]
  }
  
  goalValues:GoalValue[]= [
          // Add more goal values as needed
        ]

  ngOnInit(): void {
    for (let i = 0; i < 14; i++) {
      this.goalValues.push({ period: '_', ltl: null, ll: null, goal: null, ul: null, utl: null });
    }
  }
  fileChange(e) {
    this.fileName = e.target.files?.[0].name
  }

ngAfterViewInit(): void {
  console.log(this.processDetailPopup)
}
}


interface GoalValue {
  period: string;
  ltl: number;
  ll: number;
  goal: number;
  ul: number;
  utl: number;
}

interface Goal {
  goalId: number;
  metricId: number;
  goalSettingDate: Date; // System populated on save
  locationName: string;
  isActive: boolean; // Yes/No
  goalValues: GoalValue[];
}



