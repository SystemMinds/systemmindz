import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from '@layouts/RootLayout.jsx'
import Home from '@pages/Home.jsx'
import Portfolio from '@pages/Portfolio.jsx'
import ServicesPage from '@pages/Services.jsx'
import Projects from '@pages/Projects.jsx'
import OurClients from '@pages/OurClients.jsx'
import Contact from '@pages/Contact.jsx'
import NotFound from '@pages/NotFound.jsx'
import Preloader from '@components/Preloader/Preloader.jsx'

export default function App() {
  return (
    <>
      <Preloader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="projects" element={<Projects />} />
            <Route path="our-clients" element={<OurClients />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
