module.exports = mongoose => {
    var LocationSchema = mongoose.Schema({
        country: String,
        city: String,
        state: String
    });

    var CollegeSchema = mongoose.Schema(
        {
            name: String,
            year_founded: Number,
            location: LocationSchema,
            ratings: String,
            courses: [String],
            students:[
                { type: mongoose.Schema.Types.ObjectId, ref: 'student' }
            ]
        },
        { timestamps: true }
    );

    CollegeSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const CollegeModel = mongoose.model("college", CollegeSchema);
    return CollegeModel;
};