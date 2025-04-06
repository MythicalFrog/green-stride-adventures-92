
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Journey from "./pages/Journey";
import Adventure from "./pages/Adventure";
import MapView from "./components/MapView";
import StatsPage from "./pages/Stats";
import RewardsPage from "./pages/Rewards";
import LeaderboardPage from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="journey" element={<Journey />} />
            <Route path="adventure" element={<Adventure />} />
            <Route path="map" element={<MapView />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="rewards" element={<RewardsPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
