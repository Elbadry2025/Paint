import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { IShape } from '../Shapes/ishape';
import { Square } from '../Shapes/square';

const httpOptions: Object = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  }), responseType: 'text'
};
const httpOptions2: Object = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class RecieveService {

  constructor(private http: HttpClient) { }

  undo(): Observable<string>{
    return this.http.get<string>(`http://localhost:8080/connect/undo`, httpOptions);
  }
  redo(): Observable<string>{
    return this.http.get<string>(`http://localhost:8080/connect/redo`, httpOptions);
  }
  load(): Observable<string> {
    return this.http.get<string>(`http://localhost:8080/connect/load`, httpOptions2);
  }

}