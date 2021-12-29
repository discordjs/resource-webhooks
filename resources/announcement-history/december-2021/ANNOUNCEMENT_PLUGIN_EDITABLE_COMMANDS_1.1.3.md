**[@sapphire/plugin-editable-commands v1.1.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-editable-commands@1.1.2...@sapphire/plugin-editable-commands@1.1.3) has been released**
_ _
_**Bug Fixes**_
_ _
⫸ The dependency of `@skyra/editable-commands` has been bumped to remove the dependency on `message.deleted`. Starting this version you will no longer get a `DeprecationWarning` from this plugin when using DiscordJS v13.4.0 or later.
_ _
**[@sapphire/plugin-i18next v2.1.4](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@2.1.3...@sapphire/plugin-i18next@2.1.4) has been released**
_ _
_**Bug Fixes**_
_ _
⫸ The dependency of `i18next` has been bumped to the latest patch version.
_ _
**[@sapphire/plugin-scheduled-tasks v1.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@1.0.0...@sapphire/plugin-scheduled-tasks@1.0.1) has been released**
_ _
_**Bug Fixes**_
_ _
⫸ The **dev** dependency of `bull` has been bumped to the latest major version. This won't affect your implementation per se but the bump will indicate that the plugin does support `bull` v4. The breaking change it introduced was only for when creating ones own instance of Redis, which we do not.