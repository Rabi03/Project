import { gql } from '@apollo/client';

export const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      type
      appName
      appType
      title
      body
      groupName
      appLogo
      maxMember
      githubLink
      images
      videoLink
      Link
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
        replies {
          id
          username
          body
          createdAt
        }
      }
      likes {
        id
        username
        image
        createdAt
      }
      rates {
        id
        username
        value
        createdAt
      }
      commentCount
      likeCount
      rateCount
    }
  }
`;
