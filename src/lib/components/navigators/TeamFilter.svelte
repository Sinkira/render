<script>
    import { page } from "$app/stores";
    import { teamCategoriesCase } from "$lib/components/navigators/TeamFilter.js";
    let url = $page.url.pathname;
    let currentTeamBracket = getStringBeforeLastSlash(url);
    function getStringBeforeLastSlash(url) {
        var parts = url.split("/");
        return parts[parts.length - 2];
    }
    let splitStr = url.split("/");
    let charId = splitStr[3];
    let ctgr = splitStr[4];

    function removeSpdPattern(str) {
        return str.replace(/(_+\d{3})+$/, "").replace(/_+$/, "");
    }

    function getRemovedSpdPattern(str) {
        let removed = str.match(/(_+\d{3})+$/);
        if (!removed) {
            removed = str.match(/_+$/);
        }
        return removed ? removed[0] : "";
    }

    let teamCategories = teamCategoriesCase(charId);
    let fullctgrRaw = teamCategories.reduce((ctgr, str) => {
        return ctgr.replace(new RegExp(str, "g"), "");
    }, ctgr);
    let ctgrRaw = removeNonDigitsAtEnd(removeSpdPattern(fullctgrRaw));
    function removeNonDigitsAtEnd(str) {
        return str.replace(/\D+$/, "");
    }

    function GetUrlBases(teamCategories) {
        if (teamCategories == []) return [];
        let newList = [];
        for (let i = 0; i < teamCategories.length; i++) {
            if (teamCategories[i] === "Solo") {
                newList.push(
                    "../" +
                        ctgrRaw + // + getRemovedSpdPattern(fullctgrRaw)
                        "/",
                );
            } else {
                newList.push(
                    "../" +
                        ctgrRaw +
                        teamCategories[i] +
                        // + getRemovedSpdPattern(fullctgrRaw)
                        "/",
                );
            }
        }
        return newList;
    }

    let urls = GetUrlBases(teamCategories);

   
</script>

{#if teamCategories != []}
    <div class="parentDiv">
        {#each urls as url, i}
            {@const href = url}
            <div
                style="padding-left:10px; padding-right:10px; padding-bottom: 0;"
            >
                <a href={href + "1"} style="text-align: center;">
                    <p>{teamCategories[i]}</p>
                </a>

                {#if removeSpdPattern(currentTeamBracket) == href.slice(3, -1)}
                    <div
                        style="margin:auto; background-color: blueviolet; width: 25px; height: 5px; margin-top:-7px;"
                    />
                {/if}
            </div>
        {/each}
    </div>
{/if}

<style>
    a {
        text-decoration: none;
        padding-bottom: 0;
        margin-bottom: 0;
    }
    .parentDiv {
        background-color: #000000a0;
        display: flex;
        margin: auto;
        justify-content: center;
        overflow: hidden;
        padding: 0;
        padding-bottom: 10px;
    }
</style>
