import { Schema, model, models, Document } from 'mongoose';

interface IPrayer extends Document {
    userId: string;
    dateCreated: Date;
    prayerSelections: {
        dateStart: Date;
        dateEnd: Date;
        prayers: {
            officeReadings?: boolean[];
            lauds?: boolean[];
            vespers?: boolean[];
            terce?: boolean[];
            sext?: boolean[];
            none?: boolean[];
            compline?: boolean[];
            rosary?: boolean[];
            gospel?: boolean[];
            saint?: boolean[];
        };
        completed: boolean[];
    };
}

const prayerSchema = new Schema<IPrayer>({
    userId: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true,
    },
    prayerSelections: {
        dateStart: {
            type: Date,
            required: true,
        },
        dateEnd: {
            type: Date,
            required: true,
        },
        prayers: {
            officeReadings: {
                type: [Boolean],
                required: false,
            },
            lauds: {
                type: [Boolean],
                required: false,
            },
            vespers: {
                type: [Boolean],
                required: false,
            },
            terce: {
                type: [Boolean],
                required: false,
            },
            sext: {
                type: [Boolean],
                required: false,
            },
            none: {
                type: [Boolean],
                required: false,
            },
            compline: {
                type: [Boolean],
                required: false,
            },
            rosary: {
                type: [Boolean],
                required: false,
            },
            gospel: {
                type: [Boolean],
                required: false,
            },
            saint: {
                type: [Boolean],
                required: false,
            },
        },
        completed: {
            type: [Boolean],
            required: true,
            default: [],
        },
    },
}, { timestamps: true });

const Prayer = models.Prayer || model<IPrayer>('Prayer', prayerSchema);

export default Prayer;
