import { Schema, model, models } from "mongoose";



const SnippetSchema = new Schema({
    clerkUserId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Snippet = models.Snippet || model("Snippet", SnippetSchema);

export default Snippet
