<script>
	import {SvelteComponent} from "svelte";
    import Settings from "./Settings.svelte";
    import Roller from "./Roller.svelte";
    import Stats from "./Stats.svelte";

    const theme="calcite-theme-light";
</script>

<style>
    header {
        background-image: linear-gradient(to bottom, var(--calcite-ui-background), var(--calcite-ui-foreground-3));
    }

    main {
        background: var(--calcite-ui-background);
        width: 100%;
    }
</style>

<header class="{theme}">
    <div style="text-align: center; justify-content: center;">
        <h3>Score Roller</h3>
    </div>

</header>

<main class="{theme}">
    <div style="display: flex;flex-direction: column;">
        <Settings/>
        <Roller/>
        <Stats/>
    </div>
</main>
