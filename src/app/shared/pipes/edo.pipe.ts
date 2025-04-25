import {Pipe, PipeTransform} from "@angular/core";
import {Utils} from '../../core/utils';

@Pipe({name: "edoToString", pure: false})
export class EDOToStringPipe implements PipeTransform {
  transform(value: any): string {
    Utils.assert(value, 'value');
    return Utils.toString(value);
  }
}

@Pipe({name: "edoIsNotEmpty", pure: false})
export class EDOIsNotEmptyPipe implements PipeTransform {
  transform(value: any): boolean {
    return !Utils.isNull(value);
  }
}

@Pipe({name: "edoIsEmpty", pure: false})
export class EDOIsEmptyPipe implements PipeTransform {
  transform(value: any): boolean {
    return Utils.isNull(value);
  }
}

@Pipe({name: "formatIvorianNumber", pure: false})
export class EDOFormatIvorianNumberPipe implements PipeTransform {
  transform(phoneNumber: string): string {
    return null!;
  }

}
