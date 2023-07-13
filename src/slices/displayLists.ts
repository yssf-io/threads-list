import { List } from "@/app/(components)/CreateList";
import { StateCreator, create } from "zustand";

export interface DisplayList {
  name: string;
  show: boolean;
}

export interface ListSlice {
  lists: DisplayList[];
  showList: (name: string) => void;
  updateDisplayLists: (lists: List[]) => void;
  showCreateList: boolean;
  toggleCreateList: () => void;
  existingLists: List[] | undefined;
  updateExistingLists: (lists: List[]) => void;
}

export const createListSlice: StateCreator<ListSlice> = (set, get) => ({
  lists: [],
  showList: (name: string) => {
    set({
      lists: [
        ...get().lists.filter((l) => l.name !== name),
        { name, show: !get().lists.find((l) => l.name === name)!.show },
      ],
    });
  },
  updateDisplayLists: (lists: List[]) => {
    set({
      lists: lists.map((l) => ({ name: l.name, show: l.show || false })),
    });
  },
  showCreateList: false,
  toggleCreateList: () => {
    set({ showCreateList: !get().showCreateList });
  },
  existingLists: undefined,
  updateExistingLists: (lists: List[]) => {
    set({ existingLists: lists });
  },
});

export const useListStore = create<ListSlice>()((...a) => ({
  ...createListSlice(...a),
}));
