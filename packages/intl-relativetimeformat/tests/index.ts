import IntlRelativeTimeFormat from '../src/locales';
import { Unit } from '../src/types';
import { expect as chaiExpect } from 'chai';
declare global {
  var expect: typeof chaiExpect;
}
const units: Unit[] = [
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  // "quarter",
  'year'
];
describe('intl-relativetimeformat', function() {
  describe('format', function() {
    describe('en-us-numeric-always', function() {
      const rtf = new IntlRelativeTimeFormat('en-US');
      it('should be a function', function() {
        expect(typeof rtf.format).to.equal(
          'function',
          'format should be supported'
        );
      });

      units.forEach(unit =>
        it(`should work with "${unit}"`, function() {
          expect(rtf.format(1000, unit)).to.equal(`in 1,000 ${unit}s`);
          expect(rtf.format(10, unit)).to.equal(`in 10 ${unit}s`);
          expect(rtf.format(2, unit)).to.equal(`in 2 ${unit}s`);
          expect(rtf.format(1, unit)).to.equal(`in 1 ${unit}`);
          expect(rtf.format(0, unit)).to.equal(`in 0 ${unit}s`);
          expect(rtf.format(-0, unit)).to.equal(`0 ${unit}s ago`);
          expect(rtf.format(-1, unit)).to.equal(`1 ${unit} ago`);
          expect(rtf.format(-2, unit)).to.equal(`2 ${unit}s ago`);
          expect(rtf.format(-10, unit)).to.equal(`10 ${unit}s ago`);
          expect(rtf.format(-1000, unit)).to.equal(`1,000 ${unit}s ago`);
        })
      );
    });

    describe('en-us-numeric-auto', function() {
      const rtf = new IntlRelativeTimeFormat('en-US', { numeric: 'auto' });
      it('should be a function', function() {
        expect(typeof rtf.format).to.equal(
          'function',
          'format should be supported'
        );
      });
      const exceptions = {
        year: {
          '-1': 'last year',
          '0': 'this year',
          '1': 'next year'
        },
        // "quarter": {
        //   "-1": "last quarter",
        //   "0": "this quarter",
        //   "1": "next quarter",
        // },
        month: {
          '-1': 'last month',
          '0': 'this month',
          '1': 'next month'
        },
        week: {
          '-1': 'last week',
          '0': 'this week',
          '1': 'next week'
        },
        day: {
          '-1': 'yesterday',
          '0': 'today',
          '1': 'tomorrow'
        },
        hour: {
          '0': 'this hour'
        },
        minute: {
            '0': 'this minute'
          },
        second: {
          '-1': '1 second ago',
          '0': 'now',
          '1': 'in 1 second'
        }
      };
      units.forEach(unit =>
        it(`should work with "${unit}"`, function() {
          const expected =
            unit in exceptions
              ? [
                  (exceptions[unit as 'year'] as any)['1'] || `in 1 ${unit}`,
                  (exceptions[unit as 'year'] as any)['0'] || `in 0 ${unit}s`,
                  (exceptions[unit as 'year'] as any)['0'] || `0 ${unit}s ago`,
                  (exceptions[unit as 'year'] as any)['-1'] || `1 ${unit} ago`
                ]
              : [
                  `in 1 ${unit}`,
                  `in 0 ${unit}s`,
                  `0 ${unit}s ago`,
                  `1 ${unit} ago`
                ];

          expect(rtf.format(1000, unit)).to.equal(`in 1,000 ${unit}s`);
          expect(rtf.format(10, unit)).to.equal(`in 10 ${unit}s`);
          expect(rtf.format(2, unit)).to.equal(`in 2 ${unit}s`);
          expect(rtf.format(1, unit)).to.equal(expected[0]);
          expect(rtf.format(0, unit)).to.equal(expected[1]);
          expect(rtf.format(-0, unit)).to.equal(expected[2]);
          expect(rtf.format(-1, unit)).to.equal(expected[3]);
          expect(rtf.format(-2, unit)).to.equal(`2 ${unit}s ago`);
          expect(rtf.format(-10, unit)).to.equal(`10 ${unit}s ago`);
          expect(rtf.format(-1000, unit)).to.equal(`1,000 ${unit}s ago`);
        })
      );
    });

    describe('en-us-style-short', function() {
      const units = {
        second: ['sec.'],
        minute: ['min.'],
        hour: ['hr.'],
        day: ['day', 'days'],
        week: ['wk.'],
        month: ['mo.'],
        // quarter: ['qtr.', 'qtrs.'],
        year: ['yr.']
      };

      const rtf = new IntlRelativeTimeFormat('en-US', {
        style: 'short'
      });
      it('should be a function', function() {
        expect(typeof rtf.format).to.equal(
          'function',
          'format should be supported'
        );
      });
      Object.entries(units).forEach(([unitArgument, unitStrings]) =>
        it(unitArgument, function() {
          let [singular, plural] = unitStrings;
          if (!plural) {
            plural = singular;
          }

          expect(rtf.format(1000, unitArgument as Unit)).to.equal(
            `in 1,000 ${plural}`
          );
          expect(rtf.format(10, unitArgument as Unit)).to.equal(
            `in 10 ${plural}`
          );
          expect(rtf.format(2, unitArgument as Unit)).to.equal(
            `in 2 ${plural}`
          );
          expect(rtf.format(1, unitArgument as Unit)).to.equal(
            `in 1 ${singular}`
          );
          expect(rtf.format(0, unitArgument as Unit)).to.equal(
            `in 0 ${plural}`
          );
          expect(rtf.format(-0, unitArgument as Unit)).to.equal(
            `0 ${plural} ago`
          );
          expect(rtf.format(-1, unitArgument as Unit)).to.equal(
            `1 ${singular} ago`
          );
          expect(rtf.format(-2, unitArgument as Unit)).to.equal(
            `2 ${plural} ago`
          );
          expect(rtf.format(-10, unitArgument as Unit)).to.equal(
            `10 ${plural} ago`
          );
          expect(rtf.format(-1000, unitArgument as Unit)).to.equal(
            `1,000 ${plural} ago`
          );
        })
      );
    });
  });
});
