**[@sapphire/discord.js-utilities v4.8.0](https://github.com/sapphiredev/utilities/compare/@sapphire/discord.js-utilities@4.7.0...@sapphire/discord.js-utilities@4.8.0) has been released**
_**Features**_
⫸ A warning will now be emitted if a PaginatedMessage is used within a DM channel while your bot is not set up correctly to process Paginated Messages within DMs. In order to process Paginated Messages within DMs, you will need to add:
　⪢ `partials: ['CHANNEL']` to your Client Options
　⪢ `intents: ['DIRECT_MESSAGES']` **only when using message based commands, slash commands do not need this intent**
_ _
**[@sapphire/discord-utilities v2.8.0](https://github.com/sapphiredev/utilities/compare/@sapphire/discord-utilities@2.7.0...@sapphire/discord-utilities@2.8.0) has been released**
_**Features**_
⫸ `AutoCompleteLimits` has been added
　⪢ The limits are `MaximumAmountOfOptions: 20` and `MaximumLengthOfNameOfOption: 100`
⫸ `MaximumLengthOfNameOfOption` has been added to `SelectMenuLimits`
_**Bug Fixes**_
⫸ A typo in `SelectMenuLimits` has been fixed. `MaxmimumMaxValuesSize` -> `MaximumMaxValuesSize`
_ _
**[@sapphire/phisherman v1.3.0](https://github.com/sapphiredev/utilities/compare/@sapphire/phisherman@1.2.0...@sapphire/phisherman@1.3.0) has been released**
_**Features**_
⫸ URLS are now validated using regex before being sent to to the Phisherman API in order to ensure that no invalid URLs get sent. It was reported that they were receiving invalid URLs from us.