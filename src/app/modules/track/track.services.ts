import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { trackSearchableFields } from './track.constant';
import { ITrack, ITrackFilters } from './track.interface';
import { Track } from './track.model';

const createTrackToDB = async (
  track: ITrack,
  userId: string
): Promise<ITrack> => {
  track.user = userId;

  const book = await Track.findOne({ book: track.book, user: userId });

  if (!book) {
    const createTrack = (
      await (await Track.create(track)).populate('book')
    ).populate('user');
    return createTrack;
  } else {
    throw new ApiError(`This book already in your track list`, 404);
  }
};

const deleteTrackFromDB = async (
  id: string,
  userId: string
): Promise<ITrack | null> => {
  const book = await Track.findOne({ _id: id, user: userId });

  if (!book) {
    throw new ApiError(
      `No Book found with this ID from your tracking books`,
      404
    );
  } else {
    const result = await Track.findByIdAndDelete(id);
    return result;
  }
};

const getAllTrackFromDB = async (
  filters: ITrackFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericPaginationResponse<ITrack[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filtersData,
    trackSearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Track.find(whereConditions)
    .populate('book')
    .populate('user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Track.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateTrackToDB = async (
  id: string,
  userId: string,
  updatedData: Partial<ITrack>
): Promise<ITrack | null | undefined> => {
  const book = await Track.findOne({ _id: id, user: userId });

  if (!book) {
    throw new ApiError(
      `No Book found with this ID from your track listed book`,
      404
    );
  } else {
    const result = await Track.findOneAndUpdate({ _id: id }, updatedData, {
      new: true,
    })
      .populate('book')
      .populate('user');

    return result;
  }
};

export const TrackServices = {
  createTrackToDB,
  getAllTrackFromDB,
  deleteTrackFromDB,
  updateTrackToDB,
};
