(function ToDoApp(document) {
    var todoCount = 0,
        todoInput = document.getElementById('todoName'),
        completedTodosHidden = false;

    todoInput.focus();
    document.getElementById('addTodo').addEventListener('click', ToDoCreate);
    document.getElementById('clearCompletedTodos').addEventListener('click', ClearCompletedTodos);
    document.getElementById('hideCompletedTodos').addEventListener('click', HideCompletedTodos);
    document.getElementById('showCompletedTodos').addEventListener('click', ShowCompletedTodos);

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

    function HideCompletedTodos(e) {
        e.preventDefault();

        NodeListToArray(document.getElementsByClassName('todoItem'))
            .filter(function(el) {
                return el.querySelector('.completeCheck').checked;
            }).map(function(el) {
                HideTodo(el);
            });
    }

    function ShowCompletedTodos(e) {
        e.preventDefault();
        
        NodeListToArray(document.getElementsByClassName('hidden'))
            .map(function(el) {
                el.classList.remove('hidden');
            });
    }

    function NodeListToArray(nodes) {
        var nodeArray = [];
        for (var node of nodes) {
            nodeArray.push(node);
        }
        return nodeArray;
    }

    function RemoveTodo(el, className) {
        el.parentNode.removeChild(el);
    }

    function HideTodo(el, className) {
        if (!el.classList.contains('hidden')) {
            el.classList.add('hidden');
        }
    }
})(document);