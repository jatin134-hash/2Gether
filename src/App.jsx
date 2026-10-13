import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthProvider from './context/AuthProvider';
import AuthPage from './pages/AuthPage';
import HeroSection from './sections/HeroSection';
import TrustSection from './sections/TrustSection';
import DiscoverSection from './sections/DiscoverSection';
import MatchingSection from './sections/MatchingSection';
import CommunitySection from './sections/CommunitySection';
import CTASection from './sections/CTASection';
import FAQSection from './sections/FAQSection';
import HowItWorksSection from './sections/HowItWorksSection';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen text-[#f8f7ff]">
          <Navbar />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <TrustSection />
                    <HowItWorksSection />
                    <DiscoverSection />
                    <MatchingSection />
                    <CommunitySection />
                    <CTASection />
                    <FAQSection />
                  </>
                }
              />
              <Route path="/signup" element={<AuthPage mode="signup" />} />
              <Route path="/login" element={<AuthPage mode="login" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
