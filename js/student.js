function loadStudentList(){
 let data=JSON.parse(localStorage.getItem("syllabus")||"[]");
 let box=document.getElementById("list");
 box.innerHTML="";

 if(data.length===0){
   box.innerHTML="No syllabus uploaded";
 }

 data.forEach(d=>{
   box.innerHTML+=`<div class="list">
   <b>${d.unit}</b><br>${d.name}
   </div>`;
 });
}
