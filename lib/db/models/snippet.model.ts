import { Schema, Document, model, models } from "mongoose";

export interface ISnippet extends Document {
    _id: string,
    clerkUserId: string;
    title: string;
    language: string;
    code: string;
    description?: string;
    tags?: string[];
    createdAt: Date;
}

const SnippetSchema = new Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Snippet = models.Snippet || model("Snippet", SnippetSchema);

export default Snippet
