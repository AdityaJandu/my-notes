import mongoose from "mongoose";

// Step 1: Create a schema
// Step 2: Model based off of that schema

const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

    },
    { timestamps: true } // CREATED AT OR UPDATED AT => By default provided by MONGODB.
);


const Note = mongoose.model("Note", noteSchema);

export default Note;