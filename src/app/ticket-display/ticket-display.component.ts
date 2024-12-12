// ticket-display.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { PollingService } from '../service/polling-service';

@Component({
  selector: 'app-ticket-display',
  templateUrl: './ticket-display.component.html',
  styleUrls: ['./ticket-display.component.css'],
  standalone: true
})
export class TicketDisplayComponent implements OnInit {
  availableTickets: number = 0;
  logs: string[] = [];
  socket: WebSocket | null = null;
  reconnectInterval = 5000; // 5 seconds

  constructor(private pollingService: PollingService<number>) {}

  ngOnInit(): void {
    this.pollingService.subscribe({
      url: 'http://localhost:8080/api/ticket-status/',
      callback: (value) => {
        console.log(value);
        this.availableTickets = value;
        this.logs.push(`Available tickets: ${value}`);
      }
    });
  }
}
