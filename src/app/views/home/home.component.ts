import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Hello', detail: 'And Welcome!!!' });
    setTimeout(() => {
      this.messageService.clear();
    }, 2000)
    this.cd.detectChanges()
  }

}
