# Kama237 - Plateforme Immobilière Camerounaise

Une plateforme immobilière moderne, rapide et sérieuse pour trouver votre maison au Cameroun.

**Slogan:** "Trouve ta maison au 237 – Facile, rapide, sérieux"

## 🚀 Caractéristiques

### Pages Principales

- **Accueil (`/`)** - Landing page avec hero section, annonces récentes, villes populaires, features et CTA
- **Annonces (`/annonces`)** - Liste complète des propriétés avec filtres avancés (type, transaction, ville, budget)
- **Détail Annonce (`/annonces/[id]`)** - Vue détaillée avec galerie photos, caractéristiques, équipements et contact agent
- **Publier (`/publier`)** - Formulaire multi-étapes pour publier une annonce gratuitement
- **Profil (`/profil`)** - Dashboard utilisateur avec mes annonces, favoris, messages et paramètres
- **Authentification** - Pages de connexion et inscription

### Fonctionnalités

✓ **Recherche et Filtres Avancés**
- Filtrer par type de bien (Appartement, Maison, Terrain, Studio, Villa, Commerce)
- Filtrer par transaction (À louer, À vendre)
- Filtrer par ville/quartier
- Filtrer par budget (min-max)

✓ **Annonces Complètes**
- Galerie photos avec carousel
- Caractéristiques détaillées (chambres, salles de bain, superficie)
- Équipements listés
- Prix formaté en FCFA
- Tags (Nouveau, Urgent, En vedette)

✓ **Formulaire de Publication**
- Formulaire multi-étapes (3 étapes)
- Upload de photos
- Gestion des équipements
- Validation complète

✓ **Dashboard Utilisateur**
- Gestion des annonces personnelles
- Système de favoris
- Gestion des messages
- Paramètres de compte

✓ **Design Moderne**
- Thème couleur Cameroun (vert #006600, or #FFD700, rouge #CC0000)
- Mode sombre supporté
- Responsive 100% (mobile, tablette, desktop)
- Animations fluides avec Framer Motion

## 🛠️ Stack Technique

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Formulaires:** React Hook Form + Zod
- **Typage:** TypeScript

## 📦 Installation

### Prérequis
- Node.js 18+
- pnpm (gestionnaire de paquets par défaut)

### Démarrage Rapide

1. **Cloner le projet**
   ```bash
   git clone <votre-repo>
   cd kama237
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   pnpm dev
   ```

4. **Ouvrir le navigateur**
   ```
   http://localhost:3000
   ```

## 📁 Structure du Projet

```
app/
├── layout.tsx           # Layout root
├── page.tsx            # Page d'accueil
├── globals.css         # Styles globaux
├── annonces/
│   ├── page.tsx        # Liste des annonces
│   └── [id]/
│       └── page.tsx    # Détail d'une annonce
├── publier/
│   └── page.tsx        # Formulaire de publication
├── profil/
│   └── page.tsx        # Dashboard utilisateur
└── auth/
    ├── signin/
    │   └── page.tsx    # Connexion
    └── signup/
        └── page.tsx    # Inscription

components/
├── navbar.tsx          # Barre de navigation
├── footer.tsx          # Pied de page
├── property-card.tsx   # Carte d'annonce
├── search-bar.tsx      # Barre de recherche
├── filter-sidebar.tsx  # Filtres latéraux
├── image-carousel.tsx  # Galerie photos
└── sections/
    ├── hero.tsx        # Hero section
    ├── recent-listings.tsx
    ├── popular-cities.tsx
    ├── features.tsx
    └── cta.tsx

lib/
└── properties.ts       # Données fictives et utilitaires

public/
├── hero-bg.jpg        # Image de fond hero
└── ...                # Assets
```

## 🎨 Palette Couleurs

### Mode Clair
- **Primary (Vert):** `#006600`
- **Accent (Or):** `#FFD700`
- **Destructive (Rouge):** `#CC0000`
- **Background:** `#f8f9fa`
- **Foreground:** `#1a1a1a`

### Mode Sombre
- **Primary:** `#00aa44`
- **Accent:** `#FFD700`
- **Background:** `#0f172a`
- **Foreground:** `#f0f0f0`

## 🔄 Données

Les données sont actuellement fictives et stockées dans `/lib/properties.ts`. Contient 12 annonces variées avec:
- Différentes villes camerounaises
- Différents types de propriétés
- Prix réalistes (location 150k-800k FCFA/mois, vente 30M-300M FCFA)
- Images de haute qualité

## 🚀 Déploiement

### Sur Vercel (Recommandé)

1. **Connecter votre GitHub**
   - Faire un push du code vers GitHub
   - Connecter le repo sur Vercel

2. **Déployer**
   ```bash
   vercel deploy
   ```

### Sur d'autres plateformes

```bash
# Build
pnpm build

# Start en production
pnpm start
```

## 🔜 Fonctionnalités Futures

- [ ] Authentification réelle avec Clerk ou Auth.js
- [ ] Base de données (Supabase, Neon, etc.)
- [ ] Paiement en ligne (Stripe)
- [ ] Système de messagerie en temps réel
- [ ] Notifications push
- [ ] Intégration Google Maps
- [ ] Système d'avis utilisateurs
- [ ] Tableau de bord agent immobilier avancé

## 📝 Notes de Développement

### Animations
Toutes les animations utilisent Framer Motion:
- Hover effects sur les cards (`scale: 1.03`)
- Fade-in et slide-up au scroll (`whileInView`)
- Transitions fluides entre pages
- Indicateurs animés

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`
- Navigation mobile avec sheet collapsible
- Filtres responsifs (sheet sur mobile, sidebar sur desktop)

### Performance
- Images optimisées avec Next.js Image
- Code splitting automatique
- Lazy loading des composants
- CSS modules et Tailwind pour styling optimisé

## 📄 Licences & Attributions

Ce projet utilise:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)

## 💬 Support

Pour toute question ou suggestion, contactez-nous via:
- Email: support@kama237.cm
- WhatsApp: +237 6 XX XXX XXX

---

**Kama237 © 2025 - Trouve ta maison au 237**
