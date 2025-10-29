import { GraphQLClient } from "graphql-request";

const endpoint = `${process.env.BACKEND_URL}/graphql/`;
const client = new GraphQLClient(endpoint);

export default client;
