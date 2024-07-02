const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }
  
  // Verify the token
  jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // If token is valid, set decoded user information to request object
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
