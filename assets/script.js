//var DateTime = luxon.DateTime;     trying out luxon 

//const now = DateTime.now(); 
//console.log(now.toString());

//console.log(DateTime.now()
//.setLocale("el")
//.toLocaleString(DateTime.DATE_FULL))


//const newDate = new Date()
//const newHour = newDate.getHours()
//console.log(newHour)

//window.onload = function() {
    
//}


var currentDate = ""; // string for holding date index to timeEntries
var currentDateString = ""; // string for holding today's date for display
var currentHour = 9; // current hour for highlighting the correct row, default to first hour
var timeEntries = []; // initialize list of log entries

const timeEntriesName = "workDaySchedulerList"; // name used for localstorage
const firstEntry = 9; // first displayed time block, relative to hourId (9AM)
const lastEntry = 17; // last display time block, relative to hourId (5PM)
const hourId = ["12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM",
                "1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"]; // map of military hours

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];

setCurrentDateAndHour(); // Set currentDate, currentDateString, and currentHour, display date in header
buildTimeBlocks(); // Build rest of html for page
getTimeEntries(); // See if there are entries in localstorage and load them

$(".saveBtn").click(saveClick); // Set event handler for all save buttons

