const db = require('../models');

exports.findRouteById = async (id) => {
  return await db.Route.findOne({
    where: { id },
    include: [
      {
        model: db.Event,
        as: 'event',
        where: {
          type: 'restaurant'
        },
        order: [['order', 'ASC']],
        include: [
          {
            model: db.Restaurant
          }
        ]
      }
    ]
  })
}