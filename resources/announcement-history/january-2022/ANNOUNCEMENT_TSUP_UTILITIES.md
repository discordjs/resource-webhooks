_**Features that apply to all the packages below**_
⫸ We now bundle the package with `tsup` to provide even better bundles for all of CJS, ESM and IIFE. This change applies to:
- **[@sapphire/async-queue v1.2.0](https://github.com/sapphiredev/utilities/compare/@sapphire/async-queue@1.1.9..@sapphire/async-queue@1.2.0)**
- **[@sapphire/decorators v4.1.0](https://github.com/sapphiredev/utilities/compare/@sapphire/decorators@4.0.2..@sapphire/decorators@4.1.0)**
- **[@sapphire/discord-utilities v2.7.0](https://github.com/sapphiredev/utilities/compare/@sapphire/discord-utilities@2.6.0..@sapphire/discord-utilities@2.7.0)**
- **[@sapphire/discord.js-utilities v4.5.0](https://github.com/sapphiredev/utilities/compare/@sapphire/discord.js-utilities@4.4.0..@sapphire/discord.js-utilities@4.5.0)**
- **[@sapphire/embed-jsx v2.2.0](https://github.com/sapphiredev/utilities/compare/@sapphire/embed-jsx@2.1.6..@sapphire/embed-jsx@2.2.0)**
- **[@sapphire/eslint-config v4.1.0](https://github.com/sapphiredev/utilities/compare/@sapphire/eslint-config@4.0.11..@sapphire/eslint-config@4.1.0)**
- **[@sapphire/event-iterator v1.5.0](https://github.com/sapphiredev/utilities/compare/@sapphire/event-iterator@1.4.0..@sapphire/event-iterator@1.5.0)**
- **[@sapphire/fetch v2.1.0](https://github.com/sapphiredev/utilities/compare/@sapphire/fetch@2.0.4..@sapphire/fetch@2.1.0)**
- **[@sapphire/phisherman v1.2.0](https://github.com/sapphiredev/utilities/compare/@sapphire/phisherman@1.1.0..@sapphire/phisherman@1.2.0)**
- **[@sapphire/prettier-config v1.3.0](https://github.com/sapphiredev/utilities/compare/@sapphire/prettier-config@1.2.9..@sapphire/prettier-config@1.3.0)**
- **[@sapphire/ratelimits v2.2.0](https://github.com/sapphiredev/utilities/compare/@sapphire/ratelimits@2.1.12..@sapphire/ratelimits@2.2.0)**

- **[@sapphire/snowflake v3.1.0](https://github.com/sapphiredev/utilities/compare/@sapphire/snowflake@3.0.1..@sapphire/snowflake@3.1.0)**
- **[@sapphire/stopwatch v1.3.0](https://github.com/sapphiredev/utilities/compare/@sapphire/stopwatch@1.2.5..@sapphire/stopwatch@1.3.0)**
- **[@sapphire/time-utilities v1.6.0](https://github.com/sapphiredev/utilities/compare/@sapphire/time-utilities@1.5.2..@sapphire/utilities@1.6.0)**
- **[@sapphire/ts-config v3.2.0](https://github.com/sapphiredev/utilities/compare/@sapphire/ts-config@3.1.8..@sapphire/ts-config@3.2.0)**
- **[@sapphire/utilities v3.3.0](https://github.com/sapphiredev/utilities/compare/@sapphire/utilities@3.2.1..@sapphire/utilities@3.3.0)**
_ _
_**Furthermore we have the following changes:**_
_ _
**[@sapphire/discord.js-utilities v4.5.0](https://github.com/sapphiredev/utilities/compare/@sapphire/discord.js-utilities@4.4.0..@sapphire/discord.js-utilities@4.5.0)**
_**Bug Fixes**_
⫸ Fixed a bug in `PaginatedMessageEmbedFields` where custom templates with fields were not parsed correctly.
_ _
**[@sapphire/utilities v3.3.0](https://github.com/sapphiredev/utilities/compare/@sapphire/utilities@3.2.1..@sapphire/utilities@3.3.0)**
_**Bug Fixes**_
⫸ Fixed a critical bug when passing a Date to `deepClone` (and `mergeDefault`) giving the current date instead of the same date.
_ _
**[@sapphire/fetch v2.1.0](https://github.com/sapphiredev/utilities/compare/@sapphire/fetch@2.0.4..@sapphire/fetch@2.1.0)**
_**Features**_
⫸ Thanks to the change to tsup the browser (IIFE) variant of @sapphire/fetch no longer depends on cross-fetch and instead will use the regular built-in fetch of your browser. Note the whether this version is actually used depends on your bundler. While not all bundlers are tested, we have confirmed that the Webpack configuration used by `create-react-app` grabs the ESM version instead of the IIFE.