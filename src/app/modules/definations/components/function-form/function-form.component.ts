import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ProcessService } from 'src/app/modules/governance/services/process.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-function-form',
  templateUrl: './function-form.component.html',
  styleUrls: ['./function-form.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FunctionFormComponent implements OnInit {
  
  inputData: any= [];
  dataexchanger:any=[];
  forcollapse:any=[]; 
  subgrouplist:any[]=[];
  id:any=[];
  expandedRowId: any=null;
  rowData: any; 
  menuItems: MenuItem[] = []
  details: any = [];
  list: any = [];
  new: any = [];
  expanded: boolean = true;
  selectedDropdownValues: any = [];
  dropdownOptions: any[] = []
  yourDropdownOptionsArray: any[] = [];
  data: any[] = [
    { functionGroup: '', subfunctionGroup: '' }
  ];
  functionName: string = ''; 
  functionDescription: string = '';
  constructor(private ProcessService: ProcessService) {
    this.menuItems = [
      { label: 'Definitions', url: '#/definitions', target: '_self' },
      { label: 'Function', url: '#/definitions/function', target: '_self' },
    ]
  }
  ngOnInit(): void {
    this.getfungroupdata()
    this.getsubfun()
    // this.getfungroupbyid()
  }

  getfungroupdata() {
    this.ProcessService.getFunctioList().subscribe((res) => {
      this.data = res;
      this.yourDropdownOptionsArray = this.data.map((item) => ({
        id:item.id,
        label: item.name,
        value: item.value
      }));


    });
  }

      
      shouldShowExpandedIcon(rowData: any) {
        if (this.expandedRowId === null) {
          this.expandedRowId = rowData.id;
          // Make the API call for the selected value
          this.ProcessService.getsubFunctioList(rowData.id).subscribe((res)=>{
            this.subgrouplist=res.map((item)=>item.name)
          })
        } else if (this.expandedRowId === rowData.id) {
          this.expandedRowId = null;
        }
      }
      // updateInput(selectedValue: any) {
      //   if (selectedValue) {
      //     this.ProcessService.getsubFunctioList(selectedValue).subscribe((res) => {
      //       this.dataexchanger = res[0];
      //       this.forcollapse = res;
      //       this.subgrouplist = this.forcollapse.map((item) => item.name);
      //     });
      //   }
      // }      
    addItemToSubfunctionGroup() {
      if (this.inputData && this.selectedDropdownValues && this.selectedDropdownValues.id) {
        const payload = {
          
            "active": 1,
            "createdAt": null,
            "createdBy": "admin",
            "deleted": 0,
            "lastModifiedBy": null,
            "modifiedAt": null,
            "name": this.inputData,
            "description": "test descritption",
            "functionGroup": {
                "id": this.selectedDropdownValues.id
            }
        
        };
        
        this.ProcessService.Addnewfunciondata(payload).subscribe((res) => {
          console.log("API response:", res);
        });
    
        console.log("Input data:",  this.inputData);
      } else {
        console.log("Data or ID is missing.");
      }
    }
    

// getfungroupbyid(data?:any){
// this.ProcessService.getsubFunctioList(data).subscribe((res)=>{

// })
// }
  getsubfun() {
    this.ProcessService.getsubfunctionlist().subscribe((res) => {
      this.list = res
    })
  }

  adddata() {
    let payload = {
      "id": null,
      "active": true,
      "createdAt": null,
      "createdBy": null,
      "deleted": false,
      "lastModifiedBy": null,
      "modifiedAt": null,
      "name": this.functionName,
      "description": this.functionDescription,
      "colorId": 1,
      "applicationId": null,
      "organizationId": null
    }

    this.ProcessService.Addnewfunciondata(payload).subscribe((res:any)=>{
      this.getfungroupdata();
      this.functionName = '';
      this.functionDescription = '';
    })

}


}

