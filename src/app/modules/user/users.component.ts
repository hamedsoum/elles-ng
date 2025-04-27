import {Component, OnInit} from '@angular/core';
import {User} from '../../core/domain/user';
import {UserService} from '../../shared/services/user.service';
import {TableModule} from 'primeng/table';
import {finalize} from 'rxjs';
import {NgIf} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {UserFormComponent} from './form/user-form.component';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  providers: [MessageService],
  imports: [
    ToastModule,
    TableModule,
    NgIf,
    Dialog,
    UserFormComponent
  ]
})
export class UsersComponent implements OnInit {

  users?: User[];

  loading?: boolean;

  formVisible: boolean = false;

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  public handleSaveEvent(user:User): void {
    this.formVisible = false;
    this.messageService.add({ severity: 'success', summary: `Utilisateur ajouté avec succès `, detail: `${user.firstName} ${user.lastName} - ${user.role}`});
    this.findAll();
  }
  private findAll(): void {
    this.loading = true
      this.userService.findAll()
        .pipe(finalize(() => this.loading = false))
        .subscribe(
        (users: User[]) => {
          this.users = users;
        },
        error => console.log(error)
      )
  }
}
