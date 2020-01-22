# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 5.0.0 (2020-01-22)


### Bug Fixes

* **@formatjs/intl-listformat:** don’t treat en-US-POSIX as en-US because they are different ([a37b091](https://github.com/formatjs/formatjs/commit/a37b091830ddc0ac9fd5771eb402f2b5c23c45f7))
* **@formatjs/intl-listformat:** fix locale lookup regression for en-US ([21e8219](https://github.com/formatjs/formatjs/commit/21e8219c443ccfd36f1acd17303b0e6480edba23))
* **@formatjs/intl-pluralrules:** merge fix meta into core ([0b10309](https://github.com/formatjs/formatjs/commit/0b103099e65013d4a2012cb4373b072d2829a992))
* **@formatjs/intl-pluralrules:** use api-extractor to combine d.ts ([65adff2](https://github.com/formatjs/formatjs/commit/65adff246962109496ee1f8de142496e8a9c0156))
* **@formatjs/intl-relativetimeformat:** add locale-data as side-effectful ([7e3dc27](https://github.com/formatjs/formatjs/commit/7e3dc27564b3185c4f73f33dbe91903d49c251c6))
* **@formatjs/intl-relativetimeformat:** add more side-effectful files ([03d2a10](https://github.com/formatjs/formatjs/commit/03d2a10d2692f80e10672da320b989b951b69a45))
* **@formatjs/intl-relativetimeformat:** fix polyfill import ([#110](https://github.com/formatjs/formatjs/issues/110)) ([3adffc8](https://github.com/formatjs/formatjs/commit/3adffc8b33ef35bbf357ea1dea19fab515c535e8))
* **@formatjs/intl-relativetimeformat:** fix test262 ([025dfe3](https://github.com/formatjs/formatjs/commit/025dfe3734285b3b876f3f2389e812731e1b2d5c))
* **@formatjs/intl-relativetimeformat:** fix type definition for Intl.RelativeTimeFormat ([a16a352](https://github.com/formatjs/formatjs/commit/a16a352bbbf9212da8c09adfef5ee779b55f46bd))
* **@formatjs/intl-relativetimeformat:** Ignore error when setting name function properties on iOS 9 ([#129](https://github.com/formatjs/formatjs/issues/129)) ([62d4b06](https://github.com/formatjs/formatjs/commit/62d4b068392101a30d5604e87d6a44c38bb4406a)), closes [#128](https://github.com/formatjs/formatjs/issues/128)
* **@formatjs/intl-relativetimeformat:** make supportedLocalesOf reflect data we have loaded, fix [#157](https://github.com/formatjs/formatjs/issues/157) ([58693be](https://github.com/formatjs/formatjs/commit/58693be8fa4f93869364fd19b89c93061631d0c3))
* **@formatjs/intl-relativetimeformat:** pass in raw locales to lookup ([9c2af2a](https://github.com/formatjs/formatjs/commit/9c2af2a2d8f0f7fe44ecf5f8b9f34953480e7889))
* **@formatjs/intl-relativetimeformat:** rely on Intl.PluralRules supported locales instead of both PL & NumberFormat ([cc3c05b](https://github.com/formatjs/formatjs/commit/cc3c05be5d8bc280a970569083b37b8a783f59dc))
* **@formatjs/intl-relativetimeformat:** remove global type mod for RelativeTimeFormat ([4c0b918](https://github.com/formatjs/formatjs/commit/4c0b918391400df5c7757b86620c7dee78e3380a))
* **@formatjs/intl-relativetimeformat:** remove unnecessary meta fix ([5b087bf](https://github.com/formatjs/formatjs/commit/5b087bfdeb5521b9d7e6e0475502574afeed2298))
* **@formatjs/intl-relativetimeformat:** rm locale-data import core module ([3946600](https://github.com/formatjs/formatjs/commit/394660032857455cfab0d15312d817107e124977))
* **@formatjs/intl-relativetimeformat:** rm side effects array due to build complication ([7497c87](https://github.com/formatjs/formatjs/commit/7497c8782457ac90c9ee30bc2a7aaed45346583c))
* **@formatjs/intl-relativetimeformat:** use api-extractor to combine d.ts ([bd803dd](https://github.com/formatjs/formatjs/commit/bd803dd5fcd6f13994e686b8d08bd1b8be6a2e4b))
* generate .mjs instead of lib ([0c34ee4](https://github.com/formatjs/formatjs/commit/0c34ee46f87459853ceef3a92309e77a5dd4b82c))
* generate lib instead of mjs ([05e63b3](https://github.com/formatjs/formatjs/commit/05e63b3aa2544c961087415b44ad6ba1572a659c))
* **@formatjs/intl-relativetimeformat:** use locale-lookup from intl-utils ([6146194](https://github.com/formatjs/formatjs/commit/6146194e5be028895aec208321f6aa0b79c1401d))
* **@formatjs/intl-unified-numberformat:** pass in raw locales to lookup ([719c6f2](https://github.com/formatjs/formatjs/commit/719c6f252bbea236d92803f3dc20663ce0ff1d1b))
* **@formatjs/intl-utils:** add polyfill-utils like getOption/toObject ([7cf1cc4](https://github.com/formatjs/formatjs/commit/7cf1cc43f346754124964ec57245c25e58e5d43a))
* **@formatjs/intl-utils:** change default quarter to false in selectUnit ([dadab10](https://github.com/formatjs/formatjs/commit/dadab1026d8a6f52f61063ea9ca6cbc513cddef6))
* **@formatjs/intl-utils:** consolidate parent lookup ([bac2eae](https://github.com/formatjs/formatjs/commit/bac2eae8ab4eb2361c8b2053237ac335a1f82680))
* **lint:** fix lint config and rerun ([041eb99](https://github.com/formatjs/formatjs/commit/041eb99706164048b5b8ce7079955897ce27ed70))


### Features

* **formatjs-extract-cldr-data:** polyfill units ([e291eeb](https://github.com/formatjs/formatjs/commit/e291eebfc6233ef0ae2e3ee42976e2073ad5afc1))
* add package intl-relativetimeformat ([#51](https://github.com/formatjs/formatjs/issues/51)) ([48c0f43](https://github.com/formatjs/formatjs/commit/48c0f43cf3231a8c8ba997c9e1083b6714cd60ea))
* **@formatjs/cli:** A CLI for formatjs ([#234](https://github.com/formatjs/formatjs/issues/234)) ([1f57a0b](https://github.com/formatjs/formatjs/commit/1f57a0b0921e0228cf3fd4eff756b0cd17e28fb5))
* **@formatjs/intl-relativetimeformat:** add aliases support ([a2aec8c](https://github.com/formatjs/formatjs/commit/a2aec8ccfccbeff2a6a2f6cd79c932500c1f3051))
* **@formatjs/intl-relativetimeformat:** dist out raw json data for ponyfill, fix [#201](https://github.com/formatjs/formatjs/issues/201) ([cda3cf2](https://github.com/formatjs/formatjs/commit/cda3cf2090abf6a46e293ad049eb7f588f9a66eb))
* **@formatjs/intl-relativetimeformat:** dont bundle en by default ([d9a0a66](https://github.com/formatjs/formatjs/commit/d9a0a6679546d56c4f33237c8384b6ef6cadc69d))
* **@formatjs/intl-relativetimeformat:** mark the package as side-effects free ([f942fe6](https://github.com/formatjs/formatjs/commit/f942fe6b0ec8a9b5eabfcdb187bd886a81bf165a))
* **@formatjs/intl-relativetimeformat:** use aliases from @formatjs/intl-utils ([e430944](https://github.com/formatjs/formatjs/commit/e430944554bdc3c5a7416fc74e125343a01916f2))
* **@formatjs/intl-relativetimeformat:** use common parentLocale from @formatjs/intl-utils ([38bf476](https://github.com/formatjs/formatjs/commit/38bf4767659f8acf0471cabfbf8fc2d1cc92e643))
* **@formatjs/intl-unified-numberformat:** add polyfill option ([4c1d692](https://github.com/formatjs/formatjs/commit/4c1d692fee37c22ee702b2922434b9b939f0d697))
* **@formatjs/intl-utils:** add IE11-safe getCanonicalLocales, ([b5f37c4](https://github.com/formatjs/formatjs/commit/b5f37c41bf0248bf8b8046407aa3ba232744ee5b)), closes [#200](https://github.com/formatjs/formatjs/issues/200)
* **@formatjs/intl-utils:** add PartitionPattern abstract operation ([#317](https://github.com/formatjs/formatjs/issues/317)) ([5731fcf](https://github.com/formatjs/formatjs/commit/5731fcfeaaba65322f904e863faead8d1f177a98))
* **formatjs-extract-cldr-data:** dedupe relative data, reduce relative time data by 40% ([db12bf3](https://github.com/formatjs/formatjs/commit/db12bf3c8838c503a7fd658b062117de75368545))
* **formatjs-extract-cldr-data:** dont embed parentLocale everywhere ([10bca2f](https://github.com/formatjs/formatjs/commit/10bca2fb3b4fa301664f4ae628ecd5b2f344eab8))
* **formatjs-extract-cldr-data:** even smaller locale data ([66a0313](https://github.com/formatjs/formatjs/commit/66a03139a3ad7b243aee032ed5623c839c9725df))
* **formatjs-extract-cldr-data:** fix unit extraction ([7e54a0b](https://github.com/formatjs/formatjs/commit/7e54a0b35519be5e25f96e683024d3df2be6d5de))
* **formatjs-extract-cldr-data:** migrate to TS ([#91](https://github.com/formatjs/formatjs/issues/91)) ([c012d6e](https://github.com/formatjs/formatjs/commit/c012d6e67cf70e5ef23d7bf2573d4102b3035cb9))
* **intl-format-cache:** fix TS definition ([71ae9eb](https://github.com/formatjs/formatjs/commit/71ae9eb7069ba297fcc52b852ce30a5cbe768e38))
* **intl-messageformat:** allow passing in formatters ([#107](https://github.com/formatjs/formatjs/issues/107)) ([3605693](https://github.com/formatjs/formatjs/commit/3605693e3ddbad4c964578222945f82f5dfe80e2))
* **intl-messageformat:** rm bundled intl-pluralrules ([a8526c3](https://github.com/formatjs/formatjs/commit/a8526c3d5697911790d3c08bfb513ec9de217c2c))
* **intl-messageformat-parser:** add parser for number skeleton and date skeleton ([#131](https://github.com/formatjs/formatjs/issues/131)) ([dbe6799](https://github.com/formatjs/formatjs/commit/dbe6799f6afc43a122a8ba512ef4ffa45ef67b5e))
* **intl-messageformat-parser:** add printer to print AST to string ([ec0eaa2](https://github.com/formatjs/formatjs/commit/ec0eaa2370ff06db573483d5ee408108d67c5d1f))
* **intl-relativeformat:** Use Intl.RelativeTimeFormat ([c014ce0](https://github.com/formatjs/formatjs/commit/c014ce0cab4cdf7614a6028044d2c97977792e44))
* **intl-relativetimeformat:** make intl-relativetimeformat test262-compliant ([#95](https://github.com/formatjs/formatjs/issues/95)) ([91669a3](https://github.com/formatjs/formatjs/commit/91669a3f75421c95601d010136507b6314e089ca))
* **intl-relativetimeformat:** rename due to npm squatting ([b4476e0](https://github.com/formatjs/formatjs/commit/b4476e0bc8b7db57615c97aaa500670b34dec4bf))
* **intl-relativetimeformat:** update LICENSE & README ([#100](https://github.com/formatjs/formatjs/issues/100)) ([3b1d11b](https://github.com/formatjs/formatjs/commit/3b1d11b8c549caa116c9c990decbad27ab808f46))
* **intl-utils:** Add intl-utils ([#98](https://github.com/formatjs/formatjs/issues/98)) ([2329c57](https://github.com/formatjs/formatjs/commit/2329c5707d4c42162ac0b20ef92b0b0aebc1173b))


### BREAKING CHANGES

* **@formatjs/intl-relativetimeformat:** `en` locale data is no longer bundled by default with
the polyfill
* **@formatjs/intl-relativetimeformat:** Language aliases are now built in so there is no need
to explicitly include it. This provides correctness across our polyfills
* **formatjs-extract-cldr-data:** Export main function via `default` in index file.
If you're using `require('formatjs-extract-cldr-data')`, change it to
`require('formatjs-extract-cldr-data').default`.
* **intl-messageformat:** We no longer include intl-pluralrules in our main index
file. Consumer should polyfill accordingly.
* **intl-relativeformat:** We now use Intl.RelativeTimeFormat in
intl-relativeformat so consuming env should polyfill this accordingly





## [4.5.7](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.5.6...@formatjs/intl-relativetimeformat@4.5.7) (2020-01-09)


### Bug Fixes

* **@formatjs/intl-listformat:** fix locale lookup regression for en-US ([21e8219](https://github.com/formatjs/formatjs/commit/21e8219c443ccfd36f1acd17303b0e6480edba23))





## [4.5.6](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.5.5...@formatjs/intl-relativetimeformat@4.5.6) (2020-01-08)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [4.5.5](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.5.4...@formatjs/intl-relativetimeformat@4.5.5) (2020-01-06)


### Bug Fixes

* **@formatjs/intl-listformat:** don’t treat en-US-POSIX as en-US because they are different ([a37b091](https://github.com/formatjs/formatjs/commit/a37b091830ddc0ac9fd5771eb402f2b5c23c45f7))





## [4.5.4](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.5.3...@formatjs/intl-relativetimeformat@4.5.4) (2019-12-27)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [4.5.3](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.5.2...@formatjs/intl-relativetimeformat@4.5.3) (2019-12-27)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [4.5.2](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.5.1...@formatjs/intl-relativetimeformat@4.5.2) (2019-12-26)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [4.5.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.5.0...@formatjs/intl-relativetimeformat@4.5.1) (2019-12-02)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





# [4.5.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.4.6...@formatjs/intl-relativetimeformat@4.5.0) (2019-12-01)


### Features

* **@formatjs/intl-utils:** add PartitionPattern abstract operation ([#317](https://github.com/formatjs/formatjs/issues/317)) ([5731fcf](https://github.com/formatjs/formatjs/commit/5731fcfeaaba65322f904e863faead8d1f177a98))





## [4.4.6](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.4.5...@formatjs/intl-relativetimeformat@4.4.6) (2019-11-26)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [4.4.5](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.4.4...@formatjs/intl-relativetimeformat@4.4.5) (2019-11-25)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [4.4.4](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.4.3...@formatjs/intl-relativetimeformat@4.4.4) (2019-11-23)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [4.4.3](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.4.2...@formatjs/intl-relativetimeformat@4.4.3) (2019-11-21)


### Bug Fixes

* **@formatjs/intl-pluralrules:** use api-extractor to combine d.ts ([65adff2](https://github.com/formatjs/formatjs/commit/65adff246962109496ee1f8de142496e8a9c0156))
* **@formatjs/intl-relativetimeformat:** use api-extractor to combine d.ts ([bd803dd](https://github.com/formatjs/formatjs/commit/bd803dd5fcd6f13994e686b8d08bd1b8be6a2e4b))





## [4.4.2](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.4.1...@formatjs/intl-relativetimeformat@4.4.2) (2019-11-20)


### Bug Fixes

* **lint:** fix lint config and rerun ([041eb99](https://github.com/formatjs/formatjs/commit/041eb99706164048b5b8ce7079955897ce27ed70))





## [4.4.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.4.0...@formatjs/intl-relativetimeformat@4.4.1) (2019-11-10)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





# [4.4.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.2.1...@formatjs/intl-relativetimeformat@4.4.0) (2019-10-30)


### Features

* **@formatjs/cli:** A CLI for formatjs ([#234](https://github.com/formatjs/formatjs/issues/234)) ([1f57a0b](https://github.com/formatjs/formatjs/commit/1f57a0b0921e0228cf3fd4eff756b0cd17e28fb5))





# [4.3.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.2.1...@formatjs/intl-relativetimeformat@4.3.0) (2019-10-30)


### Features

* **@formatjs/cli:** A CLI for formatjs ([#234](https://github.com/formatjs/formatjs/issues/234)) ([1f57a0b](https://github.com/formatjs/formatjs/commit/1f57a0b0921e0228cf3fd4eff756b0cd17e28fb5))





## [4.2.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.2.0...@formatjs/intl-relativetimeformat@4.2.1) (2019-10-23)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





# [4.2.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.1.1...@formatjs/intl-relativetimeformat@4.2.0) (2019-10-01)


### Features

* **@formatjs/intl-relativetimeformat:** dist out raw json data for ponyfill, fix [#201](https://github.com/formatjs/formatjs/issues/201) ([cda3cf2](https://github.com/formatjs/formatjs/commit/cda3cf2))
* **@formatjs/intl-utils:** add IE11-safe getCanonicalLocales, ([b5f37c4](https://github.com/formatjs/formatjs/commit/b5f37c4)), closes [#200](https://github.com/formatjs/formatjs/issues/200)





## [4.1.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.1.0...@formatjs/intl-relativetimeformat@4.1.1) (2019-09-27)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





# [4.1.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.0.1...@formatjs/intl-relativetimeformat@4.1.0) (2019-09-20)


### Bug Fixes

* **@formatjs/intl-relativetimeformat:** add locale-data as side-effectful ([7e3dc27](https://github.com/formatjs/formatjs/commit/7e3dc27))
* **@formatjs/intl-relativetimeformat:** add more side-effectful files ([03d2a10](https://github.com/formatjs/formatjs/commit/03d2a10))
* **@formatjs/intl-relativetimeformat:** rm side effects array due to build complication ([7497c87](https://github.com/formatjs/formatjs/commit/7497c87))


### Features

* **@formatjs/intl-relativetimeformat:** mark the package as side-effects free ([f942fe6](https://github.com/formatjs/formatjs/commit/f942fe6))





## [4.0.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@4.0.0...@formatjs/intl-relativetimeformat@4.0.1) (2019-09-17)


### Bug Fixes

* **@formatjs/intl-pluralrules:** merge fix meta into core ([0b10309](https://github.com/formatjs/formatjs/commit/0b10309))
* **@formatjs/intl-relativetimeformat:** fix type definition for Intl.RelativeTimeFormat ([a16a352](https://github.com/formatjs/formatjs/commit/a16a352))
* **@formatjs/intl-relativetimeformat:** remove global type mod for RelativeTimeFormat ([4c0b918](https://github.com/formatjs/formatjs/commit/4c0b918))
* **@formatjs/intl-relativetimeformat:** remove unnecessary meta fix ([5b087bf](https://github.com/formatjs/formatjs/commit/5b087bf))





# [4.0.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@3.1.0...@formatjs/intl-relativetimeformat@4.0.0) (2019-09-15)


### Features

* **@formatjs/intl-relativetimeformat:** dont bundle en by default ([d9a0a66](https://github.com/formatjs/formatjs/commit/d9a0a66))


### BREAKING CHANGES

* **@formatjs/intl-relativetimeformat:** `en` locale data is no longer bundled by default with
the polyfill





# [3.1.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@3.0.2...@formatjs/intl-relativetimeformat@3.1.0) (2019-09-13)


### Bug Fixes

* **@formatjs/intl-utils:** consolidate parent lookup ([bac2eae](https://github.com/formatjs/formatjs/commit/bac2eae))


### Features

* **@formatjs/intl-relativetimeformat:** use common parentLocale from @formatjs/intl-utils ([38bf476](https://github.com/formatjs/formatjs/commit/38bf476))
* **formatjs-extract-cldr-data:** dedupe relative data, reduce relative time data by 40% ([db12bf3](https://github.com/formatjs/formatjs/commit/db12bf3))
* **formatjs-extract-cldr-data:** dont embed parentLocale everywhere ([10bca2f](https://github.com/formatjs/formatjs/commit/10bca2f))
* **formatjs-extract-cldr-data:** even smaller locale data ([66a0313](https://github.com/formatjs/formatjs/commit/66a0313))





## [3.0.2](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@3.0.1...@formatjs/intl-relativetimeformat@3.0.2) (2019-09-03)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [3.0.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@3.0.0...@formatjs/intl-relativetimeformat@3.0.1) (2019-09-03)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





# [3.0.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.8.3...@formatjs/intl-relativetimeformat@3.0.0) (2019-09-03)


### Bug Fixes

* **@formatjs/intl-relativetimeformat:** fix test262 ([025dfe3](https://github.com/formatjs/formatjs/commit/025dfe3))
* **@formatjs/intl-relativetimeformat:** pass in raw locales to lookup ([9c2af2a](https://github.com/formatjs/formatjs/commit/9c2af2a))
* **@formatjs/intl-relativetimeformat:** rely on Intl.PluralRules supported locales instead of both PL & NumberFormat ([cc3c05b](https://github.com/formatjs/formatjs/commit/cc3c05b))
* **@formatjs/intl-unified-numberformat:** pass in raw locales to lookup ([719c6f2](https://github.com/formatjs/formatjs/commit/719c6f2))
* **@formatjs/intl-utils:** add polyfill-utils like getOption/toObject ([7cf1cc4](https://github.com/formatjs/formatjs/commit/7cf1cc4))


### Features

* **@formatjs/intl-relativetimeformat:** use aliases from @formatjs/intl-utils ([e430944](https://github.com/formatjs/formatjs/commit/e430944))


### BREAKING CHANGES

* **@formatjs/intl-relativetimeformat:** Language aliases are now built in so there is no need
to explicitly include it. This provides correctness across our polyfills





## [2.8.3](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.8.2...@formatjs/intl-relativetimeformat@2.8.3) (2019-08-29)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [2.8.2](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.8.1...@formatjs/intl-relativetimeformat@2.8.2) (2019-08-19)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [2.8.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.8.0...@formatjs/intl-relativetimeformat@2.8.1) (2019-08-21)


### Bug Fixes

* **@formatjs/intl-relativetimeformat:** use locale-lookup from intl-utils ([6146194](https://github.com/formatjs/formatjs/commit/6146194))





# [2.8.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.7.0...@formatjs/intl-relativetimeformat@2.8.0) (2019-08-19)


### Bug Fixes

* **@formatjs/intl-utils:** change default quarter to false in selectUnit ([dadab10](https://github.com/formatjs/formatjs/commit/dadab10))


### Features

* **@formatjs/intl-unified-numberformat:** add polyfill option ([4c1d692](https://github.com/formatjs/formatjs/commit/4c1d692))
* **formatjs-extract-cldr-data:** fix unit extraction ([7e54a0b](https://github.com/formatjs/formatjs/commit/7e54a0b))





# [2.7.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.6.4...@formatjs/intl-relativetimeformat@2.7.0) (2019-08-16)


### Features

* **formatjs-extract-cldr-data:** polyfill units ([e291eeb](https://github.com/formatjs/formatjs/commit/e291eeb))





## [2.6.4](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.6.3...@formatjs/intl-relativetimeformat@2.6.4) (2019-08-16)


### Bug Fixes

* **@formatjs/intl-relativetimeformat:** make supportedLocalesOf reflect data we have loaded, fix [#157](https://github.com/formatjs/formatjs/issues/157) ([58693be](https://github.com/formatjs/formatjs/commit/58693be))





## [2.6.3](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.6.2...@formatjs/intl-relativetimeformat@2.6.3) (2019-08-12)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [2.6.2](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.6.1...@formatjs/intl-relativetimeformat@2.6.2) (2019-08-11)


### Bug Fixes

* generate lib instead of mjs ([05e63b3](https://github.com/formatjs/formatjs/commit/05e63b3))





## [2.6.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.6.0...@formatjs/intl-relativetimeformat@2.6.1) (2019-08-10)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





# [2.6.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.5.2...@formatjs/intl-relativetimeformat@2.6.0) (2019-08-09)


### Features

* **@formatjs/intl-relativetimeformat:** add aliases support ([a2aec8c](https://github.com/formatjs/formatjs/commit/a2aec8c))





## [2.5.2](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.5.1...@formatjs/intl-relativetimeformat@2.5.2) (2019-08-06)


### Bug Fixes

* generate .mjs instead of lib ([0c34ee4](https://github.com/formatjs/formatjs/commit/0c34ee4))





## [2.5.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.5.0...@formatjs/intl-relativetimeformat@2.5.1) (2019-08-02)


### Bug Fixes

* **@formatjs/intl-relativetimeformat:** rm locale-data import core module ([3946600](https://github.com/formatjs/formatjs/commit/3946600))





# [2.5.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.4.3...@formatjs/intl-relativetimeformat@2.5.0) (2019-07-29)


### Features

* **intl-messageformat-parser:** add parser for number skeleton and date skeleton ([#131](https://github.com/formatjs/formatjs/issues/131)) ([dbe6799](https://github.com/formatjs/formatjs/commit/dbe6799))





## [2.4.3](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.4.2...@formatjs/intl-relativetimeformat@2.4.3) (2019-07-25)


### Bug Fixes

* **@formatjs/intl-relativetimeformat:** Ignore error when setting name function properties on iOS 9 ([#129](https://github.com/formatjs/formatjs/issues/129)) ([62d4b06](https://github.com/formatjs/formatjs/commit/62d4b06)), closes [#128](https://github.com/formatjs/formatjs/issues/128)





## [2.4.2](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.4.1...@formatjs/intl-relativetimeformat@2.4.2) (2019-07-23)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat





## [2.4.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.4.0...@formatjs/intl-relativetimeformat@2.4.1) (2019-07-12)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat

# [2.4.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.3.4...@formatjs/intl-relativetimeformat@2.4.0) (2019-07-12)

### Features

- **intl-messageformat-parser:** add printer to print AST to string ([ec0eaa2](https://github.com/formatjs/formatjs/commit/ec0eaa2))

## [2.3.4](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.3.3...@formatjs/intl-relativetimeformat@2.3.4) (2019-07-09)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat

## [2.3.3](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.3.2...@formatjs/intl-relativetimeformat@2.3.3) (2019-07-08)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat

## [2.3.2](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.3.1...@formatjs/intl-relativetimeformat@2.3.2) (2019-06-28)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat

## [2.3.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.3.0...@formatjs/intl-relativetimeformat@2.3.1) (2019-07-02)

### Bug Fixes

- **@formatjs/intl-relativetimeformat:** fix polyfill import ([#110](https://github.com/formatjs/formatjs/issues/110)) ([3adffc8](https://github.com/formatjs/formatjs/commit/3adffc8))

# [2.3.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.2.0...@formatjs/intl-relativetimeformat@2.3.0) (2019-06-27)

### Features

- **intl-messageformat:** allow passing in formatters ([#107](https://github.com/formatjs/formatjs/issues/107)) ([3605693](https://github.com/formatjs/formatjs/commit/3605693))

# [2.2.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.1.0...@formatjs/intl-relativetimeformat@2.2.0) (2019-06-26)

### Features

- **intl-relativetimeformat:** update LICENSE & README ([#100](https://github.com/formatjs/formatjs/issues/100)) ([3b1d11b](https://github.com/formatjs/formatjs/commit/3b1d11b))

# [2.1.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.0.2...@formatjs/intl-relativetimeformat@2.1.0) (2019-06-27)

### Features

- **intl-relativetimeformat:** make intl-relativetimeformat test262-compliant ([#95](https://github.com/formatjs/formatjs/issues/95)) ([91669a3](https://github.com/formatjs/formatjs/commit/91669a3))
- **intl-utils:** Add intl-utils ([#98](https://github.com/formatjs/formatjs/issues/98)) ([2329c57](https://github.com/formatjs/formatjs/commit/2329c57))

## [2.0.2](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.0.1...@formatjs/intl-relativetimeformat@2.0.2) (2019-06-18)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat

## [2.0.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@2.0.0...@formatjs/intl-relativetimeformat@2.0.1) (2019-06-18)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat

# [2.0.0](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@1.0.1...@formatjs/intl-relativetimeformat@2.0.0) (2019-06-18)

### Features

- **formatjs-extract-cldr-data:** migrate to TS ([#91](https://github.com/formatjs/formatjs/issues/91)) ([c012d6e](https://github.com/formatjs/formatjs/commit/c012d6e))
- **intl-format-cache:** fix TS definition ([71ae9eb](https://github.com/formatjs/formatjs/commit/71ae9eb))

### BREAKING CHANGES

- **formatjs-extract-cldr-data:** Export main function via `default` in index file.
  If you're using `require('formatjs-extract-cldr-data')`, change it to
  `require('formatjs-extract-cldr-data').default`.

## [1.0.1](https://github.com/formatjs/formatjs/compare/@formatjs/intl-relativetimeformat@1.0.0...@formatjs/intl-relativetimeformat@1.0.1) (2019-06-12)

**Note:** Version bump only for package @formatjs/intl-relativetimeformat

# 1.0.0 (2019-06-05)

### Features

- add package intl-relativetimeformat ([#51](https://github.com/formatjs/formatjs/issues/51)) ([48c0f43](https://github.com/formatjs/formatjs/commit/48c0f43))
- **intl-messageformat:** rm bundled intl-pluralrules ([a8526c3](https://github.com/formatjs/formatjs/commit/a8526c3))
- **intl-relativeformat:** Use Intl.RelativeTimeFormat ([c014ce0](https://github.com/formatjs/formatjs/commit/c014ce0))
- **intl-relativetimeformat:** rename due to npm squatting ([b4476e0](https://github.com/formatjs/formatjs/commit/b4476e0))

### BREAKING CHANGES

- **intl-messageformat:** We no longer include intl-pluralrules in our main index
  file. Consumer should polyfill accordingly.
- **intl-relativeformat:** We now use Intl.RelativeTimeFormat in
  intl-relativeformat so consuming env should polyfill this accordingly

# 1.0.0 (2019-06-05)

### Features

- add package intl-relativetimeformat ([#51](https://github.com/formatjs/formatjs/issues/51)) ([48c0f43](https://github.com/formatjs/formatjs/commit/48c0f43))
- **intl-messageformat:** rm bundled intl-pluralrules ([a8526c3](https://github.com/formatjs/formatjs/commit/a8526c3))
- **intl-relativeformat:** Use Intl.RelativeTimeFormat ([c014ce0](https://github.com/formatjs/formatjs/commit/c014ce0))

### BREAKING CHANGES

- **intl-messageformat:** We no longer include intl-pluralrules in our main index
  file. Consumer should polyfill accordingly.
- **intl-relativeformat:** We now use Intl.RelativeTimeFormat in
  intl-relativeformat so consuming env should polyfill this accordingly

# [3.1.0](https://github.com/formatjs/formatjs/compare/intl-relativeformat@3.0.1...intl-relativeformat@3.1.0) (2019-05-31)

### Features

- **intl-relativeformat:** expose es6 entry point in package.json ([baf36b5](https://github.com/formatjs/formatjs/commit/baf36b5))

## [3.0.1](https://github.com/formatjs/formatjs/compare/intl-relativeformat@2.2.0...intl-relativeformat@3.0.1) (2019-05-31)

**Note:** Version bump only for package intl-relativeformat

# [2.2.0](https://github.com/yahoo/intl-relativeformat/compare/intl-relativeformat@2.1.3...intl-relativeformat@2.2.0) (2019-05-29)

### Features

- **intl-relativeformat:** Improve day diffing ([#45](https://github.com/yahoo/intl-relativeformat/issues/45)) ([8f2c649](https://github.com/yahoo/intl-relativeformat/commit/8f2c649))

## [2.1.3](https://github.com/yahoo/intl-relativeformat/compare/intl-relativeformat@2.1.1...intl-relativeformat@2.1.3) (2019-05-28)

**Note:** Version bump only for package intl-relativeformat

## [2.1.2](https://github.com/yahoo/intl-relativeformat/compare/intl-relativeformat@2.1.1...intl-relativeformat@2.1.2) (2019-05-28)

**Note:** Version bump only for package intl-relativeformat

## 2.1.1 (2019-05-28)

**Note:** Version bump only for package intl-relativeformat

# 2.1.0 (2019-05-28)
