export const requireRole =
(...roles) =>
(req, res, next) => {

    if (
        !roles.includes(
            req.workspaceMember.role
        )
    ){
        return res.status(403).json({
            success:false,
            message:"Permission denied"
        });
    }

    next();
};