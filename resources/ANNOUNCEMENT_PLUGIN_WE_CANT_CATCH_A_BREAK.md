We can't catch a break here!
_ _
**[@sapphire/plugin-scheduled-tasks v1.1.1](https://github.com/sapphiredev/plugin-scheduled-tasks/compare/v1.1.0...v1.1.1) has been released**
_ _
_**Bug Fixes**_
_ _
⫸ We fixed making the scheduler connection for the Redis strategy by removing the `await` usage for the connection. Thank you <@858367536240394259> for the report and for testing the solution.
_ _
**[@sapphire/plugin-pattern-commands v1.0.1](https://github.com/sapphiredev/plugin-pattern-commands/compare/v1.0.0...v1.0.1) has been released**
_ _
_**Bug Fixes**_
_ _
⫸ (TypeScript only) The module augmentation to expose `pattern-commands` in `container.stores.get('pattern-commands')` is now included when calling either `/register` or any of the `/index` imports.