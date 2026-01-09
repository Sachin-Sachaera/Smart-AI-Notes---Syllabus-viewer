const staffAccounts = [
 {user: "sachin", pass: "1234", name: "Sachin", dept: "Computer Science", course: "Java programming"},
 {user: "jenson", pass: "1234", name: "Jenson", dept: "Computer Science", course: "Machine Learning"},
 {user: "chons", pass: "1234", name: "Chons", dept: "Computer Science", course: "Data structures"},
 {user: "anitha", pass: "1234", name: "Anitha", dept: "Computer Science", course: "Operating Systems"},
 {user: "maheshwari", pass: "1234", name: "maheshwari", dept: "Computer Science", course: "Database Management Systems"}
];

function login(){
 let role=document.getElementById("role").value;
 let user=document.getElementById("user").value;
 let pass=document.getElementById("pass").value;

 if(role==="staff"){
   let staff = staffAccounts.find(s => s.user === user && s.pass === pass);
   if(staff){
     localStorage.setItem("role","staff");
     localStorage.setItem("staff", JSON.stringify(staff));
     location="staff/dashboard.html";
     return false;
   }
 }
 else if(role==="student" && user==="student" && pass==="1234"){
   localStorage.setItem("role","student");
   location="student/dashboard.html";
   return false;
 }

 alert("Invalid Login");
 return false;
}

function protect(required){
 if(localStorage.getItem("role")!==required){
   location="../index.html";
 }
}

function logout(){
 localStorage.clear();
 location="../index.html";
}
