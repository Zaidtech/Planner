const express = require("express");
var mysql = require('mysql');
var bodyParser = require("body-parser");

const  app = express();

const { callbackify } = require("util");
const { read } = require("fs");

var teachers = ["Jane"];
var values = [];
var task_dates = [{}];
// module.export = {task_dates};

// making a db connection

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test1"
});

// making a connection and creating a database;
con.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to database!!");
    }

    // console.log("Creating database!! ");
    //      con.query("CREATE DATABASE test1", function(err,result){
    //     if(err)
    //         console.log(err);
    //     else   
    //         console.log("Database created!!");
    // });

    // var sql = "CREATE TABLE tasks ( id INT unsigned NOT NULL AUTO_INCREMENT, name VARCHAR(255), task VARCHAR(255), date DATE NOT NULL, PRIMARY KEY (id) )";
    // con.query(sql,function(err,result){
    //     if(err)
    //         console.log(err);
    //     else
    //         console.log("Table created!!");
    // });

    // var sql = "CREATE TABLE namelist ( name VARCHAR(255) )";
    // con.query(sql,function(err,result){
    //         if(err)
    //             console.log(err);
    //         else
    //             console.log("Table created namelist!!");
    //     });
    
});

// app.use(bodyParser.json());


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); // to serve the content publically
app.set('view engine','ejs');


app.get("/",function(req,res){
    
    var sql = "SELECT DISTINCT name FROM namelist;";
    con.query(sql,function(err,result){
        if(err)
            console.log(err)
        else    
            console.log(result)
            result.forEach(element => {
                if(!teachers.includes(element.name))
                       teachers.push(element.name);
            });
            console.log(teachers);
        });


    //getting all dates and month to plot
    var sql = "SELECT date FROM tasks;"
    con.query(sql,function(err,result){
        dates_task = []
        if(err)
            console.log(err);
        else {
            // console.log(result)
            result.forEach(element => {
                if(!dates_task.includes(element))
                    dates_task.push(element.date);
            })
        }
        console.log(dates_task);
        dates_task.forEach(element => {

            task_dates.push({date:element.toISOString().slice(8, 10), month:element.toISOString().slice(5,7)});
            // console.log("Date: "+element.toISOString().slice(8, 10));
            // console.log("Month: "+element.toISOString().slice(5,7));
            // console.log(task_dates); 
        });
        // console.log(dates_task);
    });
    res.render("index", {teachers:teachers, task_dates:task_dates});
    
});

// app.get("/teacher",)
app.post("/addteacher", function(req,res){
// add teachers to db
    console.log(req.body);
    var newT = req.body.teachername;

    var sql = `INSERT INTO namelist (name) VALUES ( "${newT}" )`;  
    
    if(!teachers.includes(newT)){
       con.query(sql,function(err,result){
           if(err)
                console.log(err);
            else              
                console.log("Teacher addded to db!!");
       });   
       res.redirect("/");
    }
    else{
        // alert("Teacher already present!");
        // console.log("Already present")
        res.send(" <body background='https://http.cat/300'>   <script> alert('Already exists in DB!!'); location.href = '/' </script> </body> ");
        
    }
    // retrive all the dates and plot on calender!!
    // console.log(teachers);
    res.redirect("/")  
    // res.render("index", {teachers:teachers});
});


app.post("/rt",function(req,res){

    // console.log(req.body);
    var rmt = req.body.teachername;
    // if(!)
    console.log("Teacher asked to be removed is : " + rmt);
    const index = teachers.indexOf(rmt);
    teachers.splice(index,1);
    console.log(teachers);

    var sql = `DELETE FROM tasks WHERE name="${rmt}"`;
    
    con.query(sql,function(err,result){
        if(err){
            console.log(err)
        }
        else{
            // console.log(result)
            console.log("All task with teacher name removed form tasks table!!");        
            }
        });

    var sql = `DELETE FROM namelist WHERE name="${rmt}"`;
    con.query(sql,function(err,result){
        if(err){
            console.log(err)
        }
        else{
            // console.log(result)
            console.log("All task with teacher name removed from naemlist table!!");        
            }
        });
    

    res.redirect("/");

});




app.post("/addtask", function(req,res){
    // somthing 
    // console.log(req.body.teacher)
    var name = req.body.teacher;
    var date = req.body.date;
    var time = req.body.time;
    var task = req.body.task;
    values.push(name,task,date);
    // console.log(name +" -- "+ date + " -- " + task + "----" +time);
    // console.log(values)
    // adding database to dbms
    var sql = `INSERT INTO tasks (name, task, date) VALUES ( "${name}" ,  "${task}" , "${date}" )`;
    console.log(sql);

    con.query(sql, function(err,result){
        if(err)
            console.log(err)
        else
            console.log("Name of records entered are: ");
    
        });

    values = [];
    res.redirect("/");

});


app.listen(2000,function(){
    console.log("Listening on port exacty 2000");
});
