
const router = express.Router();
const authController = require('../controllers/authControllers')

//router for register api
router.route('/signup').post(authController.signup);
// router for login
router.route('/login').post(authController.login);
//forgot password
router.route('/forgotpassword').post(authController.forgotPassword);


module.exports = router;
