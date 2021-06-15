/** 
 * This file is used to convert the constants provided from the method to string pro
*/
import * as jsYaml from 'js-yaml';
import * as fs from 'fs';
export class Translation {
  static translateYml = jsYaml.load(
    fs.readFileSync('./src/localization/message-translate.yml', 'utf8'),
  );

  public static translate(
    translate_key: string,
    translate_values?: Record<string, string>,
  ): string {
    const language = 'en';
    let translate_str = this.translateYml[language][translate_key];
    if (translate_str) {
      const translate_keys =
        translate_values !== undefined ? Object.keys(translate_values) : [];
      if (translate_keys.length === 0) {
        return translate_str;
      }
      translate_keys.forEach(key => {
        const reg = new RegExp(`{ ${key} }`, 'g');
        translate_str = translate_str.replace(reg, translate_values[key]);
        
      });
      return translate_str;
    }
    return 'NA';
  }
}
