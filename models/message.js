const { Schema, model } = require("mongoose");

const MessageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    to: {
        type: String,
        ref: "User",
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
    type: {
        type: Number
    }
}, {
    timestamps: true,
});

MessageSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model("Message", MessageSchema);