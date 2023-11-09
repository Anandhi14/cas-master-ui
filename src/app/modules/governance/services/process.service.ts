import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  apiUrl = environment.apiBaseUrl;
  static  PROCESS_CACHE
  constructor(private http: HttpClient) { }
  getAllCrticality(){
    return this.http.get<any>(`${this.apiUrl}/api/criticality`);
  }
  getMetricCategory(){
    return this.http.get<any>(`${this.apiUrl}/api/metric-category`);

  }
  getImpactAreas(){
    return this.http.get<any>(`${this.apiUrl}/api/metric-impact-areas`);
 
  }
  getEnablers(){
    return this.http.get<any>(`${this.apiUrl}/api/metrics-enablers`);

  }
  getOwnerFunction(){
    return this.http.get<any>(`${this.apiUrl}/api/owner-function`);

  }
  getMetrics(){
    return this.http.get<any>(`${this.apiUrl}/api/metrics`);

  }
 getParentProcess(){
    return this.http.get<any>(`${this.apiUrl}/api/process`)
  }
  saveProcessMaster(payload){
    return this.http.post<any>(`${this.apiUrl}/api/process`,payload);
 
  }
  editProcessMaster(payload,id){
    return this.http.put<any>(`${this.apiUrl}/api/process/${id}`,payload);
 
  }
  getProcessMaster(id:number){
    return this.http.get<any>(`${this.apiUrl}/api/process/${id}`);

  }
  getFunctioList(){
    return this.http.get<any>(`${this.apiUrl}/api/function-groups`);
  }

Addnewfunciondata(payload){
  return this.http.post(`${this.apiUrl}/api/function-groups`,payload
  )
}
  getsubfunctionlist(){
    return this.http.get(`${this.apiUrl}/api/owner-function`);
  }

addsubfuntionbyid(functionGroupId,payload){
  return this.http.post(`${this.apiUrl}/api/owner-function/by-function-group-id/${functionGroupId}`,payload)

}

  getsubFunctioList(functionGroupId){
    return this.http.get<any>(`${this.apiUrl}/api/owner-function/by-function-group-id/${functionGroupId}`);
  }
  deleteProcess(id){
    return this.http.delete<any>(`${this.apiUrl}/api/process/${id}`);
  }
  getChildActivitiesByids (ids: number[]) {
   
      // Convert the list of IDs to a comma-separated string
      const idsStr = ids?.join(',');
  
      // Construct the URL with query parameters
      const apiUrlWithParams = `${this.apiUrl}/api/process/search?ids=${idsStr}`;
  
      // Make the GET request to the API
      return this.http.get(apiUrlWithParams);
    
  }
  getListingProcess(){
    return this.http.get<any>(`${this.apiUrl}/api/process/by-level/1`);
  }

}
