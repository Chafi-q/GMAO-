import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheShedulerService {
  private resources='http://localhost:3050/resources'
  private events='http://localhost:3050/events'





  constructor(private http: HttpClient) { 

   
  }

  fetchResponsable(): Observable<any[]> {
    return this.http.get<any[]>(this.resources);
  }
  fetcheTache():Observable<any[]> {
    return this.http.get<any[]>(this.events);
  }
}
