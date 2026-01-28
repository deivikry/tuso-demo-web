import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Compass, Mail, Lock, User } from "lucide-react";
import { loginUser, registerUser } from "@/lib/api/auth";
import { useApi } from "@/hooks/useApi";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Estados para guardar lo que escribe el usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [name, setName] = useState("");

  // Hook personalizado para manejar el login
  const { loading: loginLoading, execute: executeLogin } = useApi(loginUser);

  // Hook personalizado para manejar el registro
  const { loading: registerLoading, execute: executeRegister } = useApi(registerUser);


  // Login con backend usando useApi hook
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await executeLogin(email, password);

      // Guardamos token y usuario en localStorage
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("tuso_user", JSON.stringify(response.user));

      toast({
        title: "¡Bienvenido a TUSO!",
        description: `Hola ${response.user.nombre}, tu aventura comienza ahora`,
      });

      navigate("/discover");
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.response?.data?.error || "Correo o contraseña incorrectos",
        variant: "destructive",
      });
    }
  };

  // Registro con backend usando useApi hook
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await executeRegister(name, registerEmail, registerPassword);

      // Guardamos token y usuario
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("tuso_user", JSON.stringify(response.user));

      toast({
        title: "¡Cuenta creada con éxito!",
        description: `Bienvenido ${response.user.nombre}, comienza a descubrir Ibagué.`,
      });

      navigate("/discover");
    } catch (error: any) {
      toast({
        title: "Error al registrar",
        description: error.response?.data?.error || "No se pudo crear la cuenta",
        variant: "destructive",
      });
    }
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

                  <Button type="submit" className="w-full" disabled={loginLoading}>
                    {loginLoading ? "Ingresando..." : "Ingresar"}
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

                  <Button type="submit" className="w-full" disabled={registerLoading}>
                    {registerLoading ? "Creando cuenta..." : "Crear cuenta"}
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