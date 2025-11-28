import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Compass, Sparkles, MapPin, Wallet } from "lucide-react";

const Discover = () => {
  const navigate = useNavigate();
  const [tipoTurismo, setTipoTurismo] = useState("naturaleza");
  const [presupuesto, setPresupuesto] = useState("medio");
  const [distancia, setDistancia] = useState([15]);

  const handleDescubrir = () => {
    const params = new URLSearchParams({
      tipo: tipoTurismo,
      presupuesto: presupuesto,
      distancia: distancia[0].toString(),
    });
    navigate(`/destination?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Compass className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Descubre tu destino</h1>
          </div>
          <p className="text-white/90">Personaliza tu próxima aventura en Ibagué</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 -mt-4">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Preferencias de viaje
            </CardTitle>
            <CardDescription>
              Selecciona tus preferencias y te sorprenderemos con un destino único
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <Label className="text-base font-semibold text-secondary flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Tipo de turismo
              </Label>
              <RadioGroup value={tipoTurismo} onValueChange={setTipoTurismo}>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "naturaleza", label: "🌿 Naturaleza" },
                    { value: "cultural", label: "🎭 Cultural" },
                    { value: "aventura", label: "🏔️ Aventura" },
                    { value: "gastronomia", label: "🍽️ Gastronomía" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="cursor-pointer font-normal flex-1"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold text-secondary flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Presupuesto
              </Label>
              <RadioGroup value={presupuesto} onValueChange={setPresupuesto}>
                <div className="space-y-2">
                  {[
                    { value: "bajo", label: "💰 Económico (hasta $50.000)" },
                    { value: "medio", label: "💰💰 Moderado ($50.000 - $150.000)" },
                    { value: "alto", label: "💰💰💰 Premium (más de $150.000)" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="cursor-pointer font-normal"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-secondary">
                  Distancia máxima
                </Label>
                <span className="text-2xl font-bold text-primary">{distancia[0]} km</span>
              </div>
              <Slider
                value={distancia}
                onValueChange={setDistancia}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Desliza para ajustar la distancia desde el centro de Ibagué
              </p>
            </div>

            <Button
              onClick={handleDescubrir}
              size="lg"
              className="w-full h-14 text-lg font-semibold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Descubrir destino sorpresa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Discover;