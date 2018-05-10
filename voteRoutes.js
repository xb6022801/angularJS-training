var express = require('express'),
    router = express.Router(),
    fs = require('fs')

var saveParticipUser = function(req, res) {
  var userJsonPath = './build/static/data/participUsers.json'
  if (!fs.existsSync(userJsonPath)) {
    res.send({
      error: 'file not exist'
    })
  } else {
    fs.writeFile(userJsonPath, JSON.stringify(req.body.voteDetail, 0, 4),
    'utf-8', (err, data) => {
      if (err) {
        res.send({ error: err })
      } else {
        res.send({ message: 'saved successfully' })
      }
     }
    )
  }
}

router.post('/saveParticipUser', saveParticipUser)

module.exports = router