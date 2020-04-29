import React from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import { AppContext } from './../context/ContextProvider';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

class EventCalendar extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      excursionList : []
    }

    this.allViews = Object.keys(Views).map(k => Views[k]);

    const ColoredDateCellWrapper = ({ children }) =>
      React.cloneElement(React.Children.only(children), {
        style: {
          backgroundColor: 'lightblue',
        },
      });

    this.localizer = momentLocalizer(moment);
  }

  componentDidMount(){
    let myData = [];
    this.context.checkToken(this);
    this.context.getExcursionList(this.props.history)
    .then(result => result.forEach(excursion => myData.push({title:excursion.name, start: moment(excursion.date).toDate(), end: moment(new Date(new Date(excursion.date).getTime() + 86400000)).toDate(), allDay:false})))
    .then(()=>this.setState({excursionList: myData}));
  }

  render() {
    return (<div style={{ height: '500px', padding: '30px' }}>
      <Calendar
        events={this.state.excursionList}
          /*{[
            title: "Placeholder",
            start: moment("2020-04-26 12:00:00").toDate(),
            end: moment("2020-04-26 13:00:00").toDate(),
            allDay: false
          }]*/
        views={this.allViews}
        step={60}
        showMultiDayTimes
        max={new Date(2022, 5, 27)}
        defaultDate={new Date(2020, 3, 25)}
        components={{
          timeSlotWrapper: this.ColoredDateCellWrapper,
        }}
        localizer={this.localizer}
      />
    </div>)
  }



}

export default EventCalendar
