
  import { useState } from "react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  import { useNavigate } from "react-router-dom";
  import { useToast } from "@/hooks/use-toast";
  import { Compass, Mail, Lock, User } from "lucide-react";
  import { loginUser,registerUser  } from "@/lib/api"; //  conexión con el backend

  /*const Login = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    // Estados para guardar lo que escribe el usuario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [name, setName] = useState("");

    //  Login real con conexión al backend
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        // Enviamos los datos al backend
        const response = await loginUser(email, password);

        // Guardamos token y usuario en localStorage
        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("tuso_user", JSON.stringify(response.user));

        toast({
          title: "¡Bienvenido a TUSO!",
          description: "Tu aventura comienza ahora",
        });

        navigate("/discover"); // Redirige al home o dashboard
      } catch (error) {
        toast({
          title: "Error al iniciar sesión",
          description: "Correo o contraseña incorrectos",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };




    // 🧾 Registro simulado (luego se conectará también al backend)
    const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // 👇 Llamamos al backend usando la función de /lib/api.ts
    const response = await registerUser(name, registerEmail, registerPassword);

    // Guardamos token y usuario (como hace el login)
    localStorage.setItem("auth_token", response.token);
    localStorage.setItem("tuso_user", JSON.stringify(response.user));

    toast({
      title: "¡Cuenta creada con éxito!",
      description: `Bienvenido ${response.user.nombre}, comienza a descubrir Ibagué.`,
    });

    // Redirigimos a la página principal
    navigate("/discover");
  } catch (error: any) {
    toast({
      title: "Error al registrar",
      description: error.response?.data?.message || "No se pudo crear la cuenta",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
*/

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem("tuso_user", JSON.stringify({ 
        nombre: "Usuario Demo", 
        puntos: 0,
        destinos_visitados: [] 
      }));
      toast({
        title: "¡Bienvenido a TUSO!",
        description: "Tu aventura comienza ahora",
      });
      navigate("/discover");
      setIsLoading(false);
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem("tuso_user", JSON.stringify({ 
        nombre: "Usuario Demo", 
        puntos: 0,
        destinos_visitados: [] 
      }));
      toast({
        title: "¡Cuenta creada!",
        description: "Comienza a descubrir Ibagué",
      });
      navigate("/discover");
      setIsLoading(false);
    }, 800);
  };




    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-2">
              <Compass className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-secondary">TUSO</h1>
            <p className="text-muted-foreground">Inicia sesión para comenzar tu aventura</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Acceso</CardTitle>
              <CardDescription>Ingresa o crea tu cuenta para explorar</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Ingresar</TabsTrigger>
                  <TabsTrigger value="register">Registrarse</TabsTrigger>
                </TabsList>

                {/* LOGIN */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Ingresando..." : "Ingresar"}
                    </Button>
                  </form>
                </TabsContent>

                {/* REGISTER */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Tu nombre"
                          className="pl-10"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  export default Login;
