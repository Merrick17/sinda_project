const router = require('express').Router()
const formationCtrl = require('../controllers/formationCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')




router.route('/formation')
    .get(formationCtrl.getformations)
    .post(auth, authAdmin, formationCtrl.createFormation)
router.route('/formation/:id')
    .delete(auth, authAdmin, formationCtrl.deleteFormation)
    .put(auth, authAdmin, formationCtrl.updateFormation)

  





module.exports = router