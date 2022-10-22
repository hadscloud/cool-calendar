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

// string for holding date index to timeEntries
var currentDate = ""; 
// string for holding today's date for display
var currentDateString = ""; 
// current hour for highlighting the correct row, default to first hour
var currentHour = 9; 
// initialize list of log entries
var timeEntries = []; 
// name used for localstorage
const timeEntriesName = "workDaySchedulerList";
// first displayed time block, relative to hourId (9AM)
const firstEntry = 9; 
// last display time block, relative to hourId (5PM)
const lastEntry = 17; 
const hourId = ["12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM", "1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"];
            

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];

setCurrentDateAndHour(); // Set currentDate, currentDateString, and currentHour, display date in header

// See if there are entries in localstorage and load them
getTimeEntries();
// Set event handler for all save buttons
$(".saveBtn").click(saveClick); 
//set the current date in header 
function setCurrentDateAndHour() {
    var today = new Date();
    var day = today.getDate();
    var dayEnd = "th";

    currentHour = today.getHours();

    if (day < 9) {
        currentDate = today.getFullYear
    }
}