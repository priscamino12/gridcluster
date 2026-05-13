import { useState } from "react";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Identifiants incorrects. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(at_top_right,#f43f5e_0%,#64748b_40%,#1e2937_80%)] overflow-hidden">
      {/* Fond décoratif subtil */}
      <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1015/1920/1080')] bg-cover opacity-10 mix-blend-overlay" />

      <div className="relative w-full max-w-md px-6 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl shadow-lg shadow-pink-500/30 mb-6">
              <LogIn size={32} strokeWidth={2.5} />
            </div>

            <h1 className="text-4xl font-bold text-slate-800 tracking-tighter">
              Connexion !
            </h1>
            <p className="text-slate-600 mt-3 text-lg">
              Connectez-vous pour continuer
            </p>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-4 text-slate-400 group-focus-within:text-pink-500 transition-colors" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 peer"
                placeholder=" "
              />
              <label className="absolute left-12 -top-2.5 bg-white px-2 text-xs font-medium text-slate-500 peer-focus:text-pink-600 transition-colors">
                Adresse email
              </label>
            </div>

            {/* Mot de passe */}
            <div className="relative group">
              <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-pink-500 transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 peer"
                placeholder=" "
              />
              <label className="absolute left-12 -top-2.5 bg-white px-2 text-xs font-medium text-slate-500 peer-focus:text-pink-600 transition-colors">
                Mot de passe
              </label>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-slate-900 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 group transition-all duration-300 active:scale-[0.985] shadow-lg shadow-pink-500/30 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Lien inscription */}
          <p className="text-center text-slate-600 mt-8">
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              className="font-semibold text-pink-600 hover:text-pink-700 hover:underline transition-colors"
            >
              Créer un compte
            </Link>
          </p>

          {/* Option "Mot de passe oublié" */}
          <p className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}