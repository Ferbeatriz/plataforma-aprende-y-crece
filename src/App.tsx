import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// 👇 IMPORTAMOS EL COMPONENTE GENÉRICO PARA LOS MÓDULOS
import ModuloGenerico from "@/components/ModuloGenerico"; 
import VistaAntiguoEgipto from "@/components/VistaAntiguoEgipto";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* 👇 RUTA PARA TODOS LOS MÓDULOS (Lenguaje, Historia, Matemáticas, etc.) */}
          <Route path="/modulo/:id" element={<ModuloGenerico />} />
          
          {/* 👇 RUTA PARA EL ANTIGUO EGIPTO (Agrégala justo aquí) */}
          <Route 
            path="/modulo/historia/historia-universal/antiguo-egipto" 
            element={<VistaAntiguoEgipto />} 
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;