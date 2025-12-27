# 🗺️ Roadtrip Mobile App - Specification Complete

## 🎯 Vue d'ensemble du projet

Tu es un expert React Native / Expo chargé de concevoir une application mobile moderne de visualisation de roadtrips sur carte du monde.

**Plateformes cibles :**
- iOS ≥ 18.2
- Android (dernières versions stables)

**Principe :** L'application permet à des voyageurs de visualiser sur une carte OpenStreetMap interactive l'ensemble de leurs roadtrips/voyages, composés de routes, étapes/points d'intérêt, articles et galeries photos.

**⚠️ Contraintes importantes :**
- Pas de backend pour l'instant (toutes les données sont mockées via JSON)
- Architecture OBLIGATOIREMENT prête pour un futur backend REST
- Qualité de code maximale : réutilisabilité, maintenabilité, testabilité

---

## 🧱 Stack technique IMPOSÉE

### Core
- **React Native** (dernière version stable)
- **Expo** (dernière version stable - SDK 52+)
- **TypeScript** (strict mode activé)

### Navigation & Routing
- **Expo Router** (file-based routing)

### State Management
- **Zustand** (state global léger)
- **React Query / TanStack Query v5** (cache, loading, erreurs - même avec mock data)

### UI & Animations
- **React Native Maps** avec provider OpenStreetMap
- **React Native Reanimated v3** (animations performantes)
- **React Native Gesture Handler** (gestures natifs)
- **React Native Bottom Sheet** (@gorhom/bottom-sheet)
- **Lottie** (animations complexes)
- **Expo Image** (optimisation images)
- **Expo Haptics** (feedback haptique)

### Forms & Validation
- **React Hook Form** (gestion formulaires)
- **Zod** (validation schémas TypeScript)

### Storage & Auth
- **Expo SecureStore** (auth mockée sécurisée)

### Code Quality
- **ESLint** (avec config Expo/TypeScript)
- **Prettier** (formatage automatique)
- **TypeScript strict** (noImplicitAny, strictNullChecks, etc.)

**⚠️ Tous les packages doivent être :**
- À jour (dernière version stable)
- Populaires et maintenus activement
- Compatibles iOS 18.2+ et Android
- Avec support TypeScript natif

---

## 🧩 Principes d'architecture STRICTS

### Règles de composants
1. **1 composant = 1 useEffect maximum**
2. **Logique métier OBLIGATOIREMENT extraite dans :**
   - Hooks custom (`useRoadtrips`, `useAuth`, `useMapRoutes`, etc.)
   - Services (simulation API)
   - Stores Zustand
3. **Composants 100% réutilisables** - pas de duplication de code
4. **Composants purement présentiels** autant que possible (dumb components)
5. **Séparation stricte des responsabilités :**
   - UI (présentation)
   - Logique (business logic)
   - Data (fetching, caching)
   - Navigation (routing)

### Anti-patterns à éviter absolument
❌ Logique métier dans les composants  
❌ Duplication de code  
❌ Props drilling excessif  
❌ Composants > 250 lignes  
❌ Utilisation de `any` en TypeScript  
❌ Fetch direct dans les composants (utiliser React Query)  

