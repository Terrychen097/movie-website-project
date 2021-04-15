

const httpProcessing = ((req, res, next) => {
    if (req.query.method === "put") {
        req.method = "PUT";
    } else if (req.query.method === "delete") {
        req.method = "DELETE";
    }
    next();
});


module.exports = httpProcessing;