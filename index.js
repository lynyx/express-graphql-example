const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema, root } = require('./src/schema');

const port = 3000;
const app = express();

app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(port);
console.log('GraphQL API server running at localhost:' + port);
