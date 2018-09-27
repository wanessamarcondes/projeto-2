const addButton = document.querySelector(".new-task__button")
const inputTask = document.getElementById("input-task")
const allTasks = document.querySelector(".all-tasks")
const taskList = [];

addButton.addEventListener("click", function(event){
    event.preventDefault();

    const regex = /\w+/ig;
    if(!regex.test(inputTask.value)){
        inputTask.focus();
        return false;
    }

    const newTask = document.createElement("div");
    newTask.className = "task";
    newTask.setAttribute("id", "task");
    newTask.setAttribute("draggable", "true");
    newTask.setAttribute("ondragstart", "drag(event)")

    const newTaskName = document.createElement("h2");
    newTaskName.className = "task__name";
    newTaskName.innerHTML = inputTask.value;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-task__button";
    removeButton.innerHTML = "x";    

    newTask.appendChild(newTaskName);
    newTask.appendChild(removeButton);
    allTasks.appendChild(newTask);

    taskList.push(newTask);

    const footer = document.querySelector(".footer")
    const checkAllTasks = document.querySelector(".all-tasks-done__button")
    const clearAllTasks = document.querySelector(".remove-all-tasks__button")

    footer.style.display = "flex";
    checkAllTasks.innerHTML = "Marcar tudo"
    clearAllTasks.innerHTML = "Excluir tudo"

    removeButton.addEventListener("click", function(event){
        event.preventDefault();
        newTask.remove();
    })

    newTaskName.addEventListener("click", function(event){
        event.preventDefault();
        if(newTaskName.classList.contains("task__name")){
            newTaskName.classList.remove("task__name");
            newTaskName.classList.add("task__name_done");
        } else {
            newTaskName.classList.remove("task__name_done");
            newTaskName.classList.add("task__name");
        }
    })

    //checkAllTasks.addEventListener("click", function(event){
        //event.preventDefault();
        //newTaskName.className = "task__name_done";
        
        //checkAllTasks.addEventListener("click", function(event){
            //event.preventDefault();
            //newTaskName.className = "task__name"
        //})
    //})

    clearAllTasks.addEventListener("click", function(event){
        event.preventDefault();
        newTask.remove();
        footer.style.display = "none";
    })

    inputTask.value = "";
    inputTask.focus();
})

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

const reorderTaskList = (event, taskList) => {
    const movedTask = taskList.find((newTask, index) => index === event.oldIndex);
    const remainingTasks = taskList.filter((newTask, index) => index !== event.oldIndex);

    const reorderedList = [
        ...remainingTasks.slice(0, event.newIndex), movedTask,
        ...remainingTasks.slice(event.newIndex)
    ];

    console.log(reorderedList)
}