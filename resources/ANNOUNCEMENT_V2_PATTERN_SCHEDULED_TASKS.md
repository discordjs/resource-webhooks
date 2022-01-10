Who needs v1 when v2 is also pretty cool.
_ _
**[@sapphire/plugin-scheduled-tasks v2.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@1.2.1...@sapphire/plugin-scheduled-tasks@2.0.0) has been released**
_ _
_**Bug Fixes**_
_ _
⫸ Properly return the result from running a task so that `scheduledTaskError` can be emitted, and `task.run()` will have the result as its return value.
_ _
_**Features**_
_ _
⫸ Added a `duration` parameter to `scheduledTaskError` and `scheduledTaskFinished` events to indicate how long running the task took.
　⪢ **BREAKING CHANGE:** The `duration` argument is the parameter _before_ the `payload` parameter for the events, thus shifting `payload` one position to the right of the parameter list.
　⪢ **BREAKING CHANGE:** This plugin now depends on `@sapphire/stopwatch`. Make sure to add it to your dependencies if you haven't already.

**[@sapphire/plugin-pattern-commands v2.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@1.0.2...@sapphire/plugin-pattern-commands@2.0.0) has been released**
_ _
_**Features**_
_ _
⫸ Introduced the new events `patternCommandError` and `patternCommandFinished`. Respectively these are emitted when a pattern command errors, and when a pattern command run finishes (regardless of error or not).
　⪢ The parameters for `patternCommandError` are in order `error`, `command`, `duration`, `payload`.
　⪢ The parameters for `patternCommandFinished` are in order `command`, `duration`, `payload`.
　⪢ **BREAKING CHANGE:** This plugin now depends on `@sapphire/stopwatch`. Make sure to add it to your dependencies if you haven't already.
⫸ Introduced a new property for the pattern command options (`PatternCommandOptions`), `matchFullName`.
　⪢ Setting this to true will ensure that RegEx matches only match if the full content matches the name of the command. For example given the command name `post` and the content `postman` and this option set to true will not give a match, but will when set to false.
　⪢ The default value is `false`.

**[@sapphire/utilities v3.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/utilities@3.1.0...@sapphire/utilities@3.2.0) has been released**
_ _
_**Bug Fixes**_
_ _
⫸ Make the `NonNullObject` type require `object`
_ _
_**Features**_
_ _
⫸ Add support for optional custom constructors in the `isObject` method, useful for when passing a class instance into this method.
_ _
**[@sapphire/event-iterator v1.4.0](https://github.com/sapphiredev/plugins/compare/@sapphire/event-iterator@1.3.3...@sapphire/event-iterator@1.4.0) has been released**
_ _
_**Features**_
_ _
⫸ No longer bundle this package for browsers using rollup, this package was always meant to be used with a NodeJS environment only.
_ _
**[@sapphire/discord-utilities v2.5.0](https://github.com/sapphiredev/plugins/compare/@sapphire/discord-utilities@2.4.0...@sapphire/discord-utilities@2.5.0) has been released**
_ _
_**Features**_
_ _
⫸ Added more limits:
　⪢ `ChannelLimits.MaximumReactions`
　⪢ `ChannelLimits.MaximumUploadSize`
　⪢ `ChannelLimits.MaximumNitroUploadSize`
　⪢ `ChannelLimits.MaximumUploadSizeInGuild`
　⪢ `ModerationLimits.MaximumTimeoutDuration`
　⪢ `UserLimits.MaximumUsersPerDMGroup`
　⪢ `UserLimits.MaximumBiographyLength`