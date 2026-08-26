import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { FlashProvider } from './context/FlashContext.jsx'
import PublicLayout from './components/PublicLayout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import BonPlan from './pages/BonPlan.jsx'

export default function App() {
    return (
        <FlashProvider>
            <ScrollToTop />
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/bon-plan" element={<BonPlan />} />
                </Route>
            </Routes>
        </FlashProvider>
    )
}
