function uploadSyllabus(){
 let unit=document.getElementById("unit").value;
 let file=document.getElementById("file").files[0];
 let course = getCurrentStaff().course || "General";
 let staffUser = getCurrentStaff().user || "unknown";

 if(!file){ alert("Select file"); return; }

 let fileType = file.type;
 let type;
 if(fileType === "application/pdf") type = "pdf";
 else if(fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") type = "docx";
 else if(fileType.startsWith("image/")) type = "image";
 else {alert("Unsupported file type. Only PDF, DOCX, and images are supported."); return;}

 let reader = new FileReader();
 reader.onload = function(e) {
   let data=JSON.parse(localStorage.getItem("syllabus")||"[]");
   let existingIndex = data.findIndex(item => item.unit === unit && item.name === file.name && item.course === course && item.staffUser === staffUser);
   if(existingIndex !== -1){
     data[existingIndex] = {
       course: course,
       unit:unit,
       name:file.name,
       type:type,
       file:e.target.result,
       staffUser: staffUser
     };
   } else {
     data.push({
       course: course,
       unit:unit,
       name:file.name,
       type:type,
       file:e.target.result,
       staffUser: staffUser
     });
   }
   localStorage.setItem("syllabus",JSON.stringify(data));
   alert("Uploaded successfully");
   loadStaffList();
 };
 reader.readAsDataURL(file);
}

function loadStaffList(){
 let data=JSON.parse(localStorage.getItem("syllabus")||"[]");
 let currentStaff = getCurrentStaff();
 let box=document.getElementById("list");
 box.innerHTML="";

 // Filter data to only show files uploaded by current staff for their course
 let staffData = data.filter(d => d.staffUser === currentStaff.user && d.course === currentStaff.course);

 staffData.forEach(d=>{
   box.innerHTML+=`<div class="list">
   <b>${d.unit}</b><br>${d.name}
   </div>`;
 });
}

function getCurrentStaff(){
 return JSON.parse(localStorage.getItem("staff")) || {};
}
