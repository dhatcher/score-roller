<script>

import {statsStore} from "./store/main";
</script>

<style>
    .view {
        display: flex;
        padding: 6px;
        justify-content: space-between;
    }
</style>

<div class="view">
    <div>Created <span style="font-weight: bold;">{$statsStore.numberOfSets}</span> set(s) to match.</div>
    <div>Point Buy Cost: {$statsStore.totalCost}</div>
</div>
