import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


    catId: any = '';
    todos: Array<any> = [];
    todoName: string = '';

    todoId: string = '';

    dataStatus: string = 'Add';

    constructor(
        private todoService: TodoService,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.catId = this.activatedRoute.snapshot.paramMap.get('id');

        this.todoService.loadTodos(this.catId).subscribe(val => {
            this.todos = val;
            console.log(this.todos);
        });

    }

    onSubmit(f: NgForm) {
        if (this.dataStatus == 'Add') {
            let todo = {
                todo: f.value.todoText,
                isCompleted: false,
            }
            this.todoService.saveTodo(this.catId, todo);
        }

        if (this.dataStatus == 'Edit') {
            this.todoService.updateTodo(this.catId, this.todoId, this.todoName);
            this.dataStatus = 'Add';
        }

        f.resetForm();
    }

    onEdit(todoName: string, id: string) {
        this.todoName = todoName;
        this.todoId = id;
        this.dataStatus = 'Edit';
    };

    onDelete(id: string) {
        this.todoService.deleteTodo(this.catId, id);
    }

    onComplete(id: string) {

        this.todoService.markCompleteTodo(this.catId, id);
    }

    unComplete(id: string) {
        this.todoService.markUnCompleteTodo(this.catId, id);
    }
}
