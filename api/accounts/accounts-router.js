const router = require('express').Router()
const db = require('./accounts-model')

const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique
} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
   db.getAll()
    .then(all=>res.json(all))
    .catch(e=>next(e))
})

router.get('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params
  res.json(req.account)  
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  db.create(req.body)
    .then(created=>res.status(201).json({...req.body,message:'here'}))
    .catch(e=>next(e))
})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  const { id } = req.params
  db.updateById(id,req.body)
    .then(updated=>res.json({...req.account,...req.body}))  
    .catch(e=>next(e))
  });

router.delete('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params
  db.deleteById(id)
    .then(deleted=>res.json(req.account))
    .catch(e=>next(e))
})

router.use((err, req, res, next) => { // eslint-disable-line
  if(!err?.message || !err?.status) return res.status(500).json({message:"internal server error"})
  res.status(err.status).json({message:err.message})
})

module.exports = router;