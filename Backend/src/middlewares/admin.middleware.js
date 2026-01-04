import AppError from "../utils/AppError.js";

export default function isAdmin(req, res, next) {
    if (!req.user) {
        return next(new AppError('Not Authenticated', 401))
    }
    if (req.user.role !== 'admin') {
        return next(new AppError('Access Denied (Admin Only)', 403))
    }
    next()
}