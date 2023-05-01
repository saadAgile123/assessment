import { Module } from '@nestjs/common';
import { BehaviorController } from './behavior.controller';
import { BehaviorService } from './behavior.service';
import { Behavior, BehaviorSchema } from '../../../models/behavior';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Behavior.name, schema: BehaviorSchema },
    ]),
  ],
  controllers: [BehaviorController],
  providers: [BehaviorService, Behavior],
  exports: [BehaviorService],
})
export class BehaviorModule {}
