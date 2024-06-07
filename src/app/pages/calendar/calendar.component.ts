import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NCalendar } from '../../model/calendar.model';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogService } from '../../services/dialog.service';
import { MatMenuModule } from '@angular/material/menu';
import { createEvent, findEvent, formatDate, getSelectedDate, updateEvent, templateCalendarData } from '../../helper/calendar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  
  private totalItems = 42;

  private date = new Date();

  private findEvent = findEvent;

  headers: NCalendar.Header = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  calendarData: NCalendar.Body[] = [];

  constructor(
    private readonly dialogService: DialogService
  ) {
    this.createCalendarData();
    effect(() => {
      if (this.dialogService.getEvent) {
        this.handleEvent(this.dialogService.getEvent);
      }
    });
  }

  //Replaced createEvent with handleEvent
  private handleEvent(item: NCalendar.IEvent) {
    const newCalendarData = [...this.calendarData];

    const findEvent = this.findEvent(newCalendarData, item);

    if (!findEvent) {
      createEvent(newCalendarData, item);
    } else {
      updateEvent(newCalendarData, item, findEvent);
    }

    this.calendarData = newCalendarData;
  }

  private createCalendarData() {    
    const firstDayInMonth = getSelectedDate(this.date, 1).getDay();
    const previousMonth = getSelectedDate(this.date).getDate();
    

    for (let index = firstDayInMonth; index > 0; index --) {      
      this.calendarData.push(templateCalendarData(previousMonth - (index - 1), getSelectedDate(this.date, previousMonth - (index - 1), -1)));
    }


    const daysInMonth = getSelectedDate(this.date, 0, 1).getDate();
    
    for (let index = 1; index <= daysInMonth; index++) {
      const newDate = getSelectedDate(this.date, index);            

      this.calendarData.push(
        {
          ...templateCalendarData(index, newDate),
          isCurrentDay: formatDate(this.date) === formatDate(newDate),
          isCurrentMonth: true,
        }
      );
    }

    const calendarLength = this.calendarData.length;

    for (let index = 1; index <= (this.totalItems - calendarLength); index++) {
      this.calendarData.push(templateCalendarData(index, getSelectedDate(this.date, index, 1)));
    }
    
  }

  removeEvent(calendarIndex: number, eventIndex: number) {
    const newCalendarData = [...this.calendarData];
    newCalendarData[calendarIndex].events.splice(eventIndex, 1);
    this.calendarData = newCalendarData;
  }

  openModal() {
    this.dialogService.openDialog();
  }

  openModalEdit(event: NCalendar.IEvent) {
    this.dialogService.openDialog(event);
  }
}
