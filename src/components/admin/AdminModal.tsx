import type { FormEvent, ReactNode } from "react";
import "./AdminModal.css";

interface AdminModalProps {
  open: boolean;
  title: string;
  saving?: boolean;
  error?: string | null;
  children: ReactNode;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function AdminModal({ open, title, saving = false, error, children, onClose, onSubmit }: AdminModalProps) {
  if (!open) return null;

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title">
        <header><h2 id="admin-modal-title">{title}</h2><button type="button" onClick={onClose} aria-label="Close">×</button></header>
        <form onSubmit={onSubmit}>
          <div className="admin-modal-fields">{children}</div>
          {error && <p className="admin-modal-error" role="alert">{error}</p>}
          <footer><button type="button" onClick={onClose}>Cancel</button><button type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</button></footer>
        </form>
      </section>
    </div>
  );
}
