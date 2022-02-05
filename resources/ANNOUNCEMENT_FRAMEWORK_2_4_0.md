‼️ **[@sapphire/framework v2.4.0](https://github.com/sapphiredev/framework/compare/v2.3.0...v2.4.0) has been released** ‼️
_**Bug Fixes**_
⫸ Bumped the `@sapphire` dependencies to their latest versions
⫸ Ensure commands do not run when your bot has been timed out through the "Time Out" Discord feature. This was caused a lot of errors for bots.
_**Features**_
⫸ Made it possible for a command's `detailedDescription` property to be an object instead of a string. This way you can pass rich data into this property that can be read in a `help` command.
　⪢ (TypeScript Only): If you want the `detailedDescription` object to be strictly typed then you can module augment the `DetailedDescriptionCommandObject` interface:
　```ts
　declare module '@sapphire/framework' {
	　interface DetailedDescriptionCommandObject {} // Your module augmentation here
　}
　```