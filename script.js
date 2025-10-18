const form = document.getElementById('itemForm');
const input = document.getElementById('itemInput');
const errorMessage = document.getElementById('errorMessage');
const list = document.getElementById('daftar');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("item");
        if (task.completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.classList.add("text");

        span.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.classList.add("edit");
        edit.addEventListener("click", () => {
            const baru = prompt("Edit tugas:", task.text);
            if (baru !== null) {
                const trimmed = baru.trim();
                if (trimmed) {
                    tasks[index].text = trimmed;
                    saveTasks();
                    renderTasks();
                }
            }
        });

        const hapus = document.createElement("button");
        hapus.textContent = "Hapus";
        hapus.classList.add("hapus");
        hapus.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(edit);
        li.appendChild(hapus);
        list.appendChild(li);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();

    if (value === '') {
        errorMessage.textContent = "Field tidak boleh kosong";
        input.classList.add("invalid");
        return;
    }

    errorMessage.textContent = "";
    input.classList.remove("invalid");
    input.classList.add("vallid");

    tasks.push({text: value, completed: false});
    saveTasks();
    renderTasks();

    input.value = "";
    input.classList.remove("valid");
});

renderTasks();