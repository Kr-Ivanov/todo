import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../service/category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    color: Array<string> = [
        '#e7845e', '#fc0184', '#f6b93f', '#9224a7', '#20c898'
    ];

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {
    }

    onSubmit(f: NgForm) {

        let randomNumber = Math.trunc(Math.random() * this.color.length);

        let todoCategory = {
            category: f.value.categoryName,
            colorCode: this.color[randomNumber],
            todoCount: 0
        };

        this.categoryService.saveCategory(todoCategory);
    }

}
