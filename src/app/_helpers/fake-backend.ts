import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
declare var require: any;
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() {
      console.log('intercept');
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // array in local storage for registered users
        const data: any = require('../../assets/mock_data.json');
        const docs: any = require('../../assets/mock_doctors.json');
        const fakeDocs = docs.doctors;
        const users = data.users;
        // const users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/authenticate/doc') && request.method === 'POST') {
                console.log(request.body);
                // find if any user matches login credentials
                for (let j = 0; j < data.users.length; j++) {
                  if (data.users[j].username === request.body.user.username && data.users[j].password === request.body.user.password){
                    console.log('match!');
                    const user = data.users[j];
                    const body = {
                      id: user.id,
                      username: user.username,
                      password: user.password,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      address: user.address,
                      email: user.email,
                      phone: user.phone,
                      specialty: user.specialty,
                      rating: user.rating,
                      reviews: user.reviews,
                      profPic: user.profPic,
                      scrips: user.scrips,
                      appointments: user.appointments,
                      token: 'fake-jwt-token'
                    };
                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                  }
                }
                return Observable.throw('Username or password is incorrect');
            }
            // authenticate
            if (request.url.endsWith('/api/authenticate/patient') && request.method === 'POST') {
              // find if any user matches login credentials
              for (let j = 0; j < data.users.length; j++) {
                if (data.users[j].username === request.body.user.username && data.users[j].password === request.body.user.password){
                  console.log('match!');
                  const user = data.users[j];
                  const body = {
                    id: user.id,
                    gender: user.gender,
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    email: user.email,
                    phone: user.phone,
                    emergency_contact: user.emergency_contact,
                    dob: user.dob,
                    profPic: user.profPic,
                    appointments: user.appointments,
                    scrips: user.scrips,
                    docNotes: user.docNotes,
                    notifications: user.notifications,
                    token: 'fake-jwt-token'
                  };
                  return Observable.of(new HttpResponse({ status: 200, body: body }));
                }
              }
              return Observable.throw('Username or password is incorrect');
            }

            // get doctors
            if (request.url.endsWith('/getAllDoctors') && request.method === 'GET') {
                console.log('getting Doctors');
                // check for fake auth token in header and return users if valid, this
                // security is implemented server side in a real application
                return Observable.of(new HttpResponse({ status: 200, body: fakeDocs }));

            }
            // get users
            if (request.url.endsWith('/assets/mock_data.json') && request.method === 'GET') {
                console.log('made it');
                // check for fake auth token in header and return users if valid, this
                // security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // get user by id
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security
                // is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return Observable.of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorized');
                }
            }

            // create user
            if (request.url.endsWith('/assets/mock_data.json') && request.method === 'POST') {
                // get new user object from post body
                console.log(request.body);
                const newUser = request.body;
                for (let j = 0; j < users.length; j++) {
                  if (users[j].username === newUser.username) {
                    return Observable.throw('Username "' + newUser.username + '" is already taken');
                  }
                }
                // // validation
                // let duplicateUser = users.filter(user =>  { return user.username === newUser.username; }).length;
                // if (duplicateUser) {
                //     return Observable.throw('Username "' + newUser.username + '" is already taken');
                // }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid,
                // this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return Observable.of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // pass through any requests not handled above
            return next.handle(request);

        })

        // call materialize and dematerialize to ensure delay even if
        // an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize();
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
