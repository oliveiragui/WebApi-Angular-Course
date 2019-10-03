import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { User } from '../_models/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    }, this.passwordMatchValidator);
  }

  register() {
  //   this.authService.register(this.model).subscribe(() => {
  //     this.alertify.success('registration successful');
  //   }, error => {
  //     this.alertify.error(error);
  //   });
    console.log(this.registerForm.value);
  }

  // createRegisterForm() {
  //   this.registerForm = this.fb.group({
  //     gender: ['male'],
  //     username: ['', Validators.required],
  //     knownAs: ['', Validators.required],
  //     dateOfBurth: [null, Validators.required],
  //     city: ['', Validators.required],
  //     country: ['', Validators.required],
  //     password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
  //     confirmPassword: ['', Validators.required],
  //   }, {validator: this.passwordMatchValidator});
  // }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
