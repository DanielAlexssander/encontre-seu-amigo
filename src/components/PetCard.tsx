import { motion } from "framer-motion";

interface PetCardProps {
  imageUrl: string;
  bairro: string;
  contato: string;
  onImageClick: (url: string) => void;
}

export default function PetCard({ imageUrl, bairro, contato, onImageClick }: PetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img
        src={imageUrl}
        alt="Pet perdido"
        onClick={() => onImageClick(imageUrl)}
        className="w-full h-72 object-cover cursor-pointer hover:opacity-90 transition-opacity"
      />
      <div className="p-4 space-y-1">
        <p className="text-sm text-gray-500">📍 {bairro}</p>
        <p className="text-sm font-medium text-emerald-700">📞 {contato}</p>
      </div>
    </motion.div>
  );
}
