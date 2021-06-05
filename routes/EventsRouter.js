const router = require('express').Router()

const { event_get, event_delete, event_post, event_put } = require('../controllers/EventController')

router.get('/', event_get)

router.post('/', event_post)

router.put('/:id', event_put)

router.delete('/:id', event_delete)

module.exports = router