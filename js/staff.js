function uploadSyllabus(){
 let unit=document.getElementById("unit").value;
 let file=document.getElementById("file").files[0];

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
   let existingIndex = data.findIndex(item => item.unit === unit && item.name === file.name);
   if(existingIndex !== -1){
     data[existingIndex] = {
       unit:unit,
       name:file.name,
       type:type,
       file:e.target.result
     };
   } else {
     data.push({
       unit:unit,
       name:file.name,
       type:type,
       file:e.target.result
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
 let box=document.getElementById("list");
 box.innerHTML="";

 data.forEach(d=>{
   box.innerHTML+=`<div class="list">
   <b>${d.unit}</b><br>${d.name}
   </div>`;
 });
}
