unicode_locale_id = unicode_language_id extensions* pu_extensions?;
extensions = unicode_locale_extensions
    / transformed_extensions
    / other_extensions;
unicode_locale_extensions = sep [uU]
    ((sep attribute)+ (sep keyword)*
    / (sep keyword)+);
transformed_extensions = sep [tT]
   (sep tlang (sep tfield)* / (sep tfield)+);
pu_extensions = sep [xX] (sep anum_1_8)+;
other_extensions = sep [0-9a-sA-SyzYZ] (sep anum_2_8)+;
keyword = key (sep type)?;
key = anum alpha;

type = anum_3_8 (sep anum_3_8)*;	
attribute = anum_3_8;
unicode_subdivision_id	= unicode_region_subtag unicode_subdivision_suffix;	
unicode_subdivision_suffix	= anum_1_4;
unicode_measure_unit = anum_3_8 (sep anum_3_8)*;	
tlang	= unicode_language_subtag
  (sep unicode_script_subtag)?
  (sep unicode_region_subtag)?
  (sep unicode_variant_subtag)*;
tfield	= tkey tvalue;	
tkey	= alpha digit;
tvalue	= (sep anum_3_8)+;

unicode_language_id	= "root" 
  / (unicode_language_subtag (sep unicode_script_subtag)? / unicode_script_subtag) (sep unicode_region_subtag)? (sep unicode_variant_subtag)*;
unicode_language_subtag	= chars:(
    alpha alpha alpha alpha alpha alpha alpha alpha
    / alpha alpha alpha alpha alpha alpha alpha
    / alpha alpha alpha alpha alpha alpha
    / alpha alpha alpha alpha alpha
    / alpha alpha alpha
    / alpha alpha) {
        return chars.join('')
    }

unicode_script_subtag = chars:(alpha alpha alpha alpha) { return chars.join('') };	
unicode_region_subtag = chars:((alpha alpha) / (digit digit digit)) { return chars.join('') };
unicode_variant_subtag = chars:( 
      anum_5_8
    / digit anum anum anum) { return chars.join('') };
anum_1_8 = 
    anum_2_8 / anum

anum_2_8 = 
    anum_3_8
    / anum anum

anum_1_4 = 
    anum anum anum anum 
    / anum anum anum
    / anum anum
    / anum

anum_3_8 = 
    anum_5_8
    / anum anum anum anum
    / anum anum anum
    
anum_5_8 = 
    anum anum anum anum anum anum anum anum
    / anum anum anum anum anum anum anum
    / anum anum anum anum anum anum
    / anum anum anum anum anum

sep	= "-";
digit = [0-9];
alpha = [A-Z a-z];
anum = [0-9 A-Z a-z];
