import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/shared/Loading';
import { useNotification } from '../contexts/NotificationContext';

// Rojo institucional de la Academia
const INSTITUTIONAL_RED = '#C0392B';

export default function Login() {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);
  const [errMsg, setErrMsg]             = useState('');
  const navigate                        = useNavigate();
  const { login }                       = useAuth();
  const { showNotification }            = useNotification();

  const validateForm = () => {
    if (!email) {
      setErrMsg('El correo electrónico es obligatorio');
      return false;
    }
    if (!email.includes('@')) {
      setErrMsg('Introduce un correo electrónico válido');
      return false;
    }
    if (!password) {
      setErrMsg('La contraseña es obligatoria');
      return false;
    }
    if (password.length < 6) {
      setErrMsg('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMsg('');
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = login(email, password);
      if (success) {
        showNotification('¡Sesión iniciada correctamente!', 'success');
        const isStudent = email.toLowerCase().includes('student');
        navigate(isStudent ? '/student/dashboard' : '/teacher/dashboard');
      } else {
        setErrMsg('Correo electrónico o contraseña incorrectos');
        showNotification('Correo electrónico o contraseña incorrectos', 'error');
      }
    } catch (error) {
      setErrMsg('Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
      showNotification('Ocurrió un error al iniciar sesión', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden bg-white">
      {/* ============================================================ */}
      {/* PANEL IZQUIERDO (33%): Formulario e Identidad Institucional  */}
      {/* ============================================================ */}
      <div className="w-full md:w-[33%] h-full flex flex-col justify-center items-center px-6 sm:px-10 py-8 bg-white overflow-y-auto z-10 shadow-lg md:shadow-none">
        <div className="w-full max-w-sm flex flex-col items-center">
          
          {/* Cabecera / Identidad Institucional */}
          <div className="w-full flex flex-col items-center text-center mb-6">
            <img
              src="/image/imagenacademia.png"
              alt="Logo Academia Apu San Antonio de Andahuaylas"
              className="w-28 h-28 object-contain mb-3 drop-shadow-sm select-none"
            />
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Academia Apu San Antonio de Andahuaylas
            </h1>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1.5">
              Excelencia · Disciplina · Servicio
            </p>
            <div className="w-12 h-0.5 bg-red-600 rounded-full mt-3 opacity-80" />
          </div>

          {/* Formulario de Inicio de Sesión */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
            {/* Campo Correo */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrMsg('');
                }}
                className={`w-full px-3.5 py-2.5 text-sm bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                  errMsg && !email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                }`}
                placeholder="usuario@titan.edu.tr"
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrMsg('');
                  }}
                  className={`w-full px-3.5 py-2.5 pr-16 text-sm bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                    errMsg && !password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            {/* Recordarme y Olvido */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  style={{ accentColor: INSTITUTIONAL_RED }}
                />
                <span className="text-gray-600">Recordarme</span>
              </label>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Mensaje de Error */}
            {errMsg && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 text-center font-medium">
                {errMsg}
              </div>
            )}

            {/* Botón Principal Rojo Institucional */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-bold text-white shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: INSTITUTIONAL_RED }}
            >
              {isLoading ? <Loading /> : 'Iniciar Sesión'}
            </button>
          </form>

        </div>
      </div>

      {/* ============================================================ */}
      {/* PANEL DERECHO (67%): Fotografía de Sede + Overlay Rojo 50%   */}
      {/* ============================================================ */}
      <div className="hidden md:block md:w-[67%] h-full relative overflow-hidden bg-gray-900">
        {/* Imagen de fondo cubriendo toda el área */}
        <img
          src="/image/academiafisicafoto.png"
          alt="Sede de la Academia Apu San Antonio de Andahuaylas"
          className="w-full h-full object-cover object-center select-none"
        />

        {/* Overlay traslúcido rojo institucional al exacto 50% de opacidad */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(192, 57, 43, 0.5)' }}
        />

        {/* Detalle visual sutil en la esquina inferior derecha */}
        <div className="absolute bottom-6 right-8 text-right text-white/90 drop-shadow-md z-10 select-none">
          <p className="text-sm font-semibold tracking-wide">
            Campus Académico Andahuaylas
          </p>
          <p className="text-xs text-white/70">
            Forjando futuros líderes universitarios
          </p>
        </div>
      </div>
    </div>
  );
}
