const _ = require('underscore')
const guestPath = ['/login']

const authentication = (req, res, next) => {
  // for guest
  if (_.contains(guestPath, req.path)){
    if (req.session.username){
      return res.redirect('/home')
    }else{
      next()
    }
  }else{
    // for authenticated user
    if (req.session.username === undefined || !req.session.username){
      return res.redirect('/login')
    }else{
      next()
    }
  }
  
}

module.exports = authentication