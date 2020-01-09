import _Vue from 'vue';
// tslint:disable-next-line: no-var-requires
const numeral = require('numeral');

export function NumericalFilterPlugin(Vue: typeof _Vue, options?: any): void {

    /**
     * Vue filter to convert the given value to formated.
     *
     * @param {String} value    The value string.
     * @param {Number} decimals The number of decimal places.
     */
    Vue.filter('numerize', (value: number, nullWhenZero: boolean = true, numberFormat: string = '0,0.00') => {
        value = Number(value) || 0;
        if (value === 0) {
            if (nullWhenZero) {
                return '';
            } else {
                value = 0;
            }
        }

        if (!numberFormat) {
            numberFormat = '0,0.00';
        }

        return numeral(value).format(numberFormat);
    });

    /**
     * Vue filter to convert the given value absolute (negative will be posotive).
     *
     * @param {Number} value    The value string.
     */
    Vue.filter('absolute', (value: number) => {
        return Math.abs(value);
    });

    /**
     * Vue filter to convert the given value to percent.
     * http://jsfiddle.net/bryan_k/qauf3qyh/
     *
     * @param {String} value    The value string.
     * @param {Number} decimals The number of decimal places.
     */
    Vue.filter('percentage', (value: number, decimals: number = 0) => {
        if (!value) {
            value = 0;
        }

        value = value * 100;
        value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
        return value + '%';
    });

    /**
     * Vue filter to round the decimal to the given place.
     * http://jsfiddle.net/bryan_k/3ova17y9/
     *
     * @param {String} value    The value string.
     * @param {Number} decimals The number of decimal places.
     */
    Vue.filter('round', (value: number, decimals: number = 0) => {
        if (!value) {
            value = 0;
        }

        value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
        return value;
    });

    /**
     * Vue filter to convert the given value to whole dollars, no change.
     * http://jsfiddle.net/bryan_k/2t6bqqfc/
     *
     * @param {String} value The value string.
     */
    Vue.filter('no-change', (value: number, symbol: string) => {
        if (!value) {
            value = 0;
        }

        if (!symbol) {
            symbol = '$';
        }

        const str = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').split('.')[0];
        return symbol + str;
    });

}
