export type Field =
  | 'second'
  | 'second-short'
  | 'minute'
  | 'minute-short'
  | 'hour'
  | 'hour-short'
  | 'day'
  | 'day-short'
  | 'week'
  | 'week-short'
  | 'month'
  | 'month-short'
  | 'year'
  | 'year-short';

export type Unit =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

export type RelativeTimeOpt = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

export interface LocaleData {
  locale: string;
  parentLocale?: string;
  fields?: LocaleFieldsData;
}

export type LocaleFieldsData = { [f in Field]: FieldData };

export type RelativeTimeData = { [u in RelativeTimeOpt]?: string };
export interface FieldData {
  displayName: string;
  relative: {
    '0'?: string;
    '1'?: string;
    '-1'?: string;
    '2'?: string;
    '-2'?: string;
    '3'?: string;
    '-3'?: string;
  };
  relativePeriod?: string;
  relativeTime: {
    future: RelativeTimeData;
    past: RelativeTimeData;
  };
}
