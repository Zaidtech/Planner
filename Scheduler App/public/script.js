// alert("Connected!!")
const date = new Date();
// const task_dates = require('./app')

const renderCalendar = () => {
        var month = date.getMonth();
        // console.log(date.getDay());

        // get last date for this month!!
        const lastday = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
        // get last date from the prev month
        const prevmonth = new Date(date.getFullYear(),date.getMonth(),0).getDate();
        // con/sole.log(lastday);
        // console.log(prevmonth);

        const months = [
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


        document.querySelector(".date h1").innerHTML = months[month];
        document.querySelector(".date p").innerHTML = date.toDateString();

        let days = "";

        var value = prevmonth-date.getDay()+1;

        // prev month
        for(var i=date.getDay();i>0;i--){
            days += `<div class="prev-date" id=${value}> ${value}</div>`;
            document.querySelector('.days').innerHTML = days;
            value++;
        }

        
        // current month
        for(let i=1;i<=lastday;i++){
            if(i==date.getDate()){
                days += `<div class="today" id=${i}  onclick="openForm(this.id,${month})">  ${i}</div>`;
                continue;
            }
            // if(i==task_dates[i] and this is the month!!!) ie that date is present 
            // underline that date and change its color to red add a class to it and on hover display details.
            days += `<div id=${i}  onclick="openForm(this.id,${month})" >${i}</div>`;
            document.querySelector('.days').innerHTML = days;
        }

        // next month
        var left_days = 42 - (lastday+date.getDay());
        // console.log(left_days)

        for(var x=1;x<=left_days;x++){
            days += `<div class="next-date" id=${x} ">  ${x}</div>`;
            document.querySelector('.days').innerHTML = days;
        }

        for(i=0;i<document.querySelectorAll('.prev-date').length;i++){
            document.querySelectorAll('.prev-date')[i].addEventListener('click',function(){
                // console.log('I am cccclicked!!!');
                // month = date.getMonth()-1;
                date.setMonth(date.getMonth() - 1);
                renderCalendar();
            });
        }

        for(i=0;i<document.querySelectorAll('.next-date').length;i++){
            document.querySelectorAll('.next-date')[i].addEventListener('click',function(){
                // console.log('I am cccclicked!!!');
                // month = date.getMonth()-1;
                date.setMonth(date.getMonth() + 1);
                renderCalendar();
            });
        }

    }



    
function listTask() {
        // alert("I am called!!");
    var tag = document.createElement("p");
           var text = document.createTextNode("Tutorix is the best e-learning platform");
           tag.appendChild(text);
        //    alert("Reached here as well!!!");
           var element = document.querySelector('.task_list')
           element.appendChild(tag);
    }
        //    alert("Stop!!!");


document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });


  
document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });


document.querySelector('.days').addEventListener('click',function(){

    if(this.class =="prev-date")
        console.log("prev month date  is cicked");

});




  

renderCalendar();
