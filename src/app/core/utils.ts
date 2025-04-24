export class Utils {

  static isNull(value: unknown): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    else return false;
  }

  static assert(obj: any, name: string): void {
    if (Utils.isNull(obj)) throw new Error(`${name} cannot be null`);
  }
}
