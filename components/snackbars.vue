<template>
	<div class="toast toast-top toast-end">
		<div v-for="snackbar in snackbarStore.snackbars" :key="snackbar.id">
			<div
				class="alert shadow-lg justify-start"
				:class="{
					'alert-info': snackbar.severity === 'info',
					'alert-success': snackbar.severity === 'success',
					'alert-warning': snackbar.severity === 'warning',
					'alert-error': snackbar.severity === 'error'
				}"
			>
				<button @click="dismissSnackbar(snackbar)">
					<snackbar-icon-info v-if="snackbar.severity === 'info'" />
					<snackbar-icon-success v-if="snackbar.severity === 'success'" />
					<snackbar-icon-warning v-if="snackbar.severity === 'warning'" />
					<snackbar-icon-error v-if="snackbar.severity === 'error'" />
				</button>
				<span>{{ snackbar.message }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Snackbar } from '~~/stores/snackbars';

const snackbarStore = useSnackbars();

function dismissSnackbar(snackbar: Snackbar) {
	snackbarStore.removeSnackbar(snackbar.id!);
}
</script>
