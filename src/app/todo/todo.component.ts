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

    constructor(
        private todoService: TodoService,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.catId = this.activatedRoute.snapshot.paramMap.get('id');

    }

    onSubmit(f: NgForm) {
        let todo = {
            todo: f.value.todoText,
            isCompleted: false,

        }
        this.todoService.saveTodo(this.catId, todo);
        f.resetForm();
    }
}
