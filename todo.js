let input=document.getElementById("name");
let leftside=document.getElementById("tasklist");
let tasks=[];
let tid=1;

input.addEventListener("keydown",function(event){
  if(event.key=='Enter'){
    if(input.value!=''){
     addToLocal();}
}
});

function addToLocal(){
  let tobj={};
  tobj.name=input.value;
  tobj.status="pending";
  tobj.tid=tid;
  tid++;
  tasks.push(tobj);
  localStorage.setItem("tasks",JSON.stringify(tasks));
  addToTaskList(tobj);
}



function addToTaskList(tobj){
  let taskdiv=document.createElement("div");
  taskdiv.setAttribute("id",tobj.tid);
  taskdiv.style.fontSize="23px";
  let ntask=document.createElement("span");
  ntask.innerHTML=tobj.name;
  let checkbox=document.createElement("input");
  checkbox.setAttribute("type","checkbox");
  checkbox.addEventListener("click",function(event){
    if(checkbox.checked==true){
      ntask.style.textDecoration="line-through";
      updateStatus(tobj,'Completed');
    }else{
      ntask.style.textDecoration="none";
      updateStatus(tobj,'pending');
    }
  })
  let deleteimg=document.createElement("img");
  deleteimg.setAttribute("src","delete.png");
  deleteimg.setAttribute("width","20px");
  deleteimg.setAttribute("height","20px");
  
  deleteimg.addEventListener("click",function(event){
    leftside.removeChild(event.target.parentNode);
    deleteFromLocal(tobj.tid);
  })
  let editimg=document.createElement("img");
  editimg.setAttribute("src","edit.png");
  editimg.setAttribute("width","20px");
  editimg.setAttribute("height","20px");
  editimg.addEventListener("click",function(event){
    let etask=prompt("Edit the task: ");
    ntask.innerHTML=etask;
    updateName(tobj.tid,etask);
  })

  taskdiv.appendChild(ntask);
  taskdiv.appendChild(checkbox);
  taskdiv.appendChild(deleteimg);
  taskdiv.appendChild(editimg);
  leftside.appendChild(taskdiv);

}

loadTask();

function updateStatus(obj,newstatus){
  tasks.forEach(function(ts){
    if(ts.tid==obj.tid){
      ts.status=newstatus;
    }
  })
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function deleteFromLocal(did){
  /*tasks=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];
  for(var i=0;i<tasks.length;i++){
    if(tasks[i].tid==did){
      tasks.splice(i, 1);
      break;
    }
  }*/
  tasks=tasks.filter(data => data.tid != did);
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function updateName(id,nname){
  tasks.forEach(function(task){
    if(task.tid==id){
      task.name=nname;
    }
  })
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTask(){
  tid=0;
  tasks=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];
  tasks.forEach(function(task){
    if(tid<task.tid)
    tid=task.tid;
    addToTaskList(task);
  })
  tid++;
}