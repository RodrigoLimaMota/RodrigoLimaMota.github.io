const formInsertTask = document.querySelector(`._addTask`)
const formSearchTask = document.querySelector(`._searchTask`)
const todoList = document.querySelector(`.list-component`)

const buildTaskItem = element => {
    const task = element
    if (task.length) {
        todoList.innerHTML += `
        <li class="item"data-task="${task}">
            <span>${task}</span>
            <i class="icon-component fa-solid fa-trash-can" data-trash="${task}"></i>
        </li>
    `
    }
}

const filterTasks = (arrayTaskItems, inputValue, inputhasAMatch) => arrayTaskItems
    .filter(taskItem => {
        const matchedTask = taskItem.textContent
            .toLowerCase()
            .trim()
            .includes(inputValue)

        return inputhasAMatch ? matchedTask : !matchedTask
    })

const handleClasses = (arrayTaskItems, classToAdd, classToremove) => {
    arrayTaskItems.forEach(taskItem => {
        taskItem.classList.add(classToAdd)
        taskItem.classList.remove(classToremove)
    })
}

const hideTaskItems = (arrayTaskItems, inputValue) => {
    const unmatchedTasks = filterTasks(arrayTaskItems, inputValue, false)
    handleClasses(unmatchedTasks, `hidden`, `item`)
}

const showTaskItems = (arrayTaskItems, inputValue) => {
    const matchedTasks = filterTasks(arrayTaskItems, inputValue, true)
    handleClasses(matchedTasks, `item`, `hidden`)
}

const insertTodoListItem = event => {
    event.preventDefault()
    const taskContent = event.target.addTask.value
    buildTaskItem(taskContent)
    event.target.reset()

}

const removeTaskFromTodoList = event => {
    const clickedOnTrash = event.target.dataset.trash
    const shouldRemoveTask = document.querySelector(`[data-task="${clickedOnTrash}"]`)
    if (clickedOnTrash) {
        shouldRemoveTask.remove()
    }
}

const searchTasksFromTodoList = event => {
    const searchInputValue = event.target.value.toLowerCase().trim()
    const taskItems = Array.from(todoList.children)

    hideTaskItems(taskItems, searchInputValue)
    showTaskItems(taskItems, searchInputValue)
}

formInsertTask.addEventListener(`submit`, insertTodoListItem)
todoList.addEventListener(`click`, removeTaskFromTodoList)
formSearchTask.addEventListener(`input`, searchTasksFromTodoList)
