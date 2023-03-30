import type { ToastProps } from 'tailvue';

export const defaultToastProps: ToastProps = {
	timeout: 10,
	pauseOnHover: true
};

export const successfullyPostedMessage = 'Successfully posted Webhook message!';
export const failedToPostMessage =
	'Failed to post Webhook message, validate your input and/or check the dev console for more details. Make sure you have no browser extensions that are blocking discord.com, i.e. Privacy Badger';
