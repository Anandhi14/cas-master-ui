import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
// import { Common } from 'src/app/modules/activity/services/common.service';
import { CommonServiceService } from 'src/app/commonService/common-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuItems!:any
  isEditMode =  false;
  selectedNavList =[];
  homeList:any;
  constructor( 
    public route: ActivatedRoute,
    public router: Router,
    public commonService:CommonServiceService

    
    ) { }

  ngOnInit(): void {
   
    
      // this.navSR.selectednavList$.subscribe((value) => {
      // this.selectedNavList = value;
      // // console.log("sdfdfsdfdf")
      // let iteam = this.selectedNavList.find((x)=>x.name == 'HOME')
      // if(iteam)
      // {
      //   this.homeList = iteam;
      // }
    // });
    this.commonService.breadCrumbChanged.subscribe(changedValue => {
      if (changedValue) {
      this.menuItems=changedValue
      }
      console.log(this.menuItems)
      console.log(changedValue)
    })

  
  }

  // onHomeClick()
  // {
  //   this.router.navigate([this.homeList?.url ]);
  //   this.homeList = null;
  //   this.selectedNavList =[];
  // }
  iteamClick(e:any){
    this.router.navigate([e.item.devurl])

  }
  goBack(){
    if(this.menuItems[this.menuItems.length-2]){
      this.router.navigate([this.menuItems[this.menuItems.length-2]['devurl']])

    }else{
      this.router.navigate(['/'])

    }
 
  }

  ngOnDestroy()
  {
   
    
  }


  openAddPopup()
  {

    this.commonService.showAddbutton =false;
    this.commonService.rowData =[];
    this.router.navigate(['/modelscreen'])

  }


}
