(function ToDoApp(document) {
    var todoCount = 0,
        todoInput = document.getElementById('todoName'),
        toggleCompleted = document.getElementById('toggleCompletedTodos'),
        completedVisible = true;

    todoInput.focus();
    toggleCompleted.addEventListener('click', ToggleCompletedTodos);
    document.getElementById('addTodo').addEventListener('click', ToDoCreate);
    document.getElementById('clearCompletedTodos').addEventListener('click', ClearCompletedTodos);
    document.getElementById('todos').addEventListener('click', CheckBoxHandler);

    function ToDoCreate(e) {
        e.preventDefault();

        var todoContainer = document.getElementById('todos'),
            todoName = todoInput.value,
            template = document.getElementById('todoTemplate').innerHTML,
            newTodo = document.createElement('li');

        if (todoName.length) {
            document.getElementById('todoName').value = "";
            newTodo.classList.add('todoItem');
            newTodo.innerHTML = template;
            newTodo.getElementsByClassName('name')[0].innerHTML = todoName;
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

        NodeListToArray(document.getElementsByClassName('todoItem'))
            .filter(function(el) {
                return el.querySelector('.completeCheck').checked;
            }).map(function(el) {
                RemoveTodo(el);
            });
    }

    function ToggleCompletedTodos(e) {
        e.preventDefault();
        completedVisible = !completedVisible;

        if (completedVisible) {
            toggleCompleted.innerHTML = "Hide Completed"
        } else if (!completedVisible) {
            toggleCompleted.innerHTML = "Show Completed";
        }

        NodeListToArray(document.getElementsByClassName('todoItem'))
            .filter(function(el) {
                return el.querySelector('.completeCheck').checked;
            }).map(function(el) {
                ToggleTodo(el);
            });
    }

    function NodeListToArray(nodes) {
        var nodeArray = [];
        for (var node of nodes) {
            nodeArray.push(node);
        }
        return nodeArray;
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
        
        if (!completedVisible && target.classList.contains('completeCheck') && target.checked ) {
            parent.classList.add('hidden');
        }
    }
})(document);
