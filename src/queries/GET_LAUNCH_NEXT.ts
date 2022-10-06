import { gql } from '@apollo/client';

const GET_LAUNCH_NEXT = gql`
  query GetLaunchNext {
    launchNext {
      id
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
    }
  }`;

export default GET_LAUNCH_NEXT;