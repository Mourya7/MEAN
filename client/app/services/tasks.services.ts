import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

//observables as reactives extensions
import 'rxjs/add/operator/map';

@Injectable()
export class Todoservice{
    constructor(public _http:Http){

    }
    getTodos(){
        return this._http.get('/api/v1/todos');
    }

    saveTodo(todo){
        var headers = new Headers();
        headers.append('Content-type','application/json');
        return this._http.post('/api/v1/todo',JSON.stringify(todo),{headers:headers}).map(res=>res.json());
    }

    updateTodo(todo){
        var headers = new Headers();
        headers.append('Content-type','application/json');
        return this._http.put('/api/v1/todo/'+todo._id,JSON.stringify(todo),{headers:headers});
    }

    deleteTodo(id){
        // return this._http.delete('/api/v1/todo/'+id);
    }
}