### Patterns à respecter
✅ Composition over inheritance  
✅ Single Responsibility Principle  
✅ DRY (Don't Repeat Yourself)  
✅ Hooks custom pour la logique réutilisable  
✅ Services pour abstraire les appels data  
✅ Types partagés et réutilisés  

---

## 📁 Structure de projet ATTENDUE

```
roadtrip-app/
├── src/
│   ├── app/                          # Expo Router (file-based routing)
│   │   ├── (auth)/                   # Auth screens (login, register)
│   │   │   ├── login.tsx
│   │   │   └── _layout.tsx
│   │   ├── (tabs)/                   # Bottom tabs navigation
│   │   │   ├── index.tsx             # Map screen
│   │   │   ├── roadtrips.tsx         # Roadtrips list
│   │   │   ├── profile.tsx           # User profile
│   │   │   └── _layout.tsx
│   │   ├── roadtrip/
│   │   │   └── [id].tsx              # Roadtrip detail
│   │   ├── point/
│   │   │   └── [id].tsx              # Point of interest detail
│   │   ├── article/
│   │   │   └── [id].tsx              # Article detail
│   │   ├── gallery/
│   │   │   └── [id].tsx              # Gallery viewer
│   │   └── _layout.tsx               # Root layout
│   │
│   ├── components/                   # Composants UI réutilisables
│   │   ├── map/
│   │   │   ├── MapView.tsx
│   │   │   ├── RoutePolyline.tsx
│   │   │   ├── CustomMarker.tsx
│   │   │   └── MapControls.tsx
│   │   ├── roadtrip/
│   │   │   ├── RoadtripCard.tsx
│   │   │   ├── RoadtripTimeline.tsx
│   │   │   └── RoadtripHeader.tsx
│   │   ├── article/
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleContent.tsx
│   │   │   └── MarkdownRenderer.tsx
│   │   ├── gallery/
│   │   │   ├── PhotoGrid.tsx
│   │   │   ├── PhotoViewer.tsx
│   │   │   └── PhotoThumbnail.tsx
│   │   ├── ui/                       # Composants génériques
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── BottomSheet.tsx
│   │   │   └── Skeleton.tsx
│   │   └── common/
│   │       ├── ErrorBoundary.tsx
│   │       └── Screen.tsx
│   │
│   ├── hooks/                        # Custom hooks
│   │   ├── useRoadtrips.ts
│   │   ├── usePoints.ts
│   │   ├── useArticles.ts
│   │   ├── useGalleries.ts
│   │   ├── useAuth.ts
│   │   ├── useMapRoutes.ts
│   │   └── useTheme.ts
│   │
│   ├── stores/                       # Zustand stores
│   │   ├── authStore.ts
│   │   ├── mapStore.ts
│   │   ├── themeStore.ts
│   │   └── index.ts
│   │
│   ├── services/                     # Services (simulation API)
│   │   ├── api/
│   │   │   ├── roadtrips.service.ts
│   │   │   ├── points.service.ts
│   │   │   ├── articles.service.ts
│   │   │   ├── galleries.service.ts
│   │   │   └── auth.service.ts
│   │   ├── storage/
│   │   │   └── secureStorage.ts
│   │   └── mock/
│   │       └── mockApi.ts            # Simulate API delays/errors
│   │
│   ├── constants/                    # Constantes & mock data
│   │   ├── mock/
│   │   │   ├── users.json
│   │   │   ├── roadtrips.json
│   │   │   ├── points.json
│   │   │   ├── articles.json
│   │   │   └── galleries.json
│   │   ├── theme.ts
│   │   ├── config.ts
│   │   └── routes.ts
│   │
│   ├── types/                        # Types TypeScript
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Roadtrip.ts
│   │   │   ├── Point.ts
│   │   │   ├── Article.ts
│   │   │   └── Gallery.ts
│   │   ├── api.ts
│   │   ├── navigation.ts
│   │   └── index.ts
│   │
│   ├── utils/                        # Utilitaires
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   ├── animations.ts
│   │   └── helpers.ts
│   │
│   ├── animations/                   # Animations Lottie
│   │   ├── loading.json
│   │   └── success.json
│   │
│   └── theme/                        # Système de design
│       ├── colors.ts
│       ├── typography.ts
│       ├── spacing.ts
│       └── index.ts
│
├── __tests__/                        # Tests unitaires et intégration
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
│
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI/CD
│
├── app.json
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
└── README.md
```

---

## 🗺️ Fonctionnalités CLÉS à développer

### 🔐 1. Authentification (mockée)

**Fonctionnalités :**
- Login / Logout
- Auth requise pour :
  - Créer roadtrip
  - Ajouter points d'intérêt
  - Publier articles & photos
- Basée sur JSON mock + SecureStore (token simulé)

**Implémentation :**
- Store Zustand pour l'état auth
- Service auth simulant des appels API (délais, erreurs)
- React Query pour gérer le cache user
- Formulaires avec React Hook Form + Zod validation

---

### 🌍 2. Carte monde (OpenStreetMap)

**Fonctionnalités :**
- Carte interactive (pan, zoom, rotate)
- Affichage :
  - **Routes de roadtrips** (polylines colorées animées)
  - **Points d'intérêt** (markers custom animés)
- **Sélection d'une route :**
  - Surbrillance animée (Reanimated)
  - Zoom automatique vers la route
  - Affichage métadonnées
- **Sélection d'un point :**
  - Bottom sheet avec détails
  - Animations d'entrée fluides
  - Haptic feedback

**Composants clés :**
- `MapView` (wrapper React Native Maps)
- `RoutePolyline` (polyline animée avec Reanimated)
- `CustomMarker` (marker animé personnalisé)
- `MapControls` (boutons zoom, recenter, etc.)

---

### 🚗 3. Roadtrip

**Modèle de données :**
```typescript
interface Roadtrip {
  id: string;
  userId: string;
  title: string;
  description: string;
  countries: string[];
  polyline: LatLng[]; // Coordonnées de la route
  startDate: Date;
  endDate: Date;
  points: string[]; // IDs des points d'intérêt
  coverImage?: string;
  stats: {
    distance: number; // en km
    duration: number; // en jours
  };
}
```

**Affichage :**
- **Vue carte** : polyline + markers
- **Vue timeline verticale** : étapes ordonnées avec animations
- **Détails** : header, description, stats, étapes

**Interactions :**
- Clic sur roadtrip → navigation vers détails
- Clic sur étape → bottom sheet point d'intérêt

---

### 📍 4. Points d'intérêt / Étapes

**Modèle de données :**
```typescript
interface Point {
  id: string;
  roadtripId: string;
  title: string;
  description: string;
  coordinates: LatLng;
  type: 'city' | 'monument' | 'nature' | 'food' | 'accommodation';
  date: Date;
  order: number; // Position dans le roadtrip
  articles: string[]; // IDs des articles
  galleries: string[]; // IDs des galeries
  coverImage?: string;
}
```

**Affichage :**
- Marker custom sur carte (icône selon type)
- Bottom sheet au clic avec :
  - Titre, description
  - Date de visite
  - Liste des articles associés
  - Galeries photos
  - Bouton "Voir plus"

**Animations :**
- Bounce du marker au clic
- Slide-in du bottom sheet
- Haptic feedback

---

### 📝 5. Articles

**Modèle de données :**
```typescript
interface Article {
  id: string;
  pointId: string;
  title: string;
  content: string; // Markdown
  coverImage?: string;
  images: string[];
  publishedAt: Date;
  author: string; // userId
}
```

**Affichage :**
- Liste dans point d'intérêt
- Vue détail :
  - Header image
  - Titre, date
  - Contenu markdown rendu
  - Galerie images intégrée

**Animations :**
- Transitions de page fluides
- Parallax header
- Fade-in du contenu

---

### 🖼️ 6. Galeries & photos

**Modèle de données :**
```typescript
interface Gallery {
  id: string;
  pointId: string;
  title: string;
  description?: string;
  images: Image[];
  createdAt: Date;
}

interface Image {
  id: string;
  uri: string;
  thumbnail: string;
  width: number;
  height: number;
  caption?: string;
}
```

**Affichage :**
- **Grille moderne** (PhotoGrid) : masonry ou grid responsive
- **Fullscreen viewer** (PhotoViewer) :
  - Swipe horizontal entre photos
  - Pinch to zoom (Gesture Handler)
  - Double-tap to zoom
  - Caption overlay
  - Bouton fermer

**Optimisations :**
- Lazy loading (images chargées au scroll)
- Thumbnails pour la grille
- Expo Image (cache automatique)
- Animations Reanimated (zoom, swipe)

---

### 👤 7. Profil utilisateur (public)

**Fonctionnalités :**
- Accès via lien profil
- Carte monde avec tous les roadtrips de l'utilisateur
- Stats globales :
  - Nombre de roadtrips
  - Distance totale parcourue
  - Nombre de pays visités
- Sélection roadtrip → navigation directe vers détails

**Composants :**
- `ProfileHeader` (avatar, nom, bio, stats)
- `UserMap` (carte avec tous roadtrips)
- `RoadtripList` (liste filtrée)

---

## 🎨 UI / UX & ANIMATIONS

### Design System

**Principes :**
- **Minimaliste** : pas de surcharge visuelle
- **Typographie claire** : hiérarchie visible
- **Espacement cohérent** : système 4/8/16/24/32px
- **Couleurs harmonieuses** : palette limitée (3-4 couleurs primaires)
- **Dark / Light mode** : support obligatoire

**Animations subtiles mais présentes :**
- Transitions de pages (Expo Router)
- Hover/press states sur markers
- Bottom sheets (slide-in/out)
- Loading skeletons (pas de spinners basiques)
- Pull-to-refresh
- List animations (stagger)

**Feedback utilisateur :**
- **Haptic feedback** sur interactions importantes
- **Loading states** visuels (skeletons > spinners)
- **Error states** clairs avec actions
- **Success feedback** (animations Lottie)

### Animations Reanimated v3

**À utiliser pour :**
- Polylines animées (dash effect)
- Markers bounce/scale
- Bottom sheet gestures
- Photo zoom/pan
- Scroll parallax
- Page transitions

**Performances :**
- Animations sur UI thread (worklets)
- 60fps minimum
- Pas de jank

---

## 📊 Données MOCKÉES - Architecture

### Structure Mock Data

**Principe :** Simuler un vrai backend REST avec :
- Délais réseau réalistes (200-800ms)
- Possibilité d'erreurs (5% du temps)
- Pagination (même si tout est en local)
- Filtres & tri

### Services API mockés

```typescript
// services/api/roadtrips.service.ts
export const roadtripsService = {
  getAll: async (): Promise<Roadtrip[]> => {
    await mockDelay(300);
    return mockRoadtrips;
  },
  
  getById: async (id: string): Promise<Roadtrip> => {
    await mockDelay(200);
    const roadtrip = mockRoadtrips.find(r => r.id === id);
    if (!roadtrip) throw new Error('Roadtrip not found');
    return roadtrip;
  },
  
  // ... autres méthodes
};
```

### React Query Integration

**Toutes les données DOIVENT passer par React Query :**

```typescript
// hooks/useRoadtrips.ts
export const useRoadtrips = () => {
  return useQuery({
    queryKey: ['roadtrips'],
    queryFn: roadtripsService.getAll,
    staleTime: 5 * 60 * 1000, // 5min
  });
};

export const useRoadtrip = (id: string) => {
  return useQuery({
    queryKey: ['roadtrips', id],
    queryFn: () => roadtripsService.getById(id),
    enabled: !!id,
  });
};
```

**Bénéfices :**
- Cache automatique
- Loading/error states
- Refetch logic
- Architecture identique au futur backend

---

## 🧪 Tests & Qualité du code

### Tests OBLIGATOIRES

**Frameworks :**
- **Jest** (test runner)
- **React Native Testing Library** (composants)
- **@testing-library/react-hooks** (hooks)

**Couverture minimale attendue :**
- Hooks custom : **100%**
- Services : **100%**
- Utils : **100%**
- Composants UI : **≥80%**

**Types de tests :**
1. **Tests unitaires** :
   - Hooks
   - Services
   - Utils
   - Stores Zustand

2. **Tests d'intégration** :
   - Composants avec hooks
   - Navigation flows
   - Formulaires

3. **Tests de snapshot** :
   - Composants UI critiques

**Exemple de test :**
```typescript
// __tests__/hooks/useRoadtrips.test.ts
import { renderHook, waitFor } from '@testing-library/react-hooks';
import { useRoadtrips } from '@/hooks/useRoadtrips';

describe('useRoadtrips', () => {
  it('should fetch roadtrips successfully', async () => {
    const { result } = renderHook(() => useRoadtrips());
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toHaveLength(5);
    expect(result.current.data[0]).toHaveProperty('id');
  });
});
```

### Qualité TypeScript

**Règles strictes :**
- `strict: true` dans tsconfig
- **Aucun `any`** - utiliser `unknown` ou types précis
- Tous les props typés
- Tous les retours de fonctions typés
- Types réutilisables dans `/types`

**Exemple :**
```typescript
// ❌ Interdit
const handlePress = (data: any) => {
  console.log(data.id);
};

// ✅ Correct
const handlePress = (data: Roadtrip) => {
  console.log(data.id);
};
```

### Code Quality Tools

**ESLint :**
- Config Expo + TypeScript
- Règles strictes (no-unused-vars, no-console en prod, etc.)
- Auto-fix au save

**Prettier :**
- Formatage automatique
- Config cohérente (single quotes, 2 spaces, etc.)

**Pre-commit hooks (Husky) :**
- Lint avant commit
- Format avant commit
- Tests avant push

---

## 🔄 CI/CD - GitHub Actions

### Pipeline CI OBLIGATOIRE

**Fichier : `.github/workflows/ci.yml`**

**Étapes du pipeline :**

1. **Install & Cache**
   - Install dependencies
   - Cache node_modules

2. **Lint & Format**
   - ESLint check
   - Prettier check
   - TypeScript check

3. **Tests**
   - Unit tests
   - Coverage report
   - Upload coverage (optionnel : Codecov)

4. **Security Audit**
   - `npm audit` (check vulnérabilités)
   - Fail si vulnérabilités high/critical

5. **Build iOS**
   - EAS Build ou local build
   - Vérifier que build iOS passe

6. **Build Android**
   - EAS Build ou local build
   - Vérifier que build Android passe

**Exemple de workflow :**
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Run tests
        run: npm run test:ci
      
      - name: Security audit
        run: npm audit --audit-level=high
  
  build-ios:
    runs-on: macos-latest
    needs: lint-and-test
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build iOS
        run: npx expo prebuild --platform ios && cd ios && xcodebuild -workspace *.xcworkspace -scheme * -configuration Release -sdk iphonesimulator
  
  build-android:
    runs-on: ubuntu-latest
    needs: lint-and-test
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Android
        run: npx expo prebuild --platform android && cd android && ./gradlew assembleRelease
```

**Triggers :**
- Tous les commits sur `main` et `develop`
- Toutes les pull requests
- Peut être déclenché manuellement

**Notifications :**
- Badge status dans README
- Notifications Slack/Discord (optionnel)

---

## 🎯 Livrables ATTENDUS

### 1. Architecture complète

- Structure de dossiers respectée
- Séparation claire des responsabilités
- Documentation inline (JSDoc pour fonctions publiques)

### 2. Types TypeScript

- Tous les modèles typés (`/types/models`)
- Types API (`/types/api.ts`)
- Types navigation (`/types/navigation.ts`)
- Pas de `any`, typage strict

### 3. Mock Data JSON

- `/constants/mock/users.json` (3-5 users)
- `/constants/mock/roadtrips.json` (5-10 roadtrips)
- `/constants/mock/points.json` (20-30 points)
- `/constants/mock/articles.json` (10-15 articles)
- `/constants/mock/galleries.json` (5-10 galeries)

**Données réalistes et cohérentes :**
- Relations correctes (roadtrip → points → articles)
- Coordonnées réelles
- Dates cohérentes

### 4. Stores Zustand

- `authStore` (user, token, login/logout)
- `mapStore` (selected roadtrip, zoom level, etc.)
- `themeStore` (dark/light mode)

### 5. Hooks custom

- `useRoadtrips`, `useRoadtrip(id)`
- `usePoints`, `usePoint(id)`
- `useArticles`, `useArticle(id)`
- `useGalleries`, `useGallery(id)`
- `useAuth`
- `useMapRoutes`
- `useTheme`

### 6. Navigation Expo Router

- File-based routing configuré
- Auth flow ((auth) group)
- Tabs navigation ((tabs) group)
- Deep linking configuré
- Types navigation générés

### 7. Composants UI clés

**Map :**
- `MapView` avec OpenStreetMap
- `RoutePolyline` (animée)
- `CustomMarker` (avec animations)
- `MapControls`

**Roadtrip :**
- `RoadtripCard`
- `RoadtripTimeline`
- `RoadtripHeader`

**UI générique :**
- `Button`, `Card`, `Input`
- `Loading`, `Skeleton`
- `BottomSheet`
- `ErrorBoundary`

**Gallery :**
- `PhotoGrid`
- `PhotoViewer` (fullscreen + gestures)

### 8. Animations Reanimated

- Polyline animée (dash effect ou fade-in)
- Marker bounce/scale
- Bottom sheet gesture-driven
- Photo zoom/pan
- Page transitions

### 9. Tests

- Tests unitaires (hooks, services, utils)
- Tests composants (render, interactions)
- Coverage ≥80%

### 10. CI/CD

- GitHub Actions workflow fonctionnel
- Lint, tests, security audit
- Build iOS & Android

### 11. Flow complet fonctionnel

**Exemple de user journey à démontrer :**

1. **Login** (mock auth)
2. **Carte** affiche tous les roadtrips
3. **Sélection roadtrip** → zoom + surbrillance
4. **Clic marker point** → bottom sheet détails
5. **Navigation article** → vue markdown
6. **Navigation galerie** → fullscreen viewer avec gestures
7. **Retour carte** → smooth transition

---

## 📋 Checklist finale avant livraison

### Code Quality
- [ ] Aucun `any` TypeScript
- [ ] Tous composants réutilisables (pas de duplication)
- [ ] Tous packages à jour (latest stable)
- [ ] ESLint 0 warning/error
- [ ] Prettier appliqué partout
- [ ] Commentaires JSDoc sur fonctions publiques

### Architecture
- [ ] 1 composant = 1 useEffect max
- [ ] Logique métier dans hooks/services/stores
- [ ] Composants < 250 lignes
- [ ] Types réutilisables dans `/types`
- [ ] Mock data réalistes et cohérents

### Features
- [ ] Auth mockée fonctionnelle
- [ ] Carte avec routes + markers
- [ ] Sélection roadtrip/point fonctionnelle
- [ ] Bottom sheets animés
- [ ] Articles + markdown rendering
- [ ] Galerie photos + fullscreen viewer
- [ ] Gestures (pinch, swipe) fonctionnels
- [ ] Dark/Light mode

### Tests
- [ ] Tests hooks (100%)
- [ ] Tests services (100%)
- [ ] Tests composants (≥80%)
- [ ] Tests passent en CI

### CI/CD
- [ ] GitHub Actions workflow créé
- [ ] Lint + tests + audit dans CI
- [ ] Build iOS vérifié
- [ ] Build Android vérifié
- [ ] Badge status dans README

### UX
- [ ] Loading states partout
- [ ] Error states gérés
- [ ] Haptic feedback sur actions importantes
- [ ] Animations fluides (60fps)
- [ ] Pas de performance issues

### Documentation
- [ ] README.md complet
- [ ] Instructions setup claires
- [ ] Scripts npm documentés
- [ ] Architecture expliquée

---

## 🚀 Commandes NPM attendues

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "type-check": "tsc --noEmit",
    "test": "jest --watch",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "test:coverage": "jest --coverage",
    "prebuild": "expo prebuild",
    "build:ios": "eas build --platform ios",
    "build:android": "eas build --platform android"
  }
}
```

---

## 🎓 Bonnes pratiques résumées

### Composants
✅ Réutilisables et génériques  
✅ Props typés strictement  
✅ 1 useEffect max  
✅ Logique extraite dans hooks  
✅ < 250 lignes  

### Hooks
✅ Logique métier isolée  
✅ Réutilisables entre composants  
✅ Testables indépendamment  
✅ Nommage `use[Nom]`  

### Services
✅ Simulent vrais appels API  
✅ Délais + erreurs mockés  
✅ Prêts pour backend  
✅ Testables  

### Stores