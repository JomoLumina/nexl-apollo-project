import { gql } from '@apollo/client';

const GET_LAUNCH = gql`
  query Launch($launchId: ID!) {
    launch(id: $launchId) {
      id
      details
      launch_date_local
      launch_site {
        site_name
        site_name_long
      }
      mission_id
      mission_name
      rocket {
        rocket_name
        rocket_type
      }
    }
  }`;

export default GET_LAUNCH;