function updateDate() {
     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

     const currentDate = new Date();
     const dayOfWeek = daysOfWeek[currentDate.getDay()];
     const month = months[currentDate.getMonth()];
     const day = currentDate.getDate().toString();
     const day1 = day.length === 1 ? '0' : day[0];
     const day2 = day.length === 1 ? day[0] : day[1];
     const year = currentDate.getFullYear();

     document.getElementById('days').innerHTML = `
     ${dayOfWeek} 
     <div class="sube">
          <div class="child1" id="month">${month}</div>
          <div class="child" id="day1">${day1}</div>
          <div class="child" id="day2">${day2}</div>
     </div>`
     document.getElementById('year').innerHTML = year;
 }

 // Call the function to update the date when the page loads
 updateDate();
setInterval(updateDate, 1000 * 60 * 60 * 2); // Update the date every 24 hours