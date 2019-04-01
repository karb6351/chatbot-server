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

exports.findRoutes = async () => {
  return await db.Route.findAll({
    include: [
      {
        model: db.Event,
        as: 'event',
        order: [['order', 'asc']],
        include: [
          {
            model: db.Restaurant,
            include: [
              {
                model: db.Culture,
                as: 'culture'
              },
              {
                model: db.Food,
                as: 'food'
              },
            ]
          }
        ]
      }
    ]
  });
}