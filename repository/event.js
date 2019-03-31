const Sequelize = require('sequelize');
const db = require('../models');

exports.findEventById = async (id) => {
  return await db.Event.findOne({
    where: { id },
    include: [
      {
        model: db.Restaurant,
        include: [
          {
            model: db.Food,
            as: 'food'
          }
        ]
      }
    ]
  })
}

exports.findNextEventById = async (id) => {
  const event = await db.Event.findOne({ where: { id } });
  const nextEvent = await db.Event.findOne({
    where: {
      route_id: event.route_id,
      order: {
        [Sequelize.Op.eq]: event.order + 1
      }
    },
    include: [
      {
        model: db.Restaurant,
        include: [
          {
            model: db.Food,
            as: 'food'
          }
        ]
      }
    ]
  })
  return nextEvent;
}