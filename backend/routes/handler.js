const express = require('express');
const router = express.Router();

router.get('/movies', (req, res) => {
    const str = [{
    "name": "Tomi",
    "msg": "Cool movie",
    "score": "8.6"
}];
res.end(JSON.stringify(str));
});

module.exports = router;