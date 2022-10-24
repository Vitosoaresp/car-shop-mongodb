export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  InvalidLengthId = 'InvalidLengthId',
  InvalidBody = 'InvalidBody',
}

type ErrorResponseObject = {
  message: string;
  httpStatus: number;
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject;
};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Object not found',
    httpStatus: 404,
  },
  InvalidLengthId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  InvalidBody: {
    message: 'the body cannot be empty',
    httpStatus: 400,
  },
};
