const { gql } = require("apollo-server");

const typeDefs = gql`
  type Media {
    _id: ID!
    title: String!
    src: String!
    description: String
    by: String
    createdDate: String!
    updatedDate: String
    category: Category!
    type: String!
  }

  input MediaIntput {
    title: String!
    src: String!
    description: String
    by: String
    updatedDate: String
    createdDate: String!
    category: ID!
    type: String!
  }

  input MediaInputUpdate {
    title: String
    imgUrl: String
    description: String
    photographeName: String
    updatedDate: String
    category: ID
  }

  type User {
    _id: ID!
    username: String!
    password: String!
  }

  input SignupUserInput {
    username: String!
    email: String!
    password: String!
  }

  input SigninUserInput {
    username: String!
    password: String!
  }

  type Token {
    token: String!
  }

  type UserInfo {
    _id: ID!
    title: String!
    subtitle: String
    description: String
    facebook: String
    instagram: String
    email: String
  }

  input UserInfoInput {
    title: String!
    subtitle: String
    description: String
    facebook: String
    instagram: String
    email: String
  }
  input UserInfoInputUpdate {
    title: String
    subtitle: String
    description: String
    facebook: String
    instagram: String
    email: String
  }

  type Category {
    _id: ID!
    name: String!
    medias: [Media]
  }

  input CategoryInput {
    name: String
  }

  type Query {
    medias: [Media]
    media(_id: ID!): Media
    userInfo: UserInfo
    me: User
    categories: [Category]
    category(_id: ID!): Category
  }

  type Mutation {
    addMedia(data: MediaIntput): Media
    updateMedia(_id: ID!, data: MediaInputUpdate): Media
    deleteMedia(_id: ID!): Media
    addUserInfo(data: UserInfoInput): UserInfo
    updateUserInfo(_id: ID!, data: UserInfoInputUpdate): UserInfo
    signupUser(data: SignupUserInput): Token
    signinUser(data: SigninUserInput): Token
    addCategory(data: CategoryInput): Category
    updateCategory(_id: ID!, data: CategoryInput): Category
    deleteCategory(_id: ID!): Category
  }
`;

module.exports = typeDefs;
