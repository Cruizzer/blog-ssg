import { Schema, model, models, Document, Types } from 'mongoose';

interface IPrayer extends Document {
    userId: string;
    dateCreated: Date;
    prayerSelections: {
        dateStart: Date;
        dateEnd: Date;
        prayers: {
            officeReadings: boolean;
            lauds: boolean;
            vespers: boolean;
            terce: boolean;
            sext: boolean;
            none: boolean;
            compline: boolean;
            rosary: boolean;
            gospel: boolean;
            saint: boolean;
        };
    }[];
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
    prayerSelections: [
        {
            dateStart: {
                type: Date,
                required: true,
            },
            dateEnd: {
                type: Date,
                required: true,
                validate: {
                    validator: function (value: Date) {
                        return this.get('dateStart') <= value;
                    },
                    message: 'dateEnd must be greater than or equal to dateStart',
                },
            },
            prayers: {
                officeReadings: { type: Boolean, default: false },
                lauds: { type: Boolean, default: false },
                vespers: { type: Boolean, default: false },
                terce: { type: Boolean, default: false },
                sext: { type: Boolean, default: false },
                none: { type: Boolean, default: false },
                compline: { type: Boolean, default: false },
                rosary: { type: Boolean, default: false },
                gospel: { type: Boolean, default: false },
                saint: { type: Boolean, default: false },
            },
        },
    ],
}, { timestamps: true });

const Prayer = models.Prayer || model<IPrayer>('Prayer', prayerSchema);

export default Prayer;
