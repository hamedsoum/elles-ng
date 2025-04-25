import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TableModule} from 'primeng/table';
import {finalize} from 'rxjs';
import {NgClass, NgIf} from '@angular/common';
import {UserService} from '../../../shared/services/user.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Role, User} from '../../../core/domain/user';
import {FloatLabel} from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import {ProgressSpinner} from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',

  imports: [
    TableModule,
    FloatLabel,
    InputTextModule,
    NgClass,
    ReactiveFormsModule,
    ProgressSpinner,
    NgIf,
    SelectModule
  ]
})
export class UsersFormComponent implements OnInit {

  loading?: boolean;

  formGroup!: FormGroup;

  error?: any;

  roles = [
    { value: Role.ADMIN, label: 'Admin' },
    { value: Role.SUBSCRIBER, label: 'Souscripteur' },
  ]
  @Output() saveEvent = new EventEmitter<User>();

  constructor(

    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildFields();
  }

  public save(): void {
    this.loading = true;
    let formData = this.formGroup.value;
    formData = {
      ...formData,
      role: formData.role.value,
    }
    console.log("formData", formData);
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

  private buildFields(): void {
    this.formGroup = this.formBuilder.group({
      firstName: [],
      lastName: [],
      phoneNumber: [],
      email: [],
      role: [],
      password: []
    })
  }
}
