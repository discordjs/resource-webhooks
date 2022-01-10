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
　⪢ Setting this to true will ensure that RegEx matches only match if the full content matches the name or alias. For example given the key `post` and the content `postman` and this option set to true will not give a match, but will when set to false.
　⪢ The default value is `false`.