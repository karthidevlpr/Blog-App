import { GraphQLObjectType,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
} from "graphql";
import Blog from "../models/blogModel.js";
import {PostType} from "./typeDefs/post.js";

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        postListByUser: {
            type: new GraphQLList(PostType),
            args: {userId: { type: GraphQLID }},
            resolve(parent, args) {
                return Blog.find({user: args.userId, active: true});
            }},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Blog.find({active: true});
            }
        }

        }
})

const mutation =  new GraphQLObjectType ({
    name: "Mutation",
    fields: {
        deletePost: {
            type: PostType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Blog.findByIdAndUpdate(args.id, {$set: {active : false, updatedOn: Date.now()}}, {new: true})
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation
  });
  