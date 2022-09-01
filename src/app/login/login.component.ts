import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  elegantForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private APIService : CommonService
    ) {

  }

  ngOnInit(): void {
    this.elegantForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  checkLogin() {
    if (this.elegantForm.valid) {
      var value = this.elegantForm.value;
      this.APIService.login(value)
        .subscribe(data => {
          localStorage.setItem('userName', data.data.user.name)
          this.router.navigate(['Watcho/webSeries']);
        })
    }
  }
}
