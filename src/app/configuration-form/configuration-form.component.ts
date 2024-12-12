import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TicketService } from '../service/ticket.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgIf,
  ],
  styleUrls: ['./configuration-form.component.css'],
})
export class ConfigurationFormComponent {
  @Input() configSubmitted: boolean = false;
  @Output() configSubmittedChange = new EventEmitter<boolean>();
  @Output() configSubmittedEvent = new EventEmitter<{
    totalTickets: number;
    ticketReleaseRate: number;
    customerRetrievalRate: number;
    maxTicketCapacity: number;
  }>();

  totalTickets!: number;
  ticketReleaseRate!: number;
  customerRetrievalRate!: number;
  maxTicketCapacity!: number;

  constructor(private ticketService: TicketService) {}

  onSubmit() {
    const config = {
      totalTickets: this.totalTickets,
      ticketReleaseRate: this.ticketReleaseRate,
      customerRetrievalRate: this.customerRetrievalRate,
      maxTicketCapacity: this.maxTicketCapacity,
    };

    this.ticketService.submitTicketConfig(config).subscribe(
      (response: any) => {
        console.log('Config submitted successfully:', response);
        this.configSubmitted = true;
        this.configSubmittedChange.emit(this.configSubmitted);
        this.configSubmittedEvent.emit(config);
      },
      (error: any) => {
        console.error('Error submitting config:', error);
      }
    );
  }
}
