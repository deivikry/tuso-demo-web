
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Trophy, MapPin, Sparkles, LogOut, Compass, CheckCircle2, RotateCcw } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { getAllDestinations, visitDestination, type Destination } from "@/lib/api/destinations";
import { fetchUserProfile } from "@/lib/api/user";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  user: {
    id: number;
    nombre: string;
    email: string;
  };
  stats: {
    total_puntos: number;
    nivel_actual: number;
    puntos_proxximo_nivel: number;
    puntos_nivel_actual: number;
  };
  historial: (Destination & { visit_date: string })[];
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for profile data
  const { data: profileData, loading: loadingProfile, execute: loadProfile } = useApi(fetchUserProfile);

  // Hook to get all available destinations (catalogue)
  const { data: destinationsData, loading: loadingDestinations, execute: fetchDestinations } = useApi(getAllDestinations);

  // Hook to visit
  const { loading: visitingDestination, execute: executeVisit } = useApi(visitDestination);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Load initial data
    loadProfile();
    fetchDestinations();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("tuso_user");
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  const handleNewAdventure = () => {
    navigate("/discover");
  };

  const handleVisitDestination = async (destinationId: number) => {
    try {
      const result = await executeVisit(destinationId);

      toast({
        title: result.mensaje,
        description: `Has ganado ${result.puntos_ganados} puntos.Nivel actual: ${result.nuevo_nivel} `,
      });

      // Reload profile to update stats and history
      loadProfile();

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "No se pudo registrar la visita",
        variant: "destructive",
      });
    }
  };

  if (loadingProfile || !profileData) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-primary animate-pulse">Cargando perfil...</div>
      </div>
    );
  }

  const { user, stats, historial } = profileData as UserProfile;

  // Process history to count visits per destination
  const visitsCount = historial.reduce((acc, visit) => {
    acc[visit.id] = (acc[visit.id] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Get IDs of visited places
  const visitedIds = Object.keys(visitsCount).map(Number);

  // Filter available places (those NOT in visitedIds, or maybe ALL are available to revisit?)
  // User asked to allow visiting multiple times. So we can show ALL in "Available" or just new ones?
  // Let's show "Destinos para descubrir" (New) and "Destinos Favoritos" (Visited)
  // Or just list them all.
  // Implementation: "Available to visit" = All destinations (since you can revisit).
  // But to keep UI clean, maybe show "Explorar Nuevos" and "Volver a visitar".

  // For now: Available = Not visited yet.
  const newPlaces = destinationsData?.destinos.filter(d => !visitedIds.includes(d.id)) || [];

  // Group visited places for display (unique list)
  const uniqueVisitedPlaces = Array.from(new Set(historial.map(v => v.id)))
    .map(id => historial.find(v => v.id === id)!);

  return (
    <div className="min-h-screen bg-muted">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">{user.nombre}</h1>
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
                <div className="text-3xl font-bold mb-1">{stats.total_puntos}</div>
                <div className="text-sm text-white/80">Puntos totales</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold mb-1">{uniqueVisitedPlaces.length}</div>
                <div className="text-sm text-white/80">Lugares descubiertos</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 -mt-8 space-y-6">
        {/* Progress Section */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Nivel {stats.nivel_actual}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-secondary">Progreso de nivel</span>
                <span className="text-sm text-muted-foreground">
                  {stats.puntos_nivel_actual} / {stats.puntos_proxximo_nivel}
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{
                    width: `${(stats.puntos_nivel_actual / stats.puntos_proxximo_nivel) * 100}% `,
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

        {/* Destinos pendientes */}
        {newPlaces.length > 0 && (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Destinos por descubrir</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingDestinations ? (
                <p className="text-center text-muted-foreground">Cargando destinos...</p>
              ) : (
                <div className="space-y-3">
                  {newPlaces.map((destino) => (
                    <div
                      key={destino.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors"
                    >
                      {/* Placeholder image if none provided */}
                      <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img src={destino.imagen_url || "https://placehold.co/100"} alt="img" className="object-cover h-full w-full" />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-secondary">{destino.nombre}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">{destino.descripcion || "Sin descripción"}</p>
                        <span className="text-xs text-muted-foreground">{destino.categoria}</span>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge variant="secondary">
                          +{destino.puntos_otorgados} pts
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => handleVisitDestination(destino.id)}
                          disabled={visitingDestination}
                          className="h-7 text-xs"
                        >
                          Visitar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Destinos Visitados (Historial) */}
        {uniqueVisitedPlaces.length > 0 && (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Tu Bitácora de Viaje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uniqueVisitedPlaces.map((destino) => (
                  <div
                    key={destino.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors"
                  >
                    <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img src={destino.imagen_url || "https://placehold.co/100"} alt="img" className="object-cover h-full w-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-secondary">
                          {destino.nombre}
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-sm text-muted-foreground">{destino.categoria}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {visitsCount[destino.id]} {visitsCount[destino.id] === 1 ? 'visita' : 'visitas'}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleVisitDestination(destino.id)}
                        disabled={visitingDestination}
                        className="h-6 text-xs hover:bg-primary/10"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Repetir
                      </Button>
                    </div>
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