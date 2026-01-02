import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/key.js';






export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: err });
    req.user = decoded; // attach user info
    next();
  });
}