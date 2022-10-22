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

 // Set currentDate, currentDateString, and currentHour, display date in header               
setCurrentDateAndHour(); 
// Build rest of html for page
buildTimeBlocks(); 
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

    // pad with zero if day is less than 10 for sorting purposes
    if (day < 10) {
        currentDate = today.getFullYear() + months[today.getMonth()] + "0" + day; 
    }
    else {
        currentDate = today.getFullYear() + months[today.getMonth()] + day;
    }

    // provide correct ending to day, default to "th" to make things easy
    if ((day === 1) || (day === 21) || (day === 31)) {
        dayEnd = "st";
    }
    else if ((day === 2) || (day === 22)) {
        dayEnd = "nd";
    }
    else if ((day === 3) || (day === 23)) {
        dayEnd = "rd";
    }

    currentDateString = days[today.getDay()] + ", " + months[today.getMonth()] + " " + 
        day + dayEnd + ", " + today.getFullYear(); // date string to display in header
    $("#currentDay").text(currentDateString); // set header date
}

// Creates time blocks
function buildTimeBlocks() {
    var containerDiv = $(".container"); // gets the container div to append new rows to

    // Loop through hourId, from  "9AM" to "5PM"
    for (let hourBlock=firstEntry; hourBlock <= lastEntry; hourBlock++) {
        // build the html for the row and the first column
        var newHtml = '<div class="row time-block"> ' +
            '<div class="col-md-1 hour">' + hourId[hourBlock] + '</div> ';
        
        // conditionally set second column to correct class
        if (hourBlock < currentHour) {
            newHtml = newHtml + '<textarea class="col-md-10 description past" id="text' + 
                hourId[hourBlock] + '"></textarea> ';
        }
        else if (hourBlock === currentHour) {
            newHtml = newHtml + '<textarea class="col-md-10 description present" id="text' + 
                hourId[hourBlock] + '"></textarea> ';
        }
        else {
            newHtml = newHtml + '<textarea class="col-md-10 description future" id="text' + 
                hourId[hourBlock] + '"></textarea> ';
        };

        // add last column and close the row div
        newHtml = newHtml + '<button class="btn saveBtn col-md-1" value="' + hourId[hourBlock] + '">' +
            '<i class="fas fa-save"></i></button> ' +
            '</div>';

        // add new elements to container
        containerDiv.append(newHtml);
    }
}

// loads timeEntries from localstorage
function getTimeEntries() {
    var teList = JSON.parse(localStorage.getItem(timeEntriesName));

    if (teList) {
        timeEntries = teList;
    }

    for (let i=0; i<timeEntries.length; i++) {
        // only load entries for today
        if (timeEntries[i].day == currentDate) {
            $("#text"+timeEntries[i].time).val(timeEntries[i].text); 
        }
    }
}

// Click event for all buttons
function saveClick() {
    var hourBlock = $(this).val(); // get which hour block we're in from button's value
    var findEntry = false;
    var newEntryIndex = timeEntries.length; // where in the timeEntries array the new object goes
    // create new timeEntries object
    var newEntry = {day: currentDate, time: hourBlock, text: $("#text"+hourBlock).val()}; 

    

    // check the timeEntries array to see if there is already an entry for this hour
    for (let i=0; i<timeEntries.length; i++) {
        if (timeEntries[i].day == currentDate) {
            if (timeEntries[i].time == hourBlock) {
                timeEntries[i].text = newEntry.text; // If entry already exists, just update text
                findEntry = true; // entry already exists
                break;
            }
            // entry does not exist - insert it when you reach the first hour 
            else if (timeGreater(timeEntries[i].time, hourBlock)) {
                newEntryIndex = i;
                break;
            }
        }
        // no entries exist for current day - insert when you reach first day that is greater
        else if (timeEntries[i].day > currentDate) {
            newEntryIndex = i;
            break;
        }
    }

    // If the entry didn't already exist, add it to the array in the appropriate place
    if (!findEntry) {
        timeEntries.splice(newEntryIndex, 0, newEntry);
    }

    // store in local storage
    localStorage.setItem(timeEntriesName, JSON.stringify(timeEntries));
}