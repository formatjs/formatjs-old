export interface UnicodeLocaleId {
  lang: UnicodeLanguageId;
  unicodeExtension: UnicodeExtension
  transformedExtension: TransformedExtension
  puExtension: PuExtension
  otherExtensions: OtherExtensions 
}

export interface UnicodeLanguageId {
  lang: string;
  script?: string;
  region?: string;
  variants?: string[];
}

export interface Keyword {
  key: string
  value: string
}

export interface UnicodeExtension {
  type: 'u'
  keywords: Keyword[];
  attributes?: string[];
}

export interface TransformedExtension {
  type: 't',
  fields: string[];
  lang?: UnicodeLanguageId;
}
export interface PuExtension {
  type: 'x',
  value: string;
}

export type OtherExtensions = Record<string, string>