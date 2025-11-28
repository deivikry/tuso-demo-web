import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Trophy, MapPin, Sparkles, LogOut, Compass } from "lucide-react";
import lugaresData from "@/data/lugares.json";

interface UserData {
  nombre: string;
  puntos: number;
  destinos_visitados: number[];
}

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("tuso_user");
    if (!data) {
      navigate("/login");
      return;
    }
    setUserData(JSON.parse(data));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("tuso_user");
    navigate("/");
  };

  const handleNewAdventure = () => {
    navigate("/discover");
  };

  if (!userData) {
    return null;
  }

  const visitedPlaces = lugaresData.filter((l) =>
    userData.destinos_visitados.includes(l.id)
  );

  const nivel = Math.floor(userData.puntos / 50) + 1;
  const puntosParaSiguienteNivel = (nivel * 50) - userData.puntos;

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">{userData.nombre}</h1>
              <p className="text-white/90">Explorador de Ibagué</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-3xl font-bold mb-1">{userData.puntos}</div>
                <div className="text-sm text-white/80">Puntos totales</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold mb-1">{visitedPlaces.length}</div>
                <div className="text-sm text-white/80">Destinos visitados</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 -mt-8 space-y-6">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Progreso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-secondary">Nivel {nivel}</span>
                <span className="text-sm text-muted-foreground">
                  {puntosParaSiguienteNivel} puntos para nivel {nivel + 1}
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{
                    width: `${((userData.puntos % 50) / 50) * 100}%`,
                  }}
                />
              </div>
            </div>

            <Button
              onClick={handleNewAdventure}
              size="lg"
              className="w-full h-12"
            >
              <Compass className="w-5 h-5 mr-2" />
              Nueva aventura
            </Button>
          </CardContent>
        </Card>

        {visitedPlaces.length > 0 && (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Destinos explorados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {visitedPlaces.map((lugar) => (
                  <div
                    key={lugar.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors"
                  >
                    <img
                      src={lugar.imagen}
                      alt={lugar.nombre}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary">{lugar.nombre}</h4>
                      <p className="text-sm text-muted-foreground">{lugar.tipo}</p>
                    </div>
                    <Badge variant="secondary">
                      +{lugar.puntos} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;