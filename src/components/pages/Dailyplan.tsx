import React, { useEffect, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/cs'
import { AppHeader } from '../menu/AppHeader';
import { default as SmallCalendar } from 'react-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-calendar/dist/Calendar.css';
import { Box, Container, makeStyles } from '@material-ui/core';
import { getGrid, GridWrapper, ShiftNestedDto } from '../../api/grid';

const localizer = momentLocalizer(moment);

interface ResourceMapI {
  resourceId: number,
  resourceTitle: string,
}

interface EventI {
  id: number,
  title: string,
  start: Date,
  end: Date,
  resourceId: number,
}

const useStyle = makeStyles({
  screen: {
    display: "flex",
    justifyContent: "center",
    margin: "0vw 0.3vw 1vw 0.3vw",
    maxWidth: "-webkit-fill-available",
  },
  calendar: {
    flex: 1,
  },
  smallCalendar: {
    marginRight: "1vw",
    maxWidth: "350px",
    minWidth: "250px",
  },
});

export function Dailyplan() {
  const classes = useStyle();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [resourceMap, setResourceMap] = useState<ResourceMapI[]>([]);
  const [events, setEvents] = useState<EventI[]>([]);

  useEffect(() => {
    getGrid(selectedDate, selectedDate).then(res => {
      mapResponse(res);
    })
  }, [selectedDate]);

  function mapResponse(response: GridWrapper) {
    let newEevents: EventI[] = [];
    let newResourceMap: ResourceMapI[] = [];

    response.employeeShiftsDtos.forEach(e => {
      newResourceMap.push({
        resourceId: e.employeeId,
        resourceTitle: e.name + " " + e.surname
      });

      Object.values(e.shifts).map((s: ShiftNestedDto) =>
        s.tasks.forEach(t =>
          newEevents.push({
            id: t.id,
            title: t.activity,
            start: new Date(`${t.date} ${t.start}`),
            end: new Date(`${t.date} ${t.finish}`),
            resourceId: e.employeeId,
          })
        )
      )
    });

    setEvents(newEevents);
    setResourceMap(newResourceMap);
  }

  return (
    <>
      <AppHeader/>
      <Container className={classes.screen}>
        <Box>
          <SmallCalendar
            className={classes.smallCalendar}
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </Box>
        <Calendar
          className={classes.calendar}
          events={events}
          localizer={localizer}
          defaultView={Views.DAY}
          views={['day']}
          step={15}
          timeslots={4}
          date={selectedDate}
          onNavigate={setSelectedDate}
          resources={resourceMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
        />
      </Container>
    </>
  )
}
