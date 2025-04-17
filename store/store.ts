import { create } from "zustand";
import { Status } from "types/type";


interface storeState {
  status: Status;
  powerStatus: Status;
  setStatus: (value: Status) => void;
  togglePower: (value: Status) => void;
}

const useStore = create<storeState>((set) => ({
  status: 0,
  powerStatus: 0,
  setStatus: (newstatus) => set({ status: newstatus }),
  togglePower: (newPowerStatus) => set({ powerStatus: newPowerStatus }),
}));

export default useStore;
