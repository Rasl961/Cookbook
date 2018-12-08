module.exports.profile = function (req, res) {
  res.status(200).json({
    profile: 'profile from controller'
  })
}
