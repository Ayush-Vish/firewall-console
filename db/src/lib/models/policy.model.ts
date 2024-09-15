import mongoose, { Schema, Document } from 'mongoose';

// Interface for Policy Document
export interface IPolicy extends Document {
    nodeId: mongoose.Schema.Types.ObjectId;
    name: string;
    rules: {
        sourceIp?: string;
        destinationIp?: string;
        protocol?: string;
        port?: number;
        action: 'allow' | 'deny' | 'log';
    }[];
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}

const PolicySchema: Schema = new Schema(
    {
        nodeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Node',
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        rules: [
            {
                sourceIp: { type: String },
                destinationIp: { type: String },
                protocol: { type: String, enum: ['TCP', 'UDP', 'ICMP', 'ANY'], default: 'ANY' },
                port: { type: Number },
                action: {
                    type: String,
                    enum: ['allow', 'deny', 'log'],
                    required: true,
                },
            },
        ],
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    {
        timestamps: true, 
    }
);

export const Policy = mongoose.model<IPolicy>('Policy', PolicySchema);

