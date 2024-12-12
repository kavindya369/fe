import { Component, OnInit } from '@angular/core';
import { PollingService } from '../service/polling-service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-log-display',
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.css'],
  imports: [
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class LogDisplayComponent implements OnInit {
  logs: string[] = [];
  loading: boolean = true;

  constructor(private pollingService: PollingService<string[]>) {}

  ngOnInit(): void {
    this.pollingService.subscribe({
      url: 'http://localhost:8080/api/ticket-status/logs',
      callback: (value) => {
        this.logs = value;
        this.loading = false;
      }
    });
  }
}
