module.exports = mongoose => {
    var StudentSchema = mongoose.Schema({
        name: String,
        year_of_batch: Number,
        skills: [String],
        collegeID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'college'
        },
    }, { timestamps: true });

    StudentSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const StudentModel = mongoose.model("student", StudentSchema);
    return StudentModel;
}