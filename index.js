let items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
    const data = localStorage.getItem("todo-tasks");
    return data ? JSON.parse(data) : items;
}

function createItem(item) {
      const template = document.getElementById("to-do__item-template");
      const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    textElement.textContent = item;
    attachItemHandlers(clone);

    return clone;
}

function getTasksFromDOM() {
    const nodes = document.querySelectorAll(".to-do__item-text");
    return Array.from(nodes, (node) => node.textContent);
}

function saveTasks(tasks) {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}

function attachItemHandlers(itemElement) {
    const textElement = itemElement.querySelector(".to-do__item-text");
    const deleteButton = itemElement.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = itemElement.querySelector(".to-do__item-button_type_duplicate");
    const editButton = itemElement.querySelector(".to-do__item-button_type_edit");

    deleteButton.addEventListener("click", () => {
        itemElement.remove();
        saveTasks(getTasksFromDOM());
    });

    duplicateButton.addEventListener("click", () => {
        const copy = createItem(textElement.textContent);
        listElement.prepend(copy);
        saveTasks(getTasksFromDOM());
    });

    editButton.addEventListener("click", () => {
        textElement.contentEditable = "true";
        textElement.focus();
    });

    textElement.addEventListener("blur", () => {
        textElement.contentEditable = "false";
        saveTasks(getTasksFromDOM());
    });
}



items = loadTasks();
items.forEach((task) => {
    listElement.append(createItem(task));
});

formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const value = inputElement.value.trim();
    
    if (value) {
        listElement.prepend(createItem(value));
        inputElement.value = "";
        saveTasks(getTasksFromDOM());
    }
});