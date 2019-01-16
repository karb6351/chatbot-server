exports.SUCCESS = 'is-success';
exports.ERROR = 'is-danger';
exports.INFO = 'is-info';

exports.addFlashMessage = (req, type, message) => {
	req.flash('flash_message', {
		type,
    message
	});
};
