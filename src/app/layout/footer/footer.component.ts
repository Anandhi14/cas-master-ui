import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  constructor() { }
  loader=false
  ngOnInit(): void {

  }
  displayDialog: boolean = false;

  showDialog() {
   
    this.displayDialog = true;
    this.loader=true
    
  }

 
  onPrivacyPolicyLinkLoaded() {
    this.loader = false; // set loader to false when iframe content is loaded
  }

}
