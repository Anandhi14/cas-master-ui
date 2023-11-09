// process-listing.component.ts
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ProcessService } from '../../services/process.service';

@Component({
  selector: 'app-process-listing',
  templateUrl: './process-listing.component.html',
  styleUrls: ['./process-listing.component.scss'],
  providers: [MessageService],
})

export class ProcessListingComponent implements OnInit {
  menuItems: MenuItem[] = [];
  loader = false;
  showProcessMaster = false;
  SlectedModel: any = null;
  ProcessList: any[] = [
    
  ];
  displayedProcessList: any[] = []; // Holds the currently displayed processes
  parentProcessobj=[]
  currentParentProcess:any
  // Pagination variables
  itemsPerPage = 12; // Number of items to display per page
  currentPage = 1; // Current page number
  totalPages = 0; // Total number of pages
  processListCopy: any;
  idMapArray:[{id:number , subChildIds:any,currentSlide:number, targetId}]=[] as any

  constructor(private processService: ProcessService, private messageService: MessageService) {
    this.menuItems = [
      { label: 'Governance', url: '#/governance', target: '_self',id:null },
      { label: 'Process',id:null },
    ];
  }

  ngOnInit(): void {
    this.getAllProcess();
  }

  onAddClick() {
    if(this.parentProcessobj?.length){
    this.SlectedModel ={ ParentModel:this.currentParentProcess, parent:true}}
else{
  this.SlectedModel=null
}
    console.log(this.menuItems,'menuadd')
  

    this.showProcessMaster = true;
  }

  closePopupMaster() {
    this.showProcessMaster = false;
   
    if(this.menuItems?.length >2){
      this.ProcessList=[]
      const idmap =this.idMapArray?.find((x)=> x?.targetId.toString() == this.menuItems[this.menuItems.length-1]?.id) 
      console.log(this.idMapArray,'idmaponclose')
      // let id =this.idMapArray?.map((x)=> x?.id) 
      // console.log(id,'idd61')
      if(idmap?.targetId){
        this.loader=true
        this.processService.getProcessMaster(idmap?.targetId).subscribe({
          next: (res: any) => {
            console.log("res66",res)
            if(res){
              let ids =res?.subProcess?.map((x)=> x?.id)
            idmap.subChildIds=ids

            this.getChildActivitiesByids(idmap?.subChildIds).then((res)=>{
              this.updatePaginationData()
              this.loader=false
            }) 
              // this.loader= false
            }
            
         

            
         
            
          },
          error: (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
            this.loader=false
          }
        })
      }else{
      //  this.Processmodel={} as any
        }
      // this.ProcessList= Process?.subProcess?.length && Process?.subProcess?.map((x:any)=>{return {id:x.id , name:x.processName,...x} }) || []  
       
    }else{
      this.getAllProcess()
      if(this.idMapArray.length){
        this.currentPage= this.idMapArray[0]?.currentSlide;
        this.idMapArray =[] as any
       }
    
    }
    

  }

  onCardClick(process) {
    this.SlectedModel = process;
    this.showProcessMaster = true;
  }

 getAllProcess(){
  this.loader=true
  this.processService.getListingProcess().subscribe({
    next: (res: any) => {
      console.log("cr")
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , name:x.processName,...x} })
      }
      
