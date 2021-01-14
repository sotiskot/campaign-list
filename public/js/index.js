let client = document.getElementById("client");
let new_name = '';
let new_mail = '';
let users = [];

document.getElementById('name').addEventListener('blur', function(e) { new_name = e.target.value});
document.getElementById('email').addEventListener('blur', function(e) { new_mail = e.target.value});

function getActiveUsers() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response =  JSON.parse(this.responseText);
            response.forEach(item => {
                let i = JSON.parse(item);
                let user = new User(i.name, i.email);
                users.push(user);
                showUsers();
            });
        }
    };
    xmlhttp.open("POST", "../private/php/getList.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();   
}

function showUsers() {
    let table = '';

    users.forEach(user => {
        table = table + "<tr><td>"+user.name+"</td><td>"+user.mail+"</td><td><button class='btn btn-danger' onclick='deleteUser(\""+user.mail+"\")'><i class='fas fa-trash-alt'></i></button></td></tr>"
    })

    document.getElementById('users').innerHTML = table;
}

function deleteUser(email) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
            if(this.responseText == 'Deleted User Successfully') {
                users = users.filter( user => user.mail != email);
                showUsers();
            }
        }
    };
    xmlhttp.open("POST", "../private/php/deleteUser.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("email="+email);   
}

function addUser() {
    console.log(new_name, new_mail);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
            if(this.responseText == 'Added User Successfully') {
                users = users.filter( user => user.mail != new_mail);
                users.push(new User(new_name, new_mail));
                showUsers();
            }
        }
    };
    xmlhttp.open("POST", "../private/php/addUser.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("email="+new_mail+"&name="+new_name);   
}


class User {
    constructor(name, mail) {
        this.name = name;
        this.mail = mail;
    }
}