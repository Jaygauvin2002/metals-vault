# Metals Vault

PWA de suivi de portefeuille de métaux précieux — **or, argent, cuivre**. Interface en français québécois, thème sombre. Fonctionne sur MacBook (colonne centrée, graphiques au survol) et iPhone (« Sur l'écran d'accueil »).

## Fonctionnalités
- Portefeuille en temps réel : valeur, investi, primes, plus-value (montant + %)
- Cours spot (gold-api.com), cuivre converti par once troy (÷ 14,5833)
- Multi-devises (taux du jour via open.er-api.com), défaut CAD
- Positions : ajout, **édition**, suppression, avec **prime payée** optionnelle
- Alertes de prix + notifications
- **Onglet Historique** : graphique interactif (survol/tap), périodes 7J/1M/3M/6M/1A/Max, série par métal
- **Anneau d'allocation** (donut), coût vs valeur et performance par métal
- Enregistrement du **prix de chaque métal** jour après jour (courbes)
- **Sauvegarde / restauration JSON** complète + export CSV
- **Mode hors ligne** (service worker, app-shell caché)
- Pull-to-refresh + rafraîchissement au retour dans l'app
- **Onglet Panama** : comparateur fiscal Québec vs Panama (taux modifiable) + checklist de relocalisation
- 100 % local : vos données restent sur votre appareil (localStorage)

## Utilisation
Ouvrez le site, puis sur iPhone : **Partager → Sur l'écran d'accueil**.

Aucune dépendance, aucun build : tout tient dans `index.html`.
