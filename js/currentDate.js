let dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let d = new Date();
let weekId = dayName[d.getDay()];
let monthName = month[d.getMonth()];

let fullDate = weekId + ", " + monthName + " " + d.getDate() + ", " + d.getFullYear();

document.getElementById('currentDate').innerHTML = fullDate;