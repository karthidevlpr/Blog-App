import {gql} from "apollo-server-express"

const typeDefs = gql`

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    createdOn: String!
  }

  type Post {
    _id: ID!
    title: String!
    description: String!
    active: Boolean!
    createdOn: String!
    updatedOn: String!
    user: User!
    
  }

  type Query {
    postListByUser(userId: ID!): [Post!]!
    posts: [Post!]!
  }

  type Mutation {
    deletePost(id: ID!): Post
  }
  `;

export default typeDefs;