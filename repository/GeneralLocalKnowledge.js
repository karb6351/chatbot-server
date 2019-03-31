const db = require('../models');

exports.getAllGeneralLocalKnowledge = async () => {
  return await db.GeneralLocalKnowledge.findAll()
}