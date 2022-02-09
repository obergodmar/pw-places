import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';
import { IPanelItem } from '../reducers';

export const screenSelector = (state: RootState) => state.screen;

export const placeSelector = (state: RootState) => state.place;

export const panelsSelector = (state: RootState) => state.panels;

export const panelItemsSelector = (id: string) =>
  createSelector(panelsSelector, ({ items }) =>
    Object.values(items).reduce((acc: IPanelItem[], item) => {
      const { parentId, position } = item;

      if (parentId === id) {
        acc[position] = item;
      }

      return acc;
    }, [])
  );
