import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TableModule} from 'primeng/table';
import {finalize} from 'rxjs';
import {NgClass, NgIf} from '@angular/common';
import {UserService} from '../../../shared/services/user.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Role, User} from '../../../core/domain/user';
import { InputTextModule } from 'primeng/inputtext';
import {ProgressSpinner} from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import {InputTextComponent} from '../../../shared/components/input/text/input-text.component';
import {InputSelectComponent} from '../../../shared/components/input/select/input-select.component';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',

  imports: [
    TableModule,
    InputTextModule,
    NgClass,
    ReactiveFormsModule,
    ProgressSpinner,
    NgIf,
    SelectModule,
    InputTextComponent,
    InputSelectComponent
  ]
})
export class UserFormComponent implements OnInit {

  loading?: boolean;

  formGroup!: FormGroup;

  error?: any;

  roles = [
    { value: Role.ADMIN, label: 'Admin' },
    { value: Role.AMAZON, label: 'AMAZON' },
  ]

  @Output() cancelEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter<User>();

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildFields();
  }

  public save(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.loading = true;
      let formData = this.formGroup.value;
      formData = {
        ...formData,
        role: formData.role.value,
      }
      this.userService.save(formData)
        .pipe(finalize(() => this.loading = false))
        .subscribe(
          {
            next: userSaved => {
              this.formGroup.reset();
              this.saveEvent.emit(userSaved);
            },
            error: error => this.error = error
          }
        )
    }
  }

  private buildFields(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['' , Validators.required],
      phoneNumber: ['', Validators.required],
      email: [''],
      role: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
}
