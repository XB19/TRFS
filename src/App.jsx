import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { FlashProvider } from './context/FlashContext.jsx'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'
import PublicLayout from './components/PublicLayout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import AdminProtectedRoute from './components/AdminProtectedRoute.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import BonPlan from './pages/BonPlan.jsx'
import CareerOffers from './pages/career/CareerOffers.jsx'
import CareerOfferDetail from './pages/career/CareerOfferDetail.jsx'
import SpontaneousApplication from './pages/career/SpontaneousApplication.jsx'

import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminOffers from './pages/admin/AdminOffers.jsx'
import AdminOfferForm from './pages/admin/AdminOfferForm.jsx'
import AdminApplications from './pages/admin/AdminApplications.jsx'

export default function App() {
    return (
        <AdminAuthProvider>
            <FlashProvider>
                <ScrollToTop />
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/bon-plan" element={<BonPlan />} />
                        <Route path="/carriere/offres" element={<CareerOffers />} />
                        <Route path="/carriere/offres/:slug" element={<CareerOfferDetail />} />
                        <Route path="/carriere/candidature-spontanee" element={<SpontaneousApplication />} />
                    </Route>

                    <Route path="/admin/login" element={<AdminLogin />} />

                    <Route
                        element={
                            <AdminProtectedRoute>
                                <AdminLayout />
                            </AdminProtectedRoute>
                        }
                    >
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/offres" element={<AdminOffers />} />
                        <Route path="/admin/offres/nouvelle" element={<AdminOfferForm />} />
                        <Route path="/admin/offres/:id" element={<AdminOfferForm />} />
                        <Route path="/admin/candidatures" element={<AdminApplications />} />
                    </Route>
                </Routes>
            </FlashProvider>
        </AdminAuthProvider>
    )
}
