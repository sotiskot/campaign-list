// variables for new subscriber inputs
let new_name = '';
let new_mail = '';

// array to store subsriber objects
let users = [];

let message = document.getElementById('message');

// check if new subscriber input is done editing and save the new value
document.getElementById('name').addEventListener('blur', function(e) { new_name = e.target.value});
document.getElementById('email').addEventListener('blur', function(e) { 
    if(e.target.checkValidity()){
        new_mail = e.target.value;
    }});


// ajax request to get the active users on page load

function getActiveUsers() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // the response should have a JSON.format
            let response =  JSON.parse(this.responseText);

            /**
             * for each json item create a User object and save it in users array
             * then create table rows with subscribers by calling showUsers
             */

            response.forEach(item => {
                let i = JSON.parse(item);
                let user = new User(i.name, i.email);
                users.push(user);
                showUsers();
            });
        }
    };
    xmlhttp.open("POST", "private/php/getList.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();   
}


// function to show Subscribers using objects in users array
function showUsers() {
    let table = '';

    // using objects in users array create each table row and save as string
    users.forEach(user => {
        table = table + "<tr><td>"+user.name+"</td><td>"+user.mail+"</td><td><button class='btn btn-danger' onclick='deleteUser(\""+user.mail+"\")'><i class='fas fa-trash-alt'></i></button></td></tr>"
    })

    // table contains the string with all Subscriber rows
    document.getElementById('users').innerHTML = table;
}


// Deletes Subscriber from campaignmonitor.com and the array of objects
function deleteUser(email) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            mngMessage(['bg-warning']);
            message.innerHTML = this.responseText;
            if(this.responseText == 'Deleted User Successfully') {
                mngMessage(['bg-success', 'text-white']);
                // if the response is a success then go ahead and remove the object from array
                users = users.filter( user => user.mail != email);
                // with the object gone now show the new array of Subscriber objects
                showUsers();
            }
        }
    };
    xmlhttp.open("POST", "private/php/deleteUser.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("email="+email);   
}

// Adds Subscriber to campaignmonitor.com and the array of objects
function addUser(e) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            mngMessage(['bg-warning']);
            message.innerHTML = this.responseText;
            if(this.responseText == 'Added User Successfully') {
                mngMessage(['bg-success', 'text-white']);
                /**
                 * if the response is a success then go ahead and remove any object with the same email
                 * from the array add a new object using the user input. This is in case the same user
                 * gets resubscribed to not have the user twice in the object list.
                 */
                users = users.filter( user => user.mail != new_mail);
                users.push(new User(new_name, new_mail));
                // with the array fixed show the new array of Subscriber objects
                showUsers();
            }
        }
    };
    xmlhttp.open("POST", "private/php/addUser.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("email="+new_mail+"&name="+new_name);      
}

// Format message
function mngMessage(classes) {
    message.className = '';
    message.classList.add('text-center');
    classes.forEach(item => {
        message.classList.add(item);
    });
}

// Class used for Subscribers as objects
class User {
    constructor(name, mail) {
        this.name = name;
        this.mail = mail;
    }
}