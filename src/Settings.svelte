<script>

    import {settingsStore} from "./store/main";
    import {onDestroy, onMount} from "svelte";

    let settingsBlock;
    let showSettings = false;
    let noneRadioButton, oldschoolRadioButton, defaultRadioButton, pointBuyRadioButton, heroRadioButton;
    let threeDSixRadioButton, fourDSixButton;
    let allowNegativeSwitch;
    let highScoreOneButton, highScoreTwoButton;
    let minMaxCostSlider;
    let minMaxScoreSlider;
    let settingsInfo = `Rolling 4d6. < 8 cost 0. > 15 cost 2.`;
    // let unsubscribe;

    onMount(() => {
        // unsubscribe = settingsStore.subscribe(store => {
        //     switch (store.preset) {
        //         case SettingPreset.NONE: noneRadioButton.checked = true;
        //             break;
        //         case SettingPreset.DEFAULT: defaultRadioButton.checked = true;
        //             break;
        //         case SettingPreset.OLD_SCHOOL: oldschoolRadioButton.checked = true;
        //             break;
        //         case SettingPreset.POINT_BUY: pointBuyRadioButton.checked = true;
        //             break;
        //         case SettingPreset.HERO: heroRadioButton.checked = true;
        //             break;
        //     }
        //     if(store.dicePerScore === 3){
        //         threeDSixRadioButton.checked = true;
        //     } else {
        //         fourDSixButton.checked = true;
        //     }
        // });
    });

    function updateSettingInfo(){
        if($settingsStore.dicePerScore === 3) {
            settingsInfo = "Rolling 3d6. ";
        } else {
            settingsInfo = "Rolling 4d6. ";
        }

        if($settingsStore.allowNegativeCost){
            settingsInfo += "< 8 reduce cost. ";
        } else {
            settingsInfo += "< 8 cost 0. "
        }

        settingsInfo += `> 15 cost ${$settingsStore.highScoreCost}. `;

        if($settingsStore.pointBuyMin > 0 || $settingsStore.pointBuyMax < 90){
            settingsInfo += `Point cost between ${$settingsStore.pointBuyMin} and ${$settingsStore.pointBuyMax}.`
        }
    }


    // onDestroy(unsubscribe);

    function presetChange(ev) {
        settingsStore.preset(ev.detail);
    }

    function diceNumberChange(ev) {
        // noneRadioButton.checked = true;
        settingsStore.update(store => {
            store.dicePerScore = ev.detail === "3d6" ? 3 : 4;
            return {...store};
        });
        updateSettingInfo();
    }

    function negativeSwitchChange(ev) {
        // noneRadioButton.checked = true;
        settingsStore.update(store => {
            store.allowNegativeCost = allowNegativeSwitch.switched;
            return {...store};
        });
        updateSettingInfo();
    }

    function highScoreCostChange(ev) {
        // noneRadioButton.checked = true;
        settingsStore.update(store => {
            store.highScoreCost = ev.detail === "1" ? 1 : 2;
            if(minMaxCostSlider.minValue > 72 && store.highScoreCost == 1){
                minMaxCostSlider.minValue = 72;
            }
            return {...store};
        });
        updateSettingInfo();

    }

    function minMaxCostChange(ev) {
        settingsStore.update(store => {
            if(minMaxCostSlider.minValue > 72 && store.highScoreCost == 1){
                minMaxCostSlider.minValue = 72;
            }
            store.pointBuyMin = minMaxCostSlider.minValue;
            store.pointBuyMax = minMaxCostSlider.maxValue;
            return {...store};
        });
        updateSettingInfo();
    }

    function minMaxScoreChange(ev) {
        settingsStore.update(store => {
            store.minScore = minMaxScoreSlider.min;
            store.maxScore = minMaxScoreSlider.max;
            return {...store};
        });
    }
</script>

<style>
    .view {
        margin: 6px;
    }
    .setting {
        margin: 6px;
    }
</style>

<calcite-block bind:this={settingsBlock} heading="Settings" open="{showSettings}"
               on:calciteBlockToggle={() => showSettings = !showSettings} collapsible>
    <calcite-icon slot="icon" icon="gear"></calcite-icon>
    <div class="view">
<!--        <calcite-label>-->
<!--            Presets-->
<!--            <calcite-radio-group layout="horizontal" on:calciteRadioGroupChange={presetChange}>-->
<!--                <calcite-radio-group-item bind:this={noneRadioButton} value="{SettingPreset.NONE}">None-->
<!--                </calcite-radio-group-item>-->
<!--                <calcite-radio-group-item bind:this={oldschoolRadioButton} value="{SettingPreset.OLD_SCHOOL}">Old-->
<!--                    School-->
<!--                </calcite-radio-group-item>-->
<!--                <calcite-radio-group-item bind:this={defaultRadioButton} value="{SettingPreset.DEFAULT}" checked>-->
<!--                    Default-->
<!--                </calcite-radio-group-item>-->
<!--                <calcite-radio-group-item bind:this={pointBuyRadioButton} value="{SettingPreset.POINT_BUY}">Point Buy-->
<!--                </calcite-radio-group-item>-->
<!--                <calcite-radio-group-item bind:this={heroRadioButton} value="{SettingPreset.HERO}">Hero-->
<!--                </calcite-radio-group-item>-->
<!--            </calcite-radio-group>-->
<!--        </calcite-label>-->

        <calcite-label layout="inline">Roll:
            <calcite-radio-group layout="horizontal" on:calciteRadioGroupChange={diceNumberChange}>
                <calcite-radio-group-item bind:this={threeDSixRadioButton} value="3d6">3d6</calcite-radio-group-item>
                <calcite-radio-group-item bind:this={fourDSixButton} value="4d6" checked>4d6 (drop the lowest)
                </calcite-radio-group-item>
            </calcite-radio-group>
        </calcite-label>
        <calcite-label layout="inline">
            <calcite-switch bind:this={allowNegativeSwitch}
                            on:calciteSwitchChange={negativeSwitchChange}></calcite-switch>
            Scores below 8 have a negative cost.
        </calcite-label>

        <calcite-label layout="inline">score above 15 cost:
            <calcite-radio-group layout="horizontal" on:calciteRadioGroupChange={highScoreCostChange}>
                <calcite-radio-group-item bind:this={highScoreOneButton} value="1">1</calcite-radio-group-item>
                <calcite-radio-group-item bind:this={highScoreTwoButton} value="2" checked>2</calcite-radio-group-item>
            </calcite-radio-group>
        </calcite-label>
<!--        <calcite-label>Score Range-->
<!--            <calcite-slider bind:this={minMaxScoreSlider} on:calciteSliderChange={minMaxScoreChange} min="3" min-label="Minimum Score" min-value="3" max="18" max-label="Maximum Cost" max-value="18" step="1" label-handles-->
<!--                            ticks="3" snap></calcite-slider>-->
<!--        </calcite-label>-->
        <div style="width: 95%">
            <calcite-label>Point Cost Range
                <calcite-slider bind:this={minMaxCostSlider} on:calciteSliderChange={minMaxCostChange} min="0" min-label="Minimum Cost" min-value="0" max="90" max-label="Maximum Cost" max-value="90" step="1" label-handles
                                ticks="15" snap></calcite-slider>
            </calcite-label>
        </div>

    </div>
</calcite-block>
{#if !showSettings}
    <div class="view" style="font-size: small">{settingsInfo}</div>
{/if}
