(function ToDoApp(window, document, undefined) {
	'use strict';
    var todoCount = 0,
        todoInput = document.getElementById('todoName'),
		todoTemplate = document.getElementById('todoTemplate').innerHTML,
		todoContainer = document.getElementById('todos'),
		toggleCompleted = document.getElementById('toggleCompletedTodos'),
		completedVisible = true;

    todoInput.focus();
    todoContainer.addEventListener('click', CheckBoxHandler);
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

        MapCompletedNodes(RemoveTodo);
    }

    function ToggleCompletedTodos(e) {
        e.preventDefault();

        VisibilityHandler();
        MapCompletedNodes(ToggleTodo);
    }

    function VisibilityHandler() {
        completedVisible = !completedVisible;

        if (completedVisible) {
            toggleCompleted.innerHTML = "Hide Completed"
        } else if (!completedVisible) {
            toggleCompleted.innerHTML = "Show Completed";
        }
    }

    function MapCompletedNodes(mapFn) {
        Array.from(document.getElementsByClassName('todoItem'))
            .filter(function(el) {
                return el.querySelector('.completeCheck').checked;
            }).map(function(el) {
                mapFn(el);
            });
    }

    function RemoveTodo(el) {
        el.parentNode.removeChild(el);
    }

    function ToggleTodo(el) {
        if (!el.classList.contains('hidden')) {
            el.classList.add('hidden');
        } else {
            el.classList.remove('hidden');
        }
    }

    function CheckBoxHandler(e) {
        var target = e.target,
            parent = e.target.parentNode.parentNode;
        
        if (!completedVisible && target.classList.contains('completeCheck') && target.checked) {
            parent.classList.add('hidden');
        }
    }
})(window, document);
