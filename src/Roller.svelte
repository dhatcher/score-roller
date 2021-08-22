<script>
    import {notificationStore, scoreStore, settingsStore, statsStore} from "./store/main";
    import AbilityScore from "./AbilityScore.svelte";


    function rollScores() {
        scoreStore.update(abilityScores => {
            let newScores = [];
            let keepRolling = true;
            let numberOfSetsRolled = 0;
            while (keepRolling) {
                newScores = [];
                abilityScores.forEach(score => {
                    let abilityScore = rollDice();
                    while (abilityScore.score < $settingsStore.minScore || abilityScore.score > $settingsStore.maxScore) {
                        abilityScore = rollDice();
                    }
                    newScores.push(abilityScore);
                });
                numberOfSetsRolled++;
                let costTotal = newScores.map(as => as.cost).reduce((acc, cur) => acc + cur);
                if (costTotal >= $settingsStore.pointBuyMin && costTotal <= $settingsStore.pointBuyMax) {
                    keepRolling = false;
                    statsStore.set({
                        numberOfSets: numberOfSetsRolled,
                        totalCost: costTotal
                    });
                } else if (numberOfSetsRolled >= 1000000) {
                    keepRolling = false;
                    statsStore.set({
                        numberOfSets: numberOfSetsRolled,
                        totalCost: costTotal
                    });
                    notificationStore.set('failure');
                }
            }
            return [...newScores];
        });
    }

    function rollDie(sides = 6) {
        return Math.ceil(Math.random() * sides);
    }

    function rollDice(sides = 6, dropLowest = true) {
        let rolls = [];
        for (const die of Array($settingsStore.dicePerScore).keys()) {
            rolls.push(rollDie(sides));
        }
        rolls.sort((a, b) => b - a);
        let score = 0;
        for (let i = 0; i < 3; i++) {
            score += rolls[i];
        }
        let cost = calculatePointBuyCost(score);
        let bonus = calculateScoreBonus(score);
        return {rolls, score, cost, bonus};
    }

    function calculateScoreBonus(score) {
        let bonus = -5 + Math.floor(score/2);
        bonus = bonus > 0 ? `+${bonus}` : `${bonus}`;
        return bonus;
    }

    function calculatePointBuyCost(score) {
        let cost = 0;
        if (score < 8) {
            if($settingsStore.allowNegativeCost) {
                cost = score - 8;
            }
        } else if (score <= 13) {
            cost = score - 8;
        } else if (score <= 15) {
            cost = 5 + ((score - 13) * 2);
        } else {
            cost = 9 + ((score - 15) * $settingsStore.highScoreCost);
        }
        return cost;
    }
</script>

<style>
    .view {
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 100%;
    }
</style>

<div class="view">
    {#each $scoreStore as abilityScore, i (abilityScore)}
        <AbilityScore {abilityScore}/>
    {/each}
    <div style="margin:2px;">
        <calcite-button width="full" on:click={rollScores}>ROLL</calcite-button>
    </div>

</div>
