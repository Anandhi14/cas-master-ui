import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MetricsDataService } from './metrics-data.service';
import { ProcessService } from 'src/app/modules/governance/services/process.service';
import { MetricsService } from 'src/app/modules/governance/services/metrics.service';

@Component({
  selector: 'app-metrics-data-form',
  templateUrl: './metrics-data-form.component.html',
  styleUrls: ['./metrics-data-form.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class MetricsDataFormComponent implements OnInit {
  someMethodThatShouldTriggerConfirmation() {
    throw new Error('Method not implemented.');
  }
  ItemList(ItemList: any) {
    throw new Error('Method not implemented.');
  }
  SavePayload:PayloadMasterdata
  menuItems:MenuItem[]=[]
  isDesktopDevice=true;
  popupModelWidth: string;
  popupModelTop: string;
  popupModelHeight: string;
  loader=false
  showPopup=false
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
  label: any;
fileAttachmentLink=''
  selectedMetrics
  disabledatainput= true
  MetricsFilterData:MetricsData=
  {} as MetricsData
  functionList=[
   

  ]
  subFunctionList=[ 
  
  ]
  ProcessList=[
  
  ]
  subProcessList=[
  
  ]
  metricsList=[]
  allGuageMetrics=[]
  data: any[] = [
    { "LTL": 10, "LL": 20, "GOAL": 30, "UL": 40, "UTL": 50 },
    // Add more data rows here
  ];
  reportingTrendList=[]
  @ViewChild('fileInput') fileInput: ElementRef; // Reference to the file input element
  downloadLink: string;
  calculationcurrenciesList: any;
  reportingformatsList: any;
  reportingfrequenciesList: any;
  RefrenceObj :reference ={} as reference
  dataInput :DataInput ={} as DataInput
  manPowerColor: any;
  processColor: any 
  techColor: any 
  dataColor: any 
  innovationColor: any 
  constructor(private confirmationService: ConfirmationService,  private cdr: ChangeDetectorRef,  private messageService:MessageService, private dataService:MetricsDataService ,private processService:ProcessService,private metricsService:MetricsService ) { 

    this.menuItems =[
      { label: 'Assets',url:'#/assets',target:'_self' },
      { label: 'tools & App',url:'#/assets/tools&apps',target:'_self' },
      { label: 'guage',url:'#/assets/guage',target:'_self' },
    ]
  }

  ngOnInit(): void {
   
    this.getFunctionList()
    this.getReportingTrend()
    this.getAllreportingfrequencys()
    this.getAllcalculationcurrencys()
    this.getAllreportingformats()
    this.geetAllGuageMetrics()
    // this. getAllProcess()

  }
  ngDoCheck(
  ){
    console.log('man', this.manPowerColor,
      'procc',this.processColor ,
      'tech',this.techColor,
      'data',this.dataColor,
      'inn',this.innovationColor)
  }

  Save(

  ){

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
openFileInput() {
  // Trigger a click event on the hidden file input element
  this.fileInput.nativeElement.click();
}

handleFileSelect(e: any) {
  // const selectedFile = (event.target as HTMLInputElement).files[0];
  // if (selectedFile) {
  //   console.log('Selected file:', selectedFile);
  //   this.dataInput.Attachment= selectedFile?.name
    
  //   // Call the uploadFile function from your file service
  //   this.dataService.uploadFile(selectedFile).subscribe(response => {
  //     // Handle the response from the server, if needed.
  //     console.log('Upload response:', response);
  //   });
  // }
  this.loader=true
  console.log( e?.target?.files?.length)
  if ( e?.target?.files?.length) {
    if (e?.target?.files[0]?.size > (1024 * 1024 * 5)) {
      this.loader=false
      this.messageService.add({severity:'error', summary: '', detail: 'Maximum allowed file size is 5MB'});
      // this.supportDataForm.controls['supportingAttachment'].setValue('')
      this.fileAttachmentLink =''
      return;
    }

    this.dataService.uploadFile(e.target.files[0]).subscribe(
  
      (event: any) => {
        this.loader=false
        if (event) {

           this.dataService.downloadFileByUrl(event.data).subscribe(
            (eventD: any) => {
         console.log(eventD.data)
        //  this.fileAttachmentLink=eventD.data
         this.dataInput.Attachment=eventD.data
         this.messageService.add({ severity: 'success', summary: 'success', detail: 'Attachment successfully uploaded'});

             })
        }
        console.log( e?.target?.files)
      },
      (err: any) => {
        this.loader=false
        this.messageService.add({ severity: 'error', summary: 'error', detail: err?.message?.toString() || 'Please try after sometime' });
      });
  }
  else{
    // this.formPersona.controls[fieldName].setValue( "");
    this.dataInput.Attachment=''
    this.loader=false
  }
}

downloadFile(fileName: string) {
  // Call the downloadFile function from your file service
  // this.dataService.downloadFile(fileName).subscribe(response => {
  //   // Set the download link with the response data
  //   const blob = new Blob([response], { type: 'application/octet-stream' });
  //   this.downloadLink = window.URL.createObjectURL(blob);
  // });
        //   if (event) {

        //    this.dataService.downloadFileByUrl(fileName).subscribe(
        //     (eventD: any) => {
        //       // this.formPersona.controls[fieldName].setValue( eventD.data);
        //       console.log(eventD,'gg')
           
        //      })
        // }
}

// Add a method to trigger the download link
triggerDownload() {
  document.getElementById('downloadLink').click();
}

selctionPopup(option:any,name:any,selectedOption:any,label:any){
    
  this.filterValue ='';
  this.cdr.detectChanges();
  this.popupModelWidth =this.UpstreamBox.nativeElement?.offsetWidth+57+'px';
  this.popupModelTop =(11+this.UpstreamBox.nativeElement?.offsetTop)-15+'px';
  this.popupModelHeight =(this.processDetailPopup.nativeElement?.offsetHeight -90)+'px';
  this.sequencePopupHeight =(this.processDetailPopup.nativeElement?.offsetHeight -26)+'px';
  this.sequencePopupListHeight =(this.processDetailPopup.nativeElement?.offsetHeight -174)+'px';
  this.popupModelPopupHeight =(this.processDetailPopup.nativeElement?.offsetHeight )+'px';
  this.popupModelLeftSide = (this.UpstreamBox.nativeElement.offsetLeft+666)+'px';
  this.popupModelrightSide = (this.processDetailPopup.nativeElement?.offsetLeft+732)+'px';
  this.selectPopup=false
  this.options=[]
  this.selectedOptions=selectedOption?selectedOption:null

  if(name==""){
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
  if(this.popupHeader=="function"){
    this.selectPopup=false
    this.popupHeader=""
     this.MetricsFilterData.function=e.value
     this.MetricsFilterData.subFunction=null
     this.onFunctionChange(this.MetricsFilterData.function?.id)
     this.getMetricsBySearch()
      // console.log(e.value,'ee',this.Processmodel.owner)
      // console.log(this.Processmodel,'ff popup')
      // this.ownerSelectChange(e.value)
      
    }else if(this.popupHeader=="Process"){
      this.options=[]
      this.selectPopup=false
      this.popupHeader=""
     this.MetricsFilterData.process=e?.value
     this.MetricsFilterData.subProcess=null
     this.subProcessList=e?.value?.subProcess?.map((x:any)=>{return {id:x.id , name:x.processName, ...x}})
console.log(e.value)
    //  this.Processmodel.parentProcess=e.value
      // console.log(e.value[0],'ee',this.model.owner)
      // this.ownerSelectChange(e.value)
      this.getMetricsBySearch()
    }else if(this.popupHeader=="subFunction"){
      this.options=[]
      this.selectPopup=false
      this.popupHeader=""
     this.MetricsFilterData.subFunction=e.value
     this.MetricsFilterData.process=null
     this.MetricsFilterData.subProcess=null
     this.getAllProcess(e.value.id)
     this.getMetricsBySearch()
    }else if(this.popupHeader=="subProcess"){
      this.options=[]
      this.selectPopup=false
      this.popupHeader=""
     this.MetricsFilterData.subProcess=e.value
     
     this.getMetricsBySearch()
    }
}

getReportingTrend(){
  
    this.loader=true
    this.dataService.getReportingTrendList().subscribe({
      next: (res: any) => {
        console.log("cr")
        // if(res?.length){
        //   res= res?.map((x:any)=>{return {id:x.id , metricName:x.metricName}})
        // }
        // this.loader=false
          this.reportingTrendList = res|| [];
          console.log(this.reportingTrendList,"metricCategoryList")
        
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader=false
      }
    })
  }
  getAllreportingfrequencys(){
    this.loader=true
    this.metricsService.getAllreportingfrequencys().subscribe({
      next: (res: any) => {
        console.log("")
        
          this.reportingfrequenciesList = res|| [];
          console.log(this.reportingfrequenciesList,"reportingfrequenciesList")
          this.loader=false
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
    this.processService.getsubFunctioList(id).subscribe({
      next: (res: any) => {
        console.log("cr")
        if(res?.length){
          res= res?.map((x:any)=>{return {id:x.id , name:x.name}})
        }
        
              this.subFunctionList =  res|| [];
          this.loader=false
          console.log(this.subFunctionList,"metricCategoryList")
    
      },
      error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
          this.loader=false
    }
    })
  }
  getAllProcess(subFunctionId){
    this.loader=true
    this.dataService.getProcessbySubFunctionId(subFunctionId).subscribe({
      next: (res: any) => {
        console.log("cr")
        if(res?.length){
          res= res?.map((x:any)=>{return {id:x.id , name:x.processName, ...x}})
        }
        
              this.ProcessList =  res|| [];;
          this.loader=false
          console.log(this.ProcessList,"metricCategoryList")
    
      },
      error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
          this.loader=false
    }
    })
  }

getMetricsBySearch(){
  this.dataService.getMetricsbySearch(this.MetricsFilterData?.function?.id, this.MetricsFilterData?.subFunction?.id,this.MetricsFilterData?.process?.id,this.MetricsFilterData?.subProcess?.id ).subscribe({

    next: (res: any) => {
        console.log("cr")
        // if(res?.length){
        //   res= res?.map((x:any)=>{return {id:x.id , name:x.metricName, ...x}})
        // }
        
              this.metricsList =  res|| [];;
          this.loader=false
          console.log(this.metricsList,"metricCategoryList")
    
      },
      error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
          this.loader=false
    }
    })
    // Handle the API response here

}
showManPower=true
showProcess=true
showTech=true
showData=true
showInnovation=true
// showManPower=true
onMetricsClick(event){
  console.log(event?.value)
  if(event?.value !==null){
    this.disabledatainput=false
  this.selectedMetrics=event?.value
  this.RefrenceObj.reportingFrequency= this.selectedMetrics?.reportingFrequency
  this.RefrenceObj.calculation= this.selectedMetrics?.calculation
  this.RefrenceObj.reportingFormat= this.selectedMetrics?.reportingFormat
  this.RefrenceObj.calculationMethod= this.selectedMetrics?.calculationMethod
  this.RefrenceObj.autoCalculation= this.selectedMetrics?.autoCalculation
  this.RefrenceObj.target= this.selectedMetrics?.target
  this.RefrenceObj.upperThreshold= this.selectedMetrics?.upperThreshold
  this.RefrenceObj.lowerThreshold= this.selectedMetrics?.lowerThreshold
  this.RefrenceObj.LL= this.selectedMetrics?.lowerValue
  this.RefrenceObj.goalcheck= this.selectedMetrics?.noGoal
  this.RefrenceObj.UL= this.selectedMetrics?.upperValue
  this.RefrenceObj.hashValue= this.selectedMetrics?.hashValue
  // this.fileAttachmentLink = this.selectedMetrics?.attachmentName
 this.showManPower= this.selectedMetrics?.metricEnablers?.find((x)=>x?.id==2) ? true:false
 this.showProcess= this.selectedMetrics?.metricEnablers?.find((x)=>x?.id==3) ? true:false
 this.showTech= this.selectedMetrics?.metricEnablers?.find((x)=>x?.id==4) ? true:false
 this.showData= this.selectedMetrics?.metricEnablers?.find((x)=>x?.id==5) ? true:false
 this.showInnovation= this.selectedMetrics?.metricEnablers?.find((x)=>x?.id==6) ? true:false
 
  }
  else{
    // let fileInput1: any = document.querySelector('#fileAtt');
  //   fileInput1.files = ''
  //  console.log(fileInput1,'elelmen' )
    this.disabledatainput=true
  }
 
   


  }
  mapColorsToMetricColorMappings(): void {
    this.SavePayload.metricColorMappings = {
     
      "1": {
        colorId: this.manPowerColor?.Id,
        colorName: this.manPowerColor?.colorName,
        bgColor:'#7FFFD4' , // Set the selected color here
        metricsEnabler: {
          id: 1,
          enablerName: "Tools",
        },
      },
      "2": {
        colorId: this.manPowerColor?.Id,
        colorName: this.manPowerColor?.colorName,
        bgColor:'#7FFFD4' , // Set the selected color here
        metricsEnabler: {
          id: 2,
          enablerName: "People",
        },
      },
      "3": {
        colorId: this.processColor?.Id,
        colorName: this.processColor?.colorName,
        bgColor:'#7FFFD4' , // Set the selected color here
        metricsEnabler: {
          id: 3,
          enablerName: "Process",
        },
      },
      "4": {
        colorId: this.techColor?.Id,
        colorName: this.techColor?.colorName,
        bgColor:'#7FFFD4' , // Set the selected color here
        metricsEnabler: {
          id: 4,
          enablerName: "Technology",
        },
      },
      "5": {
        colorId: this.dataColor?.Id,
        colorName: this.dataColor?.colorName,
        bgColor:'#7FFFD4' , // Set the selected color here
        metricsEnabler: {
          id: 5,
          enablerName: "Data",
        },
      },
      "6": {
        colorId: this.innovationColor?.Id,
        colorName: this.innovationColor?.colorName,
        bgColor:'#7FFFD4' , // Set the selected color here
        metricsEnabler: {
          id: 6,
          enablerName: "Innovation",
        },
      },
      // Repeat for other metric enablers
    };
  }
  saveDataEntryForm(){
    let colorArr=[]
    if(this.selectedMetrics.metricEnablers?.find((x)=>x?.id==this.manPowerColor?.enablerId)){
      colorArr.push(this.manPowerColor)
    }else {}if(this.selectedMetrics.metricEnablers?.find((x)=>x?.id==this.processColor?.enablerId)){
      colorArr.push(this.processColor)
    }else{} if(this.selectedMetrics.metricEnablers?.find((x)=>x?.id==this.techColor?.enablerId)){
      colorArr.push(this.techColor)
    }else{} if(this.selectedMetrics.metricEnablers?.find((x)=>x?.id==this.dataColor?.enablerId)){
      colorArr.push(this.dataColor)
    }else{} if(this.selectedMetrics.metricEnablers?.find((x)=>x?.id==this.innovationColor?.enablerId)){
      colorArr.push(this.innovationColor)
    }else{} if(this.selectedMetrics.metricEnablers?.find((x)=>x?.id==1)){
colorArr.push(  {
  "enablerId": 1,
  "colorId": 1,
  "colorName": "Dark Orange",
  "bgColorCode": "#F78625"
})
    }else{
     
    }
    
    this.SavePayload={
      associatedWith: {
        "id": this.selectedMetrics?.id,
        "metricName": this.selectedMetrics?.metricName},
       
      reportingTrend: this.dataInput?.reportedTrend ,
      reportingPeriod:this.dataInput?.reportingPeriod ||{
        "id": 1,
        "name": null
    },
      reportedValue:this.dataInput?.reportedValue ,
      comment: this.dataInput?.comment,
    
      calculation: this.RefrenceObj.calculation,
      autoCalculation: this.RefrenceObj?.autoCalculation ,
      autoSource:this.RefrenceObj?.autoCalculation ,
      reportingFormat:this.RefrenceObj?.reportingFormat ,
      calculationMethod: this.RefrenceObj?.calculationMethod ,
      reportingFrequency: this.RefrenceObj.reportingFrequency ,
      // noGoal:this.RefrenceObj.goalcheck ||false,
      lowerThreshold:this.RefrenceObj?.lowerThreshold ,
      upperThreshold:this.RefrenceObj?.upperThreshold ,
      isActive:this.selectedMetrics?.isActive ?true :false ,
      attachmentName:this.dataInput.Attachment?.length ? this.dataInput?.Attachment: '',
      target:this.RefrenceObj?.target, 
      metricColorMappings:colorArr,
 
      "metricCategory":this.selectedMetrics?.metricCategory ,
      "metricImpactAreas" :this.selectedMetrics?.metricImpactAreas,
      "metricEnablers":this.selectedMetrics?.metricEnablers,
      "location":this.selectedMetrics?.location,
      "owner":this.selectedMetrics?.owner,
      lowerValue:this.selectedMetrics.lowerValue,
      upperValue:this.selectedMetrics.upperValue,
      noGoal:this.selectedMetrics.noGoal,
      hashValue:this.selectedMetrics.hashValue
    
 
    }
    // this.mapColorsToMetricColorMappings();

    console.log(this.SavePayload)
    this.loader=true
    this.dataService.saveDataEntryForm(this.SavePayload).subscribe({
      next: (res: any) => {
        console.log(res)
        
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'saved successfully' });
        this.showPopup =false
        this.geetAllGuageMetrics()
          // console.log(this.reportingTrendList,"metricCategoryList")
          this.loader=false
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader=false
      }
    })
  }
  getmetricsMaster(id){
    // let id = event?.value?.id
    if(id){
      this.loader=true
    this.metricsService.getMetricsMaster(id).subscribe({
      next: (res: any) => {
       console.log(res,'res')
        // if(res){
          
        //    this.Metricsmodel.metricsName= res?.metricName;
        //    this.Metricsmodel.metricsId= res?.id;
        //    this.Metricsmodel.description= res?.description;
        //   // res?.responsibility: "John Doe",
        //   this.Metricsmodel.activeMetrics=res?.active,
        //   // res?.deleted: false,
        //   this.Metricsmodel.calculation=res?.calculation,
        //   this.Metricsmodel.controlMetric=res?.controlMetric,
        //   this.Metricsmodel.dataSource=res?.dataSource,
        //   // res?.gloverseMetricId: "XYZ123",
        //   this.Metricsmodel.lowerThreshold= res?.lowerThreshold,
        //   this.Metricsmodel.target= res?.target
        //   this.Metricsmodel.upperThreshold= res?.upperThreshold,
        //   // res?.isActive: "Yes",
        //   // res?.metricGroupId: "ABC456",
        //   this.Metricsmodel.Benchmark=res?.referenceBenchmark,
        //   this.Metricsmodel.criticality=res?.criticality,
        //   this.Metricsmodel.usedFor=res?. applicableTo
        //   this.Metricsmodel.calculationCurrencies=res?.calculationMethod,
        //   this.Metricsmodel.location=res?.location,
        //   this.Metricsmodel.owner=res?.owner
        //   this.Metricsmodel.function= res?.owner?.functionGroup
        //   this.Metricsmodel.maturityLevel=res?.maturityLevel,
        //   this.Metricsmodel.reportingformats=res?.reportingFormat,
        //   this.Metricsmodel.reportingfrequency=res?.reportingFrequency,
        //   this.Metricsmodel.AggregationType=res?.aggregationType,
        //   this.Metricsmodel.group=res?.group,
        //   this.Metricsmodel.matricCategory=res?.metricCategory,
        //   this.Metricsmodel.impectArea=res?.metricImpactAreas,
        //   this.Metricsmodel.enablers=res?.metricEnablers,
        //   this.Metricsmodel.lastModified =res.lastModifiedDate
        //   this.Metricsmodel.autoCalculation= res?.autoCalculation,
        //   this.Metricsmodel.autoSource =res?.autoSource
        
        //   setTimeout(() => {
        //     if(this?.Metricsmodel?.owner){
        //       this.onFunctionChange(this.Metricsmodel?.owner?.functionGroup?.id)
        //     }
        //    }, 1000);
      
        //    this.Metricsmodel.subFunction={id:res?.owner?.id , name:res.owner.name}
         
        // }
          console.log(res,"process get")
          // console.log(this.Metricsmodel,'ff')
       
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
  geetAllGuageMetrics(){
    this.loader=true
    this.dataService.GetAllGuageMetrics().subscribe({
      next: (res: any) => {
        console.log("cr")
      this.allGuageMetrics= res
        
              // this.ProcessList =  res|| [];;
          this.loader=false
          console.log(this.allGuageMetrics,"allGuageMetrics")
    
      },
      error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
          this.loader=false
    }
    })

  }
  openEditPopup(rowdata){
    this.showPopup =true


  }
  onAddClick(){
    this.showPopup =true
  }
close(){
  this.showPopup=false
}
  getGuageMetricsbyId(rowdata){
    this.dataService.getGuagemetricsById(rowdata?.id).subscribe({
      next: (res: any) => {
        console.log("cr")
    console.log(res,'it')
        
              // this.ProcessList =  res|| [];;
          this.loader=false
          // console.log(this.allGuageMetrics,"allGuageMetrics")
    
      },
      error: (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
          this.loader=false
    }
    })


  }
}

export interface MetricsData
{
  function:any,
  subFunction:any,
 process:any,
 subProcess:any,
}
export interface reference
{
  calculation,
  autoCalculation,
  reportingFormat,
  reportingFrequency,
  calculationMethod,
  target,
  upperThreshold,
  lowerThreshold,
  LL,
  UL,
  goalcheck,
  hashValue 
}
export interface DataInput 
{
  reportingPeriod
  reportedTrend
  reportedValue
  Attachment
  comment
  enablers
}

export interface PayloadMasterdata{
  
    // "createdBy": "sampleUser",
    // "createdDate": "2023-09-22T15:21:20.000+00:00",
    // "lastModifiedBy": "sampleUser",
    // "lastModifiedDate": "2023-09-22T15:21:20.000+00:00",
    // "id": 1,
    associatedWith: {
        // "createdBy": null,
        // "createdDate": null,
        // "lastModifiedBy": "System",
        // "lastModifiedDate": "2023-09-22T10:38:39.249+00:00",
        "id": number,
        "metricName": string
    },
    "reportingTrend": any,
    "reportingPeriod":any
    "reportedValue": any,
    "comment": string,
    // "metricEnablersColors": [
    // //   {manPower?:string,
    // //     process?:string,
    // //     technology?:string,
    // //     data?:string,
    // //     innovation?:string
    // // }

    // ],
    "metricColorMappings"?: any
    target:any   
    "calculation"
    "autoCalculation"
    "autoSource",
    "reportingFormat",
    "calculationMethod"
    "reportingFrequency" ,
    "noGoal" ,
    "lowerThreshold",
    "upperThreshold",
    "isActive" ,
    "attachmentName"
    "metricCategory" ,
    "metricImpactAreas" ,
    "metricEnablers",
    "location",
    "owner",
    lowerValue,
    upperValue,
    hashValue
}



