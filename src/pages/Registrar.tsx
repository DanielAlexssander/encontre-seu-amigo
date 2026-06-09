import { useState, type FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { BAIRROS_RJ } from "../lib/bairros";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [bairro, setBairro] = useState("");
  const [contato, setContato] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!imageUrl || !bairro || !contato) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "pets"), {
        imageUrl,
        bairro,
        contato,
        createdAt: serverTimestamp(),
      });
      showToast("Pet registrado com sucesso!", "success");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      showToast("Erro ao registrar. Tente novamente.", "error");
    }
    setLoading(false);
  }

  return (
    <main className="pt-20 min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-lg shadow-lg text-white font-medium ${
              toast.type === "success" ? "bg-emerald-600" : "bg-red-500"
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-emerald-800 text-center">Registrar Pet Perdido</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Link da foto do animal</label>
          <input
            type="url"
            placeholder="https://exemplo.com/foto.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="mt-3 rounded-lg h-40 object-cover w-full" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
          <select
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Selecione o bairro</option>
            {BAIRROS_RJ.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Número de contato</label>
          <input
            type="tel"
            placeholder="(21) 99999-9999"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white font-medium py-2.5 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Enviando..." : "Registrar"}
        </button>
      </motion.form>
    </main>
  );
}
