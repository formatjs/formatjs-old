{
    function ignoreSep ([sep, str]) {
        return str
    }

    function processLangId (languages, region, variants) {
        const [lang, script] = languages
      const result = {
          lang,
          script,
          region: '',
          variants: [] as string[]
      }
      if (lang.length === 4) {
          result.script = lang
      } else {
          result.lang = lang
          if (script) {
              result.script = script[1]
          }
      }

      if (region) {
          result.region = region[1]
      }

      if (Array.isArray(variants) && variants.length) {
          result.variants = variants.map(ignoreSep)
      }
      return result
    }
}

// https://unicode.org/reports/tr35/#unicode_locale_id
// This does not contain unicode_subdivision_id, unicode_subdivision_suffix & unicode_measure_unit
unicode_locale_id = lang:unicode_language_id extensions:extensions* puExtensions:pu_extensions? {
    return {
        lang,
        extensions: [
            ...(Array.isArray(extensions) ? extensions : []),
            ...(Array.isArray(puExtensions) ? puExtensions : [])
        ]
    }
};
extensions = unicode_locale_extensions
    / transformed_extensions
    / other_extensions;
unicode_locale_extensions = sep [uU]
    extension:(
        attributes:(sep attribute)+ keywords:(sep keyword)* {
            return {
                attributes: attributes.map(ignoreSep),
                keywords: Array.isArray(keywords) ? keywords.map(ignoreSep) : []
            }
        }
        / keywords:(sep keyword)+ {
            return { keywords: keywords.map(ignoreSep) }
        }
    ) {
        return {...extension, type: 'unicode'}
    };
transformed_extensions = sep [tT]
   extension:(
       sep lang:tlang fields:(sep tfield)* { 
           const result = {lang, fields: [] as string[]}
           if (Array.isArray(fields)) {
               result.fields = fields.map(ignoreSep)
           }
       }
        / fields:(sep tfield)+ {
            return {fields: fields.map(ignoreSep) }
        }
    ) {
        return {...extension, type: 'transformed'}
    };
pu_extensions = sep [xX] extensions:(sep anum_1_8)+ {
    return { type: 'pu', values: extensions.map(ignoreSep) }
};
// alphanum-[tTuUxX] but there's no exclusion in pegjs
other_extensions = sep k:[0-9a-sA-SyzYZ] values:(sep anum_2_8)+ {
    return { values: values.map(ignoreSep).map(value => [k, value]), type: 'other' }
};
keyword = k:key v:(sep type)? {
    if (Array.isArray(v) && v[1]) {
        return {[k]: v[1]}
    }
    // TODO: Figure out how to handle key w/o value
    return
};
key = $(anum alpha);

type = $(anum_3_8 (sep anum_3_8)*);	
attribute = anum_3_8;
tlang = lang:unicode_language_subtag
  script:(sep unicode_script_subtag)?
  region:(sep unicode_region_subtag)?
  variants:(sep unicode_variant_subtag)* {
      return processLangId([lang, script], region, variants)
  };
tfield = k:tkey v:tvalue {
    return {[k]: v}
};	
tkey = $(alpha digit);
tvalue = val:(sep anum_3_8)+ {
    return val.map(ignoreSep)
};

unicode_language_id	= "root" { return { lang: 'root' }} 
  / languages:(unicode_language_subtag (sep unicode_script_subtag)? / unicode_script_subtag) region:(sep unicode_region_subtag)? variants:(sep unicode_variant_subtag)* {
      return processLangId(languages, region, variants)
  };
unicode_language_subtag	= alpha_5_8 / alpha_2_3

unicode_script_subtag = $(alpha alpha alpha alpha);	
unicode_region_subtag = $((alpha alpha) / (digit digit digit));
unicode_variant_subtag = $( 
      anum_5_8
    / digit anum anum anum);

// The section below are repetitive bc pegjs doesn't support range (e.g alpha{3,8})
alpha_2_3 = $(
    alpha alpha alpha
    / alpha alpha 
)

alpha_5_8 = $(
    alpha alpha alpha alpha alpha alpha alpha alpha 
    / alpha alpha alpha alpha alpha alpha alpha
    / alpha alpha alpha alpha alpha alpha
    / alpha alpha alpha alpha alpha
)

anum_1_8 = 
    $(anum_2_8 / anum)

anum_2_8 = 
    $(anum_3_8 / anum anum)

anum_1_4 = 
    $(anum anum anum anum 
    / anum anum anum
    / anum anum
    / anum)

anum_3_8 = 
    $(anum_5_8
    / anum anum anum anum
    / anum anum anum)
    
anum_5_8 = 
    $(anum anum anum anum anum anum anum anum
    / anum anum anum anum anum anum anum
    / anum anum anum anum anum anum
    / anum anum anum anum anum)

// Basic char defs
sep	= "-";
digit = [0-9];
alpha = [A-Za-z];
anum = [0-9A-Za-z];
