import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  getFunctioList(getFunctioList: any) {
    throw new Error('Method not implemented.');
  }

  apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  getAllAggregationtypes(){
    return this.http.get<any>(`${this.apiUrl}/api/aggregationtypes`);
  }
  getAlllocations(){
    return this.http.get<any>(`${this.apiUrl}/api/locations`);
  }
  getAllcalculationcurrencys(){
    return this.http.get<any>(`${this.apiUrl}/api/calculationcurrencys`);
  }
  getAllreportingformats(){
    return this.http.get<any>(`${this.apiUrl}/api/reportingformats`);
  }
  getAllreportingfrequencys(){
    return this.http.get<any>(`${this.apiUrl}/api/reportingfrequencys`);
  }
  getAllmaturitylevels(){
    return this.http.get<any>(`${this.apiUrl}/api/maturitylevels`);
  }
  saveMetricsMaster(payload){
    return this.http.post<any>(`${this.apiUrl}/api/metrics`,payload);
 
  }
  getMetricsMaster(id:number){
    return this.http.get<any>(`${this.apiUrl}/api/metrics/${id}`);

  }
  editMetricsMaster(payload,id){
    return this.http.put<any>(`${this.apiUrl}/api/metrics/${id}`,payload);
 
  }
  getAllgroup(){
    return this.http.get<any>(`${this.apiUrl}/api/group`);
  }
  deletemetrics(id){
    return this.http.delete<any>(`${this.apiUrl}/api/metrics/${id}`);
  }
}
