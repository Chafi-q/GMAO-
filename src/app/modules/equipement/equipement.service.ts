import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {
  private machinesUrl = 'http://localhost:3050/machines';

  constructor(private http: HttpClient) { }

  fetchMachines(): Observable<any[]> {
    return this.http.get<any[]>(this.machinesUrl);
  }
  addMachine(tache: any): Observable<any> {
    return this.http.post<any>(this.machinesUrl, tache);
  }
  deleteMachine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.machinesUrl}/${id}`);
  }

}
