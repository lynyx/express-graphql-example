const Authors = require('./data/authors');
const Posts = require('./data/posts');

const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        author(id: String): Author
        authors: [Author]
        post(id: String, author_id: String): Post
        posts: [Post]
    },
    type Author {
        id: String
        name: String
        twitterHandle: String
    },
    type Post {
        id: String
        title: String
        body: String
        author: String
    }
    type Mutation {
        updateAuthorName(id: String!, name: String!): Author
    }
`);

const getAuthor = ({ id }) => Authors.find(author => author.id === id);
const getAuthors = () => Authors;
const getPost = ({ id, author_id }) => Posts.find(post => post.id === (id || author_id));
const getPosts = () => Posts;
const updateAuthorName = ({ id, name }) => {
    Authors.map(author => author.id === id && Object.assign(author, { name }));
    return Authors.find(author => author.id === id);
};

const root = {
    author: getAuthor,
    authors: getAuthors,
    post: getPost,
    posts: getPosts,
    updateAuthorName,
};

module.exports = { schema, root };
