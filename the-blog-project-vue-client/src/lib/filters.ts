// const moment = require('moment');
// const numeral = require('numeral');
// const _ = require('lodash');

// export default {
//   install(Vue) {

//     /**
//      * Vue filter to make a simple timestamp for an ISO date.
//      * http://jsfiddle.net/bryan_k/44kqtpeg/
//      *
//      * @param {String} value The value string.
//      */
//     Vue.filter('timestamp', (value: string) => {
//       const parts = value.split(' ');
//       let date = parts[0];
//       let time = parts[1];
//       let hour;

//       date = date.split('-');
//       time = time.split(':');

//       if (parseInt(time[0], 10) > 12) {
//         hour = parseInt(time[0], 10) % 12;
//       } else {
//         hour = parseInt(time[0], 10);
//       }

//       hour = hour < 10 ? '0' + hour : hour;

//       return '[' + date[1] + '/' + date[2] + ' ' + hour + ':' + time[1] + ']';
//     });

//     /**
//      * Vue filter to truncate a string to the specified length.
//      * @param {String} value The value string.
//      */
//     Vue.filter('truncate', (value, length) => {
//       if (value.length < length) {
//         return value;
//       }

//       length = length - 3;

//       return value.substring(0, length) + '...';
//     });

//     Vue.filter('levelPad', (value, path, offset = 0, spaces = 6) => {
//       if (!path) {
//         return value;
//       }
//       const level = path.split ? path.split('.').length : 0;
//       return _.repeat(_.repeat(' - ', spaces), level);
//     });
//   }
// };
