import { Switch, Route } from "wouter";
import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import Shop from "@/pages/shop";
import Vault from "@/pages/vault";
import Admin from "@/pages/admin";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

import { BackgroundCarousel } from "./components/layout/background-carousel";
import { Navbar } from "./components/layout/navbar";
import { LoginModal } from "./components/modals/login-modal";
import { CartModal } from "./components/modals/cart-modal";
import { Chatbot } from "./components/widgets/chatbot";
import { NotificationWidget } from "./components/widgets/notification";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/vault" component={Vault} />
      <Route path="/admin" component={Admin} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-cyber-black text-gray-100 font-inter overflow-x-hidden">
          {/* Background Carousel */}
          <BackgroundCarousel />
          
          {/* Main Content Overlay */}
          <div className="relative z-10 min-h-screen flex flex-col">
            {/* Navigation */}
            <Navbar 
              onLoginClick={() => setShowLoginModal(true)}
              onCartClick={() => setShowCartModal(true)}
            />
            
            {/* Page Content - Scrollable */}
            <main className="flex-1 overflow-y-auto">
              <Router />
            </main>
          </div>
          
          {/* Modals */}
          <LoginModal 
            isOpen={showLoginModal} 
            onClose={() => setShowLoginModal(false)} 
          />
          <CartModal 
            isOpen={showCartModal} 
            onClose={() => setShowCartModal(false)} 
          />
          
          {/* Widgets */}
          <Chatbot />
          <NotificationWidget />
          
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
