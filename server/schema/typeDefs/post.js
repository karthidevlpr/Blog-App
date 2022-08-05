import { GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} from "graphql";
import {UserType} from "./user.js";
import User from "../../models/userModel.js";


// Post Type
export const PostType = new GraphQLObjectType({
    name:"post",
    fields: () => ({
        _id: { type: GraphQLID },
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