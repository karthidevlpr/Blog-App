import { GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} from "graphql";

// User Type
export const UserType = new GraphQLObjectType({
    name:"User",
    fields: () => ({
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        createdOn: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})