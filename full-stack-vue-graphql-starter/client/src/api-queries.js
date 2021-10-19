import { gql } from "apollo-boost";

/** Posts Queries */
export const GET_POST = {
  query: gql`
    query {
      getPosts {
        _id
        title
        imageUrl
        description
        likes
      }
    }
  `,
};

/** Users Queries */

/** Posts Mutations */

/** User Mutations */
