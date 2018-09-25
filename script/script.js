const addButton = document.querySelector(".new-task__button")
const inputTask = document.getElementById("input-task")
const allTasks = document.querySelector(".all-tasks")
const checkAllTasks = document.querySelector(".all-tasks-done__button")
const clearAllTasks = document.querySelector(".remove-all-tasks__button")

addButton.addEventListener("click", function(event){
    event.preventDefault();

    if(inputTask.value.test(/^[a-z0-9]+$/i)){
        inputTask.focus();
        return false;
    }

    const newTask = document.createElement("div");
    const newTaskName = document.createElement("h2");
    const removeButton = document.createElement("button");

    newTask.className = "task";
    newTaskName.className = "task__name";
    removeButton.className = "remove-task__button";

    newTaskName.innerHTML = inputTask.value;
    removeButton.innerHTML = "x";

    newTask.appendChild(newTaskName);
    newTask.appendChild(removeButton);
    allTasks.appendChild(newTask);

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

    checkAllTasks.addEventListener("click", function(event){
        event.preventDefault();
        if(newTaskName.classList.contains("task__name")){
            newTaskName.classList.remove("task__name");
            newTaskName.classList.add("task__name_done");
        } 
    })

    clearAllTasks.addEventListener("click", function(event){
        event.preventDefault();
        newTask.remove();
    })

    inputTask.value = ""
    inputTask.focus();
})

