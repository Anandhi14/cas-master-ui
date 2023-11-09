import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { LocationService } from '../../Services/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class LocationListComponent implements OnInit {

  menuItems:MenuItem[]=[]
  loader=false
  showProcessMaster =false ;
  displayedMetricsList: any[] = [];
  itemsPerPage = 12; 
  currentPage = 1; 
  totalPages = 0;
  SlectedModel:any =null
  LocationList=[
  ]
 
  constructor(private LocationService:LocationService ,private messageService:MessageService) { 
    this.menuItems =[
      { label: 'Definitions',url:'#/definitions',target:'_self' },
      { label: 'Location',url:'#/definitions/locationList',target:'_self' },
    ]
  }


  ngOnInit(): void {
    this.getallLocation()
  
  }
  onAddClick(){
    this.SlectedModel=null
    this.showProcessMaster=true;
  }
  
  closePopupMaster(){
    this.showProcessMaster= false
    this.getallLocation()
  }
  onCardClick(process){
    this.SlectedModel=process
    this.showProcessMaster=true;  
  }
  navigatePage(direction: number): void {
    this.currentPage += direction;
    this.updateDisplayedProcessList();
  }


  updateDisplayedProcessList(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedMetricsList = this.LocationList.slice(startIndex, endIndex);
    console.log(this.displayedMetricsList)
   
  }

  // Call this function after fetching or updating the ProcessList
  updatePaginationData(): void {
    this.totalPages = Math.ceil(this.LocationList.length / this.itemsPerPage);
    this.updateDisplayedProcessList();
  }
  getallLocation(){
    this.loader=true
    this.LocationService.getAllLocations()
    // .then(res =>{
    //     if(res?.length){
    //     res= res?.map((x:any)=>{return {id:x.id , name:x.processName}})
    //   }
    //           this.ProcessList=  res|| [];;
    //       this.loader=false
    //       console.log(this.ProcessList,"metricCategoryList")
    // }).catch(err=>{console.log(err)
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
    //       this.loader=false
    
    // });
    .subscribe({
      next: (res: any) => {
        console.log("cr")
        if(res?.length){
          res= res?.map((x:any)=>{return {id:x.id , name:x.name}})
        }
        
          this.LocationList =  res|| [];;
          this.loader=false
          this.updatePaginationData()

          console.log(this.LocationList,"metricCategoryList")
        
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader=false
      }
    })
  }
}
