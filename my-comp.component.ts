import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,Validator, Validators} from '@angular/forms'
import { User } from './user';
import {Response} from '@angular/http/src/static_response';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-my-comp',
  templateUrl: './my-comp.component.html',
  styleUrls: ['./my-comp.component.css']
})
export class MyCompComponent implements OnInit {

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
 

 
  postItem(id,name,age,salary,design)
  {
    let user1=new User(id,name,age,salary,design);
    this.restservice.postuser(user1)
    .subscribe(
      (response:any)=>console.log('put susscessful'),
    )
  }

  deleteItem(id)
  {
    this.restservice.deleteuser(id)
    .subscribe(
      (response:any)=>console.log('delete susscessfully')
    )
  }
  getAllItem()
  {
    this.restservice.getAllUsers()
    .subscribe(
      (response:any)=>
      {
        console.log('display all item')
        this.users=response;
    }
    )
  }
  getItem(id:any)
  {
    this.restservice.getUser(id)
    .subscribe(
      (response:any)=>
      {
        console.log('display item details')
        this.user=response.json();
        
      }
    )
  }
}
