<template>
	<div>
		<v-form class="my-4" @submit.prevent="uploadFile">
			<v-file-input
				v-model="file"
				:loading="isUploading"
				:placeholder="$t('common.uploadYourFiles')"
				:label="$t('common.attachYourFiles')"
				accept=".csv"
				show-size
				prepend-icon="mdi-paperclip"
			>
				<template v-slot:selection="{ text }">
					<v-chip label color="">
						{{ text }}
					</v-chip>
				</template>
			</v-file-input>

			<div class="my-2" v-if="file">
				<v-btn class="mr-1" type="submit" color="primary" small>
					{{ $t('common.uploadFile') }}
				</v-btn>

				<v-btn class="ml-1" color="error" small @click="resetFile">
					{{ $t('common.removeFile') }}
				</v-btn>
			</div>
		</v-form>

		<v-snackbar v-model="errorSnackbar" timeout="7000">
			<p class="my-0 font-weight-medium" v-html="snackbarMessage"></p>

			<p class="my-0 text-caption font-weight-light">
				{{ $t('errorMessage.checkDevLogs') }}
			</p>

			<template v-slot:action="{ attrs }">
				<v-btn color="pink" text v-bind="attrs" @click="errorSnackbar = false">
					{{ $t('common.close') }}
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import axios from 'axios';

const fetchPresignedS3Url = (url: string, fileName: string) => {
	return axios({
		method: 'GET',
		url,
		params: {
			name: encodeURIComponent(fileName),
		},
	});
};

const uploadFileBy = async (url: string, file: File) => {
	const destUrl = await fetchPresignedS3Url(url, file.name);

	console.info('Uploading to: ', destUrl.data);

	// save
	const result = await fetch(destUrl.data, {
		method: 'PUT',
		body: file,
	});

	console.info('Result: ', result);

	return result;
};

type Data = {
	file: File | null;
	isUploading: boolean;
	errorSnackbar: boolean;
	snackbarMessage: string;
};

export default Vue.extend({
	name: 'CSVFileUploader',
	props: {
		url: String,
	},
	data(): Data {
		return {
			file: null,
			isUploading: false,
			//
			errorSnackbar: false,
			snackbarMessage: '',
		};
	},
	methods: {
		showUploadingStatus() {
			this.isUploading = true;
		},
		hideUploadingStatus() {
			this.isUploading = false;
		},
		toggleSnackbarMessage({ show, msg }: { show: boolean; msg: string }) {
			this.errorSnackbar = show;
			this.snackbarMessage = msg;
		},
		showSnackbarMessage(msg: string) {
			this.toggleSnackbarMessage({ show: true, msg });
		},
		async uploadFile() {
			this.showUploadingStatus();

			try {
				await uploadFileBy(this.url, this.file as File);
			} catch (e) {
				const msg = this.$t('errorMessage.cantUploadFile', {
					reason: e.message,
				});

				this.showSnackbarMessage(msg.toString());
			} finally {
				this.resetFile();
				this.hideUploadingStatus();
			}
		},
		resetFile() {
			this.file = null;
		},
	},
});
</script>
