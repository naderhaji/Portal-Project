import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss']
})
export class StatusDialogComponent {
  @Input() status!: string;

  constructor(public modal: NgbActiveModal) {}
  ngOnInit(): void {
    console.log('testtttt',this.status=='success',this.status=='fail')
  }
}
