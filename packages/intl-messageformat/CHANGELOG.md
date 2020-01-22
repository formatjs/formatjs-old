# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 8.0.0 (2020-01-22)


### Bug Fixes

* **@formatjs/intl-pluralrules:** rm side effects array due to build complication ([f22e552](https://github.com/formatjs/formatjs/commit/f22e552b7a686a76b366a97da081ebf16d5aadeb))
* **eslint-plugin-format:** fix eslint-plugin-formatjs type error ([b647552](https://github.com/formatjs/formatjs/commit/b6475523bf816e2ac3be6c03d0b565fccb2b5c29))
* **intl-messageformat:** filter out XML a bit more aggressively ([36af40e](https://github.com/formatjs/formatjs/commit/36af40e9fbf5b9be8168fb29ac0b23c6b4703d3f)), closes [#148](https://github.com/formatjs/formatjs/issues/148)
* **intl-messageformat:** fix [#36](https://github.com/formatjs/formatjs/issues/36) and config merging ([#40](https://github.com/formatjs/formatjs/issues/40)) ([4a9969f](https://github.com/formatjs/formatjs/commit/4a9969f864f01897357e372dbcb9223221d4b218))
* **intl-messageformat:** Fix case-sensitive tag ([69b6eae](https://github.com/formatjs/formatjs/commit/69b6eae7034f03b0c1a6fc9575d1e4921236c20a))
* **intl-messageformat:** fix chrome v77 issue where NumberFormat.supportedLocalesOf(cy) broke ([4b1605c](https://github.com/formatjs/formatjs/commit/4b1605c51c4973d080a1c4ce9b0179a0451c3be6))
* **intl-messageformat:** fix empty value in formatting ([9f820ea](https://github.com/formatjs/formatjs/commit/9f820ea9c70200be54910136d71549e4f777a7cb)), closes [#156](https://github.com/formatjs/formatjs/issues/156)
* **intl-messageformat:** fix formatHTMLMessage @ regex ([d1b7c8c](https://github.com/formatjs/formatjs/commit/d1b7c8c14a0b90f8d059a8dc3e12ce7976192975)), closes [#217](https://github.com/formatjs/formatjs/issues/217)
* **intl-messageformat:** fix formatXMLMessage w/o tag ([8d3bfcd](https://github.com/formatjs/formatjs/commit/8d3bfcde8fe4fbcb61e00acdbed9e26849d819b6))
* **intl-messageformat:** fix regex, fix [#130](https://github.com/formatjs/formatjs/issues/130) ([f597630](https://github.com/formatjs/formatjs/commit/f5976307d6491c8988a39d668d7f0ca7d9ba742d))
* **intl-messageformat:** handle closing tag nested inside regular tag ([08c970a](https://github.com/formatjs/formatjs/commit/08c970a8ca9587f86f3726adb974af9e65073721))
* **intl-messageformat:** handle formatXMLMessage better ([c03ecf8](https://github.com/formatjs/formatjs/commit/c03ecf859c77596af62c81913a6a70160e2557c8))
* **intl-messageformat:** handle nested # in plural correctly, fix [#202](https://github.com/formatjs/formatjs/issues/202) ([22121b2](https://github.com/formatjs/formatjs/commit/22121b210b566ad3dd509e4cbf47d3c245742928))
* **intl-messageformat:** Include Date in PrimitiveType ([1feca57](https://github.com/formatjs/formatjs/commit/1feca5745ef44831b4f1b70fd627fcb9d6f30206)), closes [#127](https://github.com/formatjs/formatjs/issues/127)
* generate lib instead of mjs ([05e63b3](https://github.com/formatjs/formatjs/commit/05e63b3aa2544c961087415b44ad6ba1572a659c))
* **intl-messageformat:** pass raw locales down to individual formatters ([3a74c2e](https://github.com/formatjs/formatjs/commit/3a74c2e7c6592de3a4f5ca182c5846fe095abe55)), closes [#255](https://github.com/formatjs/formatjs/issues/255)
* **intl-messageformat:** remove re-export for parseDateTimeSkeleton ([8611aa4](https://github.com/formatjs/formatjs/commit/8611aa4f950ee1d42ea5e631a6fc8b50bae0383a))
* **intl-messageformat:** use api-extractor to combine type definitions ([6c6af9d](https://github.com/formatjs/formatjs/commit/6c6af9d837d13938fa647cbbbaf2f417935908fd))
* generate .mjs instead of lib ([0c34ee4](https://github.com/formatjs/formatjs/commit/0c34ee46f87459853ceef3a92309e77a5dd4b82c))
* **intl-messageformat-parser:** allow negative in plural rule, fixes [#146](https://github.com/formatjs/formatjs/issues/146) ([50c7710](https://github.com/formatjs/formatjs/commit/50c77108700ae564a9677d88c4a7fa2460895be1))
* **intl-messageformat-parser:** argStyleText can contain syntax characters and quoted string now ([#136](https://github.com/formatjs/formatjs/issues/136)) ([b39ea08](https://github.com/formatjs/formatjs/commit/b39ea0871bcf9d1f6ff002f5450e952bc50897cc)), closes [#135](https://github.com/formatjs/formatjs/issues/135)
* **intl-messageformat-parser:** throw when there are duplicates in select/plural, fix [#168](https://github.com/formatjs/formatjs/issues/168) ([0c3a0e0](https://github.com/formatjs/formatjs/commit/0c3a0e0581775588e7ab0a941d64ec266c4b7005))
* **lint:** fix lint config and rerun ([041eb99](https://github.com/formatjs/formatjs/commit/041eb99706164048b5b8ce7079955897ce27ed70))


### Features

* **@formatjs/cli:** A CLI for formatjs ([#234](https://github.com/formatjs/formatjs/issues/234)) ([1f57a0b](https://github.com/formatjs/formatjs/commit/1f57a0b0921e0228cf3fd4eff756b0cd17e28fb5))
* **eslint-plugin-formatjs:** add supported-datetime-skeleton rules ([c121a9a](https://github.com/formatjs/formatjs/commit/c121a9a9a52f21fbe1fdfc70e31c0275efbd0f8d))
* **intl-format-cache:** fix TS definition ([71ae9eb](https://github.com/formatjs/formatjs/commit/71ae9eb7069ba297fcc52b852ce30a5cbe768e38))
* **intl-messageformat:** Add `formatToParts` ([0680f58](https://github.com/formatjs/formatjs/commit/0680f58beb830fed62b589aad268b4ec205c6e2f))
* **intl-messageformat:** Add `getAst` method ([3d6c289](https://github.com/formatjs/formatjs/commit/3d6c28904125f74c6e4c15d45eb53ebc1499caca))
* **intl-messageformat:** add limited support for date time skeleton ([07795b9](https://github.com/formatjs/formatjs/commit/07795b9e5e0116ffaf5f410c4e1c1a375f86ba8a))
* **intl-messageformat:** Add xml formatting ([#124](https://github.com/formatjs/formatjs/issues/124)) ([72cdafc](https://github.com/formatjs/formatjs/commit/72cdafcd263534eb529dadfc44188431cb88d445))
* **intl-messageformat:** allow mixed placeholder & XML together… ([#126](https://github.com/formatjs/formatjs/issues/126)) ([4a624c0](https://github.com/formatjs/formatjs/commit/4a624c06383724688c7168fe1fffbaeeb2aa72e5))
* **intl-messageformat:** allow passing in formatters ([#107](https://github.com/formatjs/formatjs/issues/107)) ([3605693](https://github.com/formatjs/formatjs/commit/3605693e3ddbad4c964578222945f82f5dfe80e2))
* **intl-messageformat:** allow passing in object to formatXMLMessage ([ce05b8a](https://github.com/formatjs/formatjs/commit/ce05b8a99d006d4296f450c5bdc56524e0572a9b))
* **intl-messageformat:** export core entry point ([ca7eeae](https://github.com/formatjs/formatjs/commit/ca7eeaea7a63b9431625be7aa82da95d2e38e3bb))
* **intl-messageformat:** export Part types ([450c495](https://github.com/formatjs/formatjs/commit/450c495d53a00defab28ffc36e23cc8a997b2880))
* **intl-messageformat:** Integrate parser's number skeleton ([c4ec029](https://github.com/formatjs/formatjs/commit/c4ec029322de34477997531ae8e9bb937cb0d52d))
* **intl-messageformat:** mark the package as side-effects free ([a1a08ae](https://github.com/formatjs/formatjs/commit/a1a08aebc6abe4aac42632814e34145e59327bf1))
* **intl-messageformat:** rm bundled intl-pluralrules ([a8526c3](https://github.com/formatjs/formatjs/commit/a8526c3d5697911790d3c08bfb513ec9de217c2c))
* **intl-messageformat:** rm core bundle for now ([5311ac2](https://github.com/formatjs/formatjs/commit/5311ac2461ff0df74f72a2be006660476a3dfb0d))
* **intl-messageformat:** rm rolluped dist ([a126939](https://github.com/formatjs/formatjs/commit/a1269390f42cd2a3a64b33618bb2a79f0362d538))
* **intl-messageformat:** support nested tag, fix [#176](https://github.com/formatjs/formatjs/issues/176) ([a857239](https://github.com/formatjs/formatjs/commit/a857239e0212bc6dfe0510a37da2a6c5dccddafc))
* **intl-messageformat:** switch to text/html to parse HTML message ([f1d952f](https://github.com/formatjs/formatjs/commit/f1d952f09553a4b5543706871afaa266c9afaf60)), closes [#152](https://github.com/formatjs/formatjs/issues/152) [#148](https://github.com/formatjs/formatjs/issues/148)
* **intl-messageformat:** throw FormatError if self-closing tag is used ([#166](https://github.com/formatjs/formatjs/issues/166)) ([3e0934d](https://github.com/formatjs/formatjs/commit/3e0934da85546253bb10c949f7010d70d99f52da))
* **intl-messageformat:** throw FormatError when trying to format plural but Intl.PluralRules is not available ([6294570](https://github.com/formatjs/formatjs/commit/62945706fe86de730dc114f14020263b594a7e05))
* **intl-messageformat:** use the new pound element AST node in plural argument ([9519103](https://github.com/formatjs/formatjs/commit/95191035397901ccc72564be57de3fa77ef9af96))
* add package intl-relativetimeformat ([#51](https://github.com/formatjs/formatjs/issues/51)) ([48c0f43](https://github.com/formatjs/formatjs/commit/48c0f43cf3231a8c8ba997c9e1083b6714cd60ea))
* **intl-messageformat-parser:** add parser for number skeleton and date skeleton ([#131](https://github.com/formatjs/formatjs/issues/131)) ([dbe6799](https://github.com/formatjs/formatjs/commit/dbe6799f6afc43a122a8ba512ef4ffa45ef67b5e))
* **intl-messageformat-parser:** add printer to print AST to string ([ec0eaa2](https://github.com/formatjs/formatjs/commit/ec0eaa2370ff06db573483d5ee408108d67c5d1f))
* **intl-messageformat-parser:** revamped quote rule ([#134](https://github.com/formatjs/formatjs/issues/134)) ([5661177](https://github.com/formatjs/formatjs/commit/566117723142f7353af80602c2f47830954b877e))
* **intl-messageformat-parser:** Rewrite grammar ([#112](https://github.com/formatjs/formatjs/issues/112)) ([093de35](https://github.com/formatjs/formatjs/commit/093de3564852bf01c0a9b95d658aaf6d613baf53))
* **intl-relativetimeformat:** make intl-relativetimeformat test262-compliant ([#95](https://github.com/formatjs/formatjs/issues/95)) ([91669a3](https://github.com/formatjs/formatjs/commit/91669a3f75421c95601d010136507b6314e089ca))
* **intl-utils:** Add intl-utils ([#98](https://github.com/formatjs/formatjs/issues/98)) ([2329c57](https://github.com/formatjs/formatjs/commit/2329c5707d4c42162ac0b20ef92b0b0aebc1173b))


### BREAKING CHANGES

* **intl-messageformat:** Rename `formatXMLMessage` to `formatHTMLMessage`
* **intl-messageformat-parser:** This changes how we escape chars in messages, instead of `\` we now use apostrophe which is more aligned with ICU4J & ICU4C
* **intl-messageformat-parser:** This completely changes the AST produced by the parser

Before:
```
complex_msg AST length 12567
normal_msg AST length 2638
simple_msg AST length 567
string_msg AST length 288
complex_msg x 3,405 ops/sec ±5.44% (81 runs sampled)
normal_msg x 27,513 ops/sec ±2.14% (87 runs sampled)
simple_msg x 113,043 ops/sec ±1.20% (89 runs sampled)
string_msg x 147,838 ops/sec ±0.78% (90 runs sampled)
```

After:
```
complex_msg AST length 2053
normal_msg AST length 410
simple_msg AST length 79
string_msg AST length 36
complex_msg x 3,926 ops/sec ±2.37% (90 runs sampled)
normal_msg x 27,641 ops/sec ±3.93% (86 runs sampled)
simple_msg x 100,764 ops/sec ±5.35% (79 runs sampled)
string_msg x 120,362 ops/sec ±7.11% (74 runs sampled)
```

* feat: normalize hashtag token in plural

* feat(intl-messageformat): adapt to new AST

* feat(babel-plugin-react-intl): adapt to new AST
* **intl-messageformat:** Change dist files packaged. Entry point should stay the
same though.
* **intl-messageformat:** We no longer include intl-pluralrules in our main index
file. Consumer should polyfill accordingly.





## [7.8.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.8.1...intl-messageformat@7.8.2) (2020-01-09)

**Note:** Version bump only for package intl-messageformat





## [7.8.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.8.0...intl-messageformat@7.8.1) (2020-01-08)

**Note:** Version bump only for package intl-messageformat





# [7.8.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.7.5...intl-messageformat@7.8.0) (2020-01-06)


### Bug Fixes

* **eslint-plugin-format:** fix eslint-plugin-formatjs type error ([b647552](https://github.com/formatjs/formatjs/commit/b6475523bf816e2ac3be6c03d0b565fccb2b5c29))


### Features

* **intl-messageformat:** use the new pound element AST node in plural argument ([9519103](https://github.com/formatjs/formatjs/commit/95191035397901ccc72564be57de3fa77ef9af96))





## [7.7.5](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.7.4...intl-messageformat@7.7.5) (2019-12-27)

**Note:** Version bump only for package intl-messageformat





## [7.7.4](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.7.3...intl-messageformat@7.7.4) (2019-12-27)

**Note:** Version bump only for package intl-messageformat





## [7.7.3](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.7.2...intl-messageformat@7.7.3) (2019-12-26)

**Note:** Version bump only for package intl-messageformat





## [7.7.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.7.1...intl-messageformat@7.7.2) (2019-12-04)

**Note:** Version bump only for package intl-messageformat





## [7.7.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.7.0...intl-messageformat@7.7.1) (2019-12-02)

**Note:** Version bump only for package intl-messageformat





# [7.7.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.6.2...intl-messageformat@7.7.0) (2019-12-01)


### Features

* **intl-messageformat:** Integrate parser's number skeleton ([c4ec029](https://github.com/formatjs/formatjs/commit/c4ec029322de34477997531ae8e9bb937cb0d52d))





## [7.6.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.6.1...intl-messageformat@7.6.2) (2019-12-01)

**Note:** Version bump only for package intl-messageformat





## [7.6.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.6.0...intl-messageformat@7.6.1) (2019-11-26)

**Note:** Version bump only for package intl-messageformat





# [7.6.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.5.6...intl-messageformat@7.6.0) (2019-11-25)


### Bug Fixes

* **intl-messageformat:** remove re-export for parseDateTimeSkeleton ([8611aa4](https://github.com/formatjs/formatjs/commit/8611aa4f950ee1d42ea5e631a6fc8b50bae0383a))


### Features

* **eslint-plugin-formatjs:** add supported-datetime-skeleton rules ([c121a9a](https://github.com/formatjs/formatjs/commit/c121a9a9a52f21fbe1fdfc70e31c0275efbd0f8d))
* **intl-messageformat:** add limited support for date time skeleton ([07795b9](https://github.com/formatjs/formatjs/commit/07795b9e5e0116ffaf5f410c4e1c1a375f86ba8a))





## [7.5.6](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.5.5...intl-messageformat@7.5.6) (2019-11-25)

**Note:** Version bump only for package intl-messageformat





## [7.5.5](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.5.4...intl-messageformat@7.5.5) (2019-11-23)

**Note:** Version bump only for package intl-messageformat





## [7.5.4](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.5.3...intl-messageformat@7.5.4) (2019-11-21)


### Bug Fixes

* **intl-messageformat:** use api-extractor to combine type definitions ([6c6af9d](https://github.com/formatjs/formatjs/commit/6c6af9d837d13938fa647cbbbaf2f417935908fd))





## [7.5.3](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.5.2...intl-messageformat@7.5.3) (2019-11-20)


### Bug Fixes

* **lint:** fix lint config and rerun ([041eb99](https://github.com/formatjs/formatjs/commit/041eb99706164048b5b8ce7079955897ce27ed70))





## [7.5.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.5.1...intl-messageformat@7.5.2) (2019-11-11)

**Note:** Version bump only for package intl-messageformat





## [7.5.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.5.0...intl-messageformat@7.5.1) (2019-11-10)


### Bug Fixes

* **intl-messageformat:** pass raw locales down to individual formatters ([3a74c2e](https://github.com/formatjs/formatjs/commit/3a74c2e7c6592de3a4f5ca182c5846fe095abe55)), closes [#255](https://github.com/formatjs/formatjs/issues/255)





# [7.5.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.3.3...intl-messageformat@7.5.0) (2019-10-30)


### Features

* **@formatjs/cli:** A CLI for formatjs ([#234](https://github.com/formatjs/formatjs/issues/234)) ([1f57a0b](https://github.com/formatjs/formatjs/commit/1f57a0b0921e0228cf3fd4eff756b0cd17e28fb5))





# [7.4.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.3.3...intl-messageformat@7.4.0) (2019-10-30)


### Features

* **@formatjs/cli:** A CLI for formatjs ([#234](https://github.com/formatjs/formatjs/issues/234)) ([1f57a0b](https://github.com/formatjs/formatjs/commit/1f57a0b0921e0228cf3fd4eff756b0cd17e28fb5))





## [7.3.3](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.3.2...intl-messageformat@7.3.3) (2019-10-23)


### Bug Fixes

* **intl-messageformat:** fix formatHTMLMessage @ regex ([d1b7c8c](https://github.com/formatjs/formatjs/commit/d1b7c8c14a0b90f8d059a8dc3e12ce7976192975)), closes [#217](https://github.com/formatjs/formatjs/issues/217)
* **intl-messageformat:** handle nested # in plural correctly, fix [#202](https://github.com/formatjs/formatjs/issues/202) ([22121b2](https://github.com/formatjs/formatjs/commit/22121b210b566ad3dd509e4cbf47d3c245742928))





## [7.3.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.3.1...intl-messageformat@7.3.2) (2019-10-01)

**Note:** Version bump only for package intl-messageformat





## [7.3.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.3.0...intl-messageformat@7.3.1) (2019-09-27)

**Note:** Version bump only for package intl-messageformat





# [7.3.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.2.4...intl-messageformat@7.3.0) (2019-09-20)


### Bug Fixes

* **@formatjs/intl-pluralrules:** rm side effects array due to build complication ([f22e552](https://github.com/formatjs/formatjs/commit/f22e552))


### Features

* **intl-messageformat:** mark the package as side-effects free ([a1a08ae](https://github.com/formatjs/formatjs/commit/a1a08ae))
* **intl-messageformat:** throw FormatError when trying to format plural but Intl.PluralRules is not available ([6294570](https://github.com/formatjs/formatjs/commit/6294570))





## [7.2.4](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.2.3...intl-messageformat@7.2.4) (2019-09-17)

**Note:** Version bump only for package intl-messageformat





## [7.2.3](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.2.2...intl-messageformat@7.2.3) (2019-09-15)

**Note:** Version bump only for package intl-messageformat





## [7.2.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.2.1...intl-messageformat@7.2.2) (2019-09-13)


### Bug Fixes

* **intl-messageformat:** fix chrome v77 issue where NumberFormat.supportedLocalesOf(cy) broke ([4b1605c](https://github.com/formatjs/formatjs/commit/4b1605c))





## [7.2.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.2.0...intl-messageformat@7.2.1) (2019-09-09)


### Bug Fixes

* **intl-messageformat:** handle closing tag nested inside regular tag ([08c970a](https://github.com/formatjs/formatjs/commit/08c970a))





# [7.2.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.1.6...intl-messageformat@7.2.0) (2019-09-09)


### Features

* **intl-messageformat:** support nested tag, fix [#176](https://github.com/formatjs/formatjs/issues/176) ([a857239](https://github.com/formatjs/formatjs/commit/a857239))





## [7.1.6](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.1.5...intl-messageformat@7.1.6) (2019-09-03)

**Note:** Version bump only for package intl-messageformat





## [7.1.5](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.1.4...intl-messageformat@7.1.5) (2019-09-03)

**Note:** Version bump only for package intl-messageformat





## [7.1.4](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.1.3...intl-messageformat@7.1.4) (2019-09-03)

**Note:** Version bump only for package intl-messageformat





## [7.1.3](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.1.2...intl-messageformat@7.1.3) (2019-09-03)

**Note:** Version bump only for package intl-messageformat





## [7.1.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.1.1...intl-messageformat@7.1.2) (2019-08-29)

**Note:** Version bump only for package intl-messageformat





## [7.1.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.1.0...intl-messageformat@7.1.1) (2019-08-29)


### Bug Fixes

* **intl-messageformat-parser:** throw when there are duplicates in select/plural, fix [#168](https://github.com/formatjs/formatjs/issues/168) ([0c3a0e0](https://github.com/formatjs/formatjs/commit/0c3a0e0))





# [7.1.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@7.0.0...intl-messageformat@7.1.0) (2019-08-28)


### Features

* **intl-messageformat:** throw FormatError if self-closing tag is used ([#166](https://github.com/formatjs/formatjs/issues/166)) ([3e0934d](https://github.com/formatjs/formatjs/commit/3e0934d))





# [7.0.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.11...intl-messageformat@7.0.0) (2019-08-26)


### Bug Fixes

* **intl-messageformat:** Fix case-sensitive tag ([69b6eae](https://github.com/formatjs/formatjs/commit/69b6eae))


### Features

* **intl-messageformat:** switch to text/html to parse HTML message ([f1d952f](https://github.com/formatjs/formatjs/commit/f1d952f)), closes [#152](https://github.com/formatjs/formatjs/issues/152) [#148](https://github.com/formatjs/formatjs/issues/148)


### BREAKING CHANGES

* **intl-messageformat:** Rename `formatXMLMessage` to `formatHTMLMessage`





## [6.1.11](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.10...intl-messageformat@6.1.11) (2019-08-19)

**Note:** Version bump only for package intl-messageformat





## [6.1.10](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.9...intl-messageformat@6.1.10) (2019-08-21)


### Bug Fixes

* **intl-messageformat:** filter out XML a bit more aggressively ([36af40e](https://github.com/formatjs/formatjs/commit/36af40e)), closes [#148](https://github.com/formatjs/formatjs/issues/148)





## [6.1.9](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.8...intl-messageformat@6.1.9) (2019-08-19)

**Note:** Version bump only for package intl-messageformat





## [6.1.8](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.7...intl-messageformat@6.1.8) (2019-08-16)

**Note:** Version bump only for package intl-messageformat





## [6.1.7](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.6...intl-messageformat@6.1.7) (2019-08-16)

**Note:** Version bump only for package intl-messageformat





## [6.1.6](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.5...intl-messageformat@6.1.6) (2019-08-16)


### Bug Fixes

* **intl-messageformat:** fix empty value in formatting ([9f820ea](https://github.com/formatjs/formatjs/commit/9f820ea)), closes [#156](https://github.com/formatjs/formatjs/issues/156)





## [6.1.5](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.4...intl-messageformat@6.1.5) (2019-08-13)


### Bug Fixes

* **intl-messageformat:** handle formatXMLMessage better ([c03ecf8](https://github.com/formatjs/formatjs/commit/c03ecf8))





## [6.1.4](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.3...intl-messageformat@6.1.4) (2019-08-12)

**Note:** Version bump only for package intl-messageformat





## [6.1.3](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.2...intl-messageformat@6.1.3) (2019-08-11)


### Bug Fixes

* generate lib instead of mjs ([05e63b3](https://github.com/formatjs/formatjs/commit/05e63b3))





## [6.1.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.1...intl-messageformat@6.1.2) (2019-08-10)


### Bug Fixes

* **intl-messageformat-parser:** allow negative in plural rule, fixes [#146](https://github.com/formatjs/formatjs/issues/146) ([50c7710](https://github.com/formatjs/formatjs/commit/50c7710))





## [6.1.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.1.0...intl-messageformat@6.1.1) (2019-08-09)

**Note:** Version bump only for package intl-messageformat





# [6.1.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.0.4...intl-messageformat@6.1.0) (2019-08-08)


### Features

* **intl-messageformat:** rm core bundle for now ([5311ac2](https://github.com/formatjs/formatjs/commit/5311ac2))





## [6.0.4](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.0.3...intl-messageformat@6.0.4) (2019-08-07)

**Note:** Version bump only for package intl-messageformat





## [6.0.3](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.0.2...intl-messageformat@6.0.3) (2019-08-06)


### Bug Fixes

* generate .mjs instead of lib ([0c34ee4](https://github.com/formatjs/formatjs/commit/0c34ee4))





## [6.0.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.0.1...intl-messageformat@6.0.2) (2019-08-02)

**Note:** Version bump only for package intl-messageformat





## [6.0.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@6.0.0...intl-messageformat@6.0.1) (2019-07-29)


### Bug Fixes

* **intl-messageformat-parser:** argStyleText can contain syntax characters and quoted string now ([#136](https://github.com/formatjs/formatjs/issues/136)) ([b39ea08](https://github.com/formatjs/formatjs/commit/b39ea08)), closes [#135](https://github.com/formatjs/formatjs/issues/135)





# [6.0.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@5.4.3...intl-messageformat@6.0.0) (2019-07-29)


### Features

* **intl-messageformat-parser:** add parser for number skeleton and date skeleton ([#131](https://github.com/formatjs/formatjs/issues/131)) ([dbe6799](https://github.com/formatjs/formatjs/commit/dbe6799))
* **intl-messageformat-parser:** revamped quote rule ([#134](https://github.com/formatjs/formatjs/issues/134)) ([5661177](https://github.com/formatjs/formatjs/commit/5661177))


### BREAKING CHANGES

* **intl-messageformat-parser:** This changes how we escape chars in messages, instead of `\` we now use apostrophe which is more aligned with ICU4J & ICU4C





## [5.4.3](https://github.com/formatjs/formatjs/compare/intl-messageformat@5.4.2...intl-messageformat@5.4.3) (2019-07-25)


### Bug Fixes

* **intl-messageformat:** fix regex, fix [#130](https://github.com/formatjs/formatjs/issues/130) ([f597630](https://github.com/formatjs/formatjs/commit/f597630))





## [5.4.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@5.4.1...intl-messageformat@5.4.2) (2019-07-25)


### Bug Fixes

* **intl-messageformat:** Include Date in PrimitiveType ([1feca57](https://github.com/formatjs/formatjs/commit/1feca57)), closes [#127](https://github.com/formatjs/formatjs/issues/127)





## [5.4.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@5.4.0...intl-messageformat@5.4.1) (2019-07-25)


### Bug Fixes

* **intl-messageformat:** fix formatXMLMessage w/o tag ([8d3bfcd](https://github.com/formatjs/formatjs/commit/8d3bfcd))





# [5.4.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@5.3.0...intl-messageformat@5.4.0) (2019-07-25)


### Features

* **intl-messageformat:** allow mixed placeholder & XML together… ([#126](https://github.com/formatjs/formatjs/issues/126)) ([4a624c0](https://github.com/formatjs/formatjs/commit/4a624c0))





# [5.3.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@5.2.0...intl-messageformat@5.3.0) (2019-07-25)


### Features

* **intl-messageformat:** allow passing in object to formatXMLMessage ([ce05b8a](https://github.com/formatjs/formatjs/commit/ce05b8a))





# [5.2.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@5.1.2...intl-messageformat@5.2.0) (2019-07-25)


### Features

* **intl-messageformat:** Add xml formatting ([#124](https://github.com/formatjs/formatjs/issues/124)) ([72cdafc](https://github.com/formatjs/formatjs/commit/72cdafc))





## [5.1.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@5.1.1...intl-messageformat@5.1.2) (2019-07-23)

**Note:** Version bump only for package intl-messageformat





## [5.1.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@5.1.0...intl-messageformat@5.1.1) (2019-07-12)

**Note:** Version bump only for package intl-messageformat

# [5.1.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@5.0.1...intl-messageformat@5.1.0) (2019-07-12)

### Features

- **intl-messageformat:** Add `formatToParts` ([0680f58](https://github.com/formatjs/formatjs/commit/0680f58))
- **intl-messageformat:** export Part types ([450c495](https://github.com/formatjs/formatjs/commit/450c495))
- **intl-messageformat-parser:** add printer to print AST to string ([ec0eaa2](https://github.com/formatjs/formatjs/commit/ec0eaa2))

## [5.0.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@5.0.0...intl-messageformat@5.0.1) (2019-07-09)

**Note:** Version bump only for package intl-messageformat

# [5.0.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@4.4.0...intl-messageformat@5.0.0) (2019-07-08)

### Features

- **intl-messageformat-parser:** Rewrite grammar ([#112](https://github.com/formatjs/formatjs/issues/112)) ([093de35](https://github.com/formatjs/formatjs/commit/093de35))

### BREAKING CHANGES

- **intl-messageformat-parser:** This completely changes the AST produced by the parser

Before:

```
complex_msg AST length 12567
normal_msg AST length 2638
simple_msg AST length 567
string_msg AST length 288
complex_msg x 3,405 ops/sec ±5.44% (81 runs sampled)
normal_msg x 27,513 ops/sec ±2.14% (87 runs sampled)
simple_msg x 113,043 ops/sec ±1.20% (89 runs sampled)
string_msg x 147,838 ops/sec ±0.78% (90 runs sampled)
```

After:

```
complex_msg AST length 2053
normal_msg AST length 410
simple_msg AST length 79
string_msg AST length 36
complex_msg x 3,926 ops/sec ±2.37% (90 runs sampled)
normal_msg x 27,641 ops/sec ±3.93% (86 runs sampled)
simple_msg x 100,764 ops/sec ±5.35% (79 runs sampled)
string_msg x 120,362 ops/sec ±7.11% (74 runs sampled)
```

- feat: normalize hashtag token in plural

- feat(intl-messageformat): adapt to new AST

- feat(babel-plugin-react-intl): adapt to new AST

# [4.4.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@4.3.0...intl-messageformat@4.4.0) (2019-06-28)

### Features

- **intl-messageformat:** export core entry point ([ca7eeae](https://github.com/formatjs/formatjs/commit/ca7eeae))

# [4.3.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@4.2.1...intl-messageformat@4.3.0) (2019-06-27)

### Features

- **intl-messageformat:** allow passing in formatters ([#107](https://github.com/formatjs/formatjs/issues/107)) ([3605693](https://github.com/formatjs/formatjs/commit/3605693))

## [4.2.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@4.2.0...intl-messageformat@4.2.1) (2019-06-26)

**Note:** Version bump only for package intl-messageformat

# [4.2.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@4.1.2...intl-messageformat@4.2.0) (2019-06-27)

### Features

- **intl-relativetimeformat:** make intl-relativetimeformat test262-compliant ([#95](https://github.com/formatjs/formatjs/issues/95)) ([91669a3](https://github.com/formatjs/formatjs/commit/91669a3))
- **intl-utils:** Add intl-utils ([#98](https://github.com/formatjs/formatjs/issues/98)) ([2329c57](https://github.com/formatjs/formatjs/commit/2329c57))

## [4.1.2](https://github.com/formatjs/formatjs/compare/intl-messageformat@4.1.1...intl-messageformat@4.1.2) (2019-06-18)

**Note:** Version bump only for package intl-messageformat

## [4.1.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@4.1.0...intl-messageformat@4.1.1) (2019-06-18)

**Note:** Version bump only for package intl-messageformat

# [4.1.0](https://github.com/formatjs/formatjs/compare/intl-messageformat@4.0.1...intl-messageformat@4.1.0) (2019-06-18)

### Features

- **intl-format-cache:** fix TS definition ([71ae9eb](https://github.com/formatjs/formatjs/commit/71ae9eb))

## [4.0.1](https://github.com/formatjs/formatjs/compare/intl-messageformat@4.0.0...intl-messageformat@4.0.1) (2019-06-12)

**Note:** Version bump only for package intl-messageformat

# [4.0.0](https://github.com/formatjs/intl-messageformat/compare/intl-messageformat@3.3.0...intl-messageformat@4.0.0) (2019-06-05)

### Features

- add package intl-relativetimeformat ([#51](https://github.com/formatjs/intl-messageformat/issues/51)) ([48c0f43](https://github.com/formatjs/intl-messageformat/commit/48c0f43))
- **intl-messageformat:** rm bundled intl-pluralrules ([a8526c3](https://github.com/formatjs/intl-messageformat/commit/a8526c3))
- **intl-messageformat:** rm rolluped dist ([a126939](https://github.com/formatjs/intl-messageformat/commit/a126939))

### BREAKING CHANGES

- **intl-messageformat:** Change dist files packaged. Entry point should stay the
  same though.
- **intl-messageformat:** We no longer include intl-pluralrules in our main index
  file. Consumer should polyfill accordingly.

# [3.3.0](https://github.com/formatjs/intl-messageformat/compare/intl-messageformat@3.1.4...intl-messageformat@3.3.0) (2019-06-03)

### Features

- **intl-messageformat:** Add `getAst` method ([3d6c289](https://github.com/formatjs/intl-messageformat/commit/3d6c289))

# [3.2.0](https://github.com/formatjs/intl-messageformat/compare/intl-messageformat@3.1.4...intl-messageformat@3.2.0) (2019-06-03)

### Features

- **intl-messageformat:** Add `getAst` method ([3d6c289](https://github.com/formatjs/intl-messageformat/commit/3d6c289))

## [3.1.4](https://github.com/formatjs/intl-messageformat/compare/intl-messageformat@3.1.3...intl-messageformat@3.1.4) (2019-05-31)

**Note:** Version bump only for package intl-messageformat

## [3.1.3](https://github.com/formatjs/intl-messageformat/compare/intl-messageformat@3.1.2...intl-messageformat@3.1.3) (2019-05-28)

### Bug Fixes

- **intl-messageformat:** fix [#36](https://github.com/formatjs/intl-messageformat/issues/36) and config merging ([#40](https://github.com/formatjs/intl-messageformat/issues/40)) ([4a9969f](https://github.com/formatjs/intl-messageformat/commit/4a9969f))

## [3.1.2](https://github.com/formatjs/intl-messageformat/compare/intl-messageformat@3.1.2...intl-messageformat@3.1.2) (2019-05-28)

### Bug Fixes

- **intl-messageformat:** fix [#36](https://github.com/formatjs/intl-messageformat/issues/36) and config merging ([#40](https://github.com/formatjs/intl-messageformat/issues/40)) ([4a9969f](https://github.com/formatjs/intl-messageformat/commit/4a9969f))
