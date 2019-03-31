const Sequelize = require('sequelize');
const util = require('../../helpers/util');

const db = require('../../models');

exports.index = (req, res) => {
	db.GeneralLocalKnowledge.findAll()
		.then((generallocalknowledges) => {
			res.render('pages/generallocalknowledges/index', {
				generallocalknowledges: generallocalknowledges
			});
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({
				status: false,
				message: error.message
			});
		});
};

exports.getById = (req, res) => {
	const { id } = req.params;
	db.GeneralLocalKnowledge.findOne({
		where: {
			id
		}
	})
		.then((restaurants) => {
			res.status(200).json({
				generallocalknowledges: generallocalknowledges,
				status: true
			});
		})
		.catch((error) => {
			res.status(500).json({
				status: false,
				message: error.message
			});
		});
};

exports.create = async (req, res) => {
	res.render('pages/generallocalknowledges/create', {
		generallocalknowledge: null,
	});
};

exports.save = async (req, res) => {
	const { name, reminder, location } = req.body;
	try{
		const generallocalknowledge = await db.GeneralLocalKnowledge.create({ name, reminder, location });
		res.redirect('/generallocalknowledge');
	}catch(error){
		console.log(error)
		res.redirect('/generallocalknowledge');
	}
};

exports.edit = async (req, res) => {
	const { id } = req.params;
	const generallocalknowledge = await db.GeneralLocalKnowledge.findOne({
		where: {
			id: id
		}
	});
	res.render('pages/generallocalknowledges/update', {
		generallocalknowledge: generallocalknowledge,
	});
};

exports.update = async (req, res) => {
	const { name, reminder, location } = req.body;
	const { id } = req.params;
	try{
		const generallocalknowledge = await db.GeneralLocalKnowledge.update(
			{
				reminder, location
			},
			{
				where: {
					id
				}
			}
		);
	}catch(error){
		console.log(error);
	}
	res.redirect('/generallocalknowledge');
};

exports.delete = async (req, res) => {
	const { id } = req.params;
	try{
		const generallocalknowledge = await db.GeneralLocalKnowledge.destroy({
			where: {
				id
			}
		});
		res.status(200).json({
			generallocalknowledge: generallocalknowledge,
			status: true
		});
	}catch(error){
		res.status(500).json({
			status: false,
			message: error.message
		});
	}
};
