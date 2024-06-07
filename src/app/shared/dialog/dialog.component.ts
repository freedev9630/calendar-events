import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxColorsModule } from 'ngx-colors';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { NCalendar } from '../../model/calendar.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    NgxColorsModule,
    MatTooltipModule,
    CommonModule,
    MatIconModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  formEvent: FormGroup = new FormGroup({});

  eventType = [
    {
      id: 'schedule',
      value: 'Reunión' 
    },
    {
      id: 'task',
      value: 'Tarea' 
    }
  ];

  private date = new Date();

  minDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);

  maxDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) data?: NCalendar.IEvent
  ) {

    this.formEvent = this.fb.group({
      name: [data?.name, [Validators.required]],
      id: [data?.id ?? crypto.randomUUID(), [Validators.required]],
      icon: [data?.icon, [Validators.required]],
      date: [data?.date ?? new Date(), [Validators.required]],
      background: [data?.background],
      color: [data?.color],
    });
  }


  save(){
    this.dialogRef.close();
    this.dialogService.setEvent(this.formEvent.value);
  }

  
}
