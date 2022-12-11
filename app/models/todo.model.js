const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
            {
                title: String,
                description: String,
                date_due: Date,
                status: Boolean
            },
            { timestamps: true }
    );

    //this section helps with frontend object mapping
    Schema.method("toJSON", function() {
        const {__v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Todo = mongoose.model("todo", schema);
    return Todo;
};