const {Router} = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { validateJWT } = require('../middleware/jwt-validator');

const router = Router();
router.use(validateJWT);

router.get('/', getEvents);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;