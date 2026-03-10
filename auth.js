async function registerUser(){

const username=document.getElementById("username").value
const password=document.getElementById("password").value

await fetch("http://127.0.0.1:8000/api/register/",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username:username,
password:password
})

})

alert("User registered")

window.location.href="login.html"

}


async function loginUser(){

const username=document.getElementById("username").value
const password=document.getElementById("password").value

await fetch("http://127.0.0.1:8000/api/login/",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username:username,
password:password
})

})

alert("Login successful")

window.location.href="dashboard.html"

}


async function logoutUser(){

await fetch("http://127.0.0.1:8000/api/logout/",{

method:"POST",
credentials:"include"

})

alert("Logged out")

window.location.href="login.html"

}