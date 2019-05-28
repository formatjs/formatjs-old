/* @generated */	
IntlRelativeFormat.__addLocaleData({"locale":"kk","pluralRuleFunction":function(n, ord
) {
  var s = String(n).split('.'), t0 = Number(s[0]) == n,
      n10 = t0 && s[0].slice(-1);
  if (ord) return (n10 == 6 || n10 == 9
          || t0 && n10 == 0 && n != 0) ? 'many' : 'other';
  return (n == 1) ? 'one' : 'other';
},"fields":{"year":{"displayName":"жыл","relative":{"0":"биылғы жыл","1":"келесі жыл","-1":"былтырғы жыл"},"relativeTime":{"future":{"one":"{0} жылдан кейін","other":"{0} жылдан кейін"},"past":{"one":"{0} жыл бұрын","other":"{0} жыл бұрын"}}},"year-short":{"displayName":"ж.","relative":{"0":"биылғы жыл","1":"келесі жыл","-1":"былтырғы жыл"},"relativeTime":{"future":{"one":"{0} ж. кейін","other":"{0} ж. кейін"},"past":{"one":"{0} ж. бұрын","other":"{0} ж. бұрын"}}},"month":{"displayName":"ай","relative":{"0":"осы ай","1":"келесі ай","-1":"өткен ай"},"relativeTime":{"future":{"one":"{0} айдан кейін","other":"{0} айдан кейін"},"past":{"one":"{0} ай бұрын","other":"{0} ай бұрын"}}},"month-short":{"displayName":"ай","relative":{"0":"осы ай","1":"келесі ай","-1":"өткен ай"},"relativeTime":{"future":{"one":"{0} айдан кейін","other":"{0} айдан кейін"},"past":{"one":"{0} ай бұрын","other":"{0} ай бұрын"}}},"week":{"displayName":"апта","relativePeriod":"{0} аптасы","relative":{"0":"осы апта","1":"келесі апта","-1":"өткен апта"},"relativeTime":{"future":{"one":"{0} аптадан кейін","other":"{0} аптадан кейін"},"past":{"one":"{0} апта бұрын","other":"{0} апта бұрын"}}},"week-short":{"displayName":"ап.","relativePeriod":"{0} аптасы","relative":{"0":"осы апта","1":"келесі апта","-1":"өткен апта"},"relativeTime":{"future":{"one":"{0} ап. кейін","other":"{0} ап. кейін"},"past":{"one":"{0} ап. бұрын","other":"{0} ап. бұрын"}}},"day":{"displayName":"күн","relative":{"0":"бүгін","1":"ертең","2":"бүрсігүні","-2":"алдыңгүні","-1":"кеше"},"relativeTime":{"future":{"one":"{0} күннен кейін","other":"{0} күннен кейін"},"past":{"one":"{0} күн бұрын","other":"{0} күн бұрын"}}},"day-short":{"displayName":"күн","relative":{"0":"бүгін","1":"ертең","2":"бүрсігүні","-2":"алдыңғы күні","-1":"кеше"},"relativeTime":{"future":{"one":"{0} күннен кейін","other":"{0} күннен кейін"},"past":{"one":"{0} күн бұрын","other":"{0} күн бұрын"}}},"hour":{"displayName":"сағат","relative":{"0":"осы сағат"},"relativeTime":{"future":{"one":"{0} сағаттан кейін","other":"{0} сағаттан кейін"},"past":{"one":"{0} сағат бұрын","other":"{0} сағат бұрын"}}},"hour-short":{"displayName":"сағ","relative":{"0":"осы сағат"},"relativeTime":{"future":{"one":"{0} сағ. кейін","other":"{0} сағ. кейін"},"past":{"one":"{0} сағ. бұрын","other":"{0} сағ. бұрын"}}},"minute":{"displayName":"минут","relative":{"0":"осы минут"},"relativeTime":{"future":{"one":"{0} минуттан кейін","other":"{0} минуттан кейін"},"past":{"one":"{0} минут бұрын","other":"{0} минут бұрын"}}},"minute-short":{"displayName":"мин","relative":{"0":"осы минут"},"relativeTime":{"future":{"one":"{0} мин. кейін","other":"{0} мин. кейін"},"past":{"one":"{0} мин. бұрын","other":"{0} мин. бұрын"}}},"second":{"displayName":"секунд","relative":{"0":"қазір"},"relativeTime":{"future":{"one":"{0} секундтан кейін","other":"{0} секундтан кейін"},"past":{"one":"{0} секунд бұрын","other":"{0} секунд бұрын"}}},"second-short":{"displayName":"с","relative":{"0":"қазір"},"relativeTime":{"future":{"one":"{0} сек. кейін","other":"{0} сек. кейін"},"past":{"one":"{0} сек. бұрын","other":"{0} сек. бұрын"}}}}})