import { Schema, model, models } from 'mongoose'

const TabSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
})

const SnippetSchema = new Schema({
    clerkUserId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    highlightedLines: {
        type: [String],
    },
    tabs: {
        type: [TabSchema],
        required: true,
        validate: {
            validator: function (tabs: any) {
                return tabs.length > 0
            },
            message: 'At least one tab is required',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Snippet = models.Snippet || model('Snippet', SnippetSchema)

export default Snippet
