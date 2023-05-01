import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BehaviorDocument = Behavior & Document;

@Schema()
export class Behavior {
  @Prop({ type: String })
  name: {
    type: string;
    default: '';
    required: false;
  };

  @Prop({ type: String })
  description: {
    type: string;
    default: '';
    required: false;
  };
  @Prop({ type: Boolean })
  isDeleted: {
    type: boolean;
    default: false;
    required: true;
  };
}

export const BehaviorSchema = SchemaFactory.createForClass(Behavior);
