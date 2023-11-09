import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MetricsMaster } from '../models/metrics-master.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProcessService } from '../../services/process.service';
import { MetricsService } from '../../services/metrics.service';
@Component({
  selector: 'app-metrics-master',
  templateUrl: './metrics-master.component.html',
  styleUrls: ['./metrics-master.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class MetricsMasterComponent implements OnInit {
  @Output() closedmet: EventEmitter<any>= new EventEmitter();
  @Output() savedmt: EventEmitter<any>= new EventEmitter();
  @Input() showPopupmet : boolean;
  @Input() model : any
Metricsmodel:MetricsMaster= {} as any
  menuItems:MenuItem[]=[]
  @ViewChild('hashInput', { static: false }) hashInput: ElementRef;
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
groupList=[


]
ownerOption=[
  {
    "code": "1",
    "name": "owner 1"
},
{
    "code": "2",
    "name": "owner 2"
},
{
    "code": "3",
    "name": "owner 3"
},

]
accessOptions=[
  {
    "value": "1",
    "name": "View Data"
},
{
    "Value": "2",
    "name": "View Color"
},
{
    "value": "3",
    "name": "Enter Data"
},
]
metricsList=[]
crticalityData:any=[]
metricCategoryList:any=[]
impactAreaList:any=[]
enablersList:any=[]
ownerList:any=[]
data: any[] = [
    { "LTL": this.Metricsmodel.lowerThreshold, "LL": this.Metricsmodel.lowerValue, "GOAL": this.Metricsmodel.target, "UL": this.Metricsmodel.upperValue, "UTL": this.Metricsmodel.upperThreshold },
    // Add more data rows here
  ];
  AggregationTypeList:any=[]
popupModelWidth: string;
popupModelTop: string;
popupModelHeight: string;
@ViewChild('metricsDetailPopup') metricsDetailPopup: ElementRef;
@ViewChild('UpstreamBox') UpstreamBox: ElementRef;
sequencePopupHeight: string;
sequencePopupListHeight: string;
popupModelPopupHeight: string;
popupModelLeftSide: string;
popupModelrightSide: string;
popupHeader: any;
selectPopup: boolean;
selectAccessPopup: boolean=false;
selectedOptions=[]
selectedAccessOptions=[]
options=[]
multiple: boolean;
  SelectedMatricCategory=[]
  SelectedImpectArea=[]
  SelectedEnablers=[]
  SelectedRASCI=[]
  isDesktopDevice=true
  accessList=[]
  LocationOptions=[]
  maturityList=[]
  reportingfrequenciesList=[]
  reportingformatsList=[]
  calculationcurrenciesList=[]
  loader=false;
  subFunctionList: any;
  functionList: any;
  component: { metricsName: string; owner: { functionGroup: { id: number; }; }; };
  
  constructor(private confirmationService: ConfirmationService, private processService: ProcessService,private deviceService: DeviceDetectorService, private messageService:MessageService , private metricsService: MetricsService,private cdr: ChangeDetectorRef) {
    this.menuItems =[
      { label: 'Governance',url:'#/governance',target:'_self' },
      { label: 'Metrics', url: '#/governance/metrics', target: '_self' }
    ]
   }

  ngOnInit(): void {
    this.Metricsmodel.reportingfrequency={id: 4, name: 'Quaterly'}
    this.isDesktopDevice = this.deviceService.isDesktop();
    this.getAllreportingfrequencys()
    this.getCrticality() 
    this.getMetricCategory()
    this.getEnablers()
    this.getImpactAreas()
    this.getOwnerFunction()
    this.getAggregationtypes()
    this.getAlllocations()
    this.getAllmaturitylevels()
    this.getAllreportingformats()
    this.getAllcalculationcurrencys()
    this.getAllgroups()
    // this.getMetrics()
    this.getFunctionList()
    // this.getmetricsMaster()
    this.Metricsmodel.hashValue=''
    if(this.model?.item?.id){
      this.getmetricsMaster(this.model?.item?.id)
    }
  }
  save(){
    console.log(this.Metricsmodel)
  }
  selctionPopup(option:any,name:any,selectedAccessOptions:any){
    this.popupModelWidth =this.UpstreamBox.nativeElement?.offsetWidth-49+'px';
    this.popupModelTop =(11+this.UpstreamBox.nativeElement?.offsetTop)-98+'px';
    this.popupModelHeight =(this.metricsDetailPopup.nativeElement?.offsetHeight -90)+'px';
    this.sequencePopupHeight =(this.metricsDetailPopup.nativeElement?.offsetHeight -26)+'px';
    this.sequencePopupListHeight =(this.metricsDetailPopup.nativeElement?.offsetHeight -174)+'px';
    this.popupModelPopupHeight =(this.metricsDetailPopup.nativeElement?.offsetHeight -70)+'px';
    this.popupModelLeftSide = (this.UpstreamBox.nativeElement.offsetLeft+852)+'px';
    this.popupModelrightSide = (this.metricsDetailPopup.nativeElement?.offsetLeft+811)+'px';
    this.multiple=false

    this.options=option
    this.popupHeader=name
    this.selectPopup=true
    this.selectedAccessOptions=selectedAccessOptions?selectedAccessOptions:null
  }
  saveValues(e){
    if(this.popupHeader=="Owner"){
        // this.options=[]
        // this.selectPopup=false
        // this.popupHeader=""
        this.selectAccessPopup=true
       this.Metricsmodel.owner=e.value[0]
        console.log(e.value[0],'ee',this.Metricsmodel.owner)
        // this.ownerSelectChange(e.value)
      }
  }
  saveMultiSelect(){
   if (this.popupHeader=="Owner"){
      if(this.Metricsmodel.subFunction==null || this.Metricsmodel.subFunction==undefined){
        this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Please select Sub Function'});
return;
      }
      this.Metricsmodel.owner=this.Metricsmodel.subFunction;
      this.options=[];
      this.selectPopup=false
      this.popupHeader=""
    }

  }
  accessConfirm(e){
    this.Metricsmodel.selectedAcessList=[]
    console.log(this.Metricsmodel.selectedAcessList,"accessConfirm")
    this.options=[]
    this.selectPopup=false
    this.popupHeader=""
    this.selectAccessPopup=false
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
saveAccess(){
  
  console.log(this.Metricsmodel.selectedAcessList,"saveaccess")
   this.options=[]
        this.selectPopup=false
        this.popupHeader=""
        this.selectAccessPopup=false
          this.Metricsmodel.owner=this.Metricsmodel.subFunction
      //   console.log(e.value[0],'ee',this.Metricsmodel.owner)
        // this.ownerSelectChange(e.value)
}
removeMetics(i){
  if(i>0){
    if(this.accessList.length>0){
      this.accessList.map(x=>
        this.Metricsmodel.selectedAcessList=this.Metricsmodel.selectedAcessList.filter(y=>y!==x))
        this.accessList=[]
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
      
        this.crticalityData = res|| [];
        console.log(this.crticalityData,"getCrticalityData")
        this.loader=false
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
        this.metricCategoryList = res|| [];
        console.log(this.metricCategoryList,"metricCategoryList")
        this.loader=false
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
        this.impactAreaList = res|| [];
        console.log(this.impactAreaList,"metricCategoryList")
        this.loader=false
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
        this.enablersList = res|| [];
        console.log(this.enablersList,"metricCategoryList")
        this.loader=false
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
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , name:x.name}})
      }
        this.ownerList = res|| [];
        console.log(this.enablersList,"metricCategoryList")
        this.loader=false
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getAggregationtypes(){
  this.loader=true
  this.metricsService.getAllAggregationtypes().subscribe({
    next: (res: any) => {
      console.log("")
      
        this.AggregationTypeList = res|| [];
        console.log(this.AggregationTypeList,"AggregationTypeList")
        this.loader=false
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}

getAlllocations(){
  this.loader=true
  this.metricsService.getAlllocations().subscribe({
    next: (res: any) => {
      console.log("")
      
        this.LocationOptions = res?.map((x)=>{
          return { id:x?.id,name:x?.name}
          }),
        console.log(this.LocationOptions,"LocationOptions")
        this.loader=false
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getAllmaturitylevels(){
  this.loader=true
  this.metricsService.getAllmaturitylevels().subscribe({
    next: (res: any) => {
      console.log("")
      
        this.maturityList = res|| [];
        console.log(this.maturityList,"maturityList")
        this.loader=false
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getAllreportingfrequencys(){
  
 
  this.metricsService.getAllreportingfrequencys().subscribe({
    next: (res: any) => {
      console.log("")
      
        this.reportingfrequenciesList = res||   [];
        console.log(this.reportingfrequenciesList,"reportingfrequenciesList")
        // if(this.Metricsmodel.reportingfrequency==undefined||this.Metricsmodel.reportingfrequency==null)
        // {
        //   //console.log(this.priorityOption)
        //   this.Metricsmodel.reportingfrequency =  this.reportingfrequenciesList?.filter(x=>x?.id== 3 )[0];
  
  
        // }
        if (this.reportingfrequenciesList && this.reportingfrequenciesList.length > 0) {
          const defaultValue = this.reportingfrequenciesList.find(item => item.id === 3);
          if (defaultValue) {
            this.Metricsmodel.reportingfrequency = defaultValue;
          }
        }
        console.log(this.Metricsmodel.reportingfrequency,"rep")

      
        // this.cdr.detectChanges()
        
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getAllreportingformats(){
  this.loader=true
  this.metricsService.getAllreportingformats().subscribe({
    next: (res: any) => {
      console.log("")
      
        this.reportingformatsList = res|| [];
        console.log(this.reportingformatsList,"reportingformatsList")
        this.loader=false
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getAllcalculationcurrencys(){
  this.loader=true
  this.metricsService.getAllcalculationcurrencys().subscribe({
    next: (res: any) => {
      console.log("")
      
        this.calculationcurrenciesList = res|| [];
        console.log(this.calculationcurrenciesList,"calculationcurrenciesList")
        this.loader=false
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getAllgroups(){
  this.loader=true
  this.metricsService.getAllgroup().subscribe({
    next: (res: any) => {
      console.log("")
      
        this.groupList = res|| [];
        console.log(this.groupList,"calculationcurrenciesList")
        this.loader=false
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
saveMetricsMaster(){
  if(this.Metricsmodel.metricsName == "" || this.Metricsmodel.metricsName == null || this.Metricsmodel.metricsName == undefined ){
    this.messageService.add({ severity: 'error', summary: 'Error', detail:"Metrics Name is Required" });
    return;
  }
  if(this.Metricsmodel.owner== null || this.Metricsmodel.owner == undefined){
    this.messageService.add({ severity: 'error', summary: 'Error', detail:"please select an Owner Function" }); 
    return;
  }
  if(this?.Metricsmodel?.metricsId == null || this?.Metricsmodel?.metricsId== undefined){
//   let payload={
//     "createdBy": "admin",
//     "createdDate": null,
//     "lastModifiedBy": "admin",
//     "lastModifiedDate": null,
//     "parentId": null,
//     "criticality": this.Metricsmodel.criticality,
//     "parentProcess": null,
//     "risksMappings": [],
//     "metricCategory": this.Metricsmodel.matricCategory,
//     "metricImpactAreas":this.Metricsmodel.impectArea,
//     "metricEnablers": this.Metricsmodel.enablers,
//     "owner": this.Metricsmodel.owner
// }
// let payload ={
  
//     "metricName": this.Metricsmodel?.metricsName,
//     "description":  this.Metricsmodel?.description,
//     "responsibility": "John Doe",
//     "active":  this.Metricsmodel?.activeMetrics,
//     "deleted": false,
//     "calculation": this.Metricsmodel.calculation,
//     "controlMetric": this.Metricsmodel.controlMetric,
//     "dataSource":this.Metricsmodel.dataSource,
//     "gloverseMetricId": "XYZ123",
//     "lowerThreshold": this.Metricsmodel.lowerThreshold,
//     "target": this.Metricsmodel.target,
//     "upperThreshold": this.Metricsmodel.upperThreshold,
//     "isActive": "Yes",
//     "metricGroupId": "ABC456",
//     "referenceBenchmark":this.Metricsmodel.Benchmark,
//     "criticality": this.Metricsmodel.criticality,
//     // "applicableTo": {
//     //     "id": 1,
//     //     "processName": "Sample Process Name"
//     // },
//     "calculationMethod": this.Metricsmodel.calculationCurrencies,
//     "location":this.Metricsmodel.location,
//     "maturityLevel":this.Metricsmodel.maturityLevel,
//     "reportingFormat": this.Metricsmodel.reportingformats,
//     "reportingFrequency":this.Metricsmodel.reportingfrequency,
//     "aggregationType": this.Metricsmodel.AggregationType,
//     "group": this.Metricsmodel.group,
//     "metricCategory":this.Metricsmodel.matricCategory,
//     "metricImpactAreas": this.Metricsmodel.impectArea,
//     "metricEnablers":this.Metricsmodel.enablers,
//     "owner": this.Metricsmodel.owner
// }
let payload ={
    "metricName": this.Metricsmodel?.metricsName,
    "description": this.Metricsmodel?.description,
    "responsibility": "SampleUser",
    "active":  this.Metricsmodel?.activeMetrics,
    // "deleted": false,
    "calculation": this.Metricsmodel.calculation,
    "controlMetric":  this.Metricsmodel.controlMetric,
    "dataSource":this.Metricsmodel.dataSource,
    // "gloverseMetricId": "SampleGloverseID",
     "lowerThreshold": this.Metricsmodel.lowerThreshold,
    "target": this.Metricsmodel.target,
    "upperThreshold": this.Metricsmodel.upperThreshold,
    "isActive": true,
    "metricGroupId": "SampleMetricGroupID",
    "referenceBenchmark":this.Metricsmodel.Benchmark,
     "criticality": this.Metricsmodel.criticality,
    // "applicableTo": {
    //     "id": 1,
    //     "processName": "Sample Process Name"
    // },
     "calculationMethod": this.Metricsmodel.calculationCurrencies,
    "location": this.Metricsmodel?.location,
    "maturityLevel":this.Metricsmodel.maturityLevel,
    "reportingFormat": this.Metricsmodel.reportingformats,
    "reportingFrequency":this.Metricsmodel.reportingfrequency,
    "aggregationType": this.Metricsmodel.AggregationType,

    "group": this.Metricsmodel.group,
    "autoCalculation": this.Metricsmodel.autoCalculation,
    "autoSource": this.Metricsmodel.autoSource,
      "metricCategory":this.Metricsmodel.matricCategory,
    "metricImpactAreas": this.Metricsmodel.impectArea,
    "metricEnablers":this.Metricsmodel.enablers,
    "owner": this.Metricsmodel.owner,
    "lowerValue": this.Metricsmodel?.lowerValue,
    "upperValue": this.Metricsmodel?.upperValue,
    "hashValue": this.Metricsmodel?.hashValue,
    noGoal: this.Metricsmodel?.noGoal? true :false,
    childCount:0
}

console.log(payload,"metrics payload")
this.loader=true
this.metricsService.saveMetricsMaster(payload).subscribe({
  next: (res: any) => {
    console.log(res,"response")
    console.log(res.location)
    this.messageService.add({ severity: 'success', summary: 'Success', detail: res?.message });
    if(res){
      this.Metricsmodel.metricsName= res?.metricName;
      this.Metricsmodel.metricsId= res?.id;
      this.Metricsmodel.description= res?.description;
     // res?.responsibility: "John Doe",
     this.Metricsmodel.activeMetrics=res?.active,
     // res?.deleted: false,
     this.Metricsmodel.calculation=res?.calculation,
     this.Metricsmodel.controlMetric=res?.controlMetric,
     this.Metricsmodel.dataSource=res?.dataSource,
     // res?.gloverseMetricId: "XYZ123",
     this.Metricsmodel.lowerThreshold= res?.lowerThreshold,
     this.Metricsmodel.target= res?.target
     this.Metricsmodel.upperThreshold= res?.upperThreshold,
     // res?.isActive: "Yes",
     // res?.metricGroupId: "ABC456",
     this.Metricsmodel.Benchmark=res?.referenceBenchmark,
     this.Metricsmodel.criticality=res?.criticality,
     this.Metricsmodel.usedFor=res?. applicableTo
     this.Metricsmodel.calculationCurrencies=res?.calculationMethod,
     this.Metricsmodel.location=res?.location,
     this.Metricsmodel.maturityLevel=res?.maturityLevel,
     this.Metricsmodel.reportingformats=res?.reportingFormat,
     this.Metricsmodel.reportingfrequency=res?.reportingFrequency,
     this.Metricsmodel.AggregationType=res?.aggregationType,
     this.Metricsmodel.group=res?.group,
     this.Metricsmodel.matricCategory=res?.metricCategory,
     this.Metricsmodel.impectArea=res?.metricImpactAreas,
     this.Metricsmodel.enablers=res?.metricEnablers,
     this.Metricsmodel.owner=res?.owner
     this.Metricsmodel.autoCalculation= res?.autoCalculation,
     this.Metricsmodel.autoSource =res?.autoSource,
     this.Metricsmodel.function= res?.owner?.functionGroup,
     this.Metricsmodel.lastModified =res.lastModifiedDate,
   this.Metricsmodel.lowerValue=res?.lowerValue ,
      this.Metricsmodel.upperValue=res?.upperValue,
      this.Metricsmodel.hashValue =res?.hashValue,
      this.Metricsmodel.noGoal= res.noGoal
      
     

     setTimeout(() => {
      if(this?.Metricsmodel?.owner){
        this.onFunctionChange(this.Metricsmodel?.owner?.functionGroup?.id)
      }
     }, 1000);

     this.Metricsmodel.subFunction={id:res?.owner?.id , name:res.owner.name}
     this.savedmt.emit();

     this.loader=false
    //  this.getMetrics()

   }
   
   
      
   },
  error: (err: any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
    this.loader=false
  }
})}else{
let payload ={
  id:this.Metricsmodel?.metricsId,
    "metricName": this.Metricsmodel?.metricsName,
    "description": this.Metricsmodel?.description,
    "responsibility": "SampleUser",
    "active":  this.Metricsmodel?.activeMetrics,
    // "deleted": false,
    "calculation": this.Metricsmodel.calculation,
    "controlMetric":  this.Metricsmodel.controlMetric,
    "dataSource":this.Metricsmodel.dataSource,
    // "gloverseMetricId": "SampleGloverseID",
     "lowerThreshold": this.Metricsmodel.lowerThreshold,
    "target": this.Metricsmodel.target,
    "upperThreshold": this.Metricsmodel.upperThreshold,
    "isActive": "Yes",
    "metricGroupId": "SampleMetricGroupID",
    "referenceBenchmark":this.Metricsmodel.Benchmark,
     "criticality": this.Metricsmodel.criticality,
    // "applicableTo": {
    //     "id": 1,
    //     "processName": "Sample Process Name"
    // },
     "calculationMethod": this.Metricsmodel.calculationCurrencies,
    "location": this.Metricsmodel.location,
    "maturityLevel":this.Metricsmodel.maturityLevel,
    "reportingFormat": this.Metricsmodel.reportingformats,
    "reportingFrequency":this.Metricsmodel.reportingfrequency,
    "aggregationType": this.Metricsmodel.AggregationType,

    "group": this.Metricsmodel.group,
    "autoCalculation": this.Metricsmodel.autoCalculation,
    "autoSource": this.Metricsmodel.autoSource,
      "metricCategory":this.Metricsmodel.matricCategory,
    "metricImpactAreas": this.Metricsmodel.impectArea,
    "metricEnablers":this.Metricsmodel.enablers,
    "owner": this.Metricsmodel.owner,
    "lowerValue": this.Metricsmodel?.lowerValue,
    "upperValue": this.Metricsmodel?.upperValue,
    "hashValue": this.Metricsmodel?.hashValue,
    noGoal: this.Metricsmodel?.noGoal? true :false,
    childCount:0
}

console.log(payload,"process payload")
this.loader=true
this.metricsService.editMetricsMaster(payload,this?.Metricsmodel?.metricsId).subscribe({
  next: (res: any) => {
    console.log(res,"response")
    if(res){
      this.Metricsmodel.metricsName= res?.metricName;
      this.Metricsmodel.metricsId= res?.id;
      this.Metricsmodel.description= res?.description;
     // res?.responsibility: "John Doe",
     this.Metricsmodel.activeMetrics=res?.active,
     // res?.deleted: false,
     this.Metricsmodel.calculation=res?.calculation,
     this.Metricsmodel.controlMetric=res?.controlMetric,
     this.Metricsmodel.dataSource=res?.dataSource,
     // res?.gloverseMetricId: "XYZ123",
     this.Metricsmodel.lowerThreshold= res?.lowerThreshold,
     this.Metricsmodel.target= res?.target
     this.Metricsmodel.upperThreshold= res?.upperThreshold,
     // res?.isActive: "Yes",
     // res?.metricGroupId: "ABC456",
     this.Metricsmodel.Benchmark=res?.referenceBenchmark,
     this.Metricsmodel.criticality=res?.criticality,
     this.Metricsmodel.usedFor=res?. applicableTo
     this.Metricsmodel.calculationCurrencies=res?.calculationMethod,
     this.Metricsmodel.location=res?.location,
     this.Metricsmodel.maturityLevel=res?.maturityLevel,
     this.Metricsmodel.reportingformats=res?.reportingFormat,
     this.Metricsmodel.reportingfrequency=res?.reportingFrequency,
     this.Metricsmodel.AggregationType=res?.aggregationType,
     this.Metricsmodel.group=res?.group,
     this.Metricsmodel.matricCategory=res?.metricCategory,
     this.Metricsmodel.impectArea=res?.metricImpactAreas,
     this.Metricsmodel.enablers=res?.metricEnablers,
     this.Metricsmodel.owner=res?.owner
     this.Metricsmodel.autoCalculation= res?.autoCalculation,
     this.Metricsmodel.autoSource =res?.autoSource,
     this.Metricsmodel.function= res?.owner?.functionGroup,
     this.Metricsmodel.lastModified =res.lastModifiedDate,
     this.Metricsmodel.lowerValue=res?.lowerValue ,
     this.Metricsmodel.upperValue=res?.upperValue,
     this.Metricsmodel.hashValue =res?.hashValue,
     this.Metricsmodel.noGoal= res.noGoal
     setTimeout(() => {
      if(this?.Metricsmodel?.owner){
        this.onFunctionChange(this.Metricsmodel?.owner?.functionGroup?.id)
      }
     }, 1000);

     this.Metricsmodel.subFunction={id:res?.owner?.id , name:res.owner.name}
    
     this.savedmt.emit();
    this.loader=false

     this.getMetrics()
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
getMetrics(){
  this.loader=true
  this.processService.getMetrics().subscribe({
    next: (res: any) => {
      console.log("cr")
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , metricName:x.metricName}})
      }
      this.loader=false
        this.metricsList = res|| [];
        console.log(this.metricsList,"metricCategoryList")
      
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })
}
getmetricsMaster(id){
  // let id = event?.value?.id
  this.loader=true
  if(id){
 
  this.metricsService.getMetricsMaster(id).subscribe({
    next: (res: any) => {
     
      if(res){
        console.log(res.location,'loc')
        
         this.Metricsmodel.metricsName= res?.metricName;
         this.Metricsmodel.metricsId= res?.id;
         this.Metricsmodel.description= res?.description;
        // res?.responsibility: "John Doe",
        this.Metricsmodel.activeMetrics=res?.active,
        // res?.deleted: false,
        this.Metricsmodel.calculation=res?.calculation,
        this.Metricsmodel.controlMetric=res?.controlMetric,
        this.Metricsmodel.dataSource=res?.dataSource,
        // res?.gloverseMetricId: "XYZ123",
        this.Metricsmodel.lowerThreshold= res?.lowerThreshold,
        this.Metricsmodel.target= res?.target
        this.Metricsmodel.upperThreshold= res?.upperThreshold,
        // res?.isActive: "Yes",
        // res?.metricGroupId: "ABC456",
        this.Metricsmodel.Benchmark=res?.referenceBenchmark,
        this.Metricsmodel.criticality=res?.criticality,
        this.Metricsmodel.usedFor=res?. applicableTo
        this.Metricsmodel.calculationCurrencies=res?.calculationMethod,
        this.Metricsmodel.location=res?.location.map((x)=>{
        return { id:x?.id,name:x?.name}
        }),
        this.Metricsmodel.owner=res?.owner
        this.Metricsmodel.function= res?.owner?.functionGroup
        this.Metricsmodel.maturityLevel=res?.maturityLevel,
        this.Metricsmodel.reportingformats=res?.reportingFormat,
        this.Metricsmodel.reportingfrequency=res?.reportingFrequency,
        this.Metricsmodel.AggregationType=res?.aggregationType,
        this.Metricsmodel.group=res?.group,
        this.Metricsmodel.matricCategory=res?.metricCategory,
        this.Metricsmodel.impectArea=res?.metricImpactAreas,
        this.Metricsmodel.enablers=res?.metricEnablers,
        this.Metricsmodel.lastModified =res.lastModifiedDate
        this.Metricsmodel.autoCalculation= res?.autoCalculation,
        this.Metricsmodel.autoSource =res?.autoSource,
        this.Metricsmodel.lowerValue=res?.lowerValue ,
        this.Metricsmodel.upperValue=res?.upperValue,
        this.Metricsmodel.hashValue =res?.hashValue,
        this.Metricsmodel.noGoal= res.noGoal
      
        setTimeout(() => {
          if(this?.Metricsmodel?.owner){
            this.onFunctionChange(this.Metricsmodel?.owner?.functionGroup?.id)
          }
         }, 1000);
    
         this.Metricsmodel.subFunction={id:res?.owner?.id , name:res.owner.name}
       
      }
        console.log(res,"process get")
        console.log(this.Metricsmodel,'ff')
   
      this.messageService.add({ severity: 'success', summary: 'Sucess', detail: res?.message || 'Metrics details fetched successfully' });
      this.loader= false
  
      
    },
    error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
      this.loader=false
    }
  })}else{

  }
}
getFunctionList(){
  this.loader=true
  this.processService.getFunctioList().subscribe({
    next: (res: any) => {
      console.log("cr")
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , name:x.name}})
      }
      
            this.functionList =  res|| [];;
        this.loader=false
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
  // this.loader=true
  this.processService.getsubFunctioList(id).subscribe({
    next: (res: any) => {
      console.log("cr")
      if(res?.length){
        res= res?.map((x:any)=>{return {id:x.id , name:x.name}})
      }
      
            this.subFunctionList =  res|| [];;
        this.loader=false
        console.log(this.subFunctionList,"metricCategoryList")
  
    },
    error: (err: any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader=false
  }
  })
}
CanDelete(event){
  
  this.confirmationService.confirm({
    target:event.target,
    message: 'Are you sure you want to delete this Metric?',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        //confirm action
      this.deleteMetrics()
      
    },
    reject: () => {
        //reject action
    }
});
}
deleteMetrics(){
  this.loader=true
  this.metricsService.deletemetrics(this.Metricsmodel.metricsId).subscribe({
    next: (res: any) => {
      console.log("cr")
      this.loader=false
     this.closedmet.emit()
  
    },
    error: (err: any) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader=false
  }
  })
}
close(){
  this.closedmet.emit();
}
change(e){
  console.log(this.Metricsmodel.location,'locchange')
}
disableTable=false
onGoalChange(e){
// this.Metricsmodel.noGoal = e.target?.checked
console.log(this.Metricsmodel.noGoal)
if(this.Metricsmodel.noGoal){
this.Metricsmodel.lowerValue = ''
this.Metricsmodel.upperValue = ''
this.Metricsmodel.target = ''
this.Metricsmodel.lowerThreshold = ''
this.Metricsmodel.upperThreshold = ''
// this.data[0].LL= null
// this.data[0].UL=''
// this.data[0].UTL=''
// this.data[0].LTL=''
// this.data[0].GOAL=''
// this.Metricsmodel.lowerValue == ''
this.disableTable= true

}else{
  this.Metricsmodel.lowerValue = 0
this.Metricsmodel.upperValue = 0
this.Metricsmodel.target = 0
this.Metricsmodel.lowerThreshold = 0
this.Metricsmodel.upperThreshold = 0
  this.disableTable=false
}
}
onInputChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  let inputValue = inputElement.value;

  // Use a regular expression to check if the input is a single-digit number (0-9)
  const isValidInput = /^[0-9]$/.test(inputValue);

  // Check if more than one digit has been entered
  const isMultiDigit = inputValue.length > 1;

  // Check if any alphabetic characters are present
  const hasAlphabets = /[a-zA-Z]/.test(inputValue);

  // If the input is not valid or more than one digit is entered or alphabets are present, revert to the last valid value (the first character)
  if (!isValidInput || isMultiDigit || hasAlphabets) {
    inputValue = inputValue.charAt(0); // Keep only the first character
    inputElement.value = inputValue; // Set the cleaned value
  }

  // Update your model with the current input value
  this.Metricsmodel.hashValue = inputValue;
}

// Add an additional check to disallow alphabetic characters
// @HostListener('keypress', ['$event'])
onKeyPress(event: KeyboardEvent) {
  const charCode = event.which || event.keyCode;
  if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
    event.preventDefault();
  }
}
}
