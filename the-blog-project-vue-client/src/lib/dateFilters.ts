import _Vue from 'vue';
import moment from 'moment';

export function DateFilterPlugin(Vue: typeof _Vue, options?: any): void {
    /**
     * Vue filter to convert the given value to formated.
     *
     * @param {String} value    The value string.
     * @param {Number} decimals The number of decimal places.
     */
    Vue.filter('dateFormat', (value: any, dateFormat: string) => {
        if (!value) {
            return '';
        }

        if (!dateFormat) {
            dateFormat = 'DD/MM/YYYY';
        }

        return moment(value).format(dateFormat);
    });
}
