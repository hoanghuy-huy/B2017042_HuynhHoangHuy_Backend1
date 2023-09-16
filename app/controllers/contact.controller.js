

exports.create = (req, res) => {
    res.send({ message: "Create handler"});
}

exports.findAll = ( req, res) => {
    res.send({ message: "findAll handler"})
}

exports.findOne = (req, res) => {
    res.send({ message: "findOne handler"})
}

exports.update = (req, res) => {
    res.send({ masage: "update handler"})
}

exports.delete = (req, res) => {
    res.send({ massage: "delete handler"})
}

exports.deleteAll = (req, res) => {
    res.send({ massage: "deleteAll handler"})
}

exports.findAllFavorite = (req, res) => {
    res.send({massage: "findAllFavorite handler"})
}

