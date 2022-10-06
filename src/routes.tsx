import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import HomeView from "./views/home";
import LaunchDetailsView from "./views/launch";
import NotFoundView from "./views/error";
import PastLaunchesView from "./views/pastLaunches";
import UpcomingLaunchesView from "./views/upcomingLaunches";

export const Router = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route path='*' element={<NotFoundView />} />
        <Route index element={<HomeView />} />
        <Route path="launch/:launchId" element={<LaunchDetailsView />} />
        <Route path="launches" element={<HomeView />} />
        <Route path="launches/past" element={<PastLaunchesView />} />
        <Route path="launches/upcoming" element={<UpcomingLaunchesView />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}