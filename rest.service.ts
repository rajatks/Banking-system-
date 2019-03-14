import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs';
import 'rxjs/rx';
import { User } from './my-comp/User';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  url:string="http://localhost:3000/users/";
  constructor(private http:Http) { }

   getUser(id):Observable<Response>
   {
      return this.http.get(this.url+id)
      .map((response:Response)=>response)
   }
   postuser(user:User)
   {
     return this.http.post(this.url,user)
     .map((response:any)=>response)
   }

   deleteuser(id)
   {
     return this.http.delete(this.url+id)
     .map((response:any)=>response)
   }

   getAllUsers()
   {
     return this.http.get(this.url)
     .map((response:Response)=>response.json())
   }
}
