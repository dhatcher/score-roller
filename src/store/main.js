import {writable} from "svelte/store";

export const SettingPreset = {
    NONE:"none",
    DEFAULT:"default",
    OLD_SCHOOL:"old_school",
    POINT_BUY:"point_buy",
    HERO:"hero"
};

export const statsStore = writable({numberOfSets:0, totalCost:0});
export const notificationStore = writable(undefined);
export const settingsStore = createSettingsStore();
export const scoreStore = writable([
    {score:8, rolls:[], cost:0, bonus:-1},
    {score:8, rolls:[], cost:0, bonus:-1},
    {score:8, rolls:[], cost:0, bonus:-1},
    {score:8, rolls:[], cost:0, bonus:-1},
    {score:8, rolls:[], cost:0, bonus:-1},
    {score:8, rolls:[], cost:0, bonus:-1}
]);

function createSettingsStore() {
    const {subscribe, set, update} = writable({
        preset:SettingPreset.DEFAULT,
        dicePerScore:4,
        allowNegativeCost:false,
        highScoreCost:2,
        minScore:3,
        maxScore:18,
        pointBuyMin:0,
        pointBuyMax:90
    });

    return {
        subscribe,
        set,
        update,
        preset: (presetType=SettingPreset.DEFAULT) => {
            switch (presetType) {
                case SettingPreset.DEFAULT:
                    set({
                        preset:presetType,
                        dicePerScore:4,
                        allowNegativeCost:false,
                        highScoreCost:2,
                        minScore:3,
                        maxScore:18,
                        pointBuyMin:0,
                        pointBuyMax:90
                    });
                    break;
                case SettingPreset.OLD_SCHOOL:
                    set({
                        preset:presetType,
                        dicePerScore:3,
                        allowNegativeCost:false,
                        highScoreCost:2,
                        minScore:3,
                        maxScore:18,
                        pointBuyMin:0,
                        pointBuyMax:90
                    });
                    break;
                case SettingPreset.POINT_BUY:
                    set({
                        preset:presetType,
                        dicePerScore:4,
                        allowNegativeCost:false,
                        highScoreCost:2,
                        minScore:8,
                        maxScore:15,
                        pointBuyMin:27,
                        pointBuyMax:27
                    });
                    break;
                case SettingPreset.HERO:
                    set({
                        preset:presetType,
                        dicePerScore:4,
                        allowNegativeCost:false,
                        highScoreCost:2,
                        minScore:10,
                        maxScore:18,
                        pointBuyMin:28,
                        pointBuyMax:90
                    });
                    break;
            }
        }
    }
}


