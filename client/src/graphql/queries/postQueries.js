import { gql } from '@apollo/client'

export const GET_POSTS_BY_USER = gql`
query getUserPosts($userId: ID!){
    postListByUser(userId: $userId) {
        _id
        title
        description
        active
        createdOn
        updatedOn,
        user {
            _id
            firstName
            lastName
            email
        }

    }
  }
`;

export const GET_POSTS = gql`
query getPosts {
    posts {
        _id
        title
        description
        active
        createdOn
        updatedOn,
        user {
            _id
            firstName
            lastName
            email
        }
    }
  }
`;