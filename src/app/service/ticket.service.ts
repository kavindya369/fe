import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:8080/api/ticket-config';
  private actionUrl = 'http://localhost:8080/api/ticket-action';

  constructor(private http: HttpClient) {}

  // Submit ticket configuration
  submitTicketConfig(config: any): Observable<any> {
    return this.http.post(this.apiUrl, config);
  }

  // Fetch ticket configuration
  getTicketConfig(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Start ticket process
  startTicketProcess(releaseRate: number): Observable<any> {
    return this.http.post(`${this.actionUrl}/start`, { releaseRate });
  }

  // Stop ticket process
  stopTicketProcess(): Observable<any> {
    return this.http.post(`${this.actionUrl}/stop`, {});
  }

  // Reset ticket process
  resetTicketProcess(): Observable<any> {
    return this.http.post(`${this.actionUrl}/reset`, {});
  }
}
