import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private TacheUrl = 'http://localhost:3050/taches';
  private maintenanceTypesUrl = 'http://localhost:3050/maintenanceTypes';
  private machinesUrl = 'http://localhost:3050/machines';
  private responsablesUrl = 'http://localhost:3050/responsables';
  private EventUrl='http://localhost:3050/events/';
 


  constructor(private http: HttpClient) { }

  addTache(tache: any): Observable<any> {
    return this.http.post<any>(this.TacheUrl, tache);
  }
  fetchMaintenanceTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.maintenanceTypesUrl);
  }

  fetchMachines(): Observable<any[]> {
    return this.http.get<any[]>(this.machinesUrl);
  }

  fetchResponsables(): Observable<any[]> {
    return this.http.get<any[]>(this.responsablesUrl);
  }
  fetcheTache():Observable<any[]> {
    return this.http.get<any[]>(this.TacheUrl);
  }

  addEvent(tache: any): Observable<any> {
    return this.http.post<any>(this.EventUrl, tache);
  }
   
  fetchEvent(): Observable<any[]> {
    return this.http.get<any[]>(this.machinesUrl);
  }

  getTaches(): Observable<any[]> {
    return this.http.get<any[]>(this.TacheUrl);
  }

  deleteEvent(id: number): Observable<void> {
    
    return this.http.delete<void>(`${this.EventUrl}/${id}`);
  }

  deleteTache(id: number): Observable<void> {
    this.deleteEvent(id);
    return this.http.delete<void>(`${this.TacheUrl}/${id}`);
  }

}