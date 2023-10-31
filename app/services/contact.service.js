const { ObjectId } = require("mongodb")

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts")
    }
    
    extractContactData(payload) {
        const contact = {
          name: payload.name,
          email: payload.email,
          address: payload.address,
          phone: payload.phone,
          favorite: payload.favorite,
        };
      
        // Xóa các trường không xác định (undefined)
        Object.keys(contact).forEach((key) => contact[key] === undefined && delete contact[key]);
      
        return contact;
      }
      
      async create(payload) {
        const contact = this.extractContactData(payload);
      
        const update = {
          $set: { favorite: contact.favorite === true },
        };
      
        const options = {
          returnOriginal: false,
          upsert: true,
        };
      
        try {
          const result = await this.Contact.findOneAndUpdate(contact, update, options);
          return result.value;
        } catch (error) {
          // Xử lý lỗi tạo liên hệ
          throw new Error("An error occurred while creating the contact");
        }
      }
        

    async find(filter) {
        const cursor = await this.Contact.find(filter)
        return cursor.toArray()
    }

    async findByName(name){
        return await this.Contact.find({
            name: { $regex: new RegExp(name), $option: "i"}
        })
    }

    async findById(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: "after" }
        );
        return result;
    }
    
    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async findFavorite() {
        return await this.find({ favorite: "true" });
    }

    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }


}

module.exports = ContactService