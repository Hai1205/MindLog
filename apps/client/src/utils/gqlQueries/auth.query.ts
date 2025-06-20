import gql from "graphql-tag";

export const REGISTER_MUTATION = gql`
  mutation register($input: CreateUserInput!) {
    register(registerInput: $input) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(loginInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`;

