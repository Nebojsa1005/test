import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'test';

  constructor(
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private authService: AuthService
  ) { }



  ngAfterViewInit() {
    this.authService.errorMessage.subscribe(data => {
      if (data.length > 0) {
        this.messageService.add({ key: 'myKey2', severity: 'error', summary: 'Error', detail: data });
        setTimeout(() => {
          this.messageService.clear();
        }, 4000)
        this.cd.detectChanges()
      }
    })
  }
}
