<script>

    import {onMount} from "svelte";

    export let abilityScore;
    let diceBreakdown = "";

    onMount(updateUI);

    function updateUI(){
        diceBreakdown = abilityScore.rolls.join(" + ");
        if(abilityScore.rolls.length === 4){
            diceBreakdown += ` (drop ${abilityScore.rolls[3]})`;
        }

    };
</script>

<style>
    .view {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 2px;
        padding: 2px;
        background-color: var(--calcite-ui-background);
        border-color: var(--calcite-ui-border-1);
        border-width: 1px;
        border-style: solid;
    }

    .view-section {
        display: flex;
        flex-direction: row;
        color: var(--calcite-ui-text-1);
        padding: 4px;
    }
</style>

<div class="view">
    <div class="view-section" style="width:4em; font-weight: bold; font-size: large;">{abilityScore.score} ({abilityScore.bonus})</div>
    <div class="view-section">{diceBreakdown}</div>
    <div class="view-section">point buy cost <span style="padding-left: 4px;">{abilityScore.cost}</span></div>
</div>
