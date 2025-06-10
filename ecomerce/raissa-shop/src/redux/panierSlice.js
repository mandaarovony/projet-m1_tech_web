import { createSlice } from "@reduxjs/toolkit";

const panierSlice = createSlice({
  name: "panier",
  initialState: {
    panierId: null,
    items: [],
  },
  reducers: {
    setPanierId: (state, action) => {
      console.log("🆔 Redux - panierId défini :", action.payload);
      state.panierId = action.payload;
    },
    ajouterAuPanier: (state, action) => {
      console.log("🛍️ Redux - ajout au panier :", action.payload);
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    retirerDuPanier: (state, action) => {
      console.log("🗑️ Redux - retrait du produit :", action.payload);
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    augmenterQuantite: (state, action) => {
      const produit = state.items.find((item) => item.id === action.payload);
      if (produit) {
        produit.quantity += 1;
        console.log("➕ Quantité augmentée :", produit);
      }
    },
    diminuerQuantite: (state, action) => {
      const produit = state.items.find((item) => item.id === action.payload);
      if (produit && produit.quantity > 1) {
        produit.quantity -= 1;
        console.log("➖ Quantité diminuée :", produit);
      }
    },
    viderPanier: (state) => {
      state.items = [];
      state.panierId = null;
    },
  },
});

export const {
  setPanierId,
  ajouterAuPanier,
  retirerDuPanier,
  augmenterQuantite,
  diminuerQuantite,viderPanier,
} = panierSlice.actions;

export default panierSlice.reducer;
