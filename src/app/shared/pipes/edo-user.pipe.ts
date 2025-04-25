import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../core/domain/user';
import {Utils} from '../../core/utils';

@Pipe({name: "edoUserInitial", pure: false})
export class EDOUserInitialPipe implements PipeTransform {
  transform(value: User): string {
    Utils.assert(value, 'user');
    return null!;
  }
}
