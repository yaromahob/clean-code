
var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("tasks-unfinished");
var completedTasksHolder=document.getElementById("tasks-done");



var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    var checkBox=document.createElement("input");
    var span=document.createElement("span");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");
    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");

    listItem.className = 'task-list-item'

    span.innerText=taskString;
    span.className='task task-title';

    checkBox.type="checkbox";
    editInput.type="text";
    checkBox.className="check-item";
    editInput.className="task entry-field";

    editButton.innerText="Edit"; 
    editButton.className="click-button edit";

    deleteButton.className="click-button delete";
    deleteButtonImg.className="remove-img";
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);


    listItem.appendChild(checkBox);
    listItem.appendChild(span);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");

    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}



var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var span=listItem.querySelector("span");
    var editBtn=listItem.querySelector(".edit");
    var containsClass=listItem.classList.contains("edit-mode");

    if(containsClass){


        span.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=span.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("edit-mode");
};



var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;

    ul.removeChild(listItem);

}



var taskCompleted=function(){
    console.log("Complete Task...");

    var listItem=this.parentNode;
    listItem.children[1].classList.add('completed-task')
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");

    var listItem=this.parentNode;
    listItem.children[1].classList.remove('completed-task')
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}


addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");

    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");



    editButton.onclick=editTask;

    deleteButton.onclick=deleteTask;

    checkBox.onchange=checkBoxEventHandler;
}


for (var i=0; i<incompleteTaskHolder.children.length;i++){

    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}



for (var i=0; i<completedTasksHolder.children.length;i++){

    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
