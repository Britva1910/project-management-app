import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmBodyComponent } from '../confirm/confirm-body.component';
import { ConfirmPromptComponent } from '../prompt/confirm-prompt.component';

@Component({
  selector: 'app-app-confirm',
  templateUrl: './app-confirm.component.html',
  styleUrls: ['./app-confirm.component.scss'],
})
export class AppConfirmComponent {
  title = 'matDialog';

  dataFromDialog: any;

  constructor(private dialog: MatDialog) {}

  confirmDialog() {
    const ref: MatDialogRef<ConfirmBodyComponent> = this.dialog.open(
      ConfirmBodyComponent,
      {
        width: '600px',
        height: '210px',
        data: {
          message: 'Are you sure to cancel without saving the data?',
          buttonText: {
            ok: 'Save',
            cancel: 'No',
          },
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('yes');
      }
    });
  }

  showPrompt(): void {
    const dialogRef = this.dialog.open(ConfirmPromptComponent, {
      width: '350px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.dataFromDialog = data.form;
      if (data.clicked === 'submit') {
        console.log('Sumbit button clicked');
      }
    });
  }
}
