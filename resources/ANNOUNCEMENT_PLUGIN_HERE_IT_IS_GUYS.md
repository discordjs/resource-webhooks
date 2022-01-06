You've all been asking so much, so here it is guys.
_ _
**[@sapphire/plugin-api v3.1.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.1.2...@sapphire/plugin-api@3.1.3) has been released**
_ _
Sike! You thought!
_ _
_**Bug Fixes**_
_ _
⫸ The return types of `ApiResponse.json` and `ApiResponse.text` are now properly implemented as `void`. Previously they had `return` statements.
_ _
**[@sapphire/plugin-scheduled-tasks v1.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@1.1.1...@sapphire/plugin-scheduled-tasks@1.2.0) has been released**
_ _
I jest, here it actually is.
_ _
_**Bug Fixes**_
_ _
⫸ Added documentation for `ScheduledTaskEvents` enum.
⫸ Fixed the export of `ScheduledTaskEvents` not being available at the top level import.
_ _
_**Features**_
_ _
⫸ Added `delete`, `list`, `listRepeated`, and `get` as methods on `ScheduledTaskHandler` (available through `container.tasks`).
　⪢ Note that SQS does not implement these methods as SQS queues do not support these operations.
⫸ Added a getter for `client` to `container.tasks` (available through `container.tasks.client`). For TypeScript users, this is typed as `unknown` because we do not know which queue you are using ahead of time. You can cast it to `BullClient` or `SQSClient` to get the correct type.
⫸ Made it possibly to pass a generic type to `ScheduledTaskRedisStrategyJob` so you can set the type for the `payload`, which was previously always `unknown`.
　⪢ This generic type can also be set for `create`, `list`, and `get` to type the `payload` property returned from those methods.