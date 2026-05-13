import { useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Sparkles, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (!acceptedTerms) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, password });
      navigate("/"); // ou "/login" selon ta logique
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(at_bottom_right,#6366f1_0%,#a855f7_40%,#1e2937_80%)] overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1015/1920/1080')] bg-cover opacity-10 mix-blend-overlay" />

      <div className="relative w-full max-w-md px-6 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-purple-500/30 mb-6">
              <UserPlus size={32} strokeWidth={2.5} />
            </div>

            <h1 className="text-4xl font-bold text-slate-800 tracking-tighter">
              Rejoignez-nous
            </h1>
            <p className="text-slate-600 mt-3 text-lg">
              Créez votre compte en quelques secondes
            </p>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Nom complet */}
            <div className="relative group">
              <User className="absolute left-4 top-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 peer"
                placeholder=" "
              />
              <label className="absolute left-12 -top-2.5 bg-white px-2 text-xs font-medium text-slate-500 peer-focus:text-purple-600 transition-colors">
                Nom complet
              </label>
            </div>

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 peer"
                placeholder=" "
              />
              <label className="absolute left-12 -top-2.5 bg-white px-2 text-xs font-medium text-slate-500 peer-focus:text-purple-600 transition-colors">
                Adresse email
              </label>
            </div>

            {/* Mot de passe */}
            <div className="relative group">
              <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 peer"
                placeholder=" "
              />
              <label className="absolute left-12 -top-2.5 bg-white px-2 text-xs font-medium text-slate-500 peer-focus:text-purple-600 transition-colors">
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

            {/* Confirmer le mot de passe */}
            <div className="relative group">
              <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 peer"
                placeholder=" "
              />
              <label className="absolute left-12 -top-2.5 bg-white px-2 text-xs font-medium text-slate-500 peer-focus:text-purple-600 transition-colors">
                Confirmer le mot de passe
              </label>

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Conditions d'utilisation */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-5 h-5 accent-purple-600 rounded border-slate-300"
              />
              <label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed">
                J'accepte les{" "}
                <Link to="/terms" className="text-purple-600 hover:underline">
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link to="/privacy" className="text-purple-600 hover:underline">
                  politique de confidentialité
                </Link>
              </label>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 group transition-all duration-300 active:scale-[0.985] shadow-lg shadow-purple-500/30 disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Créer mon compte
                  
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-600 mt-8">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/"
              className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-colors"
            >
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}