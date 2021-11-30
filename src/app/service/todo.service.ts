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
}
