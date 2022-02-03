**[@sapphire/discord.js-utilities v4.6.0](https://github.com/sapphiredev/utilities/compare/@sapphire/discord.js-utilities@4.5.0...@sapphire/discord.js-utilities@4.6.0) has been released**
_**Bug Fixes**_
⫸ Fixed `PaginatedMessage` not filtering to the correct response and user, causing very weird behaviour when 2 people used a command with `PaginatedMessage` in the same channel.
⫸ Adjusted the default `wrongUserInteractionReply` message for `PaginatedMessage` to account for the fact that there is also a Select Menu on the `PaginatedMessage` by default.
from:
> Please stop clicking the buttons on this message.
to:
> Please stop interacting with the components on this message.
　⪢ Reminder that this message can be edited with [`setWrongUserInteractionReply`](<https://www.sapphirejs.dev/docs/Documentation/api-utilities/classes/sapphire_discord_js_utilities.PaginatedMessage#setwronguserinteractionreply>)
⫸ Adjusted error message thrown when no actions are provided to the `PaginatedMessage`
from:
> There are no messages.
to:
> There are no actions.
_**Features**_
⫸ Added new type guards: `isVoiceBasedChannel` and `isMessageInstance`
　⪢ `isVoiceBasedChannel` takes a channel and is truthy if that channel is a voice based channel.
　⪢ `isMessageInstance` takes a message and is truthy if that message is a message instance, and not an `APIMessage`
⫸ Added a new utility function: `canJoinVoiceChannel`
　⪢ `canJoinVoiceChannel` takes a channel and returns true if that channel is a voice based channel and the bot can join that channel.

**[@sapphire/decorators v4.2.0](https://github.com/sapphiredev/utilities/compare/@sapphire/decorators@4.1.0...@sapphire/decorators@4.2.0) has been released**
_**Features**_
⫸ This package has been updated to include the latest release of `@sapphire/discord.js-utilities`
_ _
**[@sapphire/eslint-config v4.2.0](https://github.com/sapphiredev/utilities/compare/@sapphire/eslint-config@4.1.0...@sapphire/eslint-config@4.2.0) has been released**
_**Bug Fixes**_
⫸ The ESLint related dependencies for this package have been updated to their latest versions
_ _
**[@sapphire/ts-config v3.3.0](https://github.com/sapphiredev/utilities/compare/@sapphire/ts-config@3.2.0...@sapphire/ts-config@3.3.0) has been released**
_**Features**_
⫸ We have added several sub-configs that modify the default behaviour of `@sapphire/ts-config`. These are:
- `extra-strict` which adds:
```json
{
  "allowUnreachableCode": false,
  "allowUnusedLabels": false,
  "exactOptionalPropertyTypes": false,
  "noImplicitOverride": true
}
```
- `without-decorators` which adds:
```json
{
  "emitDecoratorMetadata": false,
  "experimentalDecorators": false
}
```
- `extra-strict-without-decorators` which combines the above two.
The example usage for `extra-strict` is:
```json
{
  "extends": "@sapphire/ts-config/extra-strict"
}
```