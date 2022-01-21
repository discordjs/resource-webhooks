**Who needs 1 version a day when you can have 2**
_ _
**[@sapphire/discord.js-utilities v4.4.0](https://github.com/sapphiredev/utilities/compare/@sapphire/discord.js-utilities@4.3.1...@sapphire/discord.js-utilities@4.4.0) has been released**
_**Bug Fixes**_
⫸ Dropped the default `idle` to 14.5 minutes to ensure the collector ends before interaction expires. Note that you can change it with [`PaginatedMessage.setIdle`](https://www.sapphirejs.dev/docs/Documentation/api-utilities/classes/sapphire_discord_js_utilities.PaginatedMessage#setidle).
_**Features**_
⫸ The moment you've all been waiting for has finally arrived! PaginatedMessage now supports interactions! On top of supporting messages, you can now start your PaginatedMessage based on Command Interactions, Select Menu Interactions, and Button Interactions! For example when using `@sapphire/framework@next` (which support application commands) you can do the following:
```ts
public override async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
  await interaction.deferReply();
​
  const myQuery = interaction.options.getString('query', true);
  const myAPIData = await getApiData(myQuery);
  const paginatedMessage = new PaginatedMessage() //
    .addPageEmbed((embed) =>
      embed
        .setTitle('Sample Title')
        .setDescription('Sample Description')
        .addField('Field Title', myAPIData.fieldValue1, true)
        .addField('Field Title', myAPIData.fieldValue2, true)
        .addField('Field Title', myAPIData.fieldValue3, true)
    );
​
  return paginatedMessage.run(interaction);
}
```
(*Warning, there are zero width spaces above `...interaction.options.getString...` and `...paginatedMessage.run...` for formatting in this announcement*)