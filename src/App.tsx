import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AutoestimaLanding from "./pages/AutoestimaLanding";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import QuizPage from "./pages/QuizPage";
import VSLPage from "./pages/VSLPage";
import MentoriaPage from "./pages/MentoriaPage";
import GoSixPage from "./pages/GoSixPage";
import RodaDaVidaPage from "./pages/RodaDaVidaPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/autoestima-inabalavel" element={<AutoestimaLanding />} />
        <Route path="/teste" element={<QuizPage />} />
        <Route path="/vsl" element={<VSLPage />} />
        <Route path="/mentoria" element={<MentoriaPage />} />
        <Route path="/gosix" element={<GoSixPage />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route path="/termos-de-uso" element={<TermsOfService />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
