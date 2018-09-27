const addButton = document.querySelector(".new-task__button")
const inputTask = document.getElementById("input-task")
const allTasks = document.querySelector(".all-tasks")

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
    newTask.setAttribute("ondragstart", "dragstart_handler(event);")

    const newTaskName = document.createElement("h2");
    newTaskName.className = "task__name";
    newTaskName.innerHTML = inputTask.value;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-task__button";
    removeButton.innerHTML = "x";    

    newTask.appendChild(newTaskName);
    newTask.appendChild(removeButton);
    allTasks.appendChild(newTask);

    newTask.setAttribute("draggable", "true");

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

// DRAG AND DROP

function dragstart_handler(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dropEffect = "move";
    }

function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
    }

function drop_handler(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    }

///////////////////////////////