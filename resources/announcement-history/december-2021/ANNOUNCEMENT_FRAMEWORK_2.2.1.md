‼️ **[@sapphire/framework v2.2.1](https://github.com/sapphiredev/framework/compare/v2.2.0...v2.2.1) has been released** ‼️
_ _
_**Bug Fixes**_
_ _
⫸ (TypeScript Only): The namespaced type of `Command.Context` has been fixed, it is now a re-export of `AliasPiece.Context`. The `CommandContext` interface (type of the third parameter of `messageRun`) is now accessible on the namespace as `Command.RunContext`.
_ _
**[@sapphire/plugin-subcommands v2.1.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@2.1.1...@sapphire/plugin-subcommands@2.1.2) has been released**
_ _
_**Bug Fixes**_
_ _
⫸ (TypeScript Only): Same as for framework above, and likewise there is now `SubCommandPluginCommand.RunContext`.