const addButton = document.querySelector(".new-task__button")
const inputTask = document.getElementById("input-task")
const allTasks = document.querySelector(".all-tasks")

// DRAG AND DROP

//function dragstart_handler(ev) {
//    ev.dataTransfer.setData("text/plain", ev.target.id);
 //   ev.dropEffect = "move";
 //   }

//function dragover_handler(ev) {
//    ev.preventDefault();
//    ev.dataTransfer.dropEffect = "move"
//    }

//function drop_handler(ev) {
 //   ev.preventDefault();
 //   var data = ev.dataTransfer.getData("text");
 //   //ev.target.appendChild(document.getElementById//(data));
 //   }

///////////////////////////////
addButton.addEventListener("click", function(event){
    event.preventDefault();

    const regex = /\w+/ig;
    if(!regex.test(inputTask.value)){
        inputTask.focus();
        return false;
    }

    const newTask = document.createElement("<div class="task">
    <h2 class="task__name">`${inputTask.value}`</h2>
    <button class="button remove-task__button">x</button></div>")
    newTask.setAttribute("id", "new-task")
    newTask.setAttribute("draggable", true);
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
        //checkAllTasks.innerHTML = "Desfazer";
        //checkAllTasks.addEventListener("click", function(event){
            //newTaskName.className = "task__name"
        //})
    //})

    checkAllTasks.addEventListener("click", function(event){
        event.preventDefault();
        newTaskName.className = "task__name_done";
        
        //checkAllTasks.addEventListener("click", function(event){
            //event.preventDefault();
            //newTaskName.className = "task__name"
        //})
    })

    clearAllTasks.addEventListener("click", function(event){
        event.preventDefault();
        newTask.remove();
        footer.style.display = "none";
    })

    inputTask.value = "";
    inputTask.focus();
})