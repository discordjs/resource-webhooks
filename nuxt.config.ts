import 'nuxt';

export default defineNuxtConfig({
	modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss', 'nuxt-monaco-editor', '@pinia/nuxt'],
	build: { transpile: ['vee-validate'] },
	ssr: false,
	typescript: {
		shim: false
	},
	imports: {
		dirs: ['lib/utils', 'stores']
	},
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'Webhook Dashboard',
			htmlAttrs: { lang: 'en_GB' },
			link: [
				{ rel: 'manifest', href: '/manifest.webmanifest' },
				{ rel: 'alternate', href: 'https://www.sapphirejs.dev' },
				{ rel: 'canonical', href: 'https://www.sapphirejs.dev' },
				{ rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png' },
				{ rel: 'apple-touch-startup-image', href: '/favicons/apple-startup.png' },
				{ rel: 'icon', href: '/favicons/android-chrome-192x192.png' },
				{ rel: 'icon', href: '/favicon.ico' },
				{ rel: 'icon', href: '/favicons/favicon-16x16.png' },
				{ rel: 'icon', href: '/favicons/android-chrome-192x192.png' },
				{ rel: 'icon', href: '/favicons/favicon-32x32.png' },
				{ rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg' },
				{ rel: 'shortcut icon', href: '/favicon.ico' }
			],
			meta: [
				{ name: 'viewport', content: 'width=device-width,initial-scale=1' },
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
				{ name: 'apple-mobile-web-app-title', content: 'Webhook Dashboard' },
				{ name: 'application-name', content: 'Webhook Dashboard' },
				{ name: 'audience', content: 'all' },
				{ name: 'author', content: 'Sapphire Community, contact@sapphirejs.dev' },
				{ name: 'coverage', content: 'Worldwide' },
				{ name: 'description', content: 'A webhooks UI to easily send announcements and messages to a Discord server' },
				{ name: 'designer', content: 'Sapphire Community, contact@sapphirejs.dev' },
				{ name: 'distribution', content: 'Global' },
				{ name: 'googlebot', content: 'index,follow' },
				{ name: 'HandheldFriendly', content: 'True' },
				{ name: 'identifier-URL', content: 'https://webhooks.sapphirejs.dev' },
				{ name: 'keywords', content: 'discord, webhooks, dashboard' },
				{ name: 'msapplication-config', content: '/browserconfig.xml' },
				{ name: 'msapplication-TileColor', content: '#23529B' },
				{ name: 'msapplication-TileImage', content: '/icons/mstile-144x144.png' },
				{ name: 'owner', content: 'Sapphire Community, contact@sapphirejs.dev' },
				{ name: 'rating', content: 'safe for kids' },
				{ name: 'reply-to', content: 'contact@sapphirejs.dev' },
				{ name: 'revisit-after', content: '7 days' },
				{ name: 'robots', content: 'archive,follow,imageindex,index,odp,snippet,translate' },
				{ name: 'shortlink', content: 'https://webhooks.sapphirejs.dev' },
				{ name: 'subject', content: 'A webhooks UI to easily send announcements and messages to a Discord server' },
				{ name: 'summary', content: 'A webhooks UI to easily send announcements and messages to a Discord server.' },
				{ name: 'target', content: 'all' },
				{ name: 'theme-color', content: '#23529B' },
				{ name: 'twitter:card', content: 'summary' },
				{ name: 'twitter:creator', content: '@Favna_' },
				{ name: 'twitter:image', content: 'https://www.sapphirejs.dev/icons/opengraph.png' },
				{ name: 'twitter:site', content: '@Favna_' },
				{ name: 'url', content: 'https://webhooks.sapphirejs.dev' },
				{ property: 'og:description', content: 'A webhooks UI to easily send announcements and messages to a Discord server' },
				{ property: 'og:email', content: 'contact@sapphirejs.dev' },
				{ property: 'og:image:alt', content: 'OpenGraphImage' },
				{ property: 'og:image:height', content: '512' },
				{ property: 'og:image:width', content: '1024' },
				{ property: 'og:image', content: 'https://www.sapphirejs.dev/icons/opengraph.png' },
				{ property: 'og:locale', content: 'en_US' },
				{ property: 'og:site_name', content: 'Webhook Dashboard' },
				{ property: 'og:title', content: 'Home | Sapphire' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: 'https://webhooks.sapphirejs.dev' }
			]
		}
	}
});
