**[@sapphire/discord.js-utilities v4.9.4](https://github.com/sapphiredev/utilities/compare/@sapphire/discord.js-utilities@4.9.3...@sapphire/discord.js-utilities@4.9.4) has been released**
_**Bug Fixes**_
⫸ In [`PaginatedMessages`](https://www.sapphirejs.dev/docs/Documentation/api-utilities/classes/sapphire_discord_js_utilities.PaginatedMessage) ensure page index numbers are only added to the last embed footer if a page has multiple embeds.
_ _
**[@sapphire/plugin-scheduled-tasks v2.3.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@2.3.0...@sapphire/plugin-scheduled-tasks@2.3.1) has been released**
_**Bug Fixes**_
⫸ Fixed a bug where cron scheduled tasks would be created with the name `__default__` instead of a unique name, causing conflicts when having 2 different cron scheduled tasks.