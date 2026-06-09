import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { BAIRROS_RJ } from "../lib/bairros";
import PetCard from "../components/PetCard";
import ImageModal from "../components/ImageModal";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaw } from "react-icons/fa";

interface Pet {
  id: string;
  imageUrl: string;
  bairro: string;
  contato: string;
}

export default function Home() {
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [bairroFilter, setBairroFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPets() {
      setLoading(true);
      try {
        const petsRef = collection(db, "pets");
        const q = query(petsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setAllPets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Pet)));
      } catch {
        setAllPets([]);
      }
      setLoading(false);
    }
    fetchPets();
  }, []);

  const pets = bairroFilter ? allPets.filter((p) => p.bairro === bairroFilter) : allPets;

  return (
    <main className="pt-20 min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero */}
      <section className="text-center px-4 py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-block text-5xl text-emerald-600 mb-4"
        >
          <FaPaw />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-emerald-800"
        >
          Encontre seu Amigo
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mt-2 max-w-md mx-auto"
        >
          Ajudamos você a encontrar seu pet perdido na cidade do Rio de Janeiro.
        </motion.p>
      </section>

      {/* Filter + Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex justify-center mb-8">
          <select
            value={bairroFilter}
            onChange={(e) => setBairroFilter(e.target.value)}
            className="border border-emerald-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Todos os bairros</option>
            {BAIRROS_RJ.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Carregando...</p>
        ) : pets.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum pet encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <PetCard
                key={pet.id}
                imageUrl={pet.imageUrl}
                bairro={pet.bairro}
                contato={pet.contato}
                onImageClick={setPreviewUrl}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {previewUrl && <ImageModal url={previewUrl} onClose={() => setPreviewUrl(null)} />}
      </AnimatePresence>
    </main>
  );
}
