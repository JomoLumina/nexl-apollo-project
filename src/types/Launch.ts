import { LaunchSite } from "./LaunchSite";
import { Rocket } from "./Rocket";

export interface Launch{
  id: string;
  details?: string;
  launch_date_local: string;
  launch_site: LaunchSite;
  mission_id: string[];
  mission_name: string;
  rocket: Rocket;
}