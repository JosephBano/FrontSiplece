import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  login: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void { }
  
  log(): void {
    if(this.login.value.usuario == 'admin' && this.login.value.password == 'admin'){
      this.router.navigate(['/panel']);
    }else{
      this.toastr.error('El Usuario o la Contraseña son incorrectas')
    }
  }
}
