import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = 'http://localhost:3050/maintenances';

  constructor(private http: HttpClient) { }

  addMaintenance(maintenance: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, maintenance)
      .pipe(
      );
  }

  deleteMaintenance(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
      );
  }
  fetchMaintenances(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        
      );
  }

}
