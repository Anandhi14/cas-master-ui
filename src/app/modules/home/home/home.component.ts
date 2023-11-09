import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class HomeComponent implements OnInit {

  menuItems:MenuItem[]=[]
  ItemList=[
    {
      name:'Gloverse'
    }
  ]
  formPersona: FormGroup
  visitorStateData: any = [];
  categoryData: any = [];
  homeCountryData: any = [];
  targetCountryData: any = [];
  workTypeData: any = [];
  complexityData: any = [];
  industryData: any = [];
  linkPersona: any = [];
  showForm=false
  constructor(
    private fb: FormBuilder) { 
    this.menuItems =[
      { label: 'Home',url:'#/',target:'_self' },
    ]
    this.formPersona = this.fb.group({
      personaName: ['', Validators.required],
      description: ['', Validators.required],
      personaCategorySelected: ['', Validators.required],
      homeCountrySelected: [''],
      shortName: ['', Validators.required],
      industrySelected: [''],
      Worktypeselected: [''],
      targetCountrySelected: [''],
      complexitySelected: ['', Validators.required],
      visitorStateSelected: [''],
      personaImage: [''],
      personaMiniImage: [''],
      activePersona: [false],
      personaImage_D: [null],
      personaMiniImage_D: [null],
      userMiniImageName:[''],
      userImageName:[''],
      appImageName:[''],
      startDate: [''],
      endDate: [''],

      // Add more form controls as needed
    });
  }

  ngOnInit(): void {
  }

  setActiveStatus(e){

  }

  submitData(){

  }
  onChangeFile(e,image){

  }
  onAddClick(){
    this.showForm=true
    console.log(this.showForm)
  }
  CanDelete(e){
    
  }
 close() {
  this.showForm=false

  }
}
