import { List } from "@/app/(components)/CreateList";
import { StateCreator, create } from "zustand";

export interface DisplayList {
  name: string;
  show: boolean;
}

export interface ListSlice {
  lists: DisplayList[];
  showList: (name: string) => void;
  updateLists: (lists: List[]) => void;
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
  updateLists: (lists: List[]) => {
    set({
      lists: lists.map((l) => ({ name: l.name, show: l.show || false })),
    });
  },
});

export const useListStore = create<ListSlice>()((...a) => ({
  ...createListSlice(...a),
}));
