<script>
    export let build;
    import ScoringDetails from "$lib/components/profile/ScoringDetails.svelte";

    let isRanked = build["lb"] ? Object.keys(build["lb"]).length > 0 : false;

    export let selectedCategory;
    let entries;
    if (isRanked) {
        build["lb"] = Object.entries(build["lb"])
            .sort((a, b) => a[1].percraw - b[1].percraw)
            .reduce((obj, [key, val]) => {
                obj[key] = val;
                return obj;
            }, {});
        entries = Object.entries(build["lb"]);
    }

   

    import LbRankDisplay from "$lib/components/profile/LbRankDisplay.svelte";

    import { isBuildNewFormat } from "$lib/components/profile/temp.js";
</script>

<div class="container" style="text-align: center; overflow: hidden;">
    {#if isRanked}
        <div>
            {#if entries && entries.length > 0}
                <div>
                    {#if isBuildNewFormat(build)}
                        <LbRankDisplay {build} key={selectedCategory} />
                    {:else}
                        <ScoringDetails {build} key={selectedCategory} />
                    {/if}
                </div>
            {/if}
        </div>
    {:else if !build.hasOwnProperty("lb")}
        <div style="margin:auto;">
            <p style="margin-top:0; margin-bottom:0; text-align: center;">
                leaderboards for this character coming soon!
            </p>
        </div>
    {:else}
        <div style="margin:auto;">
            {#if isBuildNewFormat(build)}
                <LbRankDisplay {build} key={selectedCategory} />
            {/if}
            <p style="margin-top:0; margin-bottom:0; text-align: center;">
                Equipped lightcone not supported
            </p>
        </div>
    {/if}
</div>

<style>
    .container {
        display: flex;
        overflow-x: auto;
        max-width: 100%;
        justify-content: center;
    }
    p {
        margin: 3px;
    }

    @media (max-width: 850px) {
        p {
            font-size: 11px;
        }
    }
</style>
