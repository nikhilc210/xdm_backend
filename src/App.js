import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./component/mainLayout/MainLayout";
import Ads from "./pages/Ads/Ads";
import Admin from "./pages/Admin/Admin";
import About from "./pages/Content/About/About";
import Career from "./pages/Content/Career/Career";
import Terms from "./pages/Content/Terms/Terms";
import Privacy from "./pages/Content/Privacy/Privacy";
import Spotify from "./pages/Content/Spotify/Spotify";
import Logout from "./pages/Logout/Logout";
import Video from "./pages/Video/Video";
import Podcast from "./pages/Podcast/Podcast";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />

          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/publish_video" element={<Video />} />
            <Route path="/publish_podcast" element={<Podcast />} />
            <Route path="/custom-ads" element={<Ads />} />
            <Route path="/spotify-playlist" element={<Spotify />} />
            <Route path="/administrators" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/career" element={<Career />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
