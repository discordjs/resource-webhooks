/**
 * Copyright 2021 Noel Buechler
 * Copyright 2021 Vlad Frangu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Formats the content into bold text
 *
 * @param content - The content to wrap
 */
export function bold<C extends string>(content: C): `**${C}**` {
	return `**${content}**`;
}

/**
 * Formats a role ID into a role mention
 *
 * @param roleId - The role ID to format
 */
export function roleMention<C extends string>(roleId: C): `<@&${C}>` {
	return `<@&${roleId}>`;
}
