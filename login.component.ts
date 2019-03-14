import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'

import { RestService } from '../rest.service';
import { User } from '../my-comp/user';


import { Router } from '@angular/router';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


user:User={"id":1,"name":"", "age":1,"salary":1,"design":""};
users:User[]=[];
errorMsg:string="";
form;
constructor(private restservice:RestService) { }

ngOnInit() {

  this.form=new FormGroup(
    {
      id : new FormControl("",Validators.compose([
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(1)
      ])),
      name: new FormControl("",Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      age: new FormControl("",this.textvalitator),
      salary :new FormControl("",),
      design:new FormControl("",)
    }
  );
}
onSubmit(myform)
{
  console.log('hello');
  let user1=new User(myform.id,myform.name,myform.age,myform.salary,myform.design)
  this.restservice.postuser(user1)
  .subscribe(
    (response:any)=>console.log('put susscessful'),
  )
}


textvalitator(control)
{
  if(control.value.length>2)
  {
    return {'lastname':false}
  }
}

  
btnClick= function () {
  this.router.navigateByUrl('/home');
};
}


