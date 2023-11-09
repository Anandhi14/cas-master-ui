import { AfterViewInit, Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { LocationService } from '../../Services/location.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class LocationFormComponent implements OnInit {
  fileName
  menuItems: MenuItem[] = []
  @Output() closed: EventEmitter<any>= new EventEmitter();

  @Input() showPopup: any;
  loader = false
  @Input() model: any;
  locationDtails: location = {

  } as location
  PlatformTypes = []
  locationtypes = []
  countryList: any = []
  cityList = []
  constructor(private locationService: LocationService, private messageService: MessageService,private ConfirmationService:ConfirmationService) {
    this.menuItems = [
      { label: 'Definitions', url: '#/definitions', target: '_self' },
      { label: 'Location', url: '#/definitions/location', target: '_self' },
    ]
  }

  ngOnInit(): void {
    this.getallPlatformTypes()
    this.getAllLocationTypes()
    this.getAllCountry()
    this.getAllCities()

    if (this.model?.item?.id) {
      this.getLocationBYId(this.model?.item?.id)
    }
    console.log(this.model)
  }
 
  fileChange(e) {
    this.fileName = e.target.files?.[0].name
  }
  getallPlatformTypes() {
    this.loader = true
    this.locationService.getAllPlatformTypes().subscribe({
      next: (res: any) => {
        // console.log("")

        this.PlatformTypes = res || [];
        console.log(this.PlatformTypes, "calculationcurrenciesList")
        this.loader = false
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader = false
      }
    })
  }


  exportToExcel(){
    const data = [
      {
        'Location Name': this.locationDtails.locationName,
        'Location short name': this.locationDtails.locationShortName,
        'Country': this.locationDtails.country,
        'City': this.locationDtails.city,
        'Location Type': this.locationDtails.locationType,
        'Platform Type': this.locationDtails.platformType,
      }
    ];
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'exported-data.xlsx';
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName);
  }

  getAllLocationTypes() {
    this.loader = true
    this.locationService.getAllLocationTypes().subscribe({
      next: (res: any) => {
        // console.log("")

        this.locationtypes = res || [];
        console.log(this.locationtypes, "calculationcurrenciesList")
        this.loader = false
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader = false
      }
    })
  }
  getAllCountry() {
    this.loader = true;
    this.locationService.getAllCountry().subscribe({
      next: (res: any) => {
        this.countryList = res || [];

        // this.countryList.sort((a, b) => a.name.localeCompare(b.name));

        console.log(this.countryList, "sorted countryList");
        this.loader = false;
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message
        });
        this.loader = false;
      }
    });
  }

  getAllCities() {
    let countryId = this.locationDtails?.country?.id || null
    this.loader = true
    this.locationService.getAllCities(countryId).subscribe({
      next: (res: any) => {
        // console.log("")

        this.cityList = res || [];
        console.log(this.cityList, "calculationcurrenciesList")
        this.loader = false
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader = false
      }
    })
  }
  
  getLocationBYId(id) {
    this.loader = true
    this.locationService.getlocationById(id).subscribe({
      next: (res: any) => {
        // console.log("")
        if (res) {
          this.locationDtails.locationName = res?.name
          this.locationDtails.locationShortName = res?.shortName
          this.locationDtails.country = res?.country
          this.locationDtails.city = res?.city
          this.locationDtails.locationId = res?.id
          this.locationDtails.platformType = res?.platformType
          this.locationDtails.locationType = res?.locationType
        }
        // this.cityList = res|| [];
        console.log(res, "calculationcurrenciesList")
        this.loader = false
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader = false
      }
    })
  }
  saveLocation() {
    if (this.locationDtails.locationId == null || this.locationDtails.locationId == undefined) {
      this.savelocationDetails()
    } else {
      this.updateLoationDetails()
    }
  }
  savelocationDetails() {
    debugger;
    if (this.locationDtails.locationName == null || this.locationDtails.locationName == undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Location Name is required" });

    }
    let payload = {
      "name": this.locationDtails.locationName,
      "shortName": this.locationDtails.locationShortName,
      "country": this.locationDtails.country,
      "city": this.locationDtails.city,
      "platformType": this.locationDtails.platformType,
      "locationType": this.locationDtails.locationType,
      "isActive": this.locationDtails?.isActive ? true : false
    }
    if (this.locationDtails.locationName == null || this.locationDtails.locationName == undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Location name is required' });
      return;

    }
    this.loader = true
    this.locationService.SaveLocation(payload).subscribe({
      next: (res: any) => {
        // console.log("")
        if (res) {
          this.locationDtails.locationName = res?.name
          this.locationDtails.locationShortName = res?.shortName
          this.locationDtails.country = res?.country
          this.locationDtails.city = res?.city
          this.locationDtails.locationId = res?.id
          this.locationDtails.platformType = res?.platformType
          this.locationDtails.locationType = res?.locationType
          this.locationDtails.isActive = res.isActive
        }
        // this.cityList = res|| [];
        console.log(res, "calculationcurrenciesList")
        this.loader = false
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader = false
      }
    })
    

  }
  updateLoationDetails() {
    let id = this.locationDtails?.locationId
    let payload = {
      "id": this.locationDtails?.locationId,
      "name": this.locationDtails.locationName,
      "shortName": this.locationDtails.locationShortName,
      "country": this.locationDtails.country,
      "city": this.locationDtails.city,
      "platformType": this.locationDtails.platformType,
      "locationType": this.locationDtails.locationType,
      "isActive": this.locationDtails?.isActive ? true : false

    }
    this.loader = true
    this.locationService.editLocation(id, payload).subscribe({
      next: (res: any) => {
        // console.log("")
        if (res) {
          this.locationDtails.locationName = res?.name
          this.locationDtails.locationShortName = res?.shortName
          this.locationDtails.country = res?.country
          this.locationDtails.city = res?.city
          this.locationDtails.locationId = res?.id
          this.locationDtails.platformType = res?.platformType
          this.locationDtails.locationType = res?.locationType
          this.locationDtails.isActive = res?.isActive
        }
        // this.cityList = res|| [];
        console.log(res, "calculationcurrenciesList")
        this.loader = false
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader = false
      }
    })

  }

  close()
  {
    //this.showPopup = false;
    this.closed.emit();
  }


  CanDelete(event){

    this.ConfirmationService.confirm({
      target: event.target,
      message: 'Are you sure you want to delete this Location?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          //confirm action
this.deleteLocation()        

      },
      reject: () => {
          //reject action
      }
  });
  
  }

  deleteLocation() {

    this.loader = true
    this.locationService.deleteLoction(this.locationDtails?.locationId).subscribe({
      next: (res: any) => {
        // console.log("")

        this.locationDtails.locationName = res?.name
        this.locationDtails.locationShortName = res?.shortName
        this.locationDtails.country = res?.country
        this.locationDtails.city = res?.city
        this.locationDtails.locationId = res?.id
        this.locationDtails.platformType = res?.platformType
        this.locationDtails.locationType = res?.locationType
        this.locationDtails.isActive = res?.isActive

        // this.cityList = res|| [];
        console.log(res, "calculationcurrenciesList")
        this.loader = false
     this.closed.emit()
        this.messageService.add({ severity: 'success', summary: 'DetailsDeleted', })
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
        this.loader = false
      }
    })

  }
}

export interface location {
  locationName: string
  locationDescription: string
  country
  state: string
  city
  locationShortName
  locationId
  platformType
  locationType
  isActive
} 