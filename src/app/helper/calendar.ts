import { NCalendar } from "../model/calendar.model";

export function findEvent(newCalendarData: NCalendar.Body[], item: NCalendar.IEvent): NCalendar.FindEvent {
    return newCalendarData.map((calendar, calendarIndex) => {
        const eventIndex = calendar.events.findIndex(event => event.id === item.id);
        return eventIndex !== -1 ? { eventIndex, calendarIndex, isSameDate: formatDate(calendar.date) === formatDate(item.date)} : null;
      }).find(item => item);
}

export function formatDate(date: Date) {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
}

export function createEvent(newCalendarData: NCalendar.Body[], item: NCalendar.IEvent) {
    const selectedIndex = newCalendarData.findIndex(calendar => formatDate(calendar.date) === formatDate(item.date));
    if (selectedIndex !== -1) {
        newCalendarData[selectedIndex].events.push(item);
    }
}

export function updateEvent(newCalendarData: NCalendar.Body[], item: NCalendar.IEvent, foundEvent: NCalendar.FoundEvent) {
    if (foundEvent.isSameDate) {
        newCalendarData[foundEvent.calendarIndex].events[foundEvent.eventIndex] = item;
    } else {
        newCalendarData[foundEvent.calendarIndex].events.splice(foundEvent.eventIndex, 1);
        createEvent(newCalendarData, item);
    }
}

export function getSelectedDate(date: Date, day = 0, month = 0) {
    return new Date(date.getFullYear(), date.getMonth() + month, day);
}

export function templateCalendarData(day: number, date: Date) {
    return {
        day,
        date,
        isCurrentDay: false,
        isCurrentMonth: false,
        events: [],
    }
}