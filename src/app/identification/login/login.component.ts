import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';



import { LoginUser } from './../../domain/login-user.service';
import { User } from './../../domain/models/user';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  public newUser: User;

  // http options with headers
  protected httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'jbrachle'
    })
  };




  constructor(
    protected loginNewUser: LoginUser,
    private activatedRoute: ActivatedRoute,
    private route: Router,

    protected httpClient: HttpClient

  ) { }

  ngOnInit() {
    this.newUser = {
      userName: '',
      passWord: ''
    };
  }


  public login() {
    // console.log('login');

    // console.log(this.newUser.userName);
    // console.log(this.newUser.passWord);

    // make parameters as text only
    this.newUser.userName = this.newUser.userName.toString();
    this.newUser.passWord = this.newUser.passWord.toString();

    // log in user by sending the user info container username and password
    /*
    this.loginNewUser.loginUser(this.newUser).subscribe(x => {
      // log the response
      console.log(x);
    }, err => {
      console.log('Error occured');
    }
  );
  */


    // working get request:
    /*
    this.httpClient.get('https://1fb74158-a7a1-4843-9291-7ac88a0a36c8.mock.pstmn.io/login').subscribe(data => {
      console.log(data);
    });
    */


    // posting to postman
    /*
    this.httpClient.post('https://2523f7e9-724d-48c4-b0a7-9ad9ebb978ba.mock.pstmn.io/login', {
      'username': this.newUser.userName,
      'password': this.newUser.passWord
    },
    this.httpOptions
  )
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
      */


      // post to json api
      /*
     this.httpClient.post('http://jsonplaceholder.typicode.com/posts', {
      'username': this.newUser.userName.toString(),
      'password': this.newUser.passWord.toString()
      },
      this.httpOptions
      )
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
      */




      // interface for github
      /*
     interface UserResponse {
      login: string;
      bio: string;
      company: string;
      id: number;
    }

      // get from github
      this.httpClient.get<UserResponse>('https://api.github.com/users/jeremybrachle').subscribe(data => {
      console.log(data.bio);
      console.log();
      if (data.id === 17361607) {
        console.log('I know the number!');
      } else {
        console.log('I do not know the number');
      }

      }, err => {
        console.log('Error occured.');
      }
    );
    */



    // get from github
    this.httpClient.post('http://0.0.0.0:5000/login', {
      'UserId': this.newUser.userName.toString(),
      'Password': this.newUser.passWord.toString()
      // 'UserId': 19,
      // 'Password': 'abe'
    },
    this.httpOptions
    )
    .subscribe(data => {
      
      console.log(data);
      
      console.log();
      if (data === 'Login Success') {
        console.log('User was logged in');
      } else {
        console.log('Wrong Password or something else... but connected!');
      }
      
    }, err => {
      console.log('Error occured.');
      console.log(err);
    }
  );



    this.newUser = {
      userName: '',
      passWord: ''
    };

  }

}
