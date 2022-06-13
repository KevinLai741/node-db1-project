const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const checkAccountNameUnique = name => {
  return new Promise((resolve,reject)=>{
    db('accounts').where('name',name).first()
      .then(nameExists => nameExists ? reject() : resolve())
      .catch(()=>reject())
  }) 
}


const getById = id => {
  return db('accounts').where('id',id).first()
}

const create = account => {
  return db('accounts').insert(account)
}

const updateById = (id, account) => {
  return db('accounts').where('id',id).update(account)
}

const deleteById = id => {
  return db('accounts').where('id',id).delete()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  checkAccountNameUnique
}