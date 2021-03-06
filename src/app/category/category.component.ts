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

    categories: Array<any> = [];

    categoryName: string = '';

    categoryId: string = '';

    dataStatus: string = 'Add';

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {

        this.categoryService.loadCategories().subscribe(val => {
            this.categories = val;

        })
    };

    onSubmit(f: NgForm) {

        if (this.dataStatus == 'Add') {
            let randomNumber = Math.trunc(Math.random() * this.color.length);

            let todoCategory = {
                category: f.value.categoryName,
                colorCode: this.color[randomNumber],
                todoCount: 0
            };

            this.categoryService.saveCategory(todoCategory);
        }

        if (this.dataStatus == 'Edit') {

            this.categoryService.updateCategories(this.categoryId, f.value.categoryName)

            this.dataStatus = 'Add'
        }

        f.resetForm();

    };

    onEdit(category: string, id: string) {
        this.categoryName = category;
        this.categoryId = id;
        this.dataStatus = 'Edit';

    };

    onDelete(id: string) {
        this.categoryService.delCategory(id);
    }
}
