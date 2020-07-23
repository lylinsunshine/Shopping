import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AsyncValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit {

  private isUserNameExist = (service: UserService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.isUserNameExist(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return  (res['data'] ? { userNameExist: true } : null);
          // NB: Return null if there is no error
        })
      );
    };
  }

  public isRemberMeChecked: boolean = false;
  public isLoginFailed: boolean = false;
  public loadingLogin: boolean = false;
  public isRegisterSuccess = "";
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: ['CUSTOMER']
  });

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.email], this.isUserNameExist(this.userService).bind(this)],
    password: ['', Validators.required],
    repassword: ['', Validators.required],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)]],

  }, { validator: this.checkPasswords });

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('repassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  register = () => {
    this.userService.register(this.registerForm.value).subscribe(
      response => {
        this.isRegisterSuccess = response['data'];
        setTimeout(function(){ window.location.href = 'http://localhost:4200/client/index'; }, 3000);
      }
    )
  }

  login = () => {
    this.loadingLogin = true;
    this.authService.clientLogin(this.loginForm.value).subscribe(
      response => {
        //console.log(response['data']);
        if(response['data']==this.loginForm.controls.username.value){
          if(this.isRemberMeChecked) {
            localStorage.setItem('token', response['data'])
          } else {
            sessionStorage.setItem('token', response['data'])
          }
          window.location.href = 'http://localhost:4200/client/index';
          //this.router.navigate(['/client/index'])
        } else {
          this.isLoginFailed = true;
          this.loadingLogin = false;
        }

        
      }
    )
  }

}
