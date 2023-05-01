import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BehaviorDocument } from '../../../models/behavior';

@Injectable()
export class BehaviorService {
  constructor(
    @InjectModel('Behavior')
    private readonly behaviorModel: Model<BehaviorDocument>,
  ) {}

  async list(request: Request): Promise<BehaviorDocument[]> {
    const { pageNumber: current, limit: toSend, query } = request.query;
    let page = 1;
    const limit = toSend || 20;
    const pageNumber = current || 1;
    if (+pageNumber !== 0) page = (+pageNumber - 1) * +limit;
    let findQuery: any;
    const date = new Date();
    if (query === 'today')
      findQuery = [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [{ $month: '$createdAt' }, { $month: date }],
                },
                {
                  $eq: [{ $year: '$createdAt' }, { $year: date }],
                },
                {
                  $eq: [{ $dayOfMonth: '$createdAt' }, { $dayOfMonth: date }],
                },
              ],
            },
          },
        },
        {
          $skip: page,
        },
        { $limit: limit },
      ];
    else if (query === 'week')
      findQuery = [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [{ $month: '$createdAt' }, { $month: date }],
                },
                {
                  $eq: [{ $year: '$createdAt' }, { $year: date }],
                },
                {
                  $eq: [{ $week: '$createdAt' }, { $week: date }],
                },
              ],
            },
          },
        },
        {
          $skip: page,
        },
        { $limit: limit },
      ];
    else if (query === 'month')
      findQuery = [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [{ $month: '$createdAt' }, { $month: date }],
                },
                {
                  $eq: [{ $year: '$createdAt' }, { $year: date }],
                },
              ],
            },
          },
        },
        {
          $skip: page,
        },
        { $limit: limit },
      ];

    const behaviors = await this.behaviorModel.aggregate(findQuery);

    return behaviors;
  }
  async create(request: Request): Promise<BehaviorDocument> {
    try {
      const body = request.body;
      const behavior = await this.behaviorModel.create(body);
      return behavior;
    } catch (error) {
      return error;
    }
  }
  async update(request: Request): Promise<any> {
    try {
      const body = request?.body;
      const { behaviorId } = request?.params;
      const behavior = await this.behaviorModel.findByIdAndUpdate(
        { _id: behaviorId },
        body,
        { new: true, returnOriginal: false },
      );
      if (behavior?._id) return behavior;
      else return null;
    } catch (error) {
      return error;
    }
  }
  async delete(request: Request): Promise<any> {
    try {
      const { behaviorId } = request?.params;
      const behavior = await this.behaviorModel.findByIdAndUpdate(
        { _id: behaviorId, isDeleted: false },
        { isDeleted: true },
        { new: true, returnOriginal: false },
      );
      if (behavior?._id) return behavior;
      else return null;
    } catch (error) {
      return error;
    }
  }
}
