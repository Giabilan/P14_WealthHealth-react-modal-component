# wealthhealth-react-modal

Modale React **fonctionnelle** et **configurable**, conçue pour remplacer le plugin jQuery [jquery-modal](https://github.com/kylefox/jquery-modal) dans le projet HRnet (OpenClassrooms P14 — Wealth Health).

Le parent contrôle l’ouverture / la fermeture. Les textes, couleurs et la taille se personnalisent via des **props**.

---

## Installation

```bash
npm install wealthhealth-react-modal
```

### Développement local (avant / hors registry)

Depuis le dossier `frontend/` :

```bash
npm install ../Modal
```

---

## Prérequis

- React ≥ 18
- **Tailwind CSS** dans l’application hôte (le composant utilise des classes utilitaires pour le layout)

Avec Tailwind v4 + Vite, scanne le package dans ton CSS :

```css
@import "tailwindcss";
@source "../node_modules/wealthhealth-react-modal";
/* ou en local : */
@source "../../Modal";
```

---

## Import

```jsx
import Modal from "wealthhealth-react-modal";
```

---

## Props

| Prop | Type | Obligatoire | Défaut | Description |
|------|------|:-----------:|--------|-------------|
| `isOpen` | `boolean` | Oui | — | Affiche ou masque la modale. |
| `onClose` | `() => void` | Oui | — | Fermeture (overlay, Escape, ×, bouton Close). |
| `children` | `ReactNode` | Oui | — | Contenu principal. |
| `title` | `string` | Non | — | Titre (couleur = `accentColor`). |
| `confirmLabel` | `string` | Non | — | Label du bouton Confirm. Absent = bouton masqué. |
| `onConfirm` | `() => void` | Non | — | Callback Confirm (puis fermeture). |
| `closeLabel` | `string` | Non | `"Close"` | Label du bouton fermer + `aria-label` du ×. |
| `overlayColor` | `string` | Non | `"rgba(15, 23, 42, 0.5)"` | Couleur de l’overlay. |
| `backgroundColor` | `string` | Non | `"#ffffff"` | Fond de la boîte. |
| `textColor` | `string` | Non | `"#0f172a"` | Couleur du texte / bouton Close. |
| `accentColor` | `string` | Non | `"#0f766e"` | Accent (titre + bouton Confirm). |
| `size` | `"sm" \| "md" \| "lg"` | Non | `"md"` | Largeur max. |

Couleurs : toute valeur CSS valide (`#hex`, `rgb()`, `rgba()`, noms…).

---

## Styliser la modale

### Couleurs

```jsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Success"
  accentColor="#0f766e"
  backgroundColor="#ffffff"
  textColor="#0f172a"
  overlayColor="rgba(15, 23, 42, 0.5)"
>
  Employee Created!
</Modal>
```

### Taille

| `size` | Largeur max |
|--------|-------------|
| `sm` | `max-w-sm` |
| `md` | `max-w-md` (défaut) |
| `lg` | `max-w-lg` |

### Thème sombre

```jsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Attention"
  confirmLabel="Confirmer"
  onConfirm={handleConfirm}
  closeLabel="Annuler"
  overlayColor="rgba(0, 0, 0, 0.7)"
  backgroundColor="#1e293b"
  textColor="#f8fafc"
  accentColor="#38bdf8"
  size="lg"
>
  <p>Voulez-vous vraiment continuer ?</p>
</Modal>
```

---

## Exemple minimal

```jsx
import { useState } from "react";
import Modal from "wealthhealth-react-modal";

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Ouvrir
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Contenu simple de la modale.
      </Modal>
    </>
  );
};
```

---

## Comportements

- Fermeture : overlay, `Escape`, ×, bouton Close
- Confirmation : `onConfirm` puis `onClose` si `confirmLabel` est fourni
- A11y : `role="dialog"`, `aria-modal`, `aria-labelledby` (si `title`), focus à l’ouverture
- Si `isOpen === false` → rendu `null`

---

## Build (mainteneurs)

```bash
cd Modal
npm install
npm run build
```

Le script `prepublishOnly` lance le build automatiquement avant `npm publish`.

---

## Licence

MIT
