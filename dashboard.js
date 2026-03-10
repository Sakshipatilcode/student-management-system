let editId=null

const form=document.getElementById("studentForm")
const table=document.getElementById("studentTable")
const searchInput=document.getElementById("searchInput")


document.addEventListener("DOMContentLoaded",loadStudents)


async function loadStudents(){

let response=await fetch("http://127.0.0.1:8000/api/students/")
let students=await response.json()

table.innerHTML=""

students.forEach(student=>{

let row=document.createElement("tr")

row.innerHTML=`

<td>${student.name}</td>
<td>${student.age}</td>
<td>${student.course}</td>

<td>

<button class="editBtn" data-id="${student.id}">Edit</button>
<button class="deleteBtn" data-id="${student.id}">Delete</button>

</td>

`

table.appendChild(row)

})

}


form.addEventListener("submit",async function(e){

e.preventDefault()

const name=document.getElementById("name").value
const age=document.getElementById("age").value
const course=document.getElementById("course").value


if(editId==null){

await fetch("http://127.0.0.1:8000/api/students/",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name:name,
age:age,
course:course
})

})

}

else{

await fetch(`http://127.0.0.1:8000/api/students/update/${editId}/`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name:name,
age:age,
course:course
})

})

editId=null

}

loadStudents()
form.reset()

})


table.addEventListener("click",async function(e){

const id=e.target.dataset.id

if(e.target.classList.contains("deleteBtn")){

await fetch(`http://127.0.0.1:8000/api/students/${id}/`,{

method:"DELETE"

})

loadStudents()

}


if(e.target.classList.contains("editBtn")){

const row=e.target.closest("tr")

document.getElementById("name").value=row.children[0].innerText
document.getElementById("age").value=row.children[1].innerText
document.getElementById("course").value=row.children[2].innerText

editId=id

}

})


searchInput.addEventListener("keyup",function(){

const value=searchInput.value.toLowerCase()

const rows=document.querySelectorAll("#studentTable tr")

rows.forEach(row=>{

const name=row.children[0].innerText.toLowerCase()
const course=row.children[2].innerText.toLowerCase()

if(name.includes(value)||course.includes(value)){

row.style.display=""

}

else{

row.style.display="none"

}

})

})
async function logoutUser(){

    await fetch("http://127.0.0.1:8000/api/logout/",{
        method:"POST"
    })

    alert("Logged out")

    window.location.href="login.html"

}