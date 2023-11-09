import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricsDataService {
apiUrl = environment.apiBaseUrl
casbaseUrl=environment.casBaseUrl
filePath = environment.casFileUploadPath
  constructor(private http: HttpClient) { }

  getReportingTrendList()
  {
    return this.http.get(`${this.apiUrl}/api/reporting-trend`);
  }
 
  getMetricsbySearch(functionGroupId: number | null = null, ownerFunctionId: number | null = null, processId: number | null = null, parentProcessId: number | null = null): Observable<any> {
    // Create a new HttpParams object to build the query parameters
    const apiUrlSerch = `${this.apiUrl}/api/metrics`;
    let params = new HttpParams();

    // Add parameters only if they are not null or undefined
    if (functionGroupId !== null && functionGroupId !== undefined) {
      params = params.append('functionGroupId', functionGroupId.toString());
    }
    if (ownerFunctionId !== null && ownerFunctionId !== undefined) {
      params = params.append('ownerFunctionId', ownerFunctionId.toString());
    }
    if (processId !== null && processId !== undefined) {
      params = params.append('processId', processId.toString());
    }
    if (parentProcessId !== null && parentProcessId !== undefined) {
      params = params.append('parentProcessId', parentProcessId.toString());
    }

    // Construct the API URL with the optional parameters
   

    // Make the HTTP GET request with the constructed URL and query parameters
    return this.http.get(apiUrlSerch, { params: params });
  }
  // uploadFilea(file: File) {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   // Send a POST request to upload the file
  //   return this.http.post(`${this.apiUrl}/api/files/upload`, formData);
  // }

  // downloadFile(fileName: string) {
  //   // Send a GET request to download the file
  //   return this.http.get(`${this.apiUrl}/api/files/download/${fileName}`, { responseType: 'arraybuffer' });
  // }
  saveDataEntryForm(payload){
    return  this.http.post<any>(`${this.apiUrl}/api/guage-metrics`,payload );

  }
  // process//owner/{ownerId}

  getProcessbySubFunctionId(subFunctionId){
 
      return this.http.get<any>(`${this.apiUrl}/api/process/owner/${subFunctionId}`)
    
  }

  downloadFileByUrl(url: any) {

    const urls = `${this.casbaseUrl}/ges_document_management/v1/api/document/fileLink?fileType=AWSS3&path=${url}`;

    return this.http.post(urls, {});
}
uploadFile(file:any) {
    const formData = new FormData();
    formData?.append('file', file, file?.name);
    const url = `${this.casbaseUrl}/ges_document_management/v1/api/document/upload?fileType=AWSS3&path=${environment.casFileUploadPath}`;
    //const url ='http://52.71.81.238:9090/ges_document_management/v1/api/document/upload?fileType=AWSS3&path=Guid';
    return this.http.post(url, formData);
}
GetAllGuageMetrics(){
  return  this.http.get<any>(`${this.apiUrl}/api/guage-metrics`);
} 
getGuagemetricsById(id){
  return  this.http.get<any>(`${this.apiUrl}/api/guage-metrics/${id}`)
}
editGuageMetrics(id,paylod){
  return  this.http.put<any>(`${this.apiUrl}/api/guage-metrics/${id}`,paylod)
}
}

  

