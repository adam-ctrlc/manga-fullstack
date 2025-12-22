import { X, Info } from "lucide-react";

export function SimulationModal({ isOpen, onClose, chapterNumber }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[var(--card)] border border-[var(--border)] rounded-xl max-w-md w-full p-6 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--secondary)] flex items-center justify-center">
            <Info className="h-8 w-8 text-[var(--foreground)]" />
          </div>

          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            Simulation Mode
          </h3>

          <p className="text-[var(--muted-foreground)] mb-6 leading-relaxed">
            This is a simulation of a real manga website. Chapter{" "}
            {chapterNumber} content is not available as this is a demo
            showcasing the UI/UX design powered by the Kitsu API.
          </p>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium transition-colors hover:opacity-90"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
