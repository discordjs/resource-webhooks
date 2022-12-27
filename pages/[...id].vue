<template>
	<section class="body-font">
		<div class="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
			<div class="lg:flex-grow md:w-full lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
				<h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-gray-100">About me</h1>

				<p class="mb-8 leading-relaxed">
					Greetings, My name is Jeroen Claassens (a.k.a. <span title="My online alias!">Favna</span>) and I manage
					<text-link href="https://github.com/favware" text="Favware" />
				</p>
				<p class="mb-8 leading-relaxed">
					Currently {{ age }} years old I am a developer hailing from The Netherlands. I have been a tech enthusiast for as long as I can
					remember. While attending high school my first choice of optional subjects was Informatics and this quickly showed to be my
					calling. After I graduated from high school I had no seconds thoughts about my next step - Software Engineering at a university.
					The university of choice ended up being The Hague University of Applied Sciences. After 5 years attending this university I
					obtained my Bachelor of IT in the summer of 2019. At the time of writing I am working for
					<text-link href="https://www.cgi.com/nl/nl" text="CGI inc." />
					in The Netherlands as a Full-Stack Software Engineer. This includes frontend, backend and DevOps work.
				</p>
				<p class="mb-8 leading-relaxed">
					In my free time I have delved into a whole slew of small to large projects and some of these are used very actively! Notable
					mentions are my work on the
					<text-link href="https://sapphirejs.dev" text="Sapphire Discord bot framework and JavaScript utilities" />, the
					<text-link href="https://github.com/favware/dragonite" text="Dragonite Discord bot" /> and my
					<text-link href="https://redirect.favware.tech/graphqlpokemon" text="Pokémon API" />. For my other work I implore you to check out
					<text-link href="https://redirect.favware.tech/github" text="my GitHub profile" />.
				</p>
				<p class="mb-8 leading-relaxed">
					Outside of programming I enjoy playing video games, primarily action/adventure. I have a lot of love for Ubisoft's Assassin's
					Creed series. I also love consuming audiobooks and my favourite author is Brandon Sanderson. I absolutely adore his Cosmere
					universe. I also enjoy reading the Harry Potter franchise and I tend to re-listen to the series every few years. Overall I have a
					huge weak spot for most anything fantasy. From time to time I also play Dungeons & Dragons with my friends where I use my love for
					fantasy to go on epic table top adventures.
				</p>

				<div class="w-full mb-1 flex flex-wrap justify-center">
					<button-link type="email" href="mailto:support@favware.tech" text="Send an e-mail" class="mb-2 lg:mb-0" />
					<button-link type="discord" href="https://join.favware.tech" text="Join my Discord server" class="mb-2 lg:mb-0" />
					<button-link type="github" href="https://redirect.favware.tech/github" text="Find me on GitHub" class="mb-2 lg:mb-0" />
				</div>

				<div class="w-full flex flex-wrap justify-center">
					<button-link type="linkedin" href="https://redirect.favware.tech/linkedin" text="Visit my LinkedIn" class="mb-2 lg:mb-0" />
					<button-link type="twitter" href="https://redirect.favware.tech/twitter" text="Follow me on Twitter" class="mb-2 lg:mb-0" />
					<button-link type="facebook" href="https://redirect.favware.tech/facebook" text="Message on Facebook" class="mb-2 lg:mb-0" />
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
function calculateAge(birthday: Date) {
	const ageDifMs = Date.now() - birthday.getTime();
	const ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const age = calculateAge(new Date('1995-02-21'));
</script>
