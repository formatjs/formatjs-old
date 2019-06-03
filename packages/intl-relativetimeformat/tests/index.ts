import 'intl-pluralrules';
import './prototype/format';
// We rely on Intl.NumberFormat.prototype.formatToParts
if (typeof Intl.NumberFormat.prototype.formatToParts !== 'undefined') {
  require('./prototype/formatToParts');
}
