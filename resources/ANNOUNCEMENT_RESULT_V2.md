**[@sapphire/result@2.0.0](https://github.com/sapphiredev/utilities/compare/@sapphire/result@1.1.1...@sapphire/result@2.0.0) has been released**
_**🏠 Refactor**_
⫸ Rewrite @sapphire/result from scratch ([d5b57ff](https://github.com/sapphiredev/utilities/commit/d5b57ff52402bfd261372bf4486e46f39bb41b6d))
_ _
_**💥 Breaking Changes:**_
⫸ Removed `Maybe` type, the substitute is `Option`
⫸ Removed `maybe` function, the substitute is `Option.from`
⫸ Removed `some` function, the substitute is `Option.some`
⫸ Removed `none` function, the substitute is `Option.none`
⫸ Removed `isSome` function, the substitute is `option.isSome`
⫸ Removed `isNone` function, the substitute is `option.isNone`
⫸ Removed `isMaybe` function, the substitute is `Option.is`
⫸ Removed `UnwrapMaybeValue` type, the substitute is `Option.UnwrapSome`
⫸ Removed `None` type, the substitute is `Option.None`
⫸ Removed `Some` type, the substitute is `Option.Some`
⫸ Removed `Err` type, the substitute is `Result.Err`
⫸ Removed `Ok` type, the substitute is `Result.Ok`
⫸ Removed `from` function, the substitute is `Result.from`
⫸ Removed `fromAsync` function, the substitute is `Result.fromAsync`