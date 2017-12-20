function index(req, res) {
  res.json({
    message: 'Welcome to Talent Network!',
    documentation_url: 'https://github.com/AdamMenard/TalentNetwork',
    base_url: 'localhost:3000',
    endpoints: [
      {
        method: 'GET', path: '/api', description: 'Describes available endpoints'
      }
    ]
  });
}

module.exports = {
  index: index
}
