declare module 'react-big-calendar' {
  import * as React from 'react';

  export type View = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

  export interface Event {
    title?: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
  }

  export interface SlotInfo {
    start: Date;
    end: Date;
    slots: Date[];
    action: 'select' | 'click' | 'doubleClick';
  }

  export interface CalendarProps {
    localizer: any;
    events: Event[];
    startAccessor: string | ((event: Event) => Date);
    endAccessor: string | ((event: Event) => Date);
    selectable?: boolean;
    onSelectSlot?: (slotInfo: SlotInfo) => void;
    onSelectEvent?: (event: Event) => void;
    style?: React.CSSProperties;
    className?: string;

    views?: View[] | { [key in View]?: boolean };
    defaultView?: View;
    defaultDate?: Date;

    view?: View;
    onView?: (view: View) => void;
    date?: Date;

    onNavigate?: (newDate: Date, view: View, action: string) => void;

    dayPropGetter?: (date: Date) => object;
    eventPropGetter?: (
      event: Event,
      start: Date,
      end: Date,
      isSelected: boolean
    ) => object;

    components?: any;
    messages?: { [key: string]: string };
  }

  export class Calendar extends React.Component<CalendarProps> {}

  export function momentLocalizer(momentInstance: any): any;
}
