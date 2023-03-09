<template>
	<div class="modal">
		<div class="modal-box relative">
			<div>test</div>
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button type="button" class="btn btn-secndary" @click="handleClose">Cancel</button>
				<button type="button" class="btn btn-primary" @click="handleConfirm">Confirm</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Post } from '~~/lib/types/Post';

const emit = defineEmits(['close-modal']);
const props = defineProps<{ values: Post }>();

function handleClose() {
	emit('close-modal');
}

function handleConfirm() {
	console.log('test');
	console.log(JSON.stringify(props.values, null, 2));
	// handleClose();
}
</script>
