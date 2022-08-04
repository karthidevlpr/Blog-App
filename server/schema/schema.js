import { GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} from "graphql";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";


// Post Type
const PostType = new GraphQLObjectType({
    name:"post",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        active: { type: GraphQLBoolean },
        createdOn: { type: GraphQLString },
        updatedOn: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
              return User.findById(parent.user);
        }
        }
    })
})

// User Type
const UserType = new GraphQLObjectType({
    name:"User",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        createdOn: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        postListByUser: {
            type: new GraphQLList(PostType),
            args: {userId: { type: GraphQLID }},
            resolve(parent, args) {
                return Blog.find({user: args.userId, active: true});
            },
            }
        }
})

export default new GraphQLSchema({
    query: RootQuery
  });
  