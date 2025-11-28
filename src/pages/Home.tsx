import { Button } from "@/components/ui/button";
import { Compass, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import placeholderSvg from "public\assets\tuso.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center space-y-8 max-w-md animate-in fade-in duration-700">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm mb-4">
            <Compass className="w-12 h-12" />
          </div>
          <h1 className="text-6xl font-bold tracking-tight">TUSO</h1>
          <p className="text-2xl font-light opacity-90">Turismo Sorpresa</p>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-medium">Descubre Ibagué,</p>
          <p className="text-xl font-medium flex items-center justify-center gap-2">
            una sorpresa <Sparkles className="w-5 h-5" /> a la vez
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="w-full bg-white text-primary hover:bg-white/90 font-semibold text-lg h-14 rounded-2xl shadow-lg"
          >
            Comenzar aventura
          </Button>
          <p className="text-sm opacity-75">
            Explora destinos únicos y gana puntos por cada aventura
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;