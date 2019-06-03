import IntlRelativeTimeFormat, { Unit, Part, LiteralPart } from '../../src';
import { expect as chaiExpect } from 'chai';
declare var expect: typeof chaiExpect;
function verifyFormatParts(actual: Part[], expected: Part[], message: string) {
  expect(actual).to.eql(expected, message);
}

describe('formatToParts', function() {
  describe('en-us-numeric-auto', function() {
    // https://www.unicode.org/cldr/charts/33/summary/en.html#1530
    const exceptions = {
      year: {
        '-1': 'last year',
        '0': 'this year',
        '1': 'next year'
      },
      quarter: {
        '-1': 'last quarter',
        '0': 'this quarter',
        '1': 'next quarter'
      },
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
        '0': 'now'
      }
    };
    function expected<U extends keyof typeof exceptions>(
      key: '0' | '1' | '-1',
      unit: U,
      default_: Part[]
    ) {
      if (unit in exceptions && key in exceptions[unit]) {
        return [{ type: 'literal', value: exceptions[unit][key as '0'] } as LiteralPart];
      }

      return default_;
    }

    const units: Unit[] = [
      'second',
      'minute',
      'hour',
      'day',
      'week',
      'month',
      'quarter',
      'year'
    ];

    const rtf = new IntlRelativeTimeFormat('en-US', { numeric: 'auto' });

    it('branding', function() {
      expect(rtf.formatToParts).to.be.a(
        'function',
        'formatToParts should be supported'
      );
    });

    units.forEach(unit =>
      it(unit, function() {
        verifyFormatParts(
          rtf.formatToParts(1000, unit),
          [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '1', unit: unit },
            { type: 'group', value: ',', unit: unit },
            { type: 'integer', value: '000', unit: unit },
            { type: 'literal', value: ` ${unit}s` }
          ],
          `formatToParts(1000, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(10, unit),
          [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '10', unit: unit },
            { type: 'literal', value: ` ${unit}s` }
          ],
          `formatToParts(10, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(2, unit),
          [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '2', unit: unit },
            { type: 'literal', value: ` ${unit}s` }
          ],
          `formatToParts(2, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(1, unit),
          expected('1', unit as 'day', [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '1', unit: unit },
            { type: 'literal', value: ` ${unit}` }
          ]),
          `formatToParts(1, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(0, unit),
          expected('0', unit as 'day', [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '0', unit: unit },
            { type: 'literal', value: ` ${unit}s` }
          ]),
          `formatToParts(0, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(-0, unit),
          expected('0', unit as 'day', [
            { type: 'integer', value: '0', unit: unit },
            { type: 'literal', value: ` ${unit}s ago` }
          ]),
          `formatToParts(-0, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(-1, unit),
          expected('-1', unit as 'day', [
            { type: 'integer', value: '1', unit: unit },
            { type: 'literal', value: ` ${unit} ago` }
          ]),
          `formatToParts(-1, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(-2, unit),
          [
            { type: 'integer', value: '2', unit: unit },
            { type: 'literal', value: ` ${unit}s ago` }
          ],
          `formatToParts(-2, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(-10, unit),
          [
            { type: 'integer', value: '10', unit: unit },
            { type: 'literal', value: ` ${unit}s ago` }
          ],
          `formatToParts(-10, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(-1000, unit),
          [
            { type: 'integer', value: '1', unit: unit },
            { type: 'group', value: ',', unit: unit },
            { type: 'integer', value: '000', unit: unit },
            { type: 'literal', value: ` ${unit}s ago` }
          ],
          `formatToParts(-1000, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(123456.78, unit),
          [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '123', unit: unit },
            { type: 'group', value: ',', unit: unit },
            { type: 'integer', value: '456', unit: unit },
            { type: 'decimal', value: '.', unit: unit },
            { type: 'fraction', value: '78', unit: unit },
            { type: 'literal', value: ` ${unit}s` }
          ],
          `formatToParts(123456.78, ${unit})`
        );
      })
    );
  });
  describe('en-us-numeric-always', function() {
    const units: Unit[] = [
      'second',
      'minute',
      'hour',
      'day',
      'week',
      'month',
      'quarter',
      'year'
    ];

    const rtf = new IntlRelativeTimeFormat('en-US');
    it('branding', function() {
      expect(rtf.formatToParts).to.be.a(
        'function',
        'formatToParts should be supported'
      );
    });

    units.forEach(unit =>
      it(unit, function() {
        verifyFormatParts(
          rtf.formatToParts(1000, unit),
          [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '1', unit: unit },
            { type: 'group', value: ',', unit: unit },
            { type: 'integer', value: '000', unit: unit },
            { type: 'literal', value: ` ${unit}s` }
          ],
          `formatToParts(1000, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(10, unit),
          [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '10', unit: unit },
            { type: 'literal', value: ` ${unit}s` }
          ],
          `formatToParts(10, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(2, unit),
          [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '2', unit: unit },
            { type: 'literal', value: ` ${unit}s` }
          ],
          `formatToParts(2, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(1, unit),
          [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '1', unit: unit },
            { type: 'literal', value: ` ${unit}` }
          ],
          `formatToParts(1, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(0, unit),
          [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '0', unit: unit },
            { type: 'literal', value: ` ${unit}s` }
          ],
          `formatToParts(0, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(-0, unit),
          [
            { type: 'integer', value: '0', unit: unit },
            { type: 'literal', value: ` ${unit}s ago` }
          ],
          `formatToParts(-0, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(-1, unit),
          [
            { type: 'integer', value: '1', unit: unit },
            { type: 'literal', value: ` ${unit} ago` }
          ],
          `formatToParts(-1, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(-2, unit),
          [
            { type: 'integer', value: '2', unit: unit },
            { type: 'literal', value: ` ${unit}s ago` }
          ],
          `formatToParts(-2, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(-10, unit),
          [
            { type: 'integer', value: '10', unit: unit },
            { type: 'literal', value: ` ${unit}s ago` }
          ],
          `formatToParts(-10, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(-1000, unit),
          [
            { type: 'integer', value: '1', unit: unit },
            { type: 'group', value: ',', unit: unit },
            { type: 'integer', value: '000', unit: unit },
            { type: 'literal', value: ` ${unit}s ago` }
          ],
          `formatToParts(-1000, ${unit})`
        );

        verifyFormatParts(
          rtf.formatToParts(123456.78, unit),
          [
            { type: 'literal', value: 'in ' },
            { type: 'integer', value: '123', unit: unit },
            { type: 'group', value: ',', unit: unit },
            { type: 'integer', value: '456', unit: unit },
            { type: 'decimal', value: '.', unit: unit },
            { type: 'fraction', value: '78', unit: unit },
            { type: 'literal', value: ` ${unit}s` }
          ],
          `formatToParts(123456.78, ${unit})`
        );
      })
    );
  });
});
