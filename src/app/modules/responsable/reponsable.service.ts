import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  private baseUrl = 'http://localhost:3050';

  constructor(private http: HttpClient) { }

  // Fetch all responsables
  fetchResponsables(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/responsables`);
  }

  // Add a new responsable
  addResponsable(responsable: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/responsables`, responsable);
  }

  // Update an existing responsable
  updateResponsable(id: string, responsable: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/responsables/${id}`, responsable);
  }

  // Delete a responsable
  deleteResponsable(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/responsables/${id}`);
  }

  updateEventsOnServer(events: any[]) {
    const updatedEvents = { rows: events };
    this.http.put(`${this.baseUrl}/resources/`, updatedEvents).subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        console.error("Error updating events array:", error);
      }
    );
  }
}
