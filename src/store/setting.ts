import { defineStore } from "pinia";

const useLayOutSettingStore = defineStore("SettingStroe", {
  state: () => {
    return {
      fold: false,
      refresh: false,
    };
  },
});

export default useLayOutSettingStore;
