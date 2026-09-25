import { useEffect, useId, useRef } from "react";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

/**
 * Modale configurable, contrôlée par le parent.
 *
 * @param {boolean} isOpen - Affiche ou masque la modale.
 * @param {() => void} onClose - Callback de fermeture (overlay, Escape, bouton fermer).
 * @param {string} [title] - Titre optionnel de la modale.
 * @param {React.ReactNode} children - Contenu principal (texte, éléments custom…).
 * @param {string} [confirmLabel] - Label du bouton de confirmation (masqué si absent).
 * @param {() => void} [onConfirm] - Callback du bouton de confirmation.
 * @param {string} [closeLabel="Close"] - Label du bouton de fermeture.
 * @param {string} [overlayColor="rgba(15, 23, 42, 0.5)"] - Couleur de l'overlay.
 * @param {string} [backgroundColor="#ffffff"] - Couleur de fond de la boîte.
 * @param {string} [textColor="#0f172a"] - Couleur du texte.
 * @param {string} [accentColor="#0f766e"] - Couleur d'accent (boutons / titre).
 * @param {"sm"|"md"|"lg"} [size="md"] - Largeur max de la modale.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  confirmLabel,
  onConfirm,
  closeLabel = "Close",
  overlayColor = "rgba(15, 23, 42, 0.5)",
  backgroundColor = "#ffffff",
  textColor = "#0f172a",
  accentColor = "#0f766e",
  size = "md",
}) => {
  const titleId = useId();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: overlayColor }}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={`w-full rounded-lg p-6 shadow-lg outline-none ${sizeClasses[size] ?? sizeClasses.md}`}
        style={{ backgroundColor, color: textColor }}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          {title ? (
            <h3
              id={titleId}
              className="text-lg font-semibold"
              style={{ color: accentColor }}
            >
              {title}
            </h3>
          ) : (
            <span className="sr-only">Dialog</span>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="ml-auto cursor-pointer rounded px-2 py-1 text-xl leading-none opacity-70 transition hover:opacity-100"
            style={{ color: textColor }}
          >
            ×
          </button>
        </div>

        <div className="mb-6 text-base">{children}</div>

        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded border px-4 py-2 text-sm font-medium transition hover:bg-black/5"
            style={{ borderColor: textColor, color: textColor }}
          >
            {closeLabel}
          </button>

          {confirmLabel ? (
            <button
              type="button"
              onClick={handleConfirm}
              className="cursor-pointer rounded px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              {confirmLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;
