const taskHolder = document.querySelector('.task-holder');
const input = document.querySelector('.addinput');
const clearing = document.querySelector('.clearing');

class TodolistClass {
  constructor() {
    this.taskInfo = JSON.parse(localStorage.getItem('Todo')) || [];
  }

  addTask(doTask) {
    const todoobj = {
      description: doTask,
      completed: false,
      index: this.taskInfo.length,
    };
    this.taskInfo.push(todoobj);
    localStorage.setItem('Todo', JSON.stringify(this.taskInfo));
    return todoobj;
  }

  static displayTask(wee) {
    const taskElement = document.createElement('li');
    taskElement.classList.add(
      'px-0',
      'd-flex',
      'align-items-center',
      'py-1',
      'px-2',
      'task-element',
      'border-bottom',
    );

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    const taskDescription = document.createElement('p');
    taskDescription.classList.add(
      'px-2',
      'align-items-center',
      'm-0',
      'container',
      'fs-5',
    );
    taskDescription.innerHTML = wee.description;
    if (wee.completed === true) {
      checkbox.checked = true;
      taskDescription.classList.add('text-decoration-line-through');
    } else {
      checkbox.checked = false;
      taskDescription.classList.add('text-decoration-none');
    }

    const dots = document.createElement('span');
    dots.classList.add('dots');
    dots.innerHTML = `<svg class="text-secondary text-opacity-10" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
      </svg>`;

    const bin = document.createElement('span');
    bin.classList.add('d-none', 'bin');
    bin.innerHTML = `<svg class="text-secondary text-opacity-10" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>`;

    taskElement.append(checkbox, taskDescription, dots, bin);
    taskHolder.append(taskElement);
  }

  // show task

  showTask() {
    this.taskInfo.forEach((tasks) => {
      TodolistClass.displayTask(tasks);
    });
  }

  // updateTaskStatus
  updateTaskStatus(chck, index) {
    chck.addEventListener('click', (r) => {
      if (r.currentTarget.checked) {
        chck.nextElementSibling.classList.add('text-decoration-line-through');
        this.taskInfo[index].completed = true;
        localStorage.setItem('Todo', JSON.stringify(this.taskInfo));
      } else {
        if (
          chck.nextElementSibling.classList.contains(
            'text-decoration-line-through',
          )
        ) {
          chck.nextElementSibling.classList.remove(
            'text-decoration-line-through',
          );
        }
        this.taskInfo[index].completed = false;
        localStorage.setItem('Todo', JSON.stringify(this.taskInfo));
        window.location.reload();
      }
    });
  }

  removeSelectedTask(trash, index) {
    trash.addEventListener('click', () => {
      taskHolder.removeChild(trash.parentElement);
      this.taskInfo.splice(index, 1);
      this.taskInfo.forEach((list) => {
        if (list.index > index) {
          list.index -= 1;
        }
      });
      localStorage.setItem('Todo', JSON.stringify(this.taskInfo));
      window.location.reload();
    });
  };

   // filter

  remove(cl){
    cl.addEventListener('click', (m) => {
      this.taskInfo = this.taskInfo.filter((cls) => cls.completed !== true );
      this.taskInfo.forEach((remain,index) => {
        if(remain.index !== index){
          remain.index = index;
        };
      });
      localStorage.setItem('Todo', JSON.stringify(this.taskInfo));
      window.location.reload();
    });
  };
}

const tododisplay = new TodolistClass();

// function to expoert

function runfunction() {
  tododisplay.showTask();
  input.addEventListener('keypress', (e) => {
    if (input.value && e.key === 'Enter') {
      const newaddedTask = tododisplay.addTask(input.value);
      TodolistClass.displayTask(newaddedTask);
      input.value = '';
      e.preventDefault();
      window.location.reload();
    }
  });

  const dots = document.querySelectorAll('.dots');

  dots.forEach((ddt, index) => {
    ddt.addEventListener('click', () => {
      ddt.classList.add('d-none');
      ddt.nextElementSibling.classList.remove('d-none');
      tododisplay.removeSelectedTask(ddt.nextElementSibling, index);
    });
  });

  const checkbox = document.querySelectorAll('.checkbox');

  checkbox.forEach((chkbx, index) => {
    tododisplay.updateTaskStatus(chkbx, index);
  });

  tododisplay.remove(clearing);
}
runfunction();
