📦 We have yet another new plugin! 📦
_ _
We have released v1.0.0 of **@sapphire/plugin-pattern-commands**!
_ _
What is this plugin for?
_ _
With pattern commands you can define rules to which the bot may respond. For example if you want there to be an 85% chance that your bot to respond to messages that start with, or include, `postman` it can be as simple as this:
```typescript
import type { Message } from 'discord.js';
import { PatternCommand } from '@sapphire/plugin-pattern-commands';
import { ApplyOptions } from '@sapphire/decorators';
// _ _
export class WoofCommand extends PatternCommand {
	public constructor(context: PatternCommand.Context, options: PatternCommand.Options) {
		super(context, {
			...options,
			name: 'postman',
			chance: 85
		});
	}
// _ _
	public messageRun(message: Message) {
		message.reply('Woof!');
	}
}
```
_ _
For further reading you can go to:
-   The plugin on NPM: <https://www.npmjs.com/package/@sapphire/plugin-pattern-commands>
-   The source code on GitHub: <https://github.com/sapphiredev/plugins/tree/main/packages/pattern-commands>
-   The API documentation on our website: <https://www.sapphirejs.dev/docs/Documentation/api-plugins/modules/sapphire_plugin_pattern_commands>

**[@sapphire/plugin-scheduled-tasks v1.1.0](https://github.com/sapphiredev/plugin-scheduled-tasks/compare/v1.0.0...v1.1.0) has been released** ‼️
_ _
**_Features_**
_ _
⫸ The plugin now emits several events while attempting to run your scheduled task, which you can use for debugging/logging purposes. The events are as follows:
　⪢ `ScheduledTaskEvents.ScheduledTaskNotFound` / `scheduledTaskNotFound` - Emitted when the scheduled task could not be found.
　⪢ `ScheduledTaskEvents.ScheduledTaskRun` / `scheduledTaskRun` - Emitted just before the scheduled task is ran.
　⪢ `ScheduledTaskEvents.ScheduledTaskSuccess` / `scheduledTaskSuccess` - Emitted when the scheduled task ends successfully.
　⪢ `ScheduledTaskEvents.ScheduledTaskError` / `scheduledTaskError` - Emitted when the scheduled task throws an error.
　⪢ `ScheduledTaskEvents.ScheduledTaskFinished` / `scheduledTaskFinished` - Emitted when the scheduled task is finished.