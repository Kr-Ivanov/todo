import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(
        private afs: AngularFirestore,
        private toastr: ToastrService
    ) { }

    saveTodo(id: string, data: any) {

        this.afs.doc('categories/' + id).update({ todoCount: firebase.firestore.FieldValue.increment(1) })

        this.afs.collection('categories').doc(id).collection('todos').add(data).then(ref => {
            this.toastr.success('New Todo Saved Successfully');
        });
    }

    loadTodos(id: string) {
        return this.afs.collection('categories').doc(id).collection('todos').snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, data };
                });
            })
        );
    }

    updateTodo(catId: string, todoId: string, updateData: string) {
        this.afs.collection('categories').doc(catId).collection('todos').doc(todoId).update({ todo: updateData }).then(() => {
            this.toastr.success('Todo Updated Successfully');
        })
    }
}
