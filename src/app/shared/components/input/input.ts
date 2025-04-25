export interface EDOInputSearchOptions extends EDOInputBaseOptions {
}

export interface EDOInputSelectOptions extends EDOInputBaseOptions {
}

export interface EDOInputTextOptions extends EDOInputBaseOptions {
}

export interface EDOInputBaseOptions {
  styleClass?: string;
  labelStyleClass?: string;
  placeholderStyleClass?: string;

  label?: string;
  placeholder?: string;
}
