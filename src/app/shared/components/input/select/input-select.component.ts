import {Component, forwardRef, Input, OnInit} from "@angular/core";
import {InputComponent} from "../input-component";
import {FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {Select} from 'primeng/select';
import {NgClass, NgIf} from '@angular/common';
import {EDOIsNotEmptyPipe} from '../../../pipes/edo.pipe';
import {FloatLabel} from 'primeng/floatlabel';

@Component({
  selector: "input-select",
  templateUrl: "./input-select.component.html",
  imports: [
    FormsModule,
    Select,
    EDOIsNotEmptyPipe,
    NgClass,
    NgIf,
    FloatLabel,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent extends InputComponent<any[]> implements OnInit {

  @Input() items?: any[];

  @Input() showClear?: boolean;

  ngOnInit(): void {
  }

  public onClear(event: Event): void {
    console.log(event)
  }
}
