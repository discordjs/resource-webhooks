‼️ **[@sapphire/framework v2.2.0](https://github.com/sapphiredev/framework/compare/v2.1.4...v2.2.0) has been released** ‼️
_ _
**_Features_**
_ _
⫸ (TypeScript Only) We now expose namespaces for all `Piece` related classes. For example, instead of `CommandOptions` you can optionally also use `Command.Options` to get the same type.
⫸ All Core preconditions are now exported. This allows you to extend them:
_ _
*JavaScript*
```js
const { CorePreconditions, Precondition } = require('@sapphire/framework');
module.exports = class MyPrecondition extends CorePreconditions.ClientPermissions {
  // Do stuff
}
```
_ _
*TypeScript / ESM*
```ts
import { CorePreconditions, Precondition } from '@sapphire/framework';
export class MyPrecondition extends CorePreconditions.ClientPermissions {
  // Do stuff
}
```
_ _
_**Bug Fixes**_
_ _
⫸ (TypeScript Only): TypeScript 4.5 introduced some build issues with 1 particular line in the Listener class. We have fixed that.
_ _
_**Deprecations**_
_ _
⫸ The `ExtendedArgument` class is now marked as deprecated and will be removed in v3.0.0. This class was already replaced internally with the `Resolvers` (a top level export) and we recommend other developers to follow a similar strategy.


**[@sapphire/plugin-i18next v2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@2.0.2...@sapphire/plugin-i18next@2.1.0) has been released**
_ _
_**Features**_
_ _
⫸ We've added a function `replyLocalized` which is similar to `sendLocalized` and `editLocalized` but uses `message.reply`
⫸ Support for the new syntax for i18next formatters has been added. All you need to do to register your formatters is configure them in `clientOptions.i18n.formatters`. For example:
```ts
import { SapphireClient } from "@sapphire/framework";
const myClient = new SapphireClient({
  intents: ["whatever"],
  i18n: {
    formatters: [
      {
        name: "TitleCase",
        format: (value) => toTitleCase(value),
      },
    ],
  },
});
```
Now you can use this formatter in your i18next JSON like so:
```json
{
  "valueToTitleCase": "{{value, TitleCase}}"
}
```
And you can remove the legacy style of defining formatters by removing `clientOptions.i18n.i18next.interpolation.format`
_ _
_ _
_ _
Lastly all of the following packages have the namespaces change as @sapphire/framework:
_ _
⫸ **[@sapphire/plugin-i18next v2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@2.0.2...@sapphire/plugin-i18next@2.1.0)**
⫸ **[@sapphire/plugin-api v2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.0.2...@sapphire/plugin-api@3.1.0)**
⫸ **[@sapphire/plugin-editable-commands v1.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-editable-commands@1.0.2...@sapphire/plugin-editable-commands@1.1.0)**
⫸ **[@sapphire/plugin-logger v2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@2.0.2...@sapphire/plugin-logger@2.1.0)**
⫸ **[@sapphire/plugin-subcommands v2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@2.0.2...@sapphire/plugin-subcommands@2.1.0)**
_ _
_**__New Sapphire Framework release at the top of this long boi__**_