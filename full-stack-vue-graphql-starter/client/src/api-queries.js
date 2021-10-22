import { gql } from "apollo-boost";

/** Posts Queries */
export const GET_POST = gql`
  query {
    getPosts {
      _id
      title
      imageUrl
      description
      likes
    }
  }
`;
/** Users Queries */

/** Posts Mutations */

/** User Mutations */

export const CREATE_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUpUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const USER_LOGIN = gql`
  mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      token
    }
  }
`;
