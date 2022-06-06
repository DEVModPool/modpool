export class GeneralUtil {
    static randomColor = require('randomcolor');

    static generatePurple() {
        return this.randomColor({hue: 'purple'});
    }

    static generatePink() {
        return this.randomColor({hue: 'pink'});
    }

    static camelToString(text: string) {
        const result = text.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
}
