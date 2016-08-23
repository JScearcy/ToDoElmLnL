(function ToDoApp(window, document, undefined) {
	'use strict';
    var todoCount = 0,
        todoInput = document.getElementById('todoName'),
		todoTemplate = document.getElementById('todoTemplate').innerHTML,
		todoContainer = document.getElementById('todos'),
		toggleCompleted = document.getElementById('toggleCompletedTodos');

    todoInput.focus();
	toggleCompleted.addEventListener('click', ToggleCompletedTodos);
    document.getElementById('addTodo').addEventListener('click', ToDoCreate);
    document.getElementById('clearCompletedTodos').addEventListener('click', ClearCompletedTodos);

    function ToDoCreate(e) {
        e.preventDefault();

        var todoName = document.createTextNode(todoInput.value),
            newTodo = document.createElement('li');

        if (todoName.length) {
            todoInput.value = '';
            newTodo.classList.add('todoItem');
            newTodo.innerHTML = todoTemplate;
            newTodo.getElementsByClassName('name')[0].appendChild(todoName);
            newTodo.id = todoCount;

            todoContainer.appendChild(newTodo);

            todoCount++;
            todoInput.focus();
        } else {
            todoInput.focus();
        }
    }

    function ClearCompletedTodos(e) {
        e.preventDefault();
        throw Error('Not Implemented');
    }

    function ToggleCompletedTodos(e) {
        e.preventDefault();
        throw Error('Not Implemented');
    }
})(window, document);
