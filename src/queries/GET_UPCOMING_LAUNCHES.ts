import { gql } from '@apollo/client';

const GET_UPCOMING_LAUNCES = gql`
  query GetUpcomingLaunches {
    launchesUpcoming {
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

export default GET_UPCOMING_LAUNCES;