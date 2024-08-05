// Hello, this is a timetable app custom made for IIT Mandi folks
// Edit the main function only
// DM me at Discord: `qchaos` if you have suggestions / bug reports

function getAllSlots(){
  var dictionary = {};
  // As per Academic Timetable of Jan-Jun 2024 Semester
  // dictionary["A"] = [8, 14, 10, -1, 9];
  // dictionary["B"] = [9, -1, 8, 11, 14];
  // dictionary["C"] = [10, -1, 11, 14, 8];
  // dictionary["D"] = [11, 13, 9, -1, 10];
  // dictionary["E"] = [13, 8, 15, 9, -1];
  // dictionary["F"] = [14, 9, 13, 8, -1];
  // dictionary["G"] = [-1, 10, 14, 13, 11];
  // dictionary["H"] = [-1, 11, 16, 10, 13];
  // dictionary["FS"] = [17, 17, 17, 17, 17];

  // As per new timetable:
  dictionary["A"] = [8, 11, -1, 9, 12];
  dictionary["B"] = [9, 12, -1, 10, 17];
  dictionary["C"] = [10, 17, 8, 11, -1];
  dictionary["D"] = [11, -1, 9, 12, -1];
  dictionary["E"] = [12, -1, 10, 17, 8];
  dictionary["F"] = [17, 8, 11, -1, 9];
  dictionary["G"] = [-1, 9, 12, -1, 10];
  dictionary["H"] = [-1, 10, -1, 8, 11];
  dictionary["FS"] = [17, 17, -1, 17, 17];

  dictionary["L1"] = [17, -1, -1, -1, -1];
  dictionary["L2"] = [-1, 17, -1, -1, -1];
  dictionary["L3"] = [-1, -1, 17, -1, -1];
  dictionary["L4"] = [-1, -1, -1, 17, -1];
  dictionary["L5"] = [-1, -1, -1, -1, 17];

  return dictionary;
}

function createSlotEvent(calendar_name, slot, eventName, description='', location=''){
  var calendar = CalendarApp.getCalendarsByName(calendar_name)[0]; // can change the name Acad_
  // var calendar = CalendarApp.getDefaultCalendar(); --> if you dont want to create new calender (NOT RECOMMENDED - clearing calendar will delete everything in this case)
  var slots = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'FS', 'L1', 'L2', 'L3' ,'L4', 'L5'];
  var monday = getLastMonday();
  if (!slots.includes(slot)){
    Logger.log('Slot ' + slot + ' not found!');
    return;
  }
  var colorIndex = { // might also change this as per your need
    'A': 1,  
    'B': 2,  
    'C': 3,  
    'D': 4,  
    'E': 5,  
    'F': 6,  
    'G': 7,  
    'H': 8,  
    'FS': 9,
    'L1': 10,
    'L2': 11,
    'L3': 12,
    'L4': 1,
    'L5': 2,  
  };

  var timeDict = getAllSlots()[slot];

  for (var i=0; i<timeDict.length; i++){
    var day = new Date(monday)
    day.setDate(monday.getDate()+i);
    if (timeDict[i] != -1){
      var startTime = timeDict[i];
    }else{
      continue;
    }

    var start = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate(), startTime, 0));
    if (slot == 'L1' || slot == 'L2' || slot == 'L3' || slot == 'L4' || slot == 'L5'){
      var end = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate(), startTime+3, 0));
    }else{
      var end = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate(), startTime+1, 0));
    }
    var offset = 5.5 * 60 * 60 * 1000;  // 5 hours 30 minutes in milliseconds`

    var event = calendar.createEventSeries(
      eventName,
      new Date(start.getTime() - offset),
      new Date(end.getTime() - offset),
      CalendarApp.newRecurrence().addWeeklyRule()
        .until(new Date(day.getFullYear(), day.getMonth()+5, day.getDate())),  // Set recurrence end date (1 year from start)
      {
        location: location,
        description: description,
      }
    )
    event.setColor(colorIndex[slot]); //--> uncomment for varied colors
    // event.setColor(1);
    Logger.log('Event created: ' + event.getTitle() + ' (' + event.getId() + ')');
  }
}

