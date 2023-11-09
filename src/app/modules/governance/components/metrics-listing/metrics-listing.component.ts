import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MetricsService } from '../../services/metrics.service';
import { ProcessService } from '../../services/process.service';

@Component({
  selector: 'app-metrics-listing',
  templateUrl: './metrics-listing.component.html',
  styleUrls: ['./metrics-listing.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class MetricsListingComponent implements OnInit {
  menuItems:MenuItem[]=[]
  showMetricsMaster =false ;
  SlectedModel: any = null;
  metricsList=[]
  displayedMetricsList: any[] = [];
  itemsPerPage = 12; 
  currentPage = 1; 
  totalPages = 0;
  loader=false
  constructor(private processService: ProcessService, private messageService: MessageService) { 
    this.menuItems =[
      { label: 'Governance',url:'#/governance',target:'_self' },
      { label: 'Metrics',url:'#/governance/metricsList',target:'_self' },

  ]
  }

  ngOnInit(): void {
    this.getMetrics()
    console.log(this.metricsList,'metrics')
    // this.displayedMetricsList=this.metricsList
    
    console.log(this.displayedMetricsList,'metrics1')
  }
  
 
  onAddClick() {
    this.SlectedModel = null;
    this.showMetricsMaster = true;
  }

  closePopupMaster() {
    this.showMetricsMaster = false;
    this.getMetrics()
  }

  onCardClick(process) {
    this.SlectedModel = process;
    this.showMetricsMaster = true;
  }
  navigatePage(direction: number): void {
    this.currentPage += direction;
    this.updateDisplayedProcessList();
  }

  // Function to update the displayed list based on pagination
  updateDisplayedProcessList(): void {
 
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedMetricsList = this.metricsList.slice(startIndex, endIndex);
    console.log(this.displayedMetricsList)
   
  }

  // Call this function after fetching or updating the ProcessList
  updatePaginationData(): void {
    this.totalPages = Math.ceil(this.metricsList.length / this.itemsPerPage);
    this.updateDisplayedProcessList();
  }
  getMetrics(){
    this.loader=true
    this.processService.getMetrics().subscribe({
      next: (res: any) => {
        console.log("cr")
        if(res?.length){
          res= res?.map((x:any)=>{return {id:x.id ,name:x.metricName}})
        }
     
          this.metricsList = res|| [];
          this.updatePaginationData()
             this.loader=false
          console.log(this.metricsList,"metricCategoryList")
        
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        // this.loader=false
      }
    })
  }
OnItemClick($event){
  
}
}
