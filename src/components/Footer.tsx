const FEEDBACK_URL = import.meta.env.VITE_FEEDBACK_URL || "#";

export default function Footer() {
  return (
    <footer className="bg-emerald-800 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p>© {new Date().getFullYear()} Encontre seu Amigo. Todos os direitos reservados.</p>
        <a
          href={FEEDBACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-emerald-300"
        >
          Enviar Feedback
        </a>
      </div>
    </footer>
  );
}