function getLastMonday() {
  var today = new Date();
  var dayOfWeek = today.getDay();
  var distanceToMonday = (dayOfWeek + 6) % 7;

  var thisMonday = new Date(today);
  thisMonday.setDate(today.getDate() - distanceToMonday);
  // Logger.log("This Monday: " + thisMonday);
  return thisMonday;
}


function main() {
  var calendar_name = 'CSE_acad';
  var calendars = CalendarApp.getCalendarsByName(calendar_name);
  
  if (calendars.length === 0) {
    CalendarApp.createCalendar(calendar_name, {color: CalendarApp.Color.CHARCOAL});
    Logger.log("Created Calender! Name: "+calendar_name);
    calendars = CalendarApp.getCalendarsByName(calendar_name);
  }
  

  // Only Edit this part - Change the Title as per need and comment out slots you dont need
  createSlotEvent(calendar_name, 'A', "A Slot HSS", "HS344 Sociology A13 2A,  HS357 CW A10 2B");
  createSlotEvent(calendar_name, 'B', "CS208 - Maths - A18 2 - 3104");
  createSlotEvent(calendar_name, 'D', "CS212 - DOA - A11 1A - 3024");
  createSlotEvent(calendar_name, 'E', "CS214 - CO - A18 1 - 3024");
  createSlotEvent(calendar_name, 'G', "IC272 - DS3 - Audi - 3003");
  createSlotEvent(calendar_name, 'H', "H Slot HSS", 'HS208 English 2 A5-3,  HS202 PoE A11 1A,  HS261 A13 2A');

  createSlotEvent(calendar_name, 'L2', "CS213 Reverse Engineering");
  createSlotEvent(calendar_name, 'L2', "IC202P DP");
  createSlotEvent(calendar_name, 'L4', "CS212 DOA");

  // createSlotEvent(calendar_name, 'F', 'DS201 - dhv - A17 1B');
  // createSlotEvent(calendar_name, 'B', 'DS301 - A17-1B');
  // createSlotEvent(calendar_name, 'E', "CS214 - A18 1");
  // createSlotEvent(calendar_name, 'F', 'DS201 - A17-1B');
  // createSlotEvent(calendar_name, 'G', "IC272 - Audi");
  // createSlotEvent(calendar_name, 'H', "HSS");


}

function getEventsForCurrentMonth() {
  // Get the current date
  var today = new Date();

  // Calculate the start and end of the current month
  var startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  var endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Get the calendar
  var calendar = CalendarApp.getDefaultCalendar();

  // Fetch events for the current month
  var events = calendar.getEvents(startOfMonth, endOfMonth);

  // Log event details
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    Logger.log('Event: ' + event.getTitle());
    Logger.log('Start Time: ' + event.getStartTime());
    Logger.log('End Time: ' + event.getEndTime());
  }
}

function getEvent_details(){
  var id = 'sample id'; // paste event id here
  var calendar = CalendarApp.getCalendarsByName('Acad_')[0];
  Logger.log(calendar);
  var event = calendar.getEventById(id);
  Logger.log(event.getStartTime() + " : " + event.getTitle());
}

function clearCalendar(){
  // var today = new Date();
  var calendar_name = 'CSE_Acad';
  var calendar = CalendarApp.getCalendarsByName(calendar_name)[0];
  // var start = new Date(today.getFullYear(), today.getMonth(), 1);
  // var end = new Date(today.getFullYear(), today.getMonth() + 5, 0);
  // // change start and end as per need
  // var events = calendar.getEvents(start, end);
  // for(var i=0; i<events.length; i++){
  //   events[i].deleteEvent();
  // }
  // deletes events, not the calender
  calendar.deleteCalendar(); //-> deletes whole calender
}
