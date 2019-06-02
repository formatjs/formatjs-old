(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  /*
   * Copyright 2015, Yahoo Inc.
   * Copyrights licensed under the New BSD License.
   * See the accompanying LICENSE file for terms.
   */
  function areIntlLocalesSupported(locales) {
      if (typeof Intl === 'undefined') {
          return false;
      }
      if (!locales) {
          throw new Error('locales must be supplied.');
      }
      if (!Array.isArray(locales)) {
          locales = [locales];
      }
      var intlConstructors = [
          Intl.Collator,
          Intl.DateTimeFormat,
          Intl.NumberFormat
      ].filter(Boolean);
      if (intlConstructors.length === 0) {
          return false;
      }
      return intlConstructors.every(function (intlConstructor) {
          return intlConstructor.supportedLocalesOf(locales).length === locales.length;
      });
  }

  describe('exports', function () {
      it('should have a default export function', function () {
          expect(areIntlLocalesSupported).to.be.a('function');
      });
  });
  describe('areIntlLocalesSupported()', function () {
      var Intl = global.Intl;
      describe('missing Intl', function () {
          beforeEach(function () {
              global.Intl = undefined;
          });
          afterEach(function () {
              global.Intl = Intl;
          });
          it('should return `false` for "en"', function () {
              expect(areIntlLocalesSupported('en')).to.be["false"];
          });
      });
      it('should return `true` for "en"', function () {
          expect(areIntlLocalesSupported('en')).to.be["true"];
      });
      it('should return `true` for "fr"', function () {
          expect(areIntlLocalesSupported('fr')).to.be["true"];
      });
  });

}));
//# sourceMappingURL=browser.js.map
