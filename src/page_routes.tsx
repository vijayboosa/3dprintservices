import { Routes, Route, Outlet } from "react-router";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import GalleryPage from "./pages/gallery";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import UploadPage from "./pages/upload";
import ServicesPage from "./pages/service";

function BaseLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function PageRoutes() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="upload" element={<UploadPage />} />
        {/* <Route path="about" element={<About />} /> */}
      </Route>
    </Routes>
  );
}
