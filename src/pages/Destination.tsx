import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { X, Check, MapPin, Wallet, Trophy } from "lucide-react";
import lugaresData from "@/data/lugares.json";

interface Lugar {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  presupuesto: string;
  distancia: number;
  puntos: number;
  imagen: string;
}

const Destination = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [lugar, setLugar] = useState<Lugar | null>(null);
  const [showButtons, setShowButtons] = useState(true);

  useEffect(() => {
    const tipo = searchParams.get("tipo") || "naturaleza";
    const presupuesto = searchParams.get("presupuesto") || "medio";
    const distanciaMax = parseInt(searchParams.get("distancia") || "15");

    // Filtrar lugares según preferencias
    const lugaresCompatibles = (lugaresData as Lugar[]).filter(
      (l) =>
        l.tipo === tipo &&
        l.presupuesto === presupuesto &&
        l.distancia <= distanciaMax
    );

    // Si no hay lugares compatibles, mostrar cualquiera del tipo seleccionado
    const lugaresDelTipo = lugaresCompatibles.length > 0 
      ? lugaresCompatibles 
      : (lugaresData as Lugar[]).filter((l) => l.tipo === tipo);

    // Seleccionar uno aleatorio
    const randomLugar = lugaresDelTipo.length > 0
      ? lugaresDelTipo[Math.floor(Math.random() * lugaresDelTipo.length)]
      : (lugaresData as Lugar[])[0];

    setLugar(randomLugar);
  }, [searchParams]);

  const handleRechazar = () => {
    toast({
      title: "¡Otra oportunidad!",
      description: "Busquemos otro destino para ti",
    });
    navigate("/discover");
  };

  const handleAceptar = () => {
    if (!lugar) return;

    setShowButtons(false);
    
    // Actualizar puntos del usuario
    const userData = JSON.parse(localStorage.getItem("tuso_user") || "{}");
    userData.puntos = (userData.puntos || 0) + lugar.puntos;
    userData.destinos_visitados = [...(userData.destinos_visitados || []), lugar.id];
    localStorage.setItem("tuso_user", JSON.stringify(userData));

    toast({
      title: `¡Has ganado ${lugar.puntos} puntos! 🎉`,
      description: `Total de puntos: ${userData.puntos}`,
      duration: 4000,
    });

    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  if (!lugar) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Cargando destino...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden shadow-2xl">
          <div className="relative h-80 overflow-hidden">
            <img
              src={lugar.imagen}
              alt={lugar.nombre}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-3xl font-bold mb-2">{lugar.nombre}</h2>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  <MapPin className="w-3 h-3 mr-1" />
                  {lugar.distancia} km
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  <Wallet className="w-3 h-3 mr-1" />
                  {lugar.presupuesto}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  <Trophy className="w-3 h-3 mr-1" />
                  {lugar.puntos} puntos
                </Badge>
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                Sobre este lugar
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {lugar.descripcion}
              </p>
            </div>

            {showButtons && (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleRechazar}
                  className="h-14 border-2 hover:border-destructive hover:text-destructive"
                >
                  <X className="w-5 h-5 mr-2" />
                  Rechazar
                </Button>
                <Button
                  size="lg"
                  onClick={handleAceptar}
                  className="h-14 bg-primary hover:bg-primary/90"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Aceptar
                </Button>
              </div>
            )}

            {!showButtons && (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3 animate-bounce">
                  <Trophy className="w-8 h-8 text-primary" />
                </div>
                <p className="text-lg font-semibold text-secondary">
                  ¡Destino aceptado!
                </p>
                <p className="text-muted-foreground">Redirigiendo a tu perfil...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Destination;