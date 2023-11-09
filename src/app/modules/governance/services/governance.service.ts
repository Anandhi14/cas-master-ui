import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GovernanceService {
  apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getProcessCount(){
    return this.http.get<any>(`${this.apiUrl}/api/process/count`);
  }
  getMetricsCount(){
    return this.http.get<any>(`${this.apiUrl}/api/metrics/count`);
  }
}
