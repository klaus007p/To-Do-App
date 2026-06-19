let taskData = {}


const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
let dragElement = null;

const tasks = document.querySelectorAll('.task');

tasks.forEach(task =>{
    task.addEventListener("drag", (e) =>{
       dragElement = task
    })
})

// progress.addEventListener("dragenter", (e) =>{
//     progress.classList.add("hover-over")
    
// })

// progress.addEventListener("dragleave", (e) =>{
//     progress.classList.remove("hover-over")
// })



function addDragEventsOnColumn(column){
    column.addEventListener("dragenter",(e) =>{
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave",(e) =>{
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover",(e) =>{
        e.preventDefault();
    })

    column.addEventListener("drop", (e) =>{
        e.preventDefault();
        
        console.log("drop", dragElement,column);
        
        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        [todo,progress,done].forEach(col =>{
            const task = col.querySelectorAll(".task");
            const count = col.querySelector('.right');

            count.innerText = task.length;
        })

        
    })
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);


const toggleModalBtn = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskBtn = document.querySelector("#add-new-task");



toggleModalBtn.addEventListener("click", () =>{
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () =>{
    modal.classList.remove("active");
})

addTaskBtn.addEventListener("click", () =>{
    
    const taskTitle = document.querySelector("#task-title-input").value
    const taskDescription = document.querySelector("#task-desc-input").value

    const div = document.createElement('div')
    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDescription}</p>
        <button>Delete</button>`

        todo.appendChild(div);

        


        [todo,progress,done].forEach(col =>{
            const task = col.querySelectorAll(".task");
            const count = col.querySelector('.right');

            taskData[col.id] = Array.from(task).map(t =>{ 
                return{
                    title: t.querySelector('h2').innerText,
                    desc: t.querySelector('p').innerText
                }
            })

            localStorage.setItem('task', JSON.stringify(taskData))

            count.innerText = task.length;
        })

        div.addEventListener("drag", (e)=>{
            dragElement = div;
        })

        modal.classList.remove("active")
})