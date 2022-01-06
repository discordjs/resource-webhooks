We can't catch a break here!
_ _
**[@sapphire/plugin-scheduled-tasks v1.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@1.1.0...@sapphire/plugin-scheduled-tasks@1.1.1) has been released**
_ _
_**Bug Fixes**_
_ _
⫸ We fixed the scheduler connection for the Redis strategy by removing the `await` usage for the connection. Thank you <@858367536240394259> for the report and for testing the solution.
_ _
**[@sapphire/plugin-pattern-commands v1.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@1.0.0...@sapphire/plugin-pattern-commands@1.0.1) has been released**
_ _
_**Bug Fixes**_
_ _
⫸ (TypeScript only) The module augmentation to expose `pattern-commands` in `container.stores.get('pattern-commands')` is now included when importing the plugin.