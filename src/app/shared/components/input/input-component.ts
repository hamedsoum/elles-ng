import {Directive, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, ControlValueAccessor, ValidationErrors, Validator} from "@angular/forms";
import {Utils} from '../../../core/utils';

@Directive({})
export abstract class InputComponent<V> implements ControlValueAccessor, Validator {

  @Input() styleClass?: string;
  @Input() inputStyleClass?: string;

  @Input() labelStyleClass?: string;
  @Input() placeholderStyleClass?: string;

  @Input() label?: string;
  @Input() placeholder?: string;

  @Input() fieldName?: string;

  @Input() disabled!: boolean;

  @Input() value?: V;
  @Output() valueChange = new EventEmitter<V>();

  touched = false;
  required?: boolean;

  control!: AbstractControl;

  get errorMessage(): string | null {
    if (Utils.isNull(this.control)) return null;

    for (const validatorKey in this.control!.errors) {

      if (this.control!.dirty || this.control!.touched) {
        if (this.isRequired) return 'Ce champ est obligatoire'
        if (validatorKey === 'email') return 'Veuillez saisir une adresse mail valide.';
      }
    }
    return null;
  }

  get isRequired(): boolean {
    for (const validatorKey in this.control!.errors) {
      if (validatorKey === 'required') return true;
    }
    return false;
  }

  onInit(): void {
    if (Utils.isNull(this.disabled)) this.disabled = false;
  }

  public hasControl(): boolean {
    return !Utils.isNull(this.control);
  }

  onChange = (value: V) => {
  };

  onTouched = () => {
  };

  writeValue(value: V): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    if (this.hasControl() && this.isRequired) this.required = true;

    return null;
  }

  onInput(event: V) {
    if (Utils.isNull(event)) this.valueChange.emit(undefined);
    else {
      this.value = event;
      this.valueChange.emit(this.value);
      this.onChange(event);
    }
  }

  markAsTouched() {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }


}
