<script>
    import {SvelteComponent} from "svelte";
    import Settings from "./Settings.svelte";
    import Roller from "./Roller.svelte";
    import Stats from "./Stats.svelte";
    import {notificationStore} from "./store/main";

    const theme = "calcite-theme-light";
    let notification = undefined;
</script>

<style>
    header {
        background-image: linear-gradient(to bottom, var(--calcite-ui-background), var(--calcite-ui-foreground-3));
    }

    main {
        background: var(--calcite-ui-background);
        width: 100%;
    }

    calcite-alert {
        --calcite-alert-width: 30em;
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
        {#if $notificationStore}
            <calcite-alert icon active dismissible scale="s" width="half" color="blue"
                            on:calciteAlertClose={() => notificationStore.set(undefined)}>
                <div slot="title">Unable to create Scores</div>
                <div slot="message">We tried 1 million times but couldn't get a set of scores to match your settings. Change
                    the settings and try again.
                </div>
            </calcite-alert>
        {/if}
    </div>

</main>
