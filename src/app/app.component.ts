import { Component, OnInit } from '@angular/core';
import { ConfigurationFormComponent } from './configuration-form/configuration-form.component';
import { TicketService } from './service/ticket.service';
import { TicketDisplayComponent } from './ticket-display/ticket-display.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import {LogDisplayComponent} from './log-display/log-display.component';
import {PollingService} from './service/polling-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  providers: [TicketService,PollingService],
  imports: [ConfigurationFormComponent, TicketDisplayComponent, ControlPanelComponent, LogDisplayComponent],
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  totalTickets = 0;
  availableTickets = 0;
  logs: string[] = [];

  handleConfigSubmission(config: { totalTickets: number; ticketReleaseRate: number; customerRetrievalRate: number; maxTicketCapacity: number }) {
    console.log('Configuration submitted:', config);
    this.totalTickets = config.totalTickets;
    this.availableTickets = config.totalTickets;
    this.logs.push('Configuration updated.');
  }

  onStart() {
    this.logs.push('System started.');
  }

  onStop() {
    this.logs.push('System stopped.');
  }

  onReset() {
    this.logs.push('System reset.');
    this.availableTickets = this.totalTickets;
  }

  ngOnInit(): void {}
}
