import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPosition {
  parentId: string;
  position: number;
}

export interface IPanelItem extends IPosition {
  itemId: string;
  uniqueId: string;
}

export interface IPanelsState {
  items: {
    [key: string]: IPanelItem;
  };
}

const initialState: IPanelsState = {
  items: {},
};

export const panelsSlice = createSlice({
  name: 'panels',
  initialState,
  reducers: {
    setItem: (
      state,
      action: PayloadAction<{ item: IPanelItem; position: IPosition }>
    ) => {
      const {
        item,
        position: { parentId, position },
      } = action.payload;
      const { uniqueId, itemId } = item;
      const { items } = state;

      const existing = Object.values(items).find(
        ({ parentId: existingParentId, position: existingPosition }) =>
          existingParentId === parentId && existingPosition === position
      );

      if (existing) {
        const { itemId: existingItemId, uniqueId: existingItemUniqueId } =
          existing;
        items[uniqueId] = {
          ...item,
          itemId: existingItemId,
        };

        items[existingItemUniqueId] = {
          ...existing,
          itemId,
        };

        return;
      }

      items[uniqueId] = {
        parentId,
        position,
        itemId,
        uniqueId,
      };
    },
  },
});

export const { setItem } = panelsSlice.actions;
