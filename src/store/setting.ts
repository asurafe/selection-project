import { defineStore } from "pinia";

const useLayOutSettingStore = defineStore("SettingStroe", {
  state: () => {
    return {
      fold: false,
    };
  },
});

export default useLayOutSettingStore;
