import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private breadCrumb=new BehaviorSubject([]);

  breadCrumbChanged=this.breadCrumb.asObservable()
 
  public  showAddbutton =false;
  public rowData={} as any;

  constructor() { }
  breadCrumbData(data:any){
    this.breadCrumb.next(data)
  
   }

}
