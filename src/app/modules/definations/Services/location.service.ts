import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  getAllPlatformTypes(){
    return this.http.get<any>(`${this.apiUrl}/api/platform-types`)
  }
  getAllLocationTypes(){
    return this.http.get<any>(`${this.apiUrl}/api/location-types`)
  }
  getAllCountry(){
    return this.http.get<any>(`${this.apiUrl}/api/countries`)
  }
  getAllCities(countryId){
    return this.http.get<any>(`${this.apiUrl}/api/cities/by-country/${countryId}`)
  }
  SaveLocation(payload){
    return this.http.post<any>(`${this.apiUrl}/api/locations`,payload)
  }
  Addbulkupload(payload){
    return this.http.post<any>(`${this.apiUrl}/api/locations/bulk`,payload)

  }
  editLocation(id,payload){
    return this.http.put<any>(`${this.apiUrl}/api/locations/${id}`,payload)
  }
  getlocationById(id){
    return this.http.get<any>(`${this.apiUrl}/api/locations/${id}`)
  }
  deleteLoction(id){
    return this.http.delete<any>(`${this.apiUrl}/api/locations/${id}`)
  }
  getAllLocations(){
    return  this.http.get(`${this.apiUrl}/api/locations`);
  }
}
