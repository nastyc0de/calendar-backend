const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const {createUser, loginUser, revalidateToken} = require('../controllers/authController');
const { fieldValidator } = require('../middleware/field-validator');

router.post('/',
[
    // middleware
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
    fieldValidator

]
,loginUser)
router.post(
    '/new',
    [
        // middleware
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
        fieldValidator

    ], 
    createUser)

router.get('/renew', revalidateToken)
module.exports = router;