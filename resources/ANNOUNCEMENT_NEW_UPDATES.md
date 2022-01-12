[This release is lit](https://youtu.be/U1ei5rwO7ZI) <a:snoopdogg:930868548459446313>
_ _
**[@sapphire/discord.js-utilities v4.2.0](https://github.com/sapphiredev/utilities/compare/@sapphire/discord.js-utilities@4.1.6...@sapphire/discord.js-utilities@4.2.0) has been released**
_ _
_**Features**_
_ _
⫸ Added `PaginatedMessageEmbedFields` class.
　⪢ `PaginatedMessageEmbedFields` (this new one) differs from `PaginatedFieldMessageEmbed` as the items here are whole fields, that are added to the embed, whereas `PaginatedFieldMessageEmbed` concatenates the items in a single field with a given formatter function.
_ _
📦 New utility package! 📦
**[@sapphire/phisherman v1.0.0](https://github.com/sapphiredev/utilities/releases/tag/@sapphire%2Fphisherman@1.0.0) has been released**
_ _
We have released v1.0.0 of **@sapphire/phisherman** made by <@564468550727761920>!
_ _
What is this utility for?
_ _
With @sapphire/phisherman, you can have an out of the box integration with [Phisherman](https://phisherman.gg). Phisherman is a centralised database of phishing and scam links. It is designed for use with Discord bots, allowing them to utilise the Phisherman API to cross-check URLs against our known phishing links.
_ _
Note: Phisherman is currently in early access. For more information or to request access, please visit their [discord server](https://discord.gg/QwrpmTgvWy).
_ _
For further reading you can go to:
-   The plugin on NPM: <https://www.npmjs.com/package/@sapphire/phisherman>
-   The source code on GitHub: <https://github.com/sapphiredev/utilities/tree/main/packages/phisherman>
-   The API documentation on our website: <https://www.sapphirejs.dev/docs/Documentation/api-utilities/modules/???> (TODO: good link)


**[@sapphire/plugin-hmr v1.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-hmr@1.0.1...@sapphire/plugin-hmr@1.1.0) has been released**
_ _
_**Features**_
_ _
⫸ Made it possible to set Chokidar options through `clientOptions.hmr`.
⫸ Previously enabling the plugin only for development required importing `start` from the module and calling that. As we now read client options in `/register` you can also configure it directly in `clientOptions.hmr.enabled`. For example set it to `process.env.NODE_ENV === 'development'` then call `/register` and HMR will only be enabled in development.
_ _
**[@sapphire/plugin-i18next v1.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.0.1...@sapphire/plugin-i18next@1.1.0) has been released**
_ _
_**Features**_
_ _
⫸ Added optional Hot Module Replacement (HMR). Enable it through `clientOptions.i18n.hmr.enabled` (defaults to `false`).
_ _
**[@sapphire/plugin-pattern-commands v2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@2.0.0...@sapphire/plugin-pattern-commands@2.1.0) has been released**
_ _
_**Features**_
_ _
⫸ Added the command duration as last parameter to the `patternCommandSuccess` event.
_ _
**[@sapphire/plugin-scheduled-tasks v2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@2.0.0...@sapphire/plugin-scheduled-tasks@2.1.0) has been released**
_ _
_**Features**_
_ _
⫸ Added the command duration as last parameter to the `scheduledTaskSuccess` event.