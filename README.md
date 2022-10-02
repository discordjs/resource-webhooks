<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire.png)

# Sapphire

**Webhook scripts to update Sapphire rules**

[![GitHub](https://img.shields.io/github/license/sapphiredev/resource-webhooks)](https://github.com/sapphiredev/resource-webhooks/blob/main/LICENSE.md)

[![Support Server](https://discord.com/api/guilds/737141877803057244/embed.png?style=banner2)](https://sapphirejs.dev/discord)

</div>

---

## About

Each file in `./resources` expects a github webhook in the repositories secrets in the format `WEBHOOK_FILE_NAME`.

Deploying the webhook messages is done manually via [workflow dispatch](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/).

The provided tags are the resource names in discord channel format and separated by the `,` character.  
Example: `rules, useful-servers`

The repository requires the `WEBHOOK_AVATAR` and `WEBHOOK_NAME` repository secrets which control the webhooks avatar and name respectively for all deployed webhook resources.

### Adding announcements

1. Add the file into [`./resources`](/resources). The file name must be `ANNNOUNCEMENT_TOPIC`.
2. Follow steps 2-5 from [Adding content](#adding-content)

### Adding content

1. Add the file into [`./resources`](/resources) (The file name should be derived from the channel the webhook will post to for added verbosity. The channel `foo-bar` becomes `FOO_BAR.md`)
2. Each new paragraph (double newline character) will be posted in a new message. Try to use as few messages as possible (the limit is 2000 characters per message) to avoid rate limiting. You can add a spacer and simulate a new message with `_ _`
3. Adding images to a file can be done through
    1. Adding a folder with the same name as the markdown file name in `./resources/images`.
    2. Adding images in `.png` format and give them ALL CAPITALS names.
    3. Referencing them in the markdown file with `%PNG_IMAGE_FILE_NAME%`.
4. Channel names and other escape sequences should have the format `%FOO_BAR%` and need to be added to the mapping `replacePatterns` in `./src/index.ts`
5. Add a Webhook requirement to `./.github/workflows/deployment.yml`. The repository secret should be prefixed with `WEBHOOK_` for added verbosity. The entry for our example is `FOO_BAR: ${{ secrets.WEBHOOK_FOO_BAR }}`

### Deployment content

Once a document is done for posting it can be deployed with [the GitHub workflow][deployment].

1. Go to [the GitHub workflow][deployment]
2. Click "Run workflow"
3. In the input field add the file name of the file to deploy
4. Confirm with "Run workflow"

#### Testing an `ANNOUNCEMENT` deployment

Announcements in particular often need to be verified in Discord before they get published to the announcement channel.
To this end it is possible to replace the `ANNOUNCEMENT` part of the file name with `DRAFT` and it will post to the [`#mod-bot-commands`](https://discord.com/channels/737141877803057244/868830230503100426) channel as opposed to [`#announcements`](https://discord.com/channels/737141877803057244/737142071319855105).

## Buy us some doughnuts

Sapphire Community is and always will be open source, even if we don't get donations. That being said, we know there are amazing people who may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Open Collective, Ko-fi, Paypal, Patreon and GitHub Sponsorships. You can use the buttons below to donate through your method of choice.

|   Donate With   |                       Address                       |
| :-------------: | :-------------------------------------------------: |
| Open Collective | [Click Here](https://sapphirejs.dev/opencollective) |
|      Ko-fi      |      [Click Here](https://sapphirejs.dev/kofi)      |
|     Patreon     |    [Click Here](https://sapphirejs.dev/patreon)     |
|     PayPal      |     [Click Here](https://sapphirejs.dev/paypal)     |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="https://github.com/sapphiredev/resource-webhooks/commits?author=favna" title="Code">💻</a> <a href="#content-favna" title="Content">🖋</a> <a href="https://github.com/sapphiredev/resource-webhooks/commits?author=favna" title="Documentation">📖</a> <a href="#design-favna" title="Design">🎨</a> <a href="#maintenance-favna" title="Maintenance">🚧</a> <a href="#projectManagement-favna" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/almostSouji"><img src="https://avatars.githubusercontent.com/u/26532370?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Souji</b></sub></a><br /><a href="https://github.com/sapphiredev/resource-webhooks/commits?author=almostSouji" title="Code">💻</a></td>
    <td align="center"><a href="https://ko-fi.com/crawltogo"><img src="https://avatars.githubusercontent.com/u/20760160?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Noel</b></sub></a><br /><a href="https://github.com/sapphiredev/resource-webhooks/commits?author=iCrawl" title="Code">💻</a></td>
    <td align="center"><a href="https://fyko.net/"><img src="https://avatars.githubusercontent.com/u/45381083?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Carter</b></sub></a><br /><a href="https://github.com/sapphiredev/resource-webhooks/commits?author=Fyko" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/papaia"><img src="https://avatars.githubusercontent.com/u/43409674?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Papaia</b></sub></a><br /><a href="https://github.com/sapphiredev/resource-webhooks/commits?author=papaia" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/anandre"><img src="https://avatars.githubusercontent.com/u/38661761?v=4?s=100" width="100px;" alt=""/><br /><sub><b>anandre</b></sub></a><br /><a href="https://github.com/sapphiredev/resource-webhooks/commits?author=anandre" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/NotSugden"><img src="https://avatars.githubusercontent.com/u/28943913?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sugden</b></sub></a><br /><a href="https://github.com/sapphiredev/resource-webhooks/commits?author=NotSugden" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/monbrey"><img src="https://avatars.githubusercontent.com/u/5294381?v=4?s=100" width="100px;" alt=""/><br /><sub><b>monbrey</b></sub></a><br /><a href="https://github.com/sapphiredev/resource-webhooks/commits?author=monbrey" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/apps/dependabot"><img src="https://avatars.githubusercontent.com/in/29110?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dependabot[bot]</b></sub></a><br /><a href="#maintenance-dependabot[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/apps/depfu"><img src="https://avatars.githubusercontent.com/in/715?v=4?s=100" width="100px;" alt=""/><br /><sub><b>depfu[bot]</b></sub></a><br /><a href="#maintenance-depfu[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/vladfrangu"><img src="https://avatars.githubusercontent.com/u/17960496?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vlad Frangu</b></sub></a><br /><a href="https://github.com/sapphiredev/resource-webhooks/commits?author=vladfrangu" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
