import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PollingService<T> {
  constructor(private httpClient: HttpClient) {

  }

  isRunning: boolean = false;

  async subscribe(args: { callback: (response: T) => void, url: string }): Promise<void> {
    this.isRunning = true;

    while (this.isRunning) {
      this.httpClient.get<T>(args.url).subscribe(
        value => {
          args.callback(value);
        }
      )

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
