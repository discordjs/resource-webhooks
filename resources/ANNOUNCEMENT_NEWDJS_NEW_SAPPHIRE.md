**[@sapphire/pieces@3.3.4](https://github.com/sapphiredev/pieces/compare/v3.3.3...v3.3.4) has been released**
_**🐛 Bug Fixes**_
⫸ Bumped dependencies ([7ae45ad](https://github.com/sapphiredev/pieces/compare/v3.3.3...v3.3.4#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519))
**[@sapphire/framework@2.5.1](https://github.com/sapphiredev/framework/compare/v2.5.0...v2.5.1) has been released**
_**🐛 Bug Fixes**_
⫸ Bumped dependencies ([33dd38b](https://github.com/sapphiredev/framework/commit/33dd38bdccc261a8196cc9853a50f820584d9b4d))
**[@sapphire/discord.js-utilities@4.11.3](https://github.com/sapphiredev/utilities/compare/@sapphire/discord.js-utilities@4.11.2...@sapphire/discord.js-utilities@4.11.3) has been released**
_**🐛 Bug Fixes**_
⫸ Update all non-major dependencies ([9a20de6](https://github.com/sapphiredev/utilities/commit/9a20de656dba6639265eff9e5987a550282f5e5e))
**[@sapphire/decorators@4.3.5](https://github.com/sapphiredev/utilities/compare/@sapphire/decorators@4.3.4...@sapphire/decorators@4.3.5) has been released**
_**🐛 Bug Fixes**_
⫸ Update all non-major dependencies ([50cd8de](https://github.com/sapphiredev/utilities/commit/50cd8dea593b6f5ae75571209456b3421e2ca59a))
**[@sapphire/eslint-config@4.3.7](https://github.com/sapphiredev/utilities/compare/@sapphire/eslint-config@4.3.6...@sapphire/eslint-config@4.3.7) has been released**
_**🐛 Bug Fixes**_
⫸ Update all non-major dependencies ([9a20de6](https://github.com/sapphiredev/utilities/commit/9a20de656dba6639265eff9e5987a550282f5e5e))

**[@sapphire/plugin-pattern-commands@3.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@2.2.0...@sapphire/plugin-pattern-commands@3.0.0) has been released**
_**🚀 Features**_
⫸ Event parameter standardisation (#307) ([87960e0](https://github.com/sapphiredev/plugins/commit/87960e01c4dd73d5930ee35b5e959e3487a3cf28))
_**💥 Breaking Changes:**_
⫸ The parameters of `PatternCommandEvents.CommandRun` have changed, they are now `message, command, payload`, respectively of the types `Message, PatternCommand, PatternCommandPayload`
⫸ The parameters of `PatternCommandEvents.CommandSuccess` have changed. It is now an object of `PatternCommandSuccessPayload`. To access the respective properties of `result`, `command`, `alias`, and `duration` use `payload.<property>`
⫸ The parameters of `PatternCommandEvents.CommandError` have changed. The second parameter is now an object of `PatternCommandErrorPayload`. To access the second parameter `command` use `payload.command`.
⫸ The parameters of `PatternCommandEvents.CommandFinished` have changed. The parameters are now `message, command, payload`, respectively of the types `Message, PatternCommand, PatternCommandFinishedPayload`. The duration, which was previously the second parameter, is now available as `payload.duration`.