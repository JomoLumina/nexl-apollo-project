import { gql } from '@apollo/client';

const GET_LAUNCH_LATEST = gql`
  query GetLaunchLatest {
    launchLatest {
      id
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
    }
  }`;

export default GET_LAUNCH_LATEST;