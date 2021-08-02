function getRandomNumOfCustomerGivenRange(minimumCustomers, maximumCustomers) { //well we need two things for this function
    return (Math.floor(Math.random() * (maximumCustomers - minimumCustomers + 1)) + minimumCustomers); // Using this math for random numbers
}


const openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

const TableEl = document.getElementById("myTable");
var totalOfTotals = 0;

function CookieStand(locationName, minCustomerPerHour, maxCustomerPerHour, avgCookiePerSale) {
   
    this.locationName = locationName;
    this.minCustomerPerHour = minCustomerPerHour;
    this.maxCustomerPerHour = maxCustomerPerHour;
    this.avgCookiePerSale = avgCookiePerSale;
    this.customersEachHour = [];
    this.cookieEachHour = [];
    this.totalDailyCookies = 0;
}






CookieStand.prototype.getCookiesSoldPerHour = function () {
    for (let index = 0; index < openHours.length; index++) {
        this.customersEachHour.push(getRandomNumOfCustomerGivenRange(this.minCustomerPerHour, this.maxCustomerPerHour));

    }
}


CookieStand.prototype.calcCookiesEachHour = function () {
    this.getCookiesSoldPerHour();
    for (let i = 0; i < openHours.length; i++) {
        
        const oneHour = Math.ceil(this.customersEachHour[i] * this.avgCookiePerSale);
      
        this.cookieEachHour.push(oneHour);
     
        this.totalDailyCookies += oneHour;
    }
};


CookieStand.prototype.render = function () {
    this.calcCookiesEachHour();
    const rowEl = document.createElement("tr");
    let rowData = document.createElement("td");
    rowData.textContent = this.locationName;
    rowEl.appendChild(rowData);
 
    for (let i = 0; i < openHours.length; i++) {
        
        rowData = document.createElement("td");
        rowData.textContent = this.cookieEachHour[i];
        rowEl.appendChild(rowData);
    }   
    rowData = document.createElement("td");
    rowData.textContent = this.totalDailyCookies;
    rowEl.appendChild(rowData);
    TableEl.appendChild(rowEl);


}

function createHeader() {
    const rowEl = document.createElement("tr");
    let rowData = document.createElement("th");
    rowData.textContent = "Locations";
    rowEl.appendChild(rowData);
    
    for (let i = 0; i < openHours.length; i++) {
       
        rowData = document.createElement("th");
        rowData.textContent = openHours[i];
        rowEl.appendChild(rowData);
    }   
    rowData = document.createElement("th");
    rowData.textContent = "Daily Location Total: ";
    rowEl.appendChild(rowData);
    TableEl.appendChild(rowEl);


}

function createFooter() {
    let footerRow = document.createElement("tr");
    let footerHeader = document.createElement("th");
    footerHeader.textContent = "Hourly Numbers Per Location";
    footerRow.appendChild(footerHeader);
    let grandTotal = 0;
    for (let i = 0; i < openHours.length; i++) {
        let hourlyTotal = 0;

        for (let h = 0; h < allCookieStands.length; h++) {
            hourlyTotal += allCookieStands[h].cookieEachHour[i];
                
            grandTotal += allCookieStands[h].cookieEachHour[h];
        }
        let footerHeader = document.createElement("th");
        footerHeader.textContent = hourlyTotal;
        footerRow.appendChild(footerHeader);
    }
    footerHeader = document.createElement("th");
    footerHeader.textContent = grandTotal;
    footerRow.appendChild(footerHeader);
    TableEl.appendChild(footerRow);

}

createHeader();


let myForm = document.getElementById("nameForm")

myForm.addEventListener('submit', submitLocation);


function submitLocation(evt) {
    evt.preventDefault(); 
    let locname = evt.target.locname.value;
    let locmin = evt.target.locmin.value;
    let locmax = evt.target.locmax.value;
    let locavg = evt.target.locavg.value;
    
    alert(`Thanks for submitting ${locname} to our data banks !, With ${locmin} minimum customers a day, and ${locmax} maximum customers per day, averaging about ${locavg} customers a day !`);
     let newLocation = new CookieStand(locname, locmin, locmax, locavg);
     allCookieStands.push(newLocation);
    deleteFooterRow();
    newLocation.render();
    createFooter();
};


function deleteFooterRow() {
    let rows = document.getElementsByTagName("tr");
    document.getElementById("myTable").deleteRow(rows.length-1);
}



let allCookieStands = [
    new CookieStand('Seattle', 23, 65, 6.3),
    new CookieStand('Tokyo', 3, 24, 1.2),
    new CookieStand('Dubai', 11, 38, 3.7),
    new CookieStand('Paris', 20, 38, 2.3),
    new CookieStand('Lima', 2, 16, 4.6),
];

for (let index = 0; index < allCookieStands.length; index++) {
    allCookieStands[index].render();

}

createFooter(); 