            this.ProcessList =  res|| [];
            this.processListCopy = res|| []; 
            if(this.menuItems?.length >2){
              this.ProcessList=[]
              const idmap =this.idMapArray?.find((x)=> x?.id.toString() == this.menuItems[this.menuItems.length-1]?.id) 
              // this.ProcessList= Process?.subProcess?.length && Process?.subProcess?.map((x:any)=>{return {id:x.id , name:x.processName,...x} }) || []  
              this.getChildActivitiesByids(idmap?.subChildIds).then((res)=>{
                this.updatePaginationData()
                this.loader=false
              })      
            }else{
              if(this.idMapArray.length){
                this.currentPage= this.idMapArray[0]?.currentSlide;
                this.idMapArray =[] as any
               }
              this.updatePaginationData()
              this.loader=false ;
            // this.updatePaginationData()
            // this.loader=false ;
            }
        
        
        console.log(this.ProcessList,"metricCategoryList")
  
    },
    error: (err: any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader=false
  }
  })
}

  // Function to navigate between pages
  navigatePage(direction: number): void {
    this.currentPage += direction;
    this.updateDisplayedProcessList();
  }

  // Function to update the displayed list based on pagination
  updateDisplayedProcessList(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProcessList = this.ProcessList.slice(startIndex, endIndex);
  }

  // Call this function after fetching or updating the ProcessList
  updatePaginationData(): void {
    this.totalPages = Math.ceil(this.ProcessList.length / this.itemsPerPage);
    this.updateDisplayedProcessList();
  }
  showChildItems(event){
  //  const Process =this.processListCopy?.find((x)=> x?.id == event?.id) 
console.log(event,"ev")
this.parentProcessobj.push(event)
this.currentParentProcess=event
console.log(this.SlectedModel,'cccc')
let ids =event?.subProcess?.map((x)=> x?.id)
console.log(ids,'idds')

// this.ProcessList= Process?.subProcess?.length && Process?.subProcess?.map((x:any)=>{return {id:x?.id , name:x?.processName,...x} }) || []
this.getChildActivitiesByids(ids).then((result)=>{
  this.navigatePage(-this.currentPage + 1)
  this.updatePaginationData()
})
// if()
this.idMapArray.push({id:Number(this.menuItems[this.menuItems.length-1]?.id), subChildIds:ids,currentSlide:this.currentPage , targetId:event?.id})
console.log(this.currentPage,'cp')
console.log(this.idMapArray, 'id mapin child')

this.menuItems.push({ label: event?.name,id:event?.id })
this.menuItems=[...this.menuItems]
  }
  OnItemClick(e){
    console.log(e.item,'e.item')
    if( e?.item?.id==null ||e?.item?.id== undefined){
 
      this.menuItems = [
        { label: 'Governance', url: '#/governance', target: '_self',id:null },
        { label: 'Process',id:null },
      ];
      this.getAllProcess()
 this.parentProcessobj=[]
return;
    }
    console.log(this.idMapArray ,'on bd click')
    const idmap =this.idMapArray?.find((x)=> x?.id == e?.item?.id) 
    const target =this.idMapArray?.find((x)=> x?.targetId == e?.item?.id) 
    console.log(idmap,'idMAp',this.currentPage ,"cp1")
    let currentItem = this.menuItems.find(
      (x) => x.id == e?.item?.id
    );

    // this.parentProcessobj={id:currentItem.id,name:currentItem.label}
    this.parentProcessobj.pop()
    this.currentParentProcess= this.parentProcessobj?.length ? this.parentProcessobj[this.parentProcessobj.length-1] :[]
console.log(e,'eeeee')
console.log
// this.ProcessList= Process?.subProcess?.length && Process?.subProcess?.map((x:any)=>{return {id:x.id , name:x.processName,...x} }) || []
    // let ids =e?.subProcess?.map((x)=> x?.id)
// console.log(ids,'idds')

// this.ProcessList= Process?.subProcess?.length && Process?.subProcess?.map((x:any)=>{return {id:x?.id , name:x?.processName,...x} }) || []
this.getChildActivitiesByids(target?.subChildIds).then((result)=>{
  if (idmap?.id){
    this.currentPage=idmap?.currentSlide
  }else{

  }

  // debugger
  console.log(this.currentPage,'226')
    // this.navigatePage(-this.currentPage + 1)
    this.updatePaginationData()

}).catch((err)=>{
  console.log(err)
})

    let index = this.menuItems.findIndex(
      (x) => x.id == e?.item?.id
    );
    if (index > -1) {
      this.menuItems = this.menuItems.slice(0, index + 1);
      this.menuItems = [...this.menuItems];}
    // console.log(Process,e,"ev")

  }

  getChildActivitiesByids(ids){
   return new Promise((resolve,reject)=>{
      this.loader=true
      this.processService.getChildActivitiesByids(ids).subscribe({
        next: (res: any) => {
          console.log("cr")
          if(res?.length){
            res= res?.map((x:any)=>{return {id:x.id , name:x.processName,...x} })
          }
          
                this.ProcessList =  res|| [];
                  // this.ProcessList= Process?.subProcess?.length && Process?.subProcess?.map((x:any)=>{return {id:x.id , name:x.processName,...x} }) || []        
                
                this.updatePaginationData()
                resolve(true)
            this.loader=false
            console.log(this.ProcessList,"ProcessList")
      
        },
        error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        reject(true)
            this.loader=false
      }
      })
    })
  

  }
  
}
