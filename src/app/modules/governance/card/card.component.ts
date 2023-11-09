  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { Router } from '@angular/router';
  import { ConfirmationService, MessageService } from 'primeng/api';

  @Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    providers: [MessageService,ConfirmationService]
  })
  export class CardComponent implements OnInit {
    @Input() styleOBJ:any;
    @Input() itemName:any;
    @Input() page:any;
    @Input() labelLetter:number=1;
    isEditMode=false
    visibleActivityDetailPopup: boolean;
    showActivityDetailPopup: boolean;
    @Output() cardClicked: EventEmitter<any>= new EventEmitter();
    @Output() childClicked: EventEmitter<any>= new EventEmitter();
    notShowchild=false
    constructor(private router:Router) { }

    ngOnInit(): void {
      if(this.page=='locationlist' || (this.itemName.level && this.itemName.level ==3)){
        this.notShowchild=true
      }else
      {
        this.notShowchild=false
      }
    }
    childIteamClik(itemNameclicked){
      console.log(this.itemName)
      if(this.page=='home'){
        this.router.navigate(['persona'])
      }
      else if(this.page=='personamain'){
        if(itemNameclicked=='Governance'){
        this.router.navigate(['governance'])}
        else if(itemNameclicked =='Definitions') {
          this.router.navigate(['definitions'])
        }
    else if(itemNameclicked=="Assets"){
          this.router.navigate(['assets'])
        }
      }
  else if(this.page=='governance' && itemNameclicked.toLowerCase() == "process"){
  this.router.navigate(['governance/processList'])
  }else if(this.page=='governance' && itemNameclicked.toLowerCase() == "metrics") {
    this.router.navigate(['governance/metricsList'])
  }else if(this.page=='definitions' && itemNameclicked == "Locations"){
    this.router.navigate(['definitions/locationList'])
  }
  else if(this.page=='definitions' && itemNameclicked == "Functions"){
    this.router.navigate(['definitions/function'])}
  
  else if(this.page=='definitions' && itemNameclicked == "Goals"){
    this.router.navigate(['definitions/goals'])}
 
  else if(this.page =="assets"){
    if(itemNameclicked == "Tools & App"){
      this.router.navigate(['assets/tools&apps'])
  }}else if(this.page=="toolsandapp"){
    if(itemNameclicked=="GUAGE"){
      this.router.navigate(['../../assets/guage'])
    }
  // }else if(this.page='app'){
  //   if(itemNameclicked=="GUAGE"){
  //     this.router.navigate(['../../assets/guage'])
  //   }
  }

  else{
    console.log( this.page)}
    this.childClicked.emit(this.itemName)
    }
    onNameClick(id){
      // if(this.page=="processList"){
      //   this.visibleActivityDetailPopup=true;
      //   this.showActivityDetailPopup=true;
      //   this.isEditMode=true
      // }
      console.log(this.itemName.name)
    if(this.page='app'){
      if(this.itemName.name=="Data Manegment"){
      this.router.navigate(['assets/guage/data-entry'])
      
      }
    }
      this.cardClicked.emit({item:this.itemName,page:this.page})
    

    }
  }
