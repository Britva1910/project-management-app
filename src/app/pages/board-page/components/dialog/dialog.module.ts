import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogComponent } from './prompt/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogBodyComponent } from './prompt-body/dialog-body.component';
import { AppConfirmComponent } from './confirm/app-confirm/app-confirm.component';
import { ConfirmBodyComponent } from './confirm/confirm/confirm-body.component';
import { ConfirmPromptComponent } from './confirm/prompt/confirm-prompt.component';

const MaterialModules = [
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatCheckboxModule,
];
@NgModule({
  declarations: [
    AppConfirmComponent,
    ConfirmBodyComponent,
    ConfirmPromptComponent,
    DialogBodyComponent,
    DialogComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModules],
  exports: [
    MaterialModules,
    AppConfirmComponent,
    ConfirmBodyComponent,
    ConfirmPromptComponent,
    DialogBodyComponent,
    DialogComponent,
  ],
})
export class DialogModule {}
