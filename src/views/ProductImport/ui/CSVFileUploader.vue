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
import { StatusCodes } from 'http-status-codes';

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
		async fetchPresignedS3Url(url: string, fileName: string) {
			const authorization_token = localStorage.getItem('authorization_token');
			try {
				return await axios({
					method: 'GET',
					url,
					params: {
						name: encodeURIComponent(fileName),
					},
					headers: {
						Authorization: `Basic ${authorization_token}`,
					},
				});
			} catch (error) {
				switch (error?.response?.status) {
					case StatusCodes.BAD_REQUEST:
						this.showSnackbarMessage(error?.response?.data?.data);
						break;

					case StatusCodes.UNAUTHORIZED:
						this.showSnackbarMessage(error?.response?.data?.message);
						break;

					case StatusCodes.FORBIDDEN:
						this.showSnackbarMessage(error?.response?.data?.message);
						break;
				}
				console.log(error?.response);
			}
		},
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
		async uploadFileBy(url: string, file: File) {
			const destUrl = await this.fetchPresignedS3Url(url, file.name);
			// save
			let result;
			if (destUrl) {
				console.info('Uploading to: ', destUrl.data);
				result = await fetch(destUrl.data, {
					method: 'PUT',
					headers: {
						'Content-Type': 'text/csv',
					},
					body: file,
				});
			}
			console.info('Result: ', result);
			return result;
		},
		showSnackbarMessage(msg: string): void {
			if (msg.length > 0) this.toggleSnackbarMessage({ show: true, msg });
		},
		async uploadFile() {
			this.showUploadingStatus();

			try {
				await this.uploadFileBy(this.url, this.file as File);
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
