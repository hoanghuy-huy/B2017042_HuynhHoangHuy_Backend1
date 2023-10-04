const ApiError = require("../api-error")
const ContactService = require("../services/contact.service")
const MongoDB = require("../utils/mongodb.util")



exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name cannot be empty"));
  }
  try {
    const contactService = new ContactService(MongoDB.client)
    const doc = await contactService.create(req.body)
    return res.send(doc);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while creating the contact"));
  }
};

  
exports.findAll = async( req, res, next) => {
    let documents = []
    
    try {
        const contactService = new ContactService(MongoDB.client)
        const { name } = req.query
        if(name) {
            documents = await contactService.findByName(name)
        }else {
            documents = await contactService.find({})
        }
    } catch (error) {
        return next(
            new ApiError(500, " An error occurred while retrieving the contact")
        )
    }
    return res.send(documents)
   
}

exports.findOne = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.findById(req.params.id)
        if(!document) {
            return next(new ApiError(404, "contact not found"))
        }
        return res.send(document)
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
        )
    }
}

exports.update =async (req, res, next) => {
    if(Object.keys(req.body).length===0){
        return  next(new ApiError(400, "Data to update can not be empty"))
    }

    try {
        console.log(req.body,id)
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.update(req.params.id,req.body)
        if(!document) {
            res.send("Loi")
        }
        return res.send({ massage: "Contact was updated successfully"})
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        )
    }
}

exports.delete = async(req, res, next) => {
    try {

        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.delete(req.params.id)
        if(!document) {
            return res.send({ massage: "Contact was deleted successfully"})
        }
        

    } catch (error) {
        return next(
            new ApiError(500, `Error delete contact with id=${req.params.id}`)
        )
    }
}

exports.findAllFavorite = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client)
        console.log(req.body.name,"favorite")
        const documents = await contactService.findFavorite()
        return res.send(documents)
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving favorite contacts")
        )
    }
}

exports.deleteAll = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client)
        const deletedCount = await contactService.deleteAll()
        return res.send({
            massage:`${deletedCount} contacts ware deleted successfully`
        })
    } catch (error) {
        return next(
            new ApiError(500, "An occurred while removing all contacts")
        )
    }
}



