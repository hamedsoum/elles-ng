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

  static toString(obj: any, indent: number = 2): string {
    Utils.assert(obj, 'value');
    if (typeof obj === 'string') return `"${obj}"`;
    if (typeof obj === 'number' || typeof obj === 'boolean') return obj.toString();
    if (Array.isArray(obj)) return `[${obj.map(item => Utils.toString(item)).join(', ')}]`;
    if (typeof obj === 'object') {
      const entries = Object.entries(obj)
        .map(([key, value]) => `${key}: ${Utils.toString(value, indent)}`);
      return `{\n${' '.repeat(indent)}${entries.join(`,\n${' '.repeat(indent)}`)}\n}`;
    }
    return obj.toString();
  }
}
