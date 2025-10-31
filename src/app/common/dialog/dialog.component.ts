import { Component } from '@angular/core';
import { DialogModule } from "primeng/dialog";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  visible: boolean = false;

  title = 'Consultation Details';

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}
