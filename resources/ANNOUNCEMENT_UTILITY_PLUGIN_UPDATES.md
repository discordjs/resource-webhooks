**[@sapphire/discord.js-utilities v4.3.0](https://github.com/sapphiredev/utilities/compare/@sapphire/discord.js-utilities@4.2.0...@sapphire/discord.js-utilities@4.3.0) has been released**
_**Bug Fixes**_
⫸ Export the `PaginatedMessageEmbedFields` at top level so it can actually properly be used.
_**Features**_
⫸ Made it possible to add custom `LINK` style buttons in `PaginatedMessage` when using any of `setActions`, `addActions`, or `addAction`
⫸ Added an optional second parameter called `includeDefaultActions` to `setActions`, defaults to `false`. Set it to `true` to merge in the default actions together with the array you provide in the first parameter.
_ _
**[@sapphire/decorators v4.0.0](https://github.com/sapphiredev/utilities/compare/@sapphire/decorators@3.1.6...@sapphire/decorators@4.0.0) has been released**
_**Features**_
⫸ Added `container` to the `@ApplyOptions` parameters when using it with a callback style, i.e. like so:
```ts
@ApplyOptions<Listener.Options>(({ container }) => ({
  description: 'Handle Raw Message Delete events',
  emitter: container.client.ws,
  event: GatewayDispatchEvents.MessageDelete
}))
```
⫸ **BREAKING CHANGE:** Previously the parameter was only the `PieceContext`, and as just a regular parameter. The single parameter is now an object which has both `container` and `context`. If you were previously already using callbacks then migrate your code by changing it to `ApplyOptions<Listener.Options>(({ context }) => ({`
⫸ **BREAKING CHANGE:** Removed the previously deprecated camelCased `enumerable` and `enumerableMethod` decorators. Use their PascalCased variants (`Enumerable` and `EnumerableMethod`) instead.
_ _
**[@sapphire/plugin-i18next v2.2.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@2.2.1...@sapphire/plugin-i18next@2.2.2) has been released**
_**Performance Improvements**_
⫸ Removed the `add` chokidar event as it was not necessary
