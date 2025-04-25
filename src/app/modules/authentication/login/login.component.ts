import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextComponent} from '../../../shared/components/input/text/input-text.component';
import {NgClass, NgIf} from '@angular/common';
import {ProgressSpinner} from 'primeng/progressspinner';
import {UserService} from '../../../shared/services/user.service';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {finalize} from 'rxjs';
import {EDOIsNotEmptyPipe} from '../../../shared/pipes/edo.pipe';

@Component({
  selector: 'login',
  imports: [
    FormsModule,
    InputTextComponent,
    ReactiveFormsModule,
    NgIf,
    ProgressSpinner,
    NgClass,
    EDOIsNotEmptyPipe
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loading?: boolean;

  formGroup!: FormGroup;

  error?: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.buildFields();
  }

  login(): void {
    this.formGroup.markAllAsTouched();
    if(this.formGroup.valid) {
      this.loading = true;
      let formData = this.formGroup.value;
      this.authenticationService.login(formData.username, formData.password)
        .pipe(finalize(() => this.loading = false))
        .subscribe(
          {
            next: response => {
              console.log(response);
              this.authenticationService.setToken(response.token);
              this.authenticationService.setUser(response.user);
              if (this.authenticationService.isAuthenticated()) this.router.navigate(['main']);
              this.formGroup.reset(response);
            },
            error: error => {
              this.error = "Connexion échoué ! Mauvais username ou mot de passe.";
            }
          }
        )
    }
  }

  private buildFields(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['' , Validators.required],
    })
  }
}
