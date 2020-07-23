import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private returnUrl: string;
  public loginFail =  false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || '/';
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit() {
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;
    this.authService.login(username, password).subscribe(
      response => {
        console.log(response);
        if(response['data']!=null){
          localStorage.setItem('access_token', response['data']);
          //localStorage.setItem('refresh_token', response['refresh_token']);
          this.router.navigate(['products']);
        }  else {
          this.loginFail= true;
        }    
      }
    );
   // this.router.navigate(['products']);
  }

}
