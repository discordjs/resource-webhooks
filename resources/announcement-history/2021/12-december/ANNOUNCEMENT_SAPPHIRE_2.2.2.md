‼️ **[@sapphire/framework v2.2.2](https://github.com/sapphiredev/framework/compare/v2.2.1...v2.2.2) has been released** ‼️
_ _
_**Bug Fixes**_
_ _
⫸ (TypeScript Only): It was possible to get compiler issues with DiscordJS v13.4.0 because our interface for default permissions for the `requiredClientPermissions` and `requiredUserPermissions` had to be updated to have the 2 new events introduced in this version of DiscordJS.
⫸ (TypeScript Only): The context for `BooleanArgument` / `resolveBoolean` is now immutable. That is to say, they are now typed as `readonly string[]` instead of `string[]`.