import {Component, forwardRef, Input, OnInit} from "@angular/core";
import {InputComponent} from "../input-component";
import {FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {InputText} from 'primeng/inputtext';
import {NgClass, NgIf} from '@angular/common';
import {Utils} from '../../../../core/utils';
import {FloatLabel} from 'primeng/floatlabel';
import {EDOIsNotEmptyPipe} from '../../../pipes/edo.pipe';

@Component({
  selector: "input-text",
  templateUrl: "./input-text.component.html",
  imports: [
    FormsModule,
    InputText,
    NgClass,
    NgIf,
    FloatLabel,
    ReactiveFormsModule,
    EDOIsNotEmptyPipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent extends InputComponent <string> implements OnInit {

  @Input() type!: 'text' | 'password' | 'email' | 'number';

  ngOnInit(): void {
    this.onInit();
    if (Utils.isNull(this.type)) this.type = 'text';
  }

}
