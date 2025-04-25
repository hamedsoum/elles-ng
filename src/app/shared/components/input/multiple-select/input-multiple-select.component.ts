import {Component, forwardRef, Input, OnInit} from "@angular/core";
import {InputComponent} from "../input-component";
import {FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {Select} from 'primeng/select';
import {NgClass, NgIf} from '@angular/common';
import {EDOIsNotEmptyPipe} from '../../../pipes/edo.pipe';
import {FloatLabel} from 'primeng/floatlabel';
import {MultiSelect} from 'primeng/multiselect';

@Component({
  selector: "input-multiple-select",
  templateUrl: "./input-multiple-select.component.html",
  imports: [
    FormsModule,
    EDOIsNotEmptyPipe,
    NgClass,
    NgIf,
    FloatLabel,
    ReactiveFormsModule,
    MultiSelect
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMultipleSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputMultipleSelectComponent),
      multi: true
    }
  ]
})
export class InputMultipleSelectComponent extends InputComponent<any[]> implements OnInit {

  @Input() items?: any[];

  @Input() showClear?: boolean;

  ngOnInit(): void {
  }

  public onClear(event: Event): void {
    console.log(event)
  }
}
