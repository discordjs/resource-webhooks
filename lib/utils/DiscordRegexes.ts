/**
 * Regex that captures the Webhook ID and token from a Discord Webhook URL.
 *
 * @license MIT
 * @copyright `2020` `The Sapphire Community and its contributors`
 * @see https://github.com/sapphiredev/utilities/blob/main/packages/discord-utilities/src/lib/regexes.ts#L145
 *
 * @raw `/(?<url>^https:\/\/(?:(?:canary|ptb).)?discord(?:app)?.com\/api(?:\/v\d+)?\/webhooks\/(?<id>\d+)\/(?<token>[\w-]+)\/?$)/`
 * @remark Capture group 1 is the full URL of the Discord Webhook. It is named `url`.
 * @remark Capture group 2 is the ID of the Discord Webhook. It is named `id`.
 * @remark Capture group 3 is the token of the Discord Webhook. It is named `token`.
 * @remark for regular HTTP URLs see {@link HttpUrlRegex}
 */
export const WebhookRegex = /(?<url>^https:\/\/(?:(?:canary|ptb).)?discord(?:app)?.com\/api(?:\/v\d+)?\/webhooks\/(?<id>\d+)\/(?<token>[\w-]+)\/?$)/;

/**
 * Regex that can capture any Discord Snowflake ID
 * @license MIT
 * @copyright `2020` `The Sapphire Community and its contributors`
 * @see https://github.com/sapphiredev/utilities/blob/main/packages/discord-utilities/src/lib/regexes.ts#L109
 *
 * @raw `/^(?<id>\d{17,20})$/`
 * @remark Capture group 1 is the Snowflake. It is named `id`.
 */
export const SnowflakeRegex = /^(?<id>\d{17,20})$/;
