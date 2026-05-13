import { useEffect, useState } from "react";
import { getTasks, createTask } from "../services/api";
import { Plus, CheckCircle, Clock, ListTodo } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des tâches");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (e) => {
    e?.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await createTask({ title: title.trim() });
      setTitle("");
      await loadTasks();
    } catch (err) {
      alert("Impossible d'ajouter la tâche");
    } finally {
      setIsLoading(false);
    }
  };

  const pendingTasks = tasks.length; // Tu pourras affiner avec un statut plus tard

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Tableau de bord</h1>
            <p className="text-slate-600 mt-1">Bienvenue back ! Voici l'état de tes tâches.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-slate-700">John Doe</p>
              <p className="text-sm text-slate-500">john@example.com</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl flex items-center justify-center font-semibold">
              JD
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total des tâches</p>
                <p className="text-4xl font-bold text-slate-800 mt-2">{tasks.length}</p>
              </div>
              <ListTodo className="w-10 h-10 text-slate-300" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">En cours</p>
                <p className="text-4xl font-bold text-amber-600 mt-2">{pendingTasks}</p>
              </div>
              <Clock className="w-10 h-10 text-amber-300" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Terminées</p>
                <p className="text-4xl font-bold text-emerald-600 mt-2">0</p>
              </div>
              <CheckCircle className="w-10 h-10 text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Add New Task */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-10">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Nouvelle tâche</h3>
          <form onSubmit={addTask} className="flex gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Que dois-tu faire aujourd'hui ?"
              className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all text-slate-700 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="bg-slate-900 hover:bg-pink-600 text-white px-8 rounded-2xl font-medium flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
            >
              <Plus size={22} />
              Ajouter
            </button>
          </form>
        </div>

        {/* Tasks Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Mes tâches</h2>
          <p className="text-slate-500">{tasks.length} tâche{tasks.length > 1 ? 's' : ''}</p>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-slate-200">
            <ListTodo className="mx-auto w-16 h-16 text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">Aucune tâche pour le moment</p>
            <p className="text-slate-400 mt-1">Ajoute ta première tâche ci-dessus</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-5 h-5 border-2 border-slate-300 rounded-full group-hover:border-pink-400 transition-colors" />
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-700 leading-snug">{task.title}</h3>
                    <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
                      <Clock size={14} />
                      En cours
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}