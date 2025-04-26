import {Component, forwardRef, Input, OnInit} from "@angular/core";
import {InputComponent} from "../input-component";
import {FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from '@angular/common';
import {Utils} from '../../../../core/utils';
import {FloatLabel} from 'primeng/floatlabel';
import {EDOIsNotEmptyPipe} from '../../../pipes/edo.pipe';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: "input-date",
  templateUrl: "./input-date.component.html",
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    FloatLabel,
    ReactiveFormsModule,
    EDOIsNotEmptyPipe,
    DatePickerModule,
    DatePickerModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent extends InputComponent <Date> implements OnInit {

  ngOnInit(): void {
    this.onInit();
  }

}
