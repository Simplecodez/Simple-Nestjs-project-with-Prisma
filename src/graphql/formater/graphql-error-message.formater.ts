import { GraphQLError, GraphQLFormattedError } from 'graphql';

export class GraphQLErrorFormat {
  static formatError(error: GraphQLError): GraphQLFormattedError {
    return {
      message: error.message,
      extensions: {
        code: error.extensions.code,
        response: error.extensions.originalError,
      },
      path: error.path,
    };
  }
}
