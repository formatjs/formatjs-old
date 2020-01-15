export interface UnicodeLocaleId {
    lang: UnicodeLanguageId
    extensions: Array<UnicodeExtension | TransformedExtension | OtherExtension | PuExtension>
}

export interface UnicodeLanguageId {
    lang: string
    script?: string
    region?: string
    variants?: string[]
}

export const enum ExtensionType {
    unicode = 'unicode',
    transformed = 'transformed',
    other = 'other',
    pu = 'pu'
}

export interface Extension<T extends ExtensionType> {
    type: T
}

export interface UnicodeExtension extends Extension<ExtensionType.unicode> {
    keywords: Array<Record<string, string>>
    attributes?: string[]
}

export interface TransformedExtension extends Extension<ExtensionType.transformed> {
    fields: string[]
    lang?: UnicodeLanguageId 
}
export interface OtherExtension extends Extension<ExtensionType.other> {
    values: [string, string]
}
export interface PuExtension extends Extension<ExtensionType.pu> {
    values: string[]
}