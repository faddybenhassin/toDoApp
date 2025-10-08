import jwt from 'jsonwebtoken'



const JWT_SECRET = 'my_super_secret_key_123!';


export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: err });
    req.username = decoded; // attach user info
    next();
  });
}