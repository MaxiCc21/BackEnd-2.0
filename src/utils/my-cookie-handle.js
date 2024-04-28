 function CleanCookie(req, res, cookieName) {
    if (req.cookies[cookieName]) {
        console.log("Cookie eliminada con éxito");
        res.clearCookie(cookieName);
    } else {
        console.log("La cookie no existe");
    }
}

module.exports = { CleanCookie };