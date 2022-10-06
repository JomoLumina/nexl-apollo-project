import { gql } from '@apollo/client';

const GET_PAST_LAUNCES = gql`
  query GetPastLaunches {
    launchesPast {
      id
      mission_id
      mission_name
      launch_date_local
      rocket {
       rocket_name
      }
      launch_site {
        site_name
      }
    }
  }`;

export default GET_PAST_LAUNCES;