import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { processMaster } from '../models/process-master.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProcessService } from '../../services/process.service';
import { MetricsService } from '../../services/metrics.service';

@Component({
  selector: 'app-process-master',
  templateUrl: './process-master.component.html',
  styleUrls: ['./process-master.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ProcessMasterComponent implements OnInit {
  menuItems:MenuItem[]=[]
  @Output() closed: EventEmitter<any>= new EventEmitter();
  @Output() saved: EventEmitter<any>= new EventEmitter();
  @Input() showPopup : boolean;
  @Input()  ProcesId :number;
  @Input() isEditMode=false;
  function
  functionList=[]
  subFunction
  subFunctionList=[]
  disabledropdowns=false
  // showPopup=true
  @Input() model:any;
  Processmodel:processMaster={} as any
  MatricCategory=[
    
      {
          "code": "1",
          "name": "Effectiveness"
      },
      {
          "code": "2",
          "name": "Efficiency"
      },
      {
          "code": "3",
          "name": "Experience"
      },
  ]
  ImpectArea=[
    
      {
          "code": "1",
          "name": "Delivery"
      },
      {
          "code": "2",
          "name": "Team Member"
      },
      {
          "code": "3",
          "name": "cost"
      },
      {
          "code": "4",
          "name": "Customer"
      },
      {
          "code": "5",
          "name": "Legal | Compliance"
      },
      {
          "code": "6",
          "name": "Risk"
      },
      {
          "code": "7",
          "name": "Reputation"
      },
      {
          "code": "8",
          "name": "Candidate"
      },
  ]
  EnablersList=[
    {
      "code": "1",
      "name": "People"
  },
  {
      "code": "2",
      "name": "Process"
  },
  {
      "code": "3",
      "name": "Technology"
  },
  {
      "code": "4",
      "name": "Data"
  },
  {
      "code": "4",
      "name": "Innovation"
  },
  ]
  RASCI=[
    {
      "code": "1",
      "name": "Client Partner"
  },
  {
      "code": "2",
      "name": "Gloplax"
  },
  {
      "code": "3",
      "name": "Vendor"
  },
  ]
  criticalityList=[
    {
      "code": "1",
      "name": "High"
  },
  {
      "code": "2",
      "name": "Medium"
  },
  {
      "code": "3",
      "name": "Low"
  },
  ]
  ownerOption=[
    {
        "code": "1",
        "name": "Owner 1"
    },
    {
        "code": "2",
        "name": "Owner 2"
    },
    {
        "code": "3",
        "name": "Owner 3"
    },
  ]
  parentProcessOptions=[
    {
        "code": "1",
        "name": "Process 1"
    },
    {
        "code": "2",
        "name": "Process 2"
    },
    {
        "code": "3",
        "name": "Process 3"
    },
  ]
  metricsOptions=[
    {
      "code": "1",
      "name": "Metrics 1"
  },
  {
      "code": "2",
      "name": "Mtrics 2"
  },
  {
      "code": "3",
      "name": "Metrics 3"
  },
  ]
  SelectedMatricCategory=[]
  SelectedImpectArea=[]
  SelectedEnablers=[]
  SelectedRASCI=[]
  isDesktopDevice=true;
    popupModelWidth: string;
    popupModelTop: string;
    popupModelHeight: string;
    @ViewChild('processDetailPopup') processDetailPopup: ElementRef;
    @ViewChild('UpstreamBox') UpstreamBox: ElementRef;
    sequencePopupHeight: string;
    sequencePopupListHeight: string;
    popupModelPopupHeight: string;
    popupModelLeftSide: string;
    popupModelrightSide: string;
    popupHeader: any;
    selectPopup: boolean;
    selectedOptions=[]
    options=[]
    multiple: boolean;
    filterValue:string ='';
   
    crticalityData:any=[]
    metricCategoryList:any=[]
    impactAreaList:any=[]
    enablersList:any=[]
    ownerList:any=[]
    metricsList:any=[]
    parentProcess:any=[]
    maturityList:any=[]
    label:any
    loader=false
  component: { processName: string; };

  constructor(private confirmationService: ConfirmationService , private processService: ProcessService, private cdr: ChangeDetectorRef , private messageService:MessageService ,private deviceService: DeviceDetectorService,private metricsService: MetricsService) {
    this.menuItems =[
      { label: 'Governance',url:'#/governance',target:'_self' },
      { label: 'Process', url: '#/', target: '_self' }
    ]
   }
  ngOnInit(): void {

    this.isDesktopDevice = this.deviceService.isDesktop();
  
  this.getCrticality() 
  this.getMetricCategory()
  this.getEnablers()
  this.getImpactAreas()
  this.getOwnerFunction()
  this.getMetrics()
  this.getAllmaturitylevels()
  this.getParentProcess()
 this.getFunctionList()
 console.log(this.model,'model')
console.log(this.isEditMode)

if(this.model?.item?.id){
  this.getProcessMaster(this.model?.item?.id)
} else  if (this.model.parent ==true){
  console.log(this.model.ParentModel,'mmmmmodel')
  console.log(this.parentProcess,'pp')
  this.Processmodel.parentProcess={id:this.model?.ParentModel?.id , processName:this.model.ParentModel?.name, level:this.model.ParentModel?.level},
  this.Processmodel.owner =this.model?.ParentModel?.owner;
  this.Processmodel.function=this.model?.ParentModel?.owner.functionGroup
  // this.Processmodel.subFunction= res?.owner;

  setTimeout(() => {
    if(this?.Processmodel?.owner){
      this.onFunctionChange(this.model?.ParentModel?.owner?.functionGroup?.id)
    }
   }, 1000);
this.disabledropdowns=true
   this.Processmodel.subFunction={id:this.model?.ParentModel?.owner?.id , name:this.model?.ParentModel?.owner.name}
  console.log(this.Processmodel.parentProcess)
  this.Updatelevel()
}
// if(this.Processmodel.parentProcess == null || this.Processmodel.parentProcess == undefined ){
//   this.disabledropdowns=false
// }else{
//   this.disabledropdowns=true
// }
  }
  save(){
    console.log(this.Processmodel)
  }
//   ngAfterViewInit(){
//     if(this.Processmodel.parentProcess == null || this.Processmodel.parentProcess == undefined ){
//   this.disabledropdowns=false
// }else{
//   this.disabledropdowns=true
// }
//   }
  selctionPopup(option:any,name:any,selectedOption:any,label:any){
    
    this.filterValue ='';
    this.cdr.detectChanges();
    this.popupModelWidth =this.UpstreamBox.nativeElement?.offsetWidth+148+'px';
    this.popupModelTop =(11+this.UpstreamBox.nativeElement?.offsetTop)-136+'px';
    this.popupModelHeight =(this.processDetailPopup.nativeElement?.offsetHeight -90)+'px';
    this.sequencePopupHeight =(this.processDetailPopup.nativeElement?.offsetHeight -26)+'px';
    this.sequencePopupListHeight =(this.processDetailPopup.nativeElement?.offsetHeight -174)+'px';
    this.popupModelPopupHeight =(this.processDetailPopup.nativeElement?.offsetHeight -70)+'px';
    this.popupModelLeftSide = (this.UpstreamBox.nativeElement.offsetLeft+656)+'px';
    this.popupModelrightSide = (this.processDetailPopup.nativeElement?.offsetLeft+732)+'px';
    this.selectPopup=false
    this.options=[]
    this.selectedOptions=selectedOption?selectedOption:null
    if(name=="metrics"){
      this.multiple=true
      this.options=option
      this.popupHeader=name
        this.selectPopup=true
       this.label= label
  console.log(this.selectedOptions);
      // name=="metrics"?this.selectedOptions=this.Processmodel.metrics&& this.Processmodel.metrics.map(x=>{
      //  return{ code:x.code,name:x.name}
      // }):''
      //  :this.selectedOptions=this.Processmodel.metrics.map(x=>{
      // //   return{ code:x?.code,name:x?.name}
      // //  });
      // // console.log(this.selectedOptions,'selected');
      // // console.log(this.options ,'option')
      }

  else{
    this.multiple=false

      this.options=option
      this.popupHeader=name
        this.selectPopup=true
        this.label= label
   
    }
    
  }
  saveValues(e){
    if(this.popupHeader=="Owner"){
      this.selectPopup=false
      this.popupHeader=""
       this.Processmodel.owner=e.value
        console.log(e.value,'ee',this.Processmodel.owner)
        console.log(this.Processmodel,'ff popup')
        // this.ownerSelectChange(e.value)
      }else if(this.popupHeader=="Parent process"){
        
        this.options=[]
        this.selectPopup=false
        this.popupHeader=""
       this.Processmodel.parentProcess=e.value
       this.Updatelevel()
       console.log( this.Processmodel.parentProcess)
        // console.log(e.value[0],'ee',this.model.owner)
        // this.ownerSelectChange(e.value)
      }else if(this.popupHeader=="metrics"){

      }
  }
  saveMultiSelect(){
    if(this.popupHeader=="metrics"){
      this.Processmodel.metrics= this.selectedOptions
      this.options=[]
      this.selectPopup=false
      this.popupHeader=""
    
    }else if (this.popupHeader=="Owner"){
      if(this.Processmodel.subFunction==null || this.Processmodel.subFunction==undefined){
        this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Please select Sub Function'});
return;
      }
      this.Processmodel.owner=  {
        id: this.Processmodel.subFunction?.id,
        name: this.Processmodel?.subFunction.name,
        functionGroup: {
            id: this.Processmodel.function?.id,
            name: this.Processmodel.function.name
        }
    },this.Processmodel.subFunction;
      this.options=[];
      this.selectPopup=false
      this.popupHeader=""
    }
   

  }
  confirm(event: Event) {
    let conformation =true;
   
    if(conformation)
    {
  
    this.confirmationService.confirm({
        target: event.target,
        message: 'The changes are not yet saved. Are you sure you want to proceed without saving?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            //confirm action
            this.options=[]
            this.selectPopup=false
            this.popupHeader=""
          
        },
        reject: () => {
            //reject action
        }
    });
  }
  else{
    this.options=[]
    this.selectPopup=false
    this.popupHeader=""
 
  }
}
removeMetics(i){
  if(i>0){
    if(this.metricsList.length>0){
      this.metricsList.map(x=>
        this.Processmodel.metrics=this.Processmodel.metrics.filter(y=>y!==x))
        this.metricsList=[]
    }else{
      this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Please check atleast one metrics'});

    }
  }
}

getCrticality() {
  this.loader=true
  this.processService.getAllCrticality().subscribe({
    next: (res: any) => {
      console.log("cr")
      // this.loader=false
        this.crticalityData = res|| [];
        console.log(this.crticalityData,"getCrticalityData")
      
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getMetricCategory() {
  this.loader=true
  this.processService.getMetricCategory().subscribe({
    next: (res: any) => {
      console.log("cr")
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , categoryName:x.categoryName}})
      }
      // this.loader=false
        this.metricCategoryList = res|| [];
        console.log(this.metricCategoryList,"metricCategoryList")
      
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getImpactAreas() {
  this.loader=true
  this.processService.getImpactAreas().subscribe({
    next: (res: any) => {
      console.log("cr")
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , impactAreaName:x.impactAreaName}})
      }
      // this.loader=false
        this.impactAreaList = res|| [];
        console.log(this.impactAreaList,"metricCategoryList")
      
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getEnablers() {
  this.loader=true
  this.processService.getEnablers().subscribe({
    next: (res: any) => {
      console.log("cr")
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , enablerName:x.enablerName}})
      }
      // this.loader=false
        this.enablersList = res|| [];
        console.log(this.enablersList,"metricCategoryList")
      
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getOwnerFunction(){
  this.loader=true
  this.processService.getOwnerFunction().subscribe({
    next: (res: any) => {
      console.log("cr")
      // this.loader=false
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , name:x.name}})
      }
        this.ownerList = res|| [];
        console.log(this.enablersList,"metricCategoryList")
      
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getMetrics(){
  this.loader=true
  this.processService.getMetrics().subscribe({
    next: (res: any) => {
      console.log("cr")
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , metricName:x.metricName}})
      }
      // this.loader=false
        this.metricsList = res|| [];
        console.log(this.metricsList,"metricCategoryList")
        this.loader=false
      
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getParentProcess(){
  // this.loader=true
  // this.processService.getParentProcess().subscribe({
  //   next: (res: any) => {
  //     console.log("cr")
  //     if(res?.length){
  //       res= res?.map((x:any)=>{return {id:x.id , processName:x.processName , level:x.level}})
  //     }
      
  //           this.parentProcess =  res|| [];
  //          if (this.model?.parentProcess){
  //             console.log(this.parentProcess,'pp')
  //             this.Processmodel.parentProcess=this.parentProcess?.find((x)=> x?.id ==this.model?.parentProcess?.id)
  //             console.log(this.Processmodel.parentProcess)
  //             this.Updatelevel()
  //           }
  //       this.loader=false
  //       console.log(this.parentProcess,"metricCategoryList")
  
  //   },
  //   error: (err: any) => {
  //   this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
  //           this.loader=false
  // }
  // })
}
getAllmaturitylevels(){
  this.loader=true
  this.metricsService.getAllmaturitylevels().subscribe({
    next: (res: any) => {
      console.log("")
      
        this.maturityList = res|| [];
        console.log(this.maturityList,"maturityList")
        // this.loader=false
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
saveProcessMaster(){
  if(this.Processmodel.processName == "" || this.Processmodel.processName == null || this.Processmodel.processName == undefined ){
    this.messageService.add({ severity: 'error', summary: 'Error', detail:"Process Name is Required" });
    return;
  }
  if(this.Processmodel.owner== null || this.Processmodel.owner == undefined){
    this.messageService.add({ severity: 'error', summary: 'Error', detail:"please select an Owner Function" }); 
    return;
  }
if(this?.Processmodel?.processId == null || this?.Processmodel?.processId== undefined){
//   let payload={
//     "createdBy": "admin",
//     "lastModifiedBy": "admin",
//     "processName":this.Processmodel.processName,
//     "description": this.Processmodel.description,
//     "level": this.Processmodel.level || 1,
//     "parentId": this.Processmodel?.parentProcess?.id,
//     "criticality": this.Processmodel.criticality,
//     "metricsField": this.Processmodel.metrics,
//     "parentProcess": this?.Processmodel?.parentProcess,
//     "risksMappings": [],
//     "metricCategory": this.Processmodel.matricCategory,
//     "metricImpactAreas":this.Processmodel.impectArea,
//     "metricEnablers": this.Processmodel.enablers,
//     "owner": this.Processmodel.owner,
//     "maturityLevel": this.Processmodel.MatuarityLevel,
//     "active":this.Processmodel.activeProcess
// }
this.Updatelevel()
let payload= {
  
  "processName": this.Processmodel?.processName,
  "description":  this.Processmodel.description,
  "level": this.Processmodel.level ,
  "isActive": this.Processmodel?.activeProcess,
  "maturityLevel": this.Processmodel?.MatuarityLevel,
  "owner":this.Processmodel?.owner,
  "criticality": this.Processmodel?.criticality ,
  "parentProcess":this.Processmodel?.parentProcess,
  "metrics": this.Processmodel?.metrics,
  "risks": [],
  "metricCategory":  this.Processmodel.matricCategory,
  "metricImpactAreas":this.Processmodel.impectArea ,
  "metricEnablers": this.Processmodel.enablers 
}

console.log(payload,"process payload")
this.loader=true
this.processService.saveProcessMaster(payload).subscribe({
  next: (res: any) => {
    this.loader=false
    console.log(res,"response")
    this.messageService.add({ severity: 'success', summary: 'Success', detail: res?.message });
    if(res){
      this.Processmodel.processName =res?.processName
      this.Processmodel.processId =res?.id;
      this.Processmodel.description =res?.description;
      this.Processmodel.level =res?.level;
      this.Processmodel.owner =res?.owner;
      this.Processmodel.MatuarityLevel= res?.maturityLevel
      this.Processmodel.criticality =res?.criticality;
      this.Processmodel.metrics =res?.metrics;
        this.Processmodel.function=res.owner.functionGroup
      this.Processmodel.matricCategory =res?.metricCategory;
      this.Processmodel.impectArea =res?.metricImpactAreas;
      this.Processmodel.enablers =res?.metricEnablers;
      this.Processmodel.parentProcess =res?.parentProcess
      this.Processmodel.activeProcess =res?.isActive
      this.Processmodel.subFunction={id:res?.owner?.id , name:res.owner.name}
      this.Processmodel.lastModified =res.lastModifiedDate
    
      this.loader=false
      this.saved.emit();
      this.getParentProcess()
     
    }

      
   },
  error: (err: any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
   
  }
})
}else{
  let payload={
    id:this.Processmodel?.processId,
    "processName": this.Processmodel?.processName,
    "description":  this.Processmodel.description,
    "level": this.Processmodel?.level,
    "isActive": this.Processmodel?.activeProcess,
    "maturityLevel": this.Processmodel?.MatuarityLevel,
    "owner":this.Processmodel?.owner,
    "criticality": this.Processmodel?.criticality ,
    "parentProcess":this.Processmodel?.parentProcess,
    "metrics": this.Processmodel?.metrics,
    "risks": [],
    "metricCategory":  this.Processmodel.matricCategory,
    "metricImpactAreas":this.Processmodel.impectArea ,
    "metricEnablers": this.Processmodel.enablers 
}

console.log(payload,"process payload")
this.loader=true
this.processService.editProcessMaster(payload,this.Processmodel?.processId).subscribe({
  next: (res: any) => {
  
    console.log(res,"response")
    if(res){
      this.Processmodel.processName =res?.processName
      this.Processmodel.processId =res?.id;
      this.Processmodel.description =res?.description;
      this.Processmodel.level =res?.level;
      this.Processmodel.owner =res?.owner;
      this.Processmodel.MatuarityLevel= res?.maturityLevel
      this.Processmodel.criticality =res?.criticality;
      this.Processmodel.function=res.owner.functionGroup
      this.Processmodel.metrics =res?.metrics;
      this.Processmodel.matricCategory =res?.metricCategory;
      this.Processmodel.impectArea =res?.metricImpactAreas;
      this.Processmodel.enablers =res?.metricEnablers;
      this.Processmodel.parentProcess =res?.parentProcess
      this.Processmodel.activeProcess =res?.isActive
      this.Processmodel.lastModified =res.lastModifiedDate
   
      
      setTimeout(() => {
        if(this?.Processmodel?.owner){
          this.onFunctionChange(this.Processmodel?.owner?.functionGroup?.id)
        }
       }, 1000);

       this.Processmodel.subFunction={id:res?.owner?.id , name:res.owner.name}
       this.loader=false
      this.saved.emit();
     this.getParentProcess()
    }
    this.messageService.add({ severity: 'success', summary: 'Success', detail: res?.message });
  
      
   },
  error: (err: any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
    this.loader=false
  }
})
}

}
getProcessMaster(id){
  // let id =event?.value?.id
  console.log(event)
  if(id){
  this.loader=true
  this.processService.getProcessMaster(id).subscribe({
    next: (res: any) => {
      console.log("res",res)
      if(res){
        this.Processmodel.processName =res?.processName
        this.Processmodel.processId =res?.id;
        this.Processmodel.description =res?.description;
        this.Processmodel.level =res?.level;
        this.Processmodel.owner =res?.owner;
        this.Processmodel.MatuarityLevel= res?.maturityLevel
        this.Processmodel.criticality =res?.criticality;
        this.Processmodel.metrics =res?.metrics;
        this.Processmodel.matricCategory =res?.metricCategory;
        this.Processmodel.impectArea =res?.metricImpactAreas;
        this.Processmodel.enablers =res?.metricEnablers;
        this.Processmodel.parentProcess =res?.parentProcess
        this.Processmodel.activeProcess =res?.isActive
        this.Processmodel.function=res.owner.functionGroup
        // this.Processmodel.subFunction= res?.owner;
        this.Processmodel.lastModified =res.lastModifiedDate
        setTimeout(() => {
          if(this?.Processmodel?.owner){
            this.onFunctionChange(this.Processmodel?.owner?.functionGroup?.id)
          }
         }, 1000);
  
         this.Processmodel.subFunction={id:res?.owner?.id , name:res.owner.name}
console.log(this.Processmodel.function ,"function")
console.log(this.Processmodel.function, "subfunction")
if(this.Processmodel.parentProcess == null || this.Processmodel.parentProcess == undefined ){
  this.disabledropdowns=false
}else{
  this.disabledropdowns=true
}
        
        // this.loader= false
      }
        console.log(res,"process get")
        console.log(this.Processmodel,'ff')
   
      this.messageService.add({ severity: 'success', summary: 'Sucess', detail: res?.message || 'process details fetched successfully' });
      
   
      
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}else{
 this.Processmodel={} as any
  }
}
getFunctionList(){
  // this.loader=true
  this.processService.getFunctioList().subscribe({
    next: (res: any) => {
      console.log("cr")
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , name:x.name}})
      }
      
            this.functionList =  res|| [];;
        // this.loader=false
        console.log(this.functionList,"metricCategoryList")
  
    },
    error: (err: any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader=false
  }
  })
  
}
onFunctionChange(id){

  console.log(id)
  this.processService.getsubFunctioList(id).subscribe({
    next: (res: any) => {
      console.log("cr")
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , name:x.name}})
      }
      
            this.subFunctionList =  res|| [];
        // this.loader=false
        console.log(this.subFunctionList,"metricCategoryList")
  
    },
    error: (err: any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader=false
  }
  })
}
close()
{
  //this.showPopup = false;
  this.closed.emit();

}
CanDelete(event){
  this.confirmationService.confirm({
    target: event.target,
    message: 'Are you sure you want to delete this Process?',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        //confirm action
      this.deleteProcess()
      
    },
    reject: () => {
        //reject action
    }
});

}
deleteProcess(){
  this.loader=true
  this.processService.deleteProcess(this.Processmodel.processId).subscribe({
    next: (res: any) => {
      console.log("cr")
      this.loader=false
     this.closed.emit()
  
    },
    error: (err: any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader=false
  }
  })
}
Updatelevel(){
  if(this.Processmodel.parentProcess == null || this.Processmodel.parentProcess == undefined ){
    this.Processmodel.level = 1
  }else if(this.Processmodel.parentProcess && this.Processmodel.parentProcess.level) {
    this.Processmodel.level =Number(this.Processmodel.parentProcess.level) +1
   
  }else{
    this.Processmodel.level = 1
  }
}
}
