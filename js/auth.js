function login(){
 let role=document.getElementById("role").value;
 let user=document.getElementById("user").value;
 let pass=document.getElementById("pass").value;

 if(role==="staff" && user==="staff" && pass==="1234"){
   localStorage.setItem("role","staff");
   location="staff/dashboard.html";
 }
 else if(role==="student" && user==="student" && pass==="1234"){
   localStorage.setItem("role","student");
   location="student/dashboard.html";
 }
 else alert("Invalid Login");

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
