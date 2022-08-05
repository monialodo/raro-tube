import { jwt } from 'jsonwebtoken';
import { Role } from '../@types/middlewares/role';

export const authorizeMiddleware = () => {
    const roles: Role = {
        Admin: 'Admin',
        Student: 'Student',
        Teacher: 'Teacher',
    };

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
        // authorize user against roles
        (req, res, next) => {
            if (roles === (req.user.role)) {
                next();
            } else {
                res.status(401).json({ errorCode: 'Unauthorized' });
            }
        }
    ];
}