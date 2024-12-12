import { Component, Output, EventEmitter } from '@angular/core';
import { TicketService } from '../service/ticket.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  standalone: true,
  imports: [
    MatButton
  ],
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
  @Output() start = new EventEmitter<void>();
  @Output() stop = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  releaseRate: number = 10;

  constructor(private ticketService: TicketService) {}

  onStart() {
    this.ticketService.getTicketConfig().subscribe({
      next: (config) => {

        const releaseRate = config.releaseRate || this.releaseRate;

        this.ticketService.startTicketProcess(releaseRate).subscribe({
          next: () => {
            this.start.emit();
          },
          error: (err) => {
            console.error('Error starting ticket process', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching ticket configuration', err);
      }
    });
  }

  onStop() {
    this.ticketService.stopTicketProcess().subscribe({
      next: () => {
        console.log("Ticket process stopped");
        this.stop.emit();
      },
      error: (err) => {
        console.error('Error stopping ticket process', err);
      }
    });
  }

  onReset() {
    this.ticketService.resetTicketProcess().subscribe({
      next: () => {
        console.log("Ticket process reset");
        this.reset.emit();
      },
      error: (err) => {
        console.error('Error resetting ticket process', err);
      }
    });
  }
}
