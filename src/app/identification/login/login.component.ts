import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginUser } from './../../domain/login-user.service';
import { User } from './../../domain/models/user';
import { Doctor } from './../../domain/models/doctor';
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

  // variables for holding doctors
  public allDoctors: Doctor[] = [];
  public doctorOne: Doctor;
  public doctorTwo: Doctor;

  // constructor for creating objects
  constructor(
    protected loginNewUser: LoginUser,
    private activatedRoute: ActivatedRoute,
    private route: Router,

    protected httpClient: HttpClient

  ) { }

  // intitialize the variables
  ngOnInit() {
    // intitialize the text fields as blanks
    this.newUser = {
      userName: '',
      passWord: ''
    };

    // make two example doctors
    this.doctorOne = {
      firstName: 'Stephen',
      lastName: 'Strange'
    };
    this.doctorTwo = {
      firstName: 'Bruce',
      lastName: 'Banner'
    };

    // push to the array
    this.allDoctors.push(this.doctorOne);
    this.allDoctors.push(this.doctorTwo);

  }

  // function for resetting the text boxes
  public resetText() {
    // reset the text fields
    this.newUser = {
      userName: '',
      passWord: ''
    };
  }




  // function for getting doctor information
  public getDoctorInfo(userName: string) {
    console.log('getting doctor info');
    /*
    // make interface for getting json doctor info
    interface MyDoctor {
      firstName?: string;
      lastName?: string;
      occupation?: string;
      phone?: number;
      addres?: string;
    }

    const getDocEndpoint = 'http://0.0.0.0:5000/' + userName;

    // make a get request to receive the data
    this.httpClient.get(getDocEndpoint, this.httpOptions)
    .subscribe( data => {
      console.log();
    });
    */


    // make a get request to receive the data
    this.httpClient.post('http://0.0.0.0:5000/doctor',
    {
      'doc_id' : 2
    },
    this.httpOptions)
    .subscribe( data => {


      // make interface for getting the json data
      interface GivenDoctor {
        address?: string;
        doc_id?: number;
        email?: string;
        firstName?: string;
        lastName?: string;
        password?: string;
        phone?: number;
        profPic?: string;
        rating?: number;
        specialty?: string;
        username?: string;
      }

      // turn into the interfaced object to get the attributes
      const sentObject: GivenDoctor = data;

      // log the desired attributes
      console.log(sentObject.address);
      console.log(sentObject.email);
    },
    err => {
      console.log('Error occured');
      console.log(err);
    }
  );


  }



  // function for changing the password
  public changePassword() {
    console.log('changing the password');

    // post request to backend running in local host
    this.httpClient.post('http://0.0.0.0:5000/changepassword', {
      // send the values as json
      'username': this.newUser.userName.toString(),
      'password': this.newUser.passWord.toString()
      // 'UserId': 19,
      // 'Password': 'abe'
    },
    this.httpOptions
    ) // get the response:
    .subscribe(data => {
      // check to see if the registration went through
      console.log(data);

    }, // gdt the error message
    err => {
      console.log('Error occured.');
      console.log(err);
    }
  );

    // reset the text fields
    this.resetText();
  }



  // function for registering
  public register() {
    console.log('registering');

    /*
    // post request to backend running in local host
    this.httpClient.post('http://0.0.0.0:5000/_register', {
      // send the values as json
      'UserId': this.newUser.userName.toString(),
      'Password': this.newUser.passWord.toString()
      // 'UserId': 19,
      // 'Password': 'abe'
    },
    this.httpOptions
    ) // get the response:
    .subscribe(data => {
      // check to see if the registration went through
      console.log(data);

    }, // gdt the error message
    err => {
      console.log('Error occured.');
      console.log(err);
    }
  );
  */
    // reset the text fields
    this.resetText();
  }

  // login function
  public login() {

    // log in user by sending the user info container username and password
    this.loginNewUser.loginUser(this.newUser.userName, this.newUser.passWord).subscribe(x => {
      // log the response
      console.log(x);
    }, err => {
      console.log('Error occured');
    }
  );


    
    // post request to backend running in local host


  /*
    this.httpClient.post('http://0.0.0.0:5000/login', {
      // send the values as json
      'username': this.newUser.userName.toString(),
      'password': this.newUser.passWord.toString()
      // 'UserId': 19,
      // 'Password': 'abe'
    },
    this.httpOptions
    ) // get the response:
    .subscribe(data => {

      console.log(data);

      console.log();
      if (data === 'Login Success') {
        console.log('User was logged in');
      } else {
        console.log('Wrong Password or something else... but connected!');
      }

    }, // get the error message
    err => {
      console.log('Error occured.');
      console.log(err);
    }
  );
  */
  

   // reset the text fields
   this.resetText();

  }

}
