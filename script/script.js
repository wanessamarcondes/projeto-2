const addButton = document.querySelector(".new-task__button")
const inputTask = document.getElementById("input-task")
const allTasks = document.querySelector(".all-tasks")
const taskList = [];

let count = 0;
addButton.addEventListener("click", function(event){
    event.preventDefault();
    count += 1;

    // validação de caracteres do input
    const regex = /\w+/ig;
    if(!regex.test(inputTask.value)){
        inputTask.focus();
        return false;
    }

    // criar nova tarefa
    const newTask = document.createElement("div");
    newTask.className = "task";
    newTask.setAttribute("id", "task-"+count);
    newTask.setAttribute("draggable", true);
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
    let i = (taskList.selectedIndex);

    const footer = document.querySelector(".footer")
    const checkAllTasks = document.querySelector(".all-tasks-done__button")
    const clearAllTasks = document.querySelector(".remove-all-tasks__button")

    // definir display da barra de botões
    footer.style.display = "flex";
    checkAllTasks.innerHTML = "Marcar tudo";
    clearAllTasks.innerHTML = "Excluir tudo";

    // remover tarefas individualmente
    removeButton.addEventListener("click", function(event){
        event.preventDefault();
        newTask.remove();
        taskList.splice(i, 1);
    })

    // marcar uma tarefa como concluida individualmente
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

    // marcar todas as tarefas como concluídas
    checkAllTasks.addEventListener("click", function(event){
        event.preventDefault();
        newTaskName.className = "task__name_done";
    })

    // excluir todas as tarefas
    clearAllTasks.addEventListener("click", function(event){
        event.preventDefault();
        newTask.remove();
        taskList.splice(i);
        footer.style.display = "none";
    })

    inputTask.value = "";
    inputTask.focus();
})

// drag e drop

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    const reference = ev.target.closest(".task");
    allTasks.insertBefore(document.getElementById(data), reference)
}

const reorderTaskList = (event, taskList) => {
    const movedTask = taskList.find((newTask, index) => index === event.oldIndex);
    const remainingTasks = taskList.filter((newTask, index) => index !== event.oldIndex);

    const reorderedList = [
        ...remainingTasks.slice(0, event.newIndex), movedTask,
        ...remainingTasks.slice(event.newIndex)
    ];
}