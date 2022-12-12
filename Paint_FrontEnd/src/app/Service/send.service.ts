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

@Injectable({
  providedIn: 'root'
})
export class SendService {

  constructor(private http: HttpClient) { }

  sendShape(shape: IShape): Observable<string>{
    if(shape instanceof Square){
      return this.http.post<string>(`http://localhost:8080/connect/create/${shape.type}`, JSON.stringify(shape), httpOptions);
    }else{
      return this.http.post<string>(`http://localhost:8080/connect/create/${shape.type}`, JSON.stringify({
        "_x": null,
        "_y": null,
        "_stroke": null,
        "_fill": null,
        "_rotate": null,
        "_draggable": null,
        "_id": null,
        "_type": null,
      }), httpOptions);
    }
  }

  restart(): any{
    return this.http.post<any>(`http://localhost:8080/connect/create/restart`, httpOptions);
  }

}
