## About

Each file in `./resources` expects a github webhook in the repositories secrets in the format `WEBHOOK_FILE_NAME`.

Deploying the webhook messages is done manually via [workflow dispatch](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/).

The provided tags are the resource names in discord channel format and separated by the `,` character.   
Example: `rules, useful-servers` 

The repository requires the `WEBHOOK_AVATAR` and `WEBHOOK_NAME` repository secrets which control the webhooks avatar and name respectively for all deployed webhook resources.

## Contributing

1. Fork & clone the repository, and make sure you're on the **main** branch
2. Run `npm install`
3. Code your heart out!
4. Run `npm run lint` to run ESLint
5. Run `npm run build` to transpile into JavaScript and ensure no type errors remain
6. [Submit a pull request](https://github.com/discordjs/resource-webhooks/compare) (Make sure you follow the [conventional commit format](https://github.com/discordjs/discord.js-modules/blob/main/.github/COMMIT_CONVENTION.md))

### Adding content

1. Add the file into `./resources` (The file name should be derived from the channel the webhook will post to for added verbosity. The channel `foo-bar` becomes `FOO_BAR.md`)
2. Each new paragraph (double newline character) will be posted in a new message. Try to use as few messages as possible (the limit is 2000 characters per message) to avoid rate limiting. You can add a spacer and simulate a new message with `_ _`
3. Channel names and other escape sequences should have the format `%FOO_BAR%` and need to be added to the mapping `replacePatterns` in `./src/index.ts`
4. Add a Webhook requirement to `./.github/workflows/deploy.yml`. The repository secret should have the format `WEBHOOK_CHANNEL_NAME_ID` and `WEBHOOK_CHANNEL_NAME_TOKEN` for added verbosity. The entry for our example is `https://discord.com/api/webhooks/${{ secrets.WEBHOOK_FOO_BAR_ID }}/${{ secrets.WEBHOOK_FOO_BAR_TOKEN }}`
