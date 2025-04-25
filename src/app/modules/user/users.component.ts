import {Component, OnInit} from '@angular/core';
import {User} from '../../core/domain/user';
import {UserService} from '../../shared/services/user.service';
import {TableModule} from 'primeng/table';
import {finalize} from 'rxjs';
import {NgIf} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {UsersFormComponent} from './form/users-form.component';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',

  imports: [
    TableModule,
    NgIf,
    Dialog,
    UsersFormComponent
  ]
})
export class UsersComponent implements OnInit {

  users?: User[];

  loading?: boolean;

  formVisible: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.findAll();
  }

  public handleSaveEvent(): void {
    this.formVisible = false;
    this.findAll();
  }
  private findAll(): void {
    this.loading = true
      this.userService.findAll()
        .pipe(finalize(() => this.loading = false))
        .subscribe(
        (users: User[]) => {
          this.users = users;
          console.log("Users ===>", this.users);
        },
        error => console.log(error)
      )
  }
}
