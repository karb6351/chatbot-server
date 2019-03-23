const Dropzone = require('dropzone');
import { saveArrayToField, getArrayFromField } from '../util';

Dropzone.autoDiscover = false;

class ImageDropzone {
	constructor(target, url, maxFiles, fieldName) {
    this.imagesField = `input[name=${fieldName}]`;
    const _this = this;
		$(target).dropzone({
			url: url,
			method: 'post',
			paramName: 'file',
      maxFiles: maxFiles,
      addRemoveLinks: true,
			init() {
				// successfully upload image
				this.on('success', (file, response) => {
					console.log(response);
					_this.addImageToField(response);
					// set the display filename and alt same as the file's name in server
					file.previewElement.querySelector('[data-dz-name]').innerHTML = response.name;
					file.previewElement.querySelector('[data-dz-thumbnail]').alt = response.name;
				});
				// failure upload image
				this.on('error', (file, response) => {
					console.log('Failure upload image -- error: ');
					console.log(response.message);
					// TODO: HERE SHOULD SHOW A ERROR MESSAGE
				});
				// remove image
				this.on('removedfile', (file) => {
					console.log(file);
					_this.removeImage(this, file);
				});

				// sync data to dropzone (When updating a product)
				_this.syncImageFromField(this);
			}
		});
	}

	/* add image data to array(hidden field) */
	addImageToField(image) {
		const list = getArrayFromField(this.imagesField);
		list.push(image);
		console.log('addImageToField -- list: ');
		console.log(list);
		saveArrayToField(this.imagesField, list);
	}

	/* delete image data from array(hidden field) */
	deleteImageFromField(image) {
		const list = getArrayFromField(this.imagesField);
		// filter the target image in array
		const newList = list.filter((item) => item.name !== image.name);
		console.log('deleteImageFromField -- newList: ');
		console.log(newList);
		saveArrayToField(this.imagesField, newList);
	}

	/* for display images  */
	syncImageFromField(dropzone) {
		const list = getArrayFromField(this.imagesField);
		list.forEach((item) => {
			item.dataURL = item.dataURL.replace('public', 'storage');
			this.addImageToDropzone(dropzone, item);
		});
	}

	/* make single images and the corresponding thumbnail */
	addImageToDropzone(dropzone, image) {
		dropzone.files.push(image);
		dropzone.emit('addedfile', image);
		// reference -- https://github.com/enyo/dropzone/issues/1587
		dropzone.createThumbnailFromUrl(
			image,
			dropzone.options.thumbnailWidth,
			dropzone.options.thumbnailHeight,
			dropzone.options.thumbnailMethod,
			true,
			(thumbnail) => {
				dropzone.emit('thumbnail', image, thumbnail);
				dropzone.emit('complete', image);
			}
		);
	}

	/* remove image => also remove image data in array when serve side is successfully delete image */
	removeImage(dropzone, file) {
		// get the display filename from the DOM for comparison
		const name = file.previewElement.querySelector('[data-dz-name]').innerHTML;
		const list = getArrayFromField(this.imagesField);
		const image = list.filter((item) => item.name === name)[0];
		this.deleteImageFromField(image);
	}
}

export default function initDropzone() {
	$(document).ready(function() {
		$('.dropzone').each(function(index) {
			const url = $(this).data('href');
			const maxFiles = $(this).data('maxFiles');
			const fieldName = $(this).prev('input').attr('name');
			new ImageDropzone(this, url, maxFiles, fieldName);
		});
	});
}
