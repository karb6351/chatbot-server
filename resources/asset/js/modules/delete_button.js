import axios from 'axios';
import jquery from 'jquery';
import swal from 'sweetalert';

export default function initDeleteButton() {
	$(document).ready(function() {
		$('.delete-button').each(function(index) {
			const href = $(this).data('href');
			$(this).click(function() {
				swal({
					title: 'Are you sure?',
					text: 'Are you sure to delete this item?',
					icon: 'warning',
					dangerMode: true,
					buttons: true,
				}).then((willDelete) => {
					if (willDelete) {
						axios
							.delete(href)
							.then((response) => {
								console.log(response);
								window.location.reload();
							})
							.catch((error) => {
								console.error(error);
							});
					}
				});
			});
		});
	});
}
