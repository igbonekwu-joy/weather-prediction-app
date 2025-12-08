module.exports = function (err, req, res, next) {
    res
        .status(parseInt(err.response?.data.cod))
        .json({ 
            error: err.response?.data.message 
        });
}