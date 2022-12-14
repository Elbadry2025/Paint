import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class SendService {

  constructor(private http: HttpClient) { }

  sendShape(shape: IShape): Observable<string>{
    return this.http.post<string>(`http://localhost:8080/connect/create/${shape.type}`, JSON.stringify(shape), httpOptions);
  }

  deleteShape(shape: IShape, UR: boolean): Observable<string>{
    return this.http.post<string>(`http://localhost:8080/connect/delete/${shape.type}/${UR}`, JSON.stringify(shape), httpOptions);
  }

  save(): Observable<string> {
    return this.http.post<string>(`http://localhost:8080/connect/save`, httpOptions2);
  }

  restart(): any{
    return this.http.post<any>(`http://localhost:8080/connect/restart`, httpOptions);
  }

}
