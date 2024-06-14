

export class TextToolService {

  static format(text:string, ...args:string []): string {
    return text.replace(/\{(\d+)\}/g, function (e, t) {
      if (t < args.length) return args[t];
      console.warn('No replacement found for ' + e + ' in "' + text + '"');
      return t < args.length ? args[t] : '';
    });
  }

  static quotation(text:string | undefined): string {
    if(typeof text == undefined) return '';
    return `"${(text as string).replace(/\"/gi, '\\\"')}"`;
  }

  static convertArrayToString(arr: Array<any>, signal: string): string {
    const spliter = (signal != null) ? signal : ' ';
    return arr.join(spliter);
  }

  static generateGUID(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

}