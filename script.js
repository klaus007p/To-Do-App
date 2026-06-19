let taskData = {}


const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
let dragElement = null;

function addTask(title, taskDescription, column) {
    const div = document.createElement('div')

    div.classList.add('task')
    div.setAttribute('draggable', 'true')

    div.innerHTML = `
    <h2>${title}</h2>
    <p>${taskDescription}</p>
    <button>Delete</button>`

    column.appendChild(div)

    div.addEventListener("drag", (e) => {
        dragElement = div;
    })

    const deleteBtn = div.querySelector('button');
    deleteBtn.addEventListener('click',() =>{
        div.remove();
        updateTaskCount();
    })

    return div;
}


function updateTaskCount() {

    [todo, progress, done].forEach(col => {
        const task = col.querySelectorAll(".task");
        const count = col.querySelector('.right');

        taskData[col.id] = Array.from(task).map(t => {
            return {
                title: t.querySelector('h2').innerText,
                desc: t.querySelector('p').innerText
            }
        })

        localStorage.setItem('task', JSON.stringify(taskData))

        count.innerText = task.length;
    })
}

if (localStorage.getItem('task')) {
    const data = JSON.parse(localStorage.getItem('task'));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            addTask(task.title, task.desc, column);

        })

    }

    updateTaskCount()
}



const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task
    })
})

// progress.addEventListener("dragenter", (e) =>{
//     progress.classList.add("hover-over")

// })

// progress.addEventListener("dragleave", (e) =>{
//     progress.classList.remove("hover-over")
// })



function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    column.addEventListener("drop", (e) => {
        e.preventDefault();



        column.appendChild(dragElement);
        column.classList.remove("hover-over");



        updateTaskCount()

    })
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);


const toggleModalBtn = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskBtn = document.querySelector("#add-new-task");



toggleModalBtn.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
})

addTaskBtn.addEventListener("click", () => {

    const taskTitle = document.querySelector("#task-title-input").value
    const taskDescription = document.querySelector("#task-desc-input").value


    addTask(taskTitle, taskDescription, todo);
    updateTaskCount();
    modal.classList.remove("active")

    document.querySelector('#task-title-input').value = "";
    document.querySelector('#task-desc-input').value = "";
})