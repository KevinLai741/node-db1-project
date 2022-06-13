const db = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // req.body = {...req?.account,...req.body}
  req.body.name = req.body?.name?.trim()
  const {name,budget} = req.body
  if(!name || typeof budget === 'undefined')return next({status:400,message:'name and budget are required'})
  if(name.length < 3 || name.length > 100) return next({status:400,message:'name of account must be between 3 and 100'})
  if(!Number(budget) || Number(budget) == NaN) return next({status:400,message:'budget of account must be a number'})
  if(Number(budget) < 0 || Number(budget) > 1000000) return next({status:400,message:'budget of account is too large or too small'})
  next(); 
}

// only call on post
exports.checkAccountNameUnique = (req, res, next) => {
  if(!req?.body?.name) return next({status:400,message:'name is a required field'})
  db.checkAccountNameUnique(req.body.name)
    .then(()=>next())
    .catch(()=>next({status:400,message:'that name is taken'}))
}


exports.checkAccountId = (req, res, next) => {
  db.getById(req.params.id)
    .then(account=>{
      if(!account) return next({status:404,message:'account not found'}) 
      req.account = account
      next()
    })
    .catch(e=>next({status:404,message:'account not found'}))
}
