import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from '@layouts/RootLayout.jsx'
import Home from '@pages/Home.jsx'
import About from '@pages/About.jsx'
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
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
