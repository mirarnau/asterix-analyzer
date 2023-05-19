<style>
  main {
    margin: 0 auto;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
  }
  .inner {
    max-width: 980px;
    padding-left: 20px;
    padding-right: 20px;
    margin: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .mobile-icon {
    width: 25px;
    height: 14px;
    position: relative;
    cursor: pointer;
  }

  .mobile-icon:after,
  .mobile-icon:before,
  .middle-line {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transition: all 0.4s;
    transform-origin: center;
  }

  .mobile-icon:before,
  .middle-line {
    top: 0;
  }

  .mobile-icon:after,
  .middle-line {
    bottom: 0;
  }

  .mobile-icon:before {
    width: 66%;
  }

  .mobile-icon:after {
    width: 33%;
  }

  .middle-line {
    margin: auto;
  }

  .mobile-icon:hover:before,
  .mobile-icon:hover:after,
  .mobile-icon.active:before,
  .mobile-icon.active:after,
  .mobile-icon.active .middle-line {
    width: 100%;
  }

  .mobile-icon.active:before,
  .mobile-icon.active:after {
    top: 50%;
    transform: rotate(-45deg);
  }

  .mobile-icon.active .middle-line {
    transform: rotate(45deg);
  }

  .navbar-list {
    display: none;
    width: 100%;
    justify-content: space-between;
    margin: 0;
    padding: 0 40px;
  }

  .navbar-list.mobile {
background-color: #0e2a47;
position: fixed;
display: block;
height: calc(100% - 45px);
bottom: 0;
left: 0;
}

.navbar-list li {
list-style-type: none;
position: relative;
}
.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.mobile-icon {
  display: none;
  cursor: pointer;
}

.mobile-icon.active .middle-line {
  background-color: #fff;
}

.middle-line {
  width: 20px;
  height: 2px;
  background-color: #ccc;
  transition: background-color 0.3s ease-in-out;
}

.navbar-list {
  list-style: none;
  display: flex;
}

.navbar-list.mobile {
  display: none;
  flex-direction: column;
  background-color: #444;
  padding: 10px;
}

.navbar-list.mobile li {
  margin-bottom: 10px;
}

.navbar-list li a,
.navbar-list li .disabled-link {
  display: block;
  padding: 10px;
  color: #fff;
  text-decoration: none;
}
.navbar-list li a:hover {
  background-color: #555;
}

.disabled-link {
  opacity: 0.5;
  cursor: not-allowed;
}

@media only screen and (min-width: 767px) {
  .mobile-icon {
    display: none;
  }

  .navbar-list {
    display: flex;
    padding: 0;
  }

  .navbar-list a {
    display: inline-flex;
  }
}

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}



th {
  color: rgb(255, 255, 255);
  font-size: medium;
}


td {
  color: white;
  font-size: small;
}


table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  text-align: left;
  padding: 8px;
}


th {
  background-color: #051a30;
}


tr:nth-child(even) {
  background-color: #0e2a47;
}
tr:nth-child(odd) {
  background-color: #0e2a47;
}
.file-button {
  background-color: #051a30;
  width: 100px;
  color: white;
  border-color: #00eeff;
  border-width: 3px;
  text-align: center;
}

.csv-button {
  background-color: #051a30;
  width: 170px;
  color: white;
  border-color: #00eeff;
  border-width: 3px;
  text-align: center;
}

.simulation-button {
  background-color: #051a30;
  width: 120px;
  color: white;
  border-color: #00eeff;
  border-width: 3px;
  text-align: center;
}

.table-button {
  background-color: #051a30;
  width: 120px;
  color: white;
  border-color: #00eeff;
  border-width: 3px;
  text-align: center;
}
tr.smr {
  background-color: rgb(127, 66, 0);
}
tr.mlat {
  background-color: rgb(0, 98, 128);
}

#viewDiv {
  position: relative;
  width: 100%;
  height: calc(100vh - 42px);
}

.button-container {
  background-color: #262626;
}
nav {
background-color: rgba(22, 22, 22, 0.8);
font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
height: 45px;
}

.play-button {
background-color: #00eeff;
color: rgb(0, 0, 0);
border-color: #00eeff;
border-width: 3px;
text-align: center;
}

.play-back-button {
background-color: rgb(31, 31, 31);
color: white;
border-color: #00eeff;
border-width: 3px;
text-align: center;
}

.play-forward-button {
background-color: rgb(31, 31, 31);
color: white;
border-color: #00eeff;
border-width: 3px;
text-align: center;
}

.align-right {

display: flex;
justify-content: flex-end;
}

.container {
position: relative;
}
.map-container {
  position: relative;
  z-index: 1;
}

.legend-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
}

.color-round {
  border-radius: 50%;
  margin-right: 10px;
  height: 20px;
  width: 20px;
  border-color: black;
  border-style: solid;
  border-width: 1px;
}

.color {
  border-radius: 50%;
  margin-left: 5px;
  margin-right: 10px;
  height: 10px;
  width: 10px;
  border-color: black;
  border-style: solid;
  border-width: 1px;
}
</style>

<script lang="ts" type="module">
  import { fade } from "svelte/transition";
  import type { Cat10 } from "../electron/cat10/Cat10";
  import type { Cat21 } from "../electron/cat21/Cat21";
  import { initIpcMainBidirectional, ipcMainBidirectional } from "./ipcMain/ipcMainCallers";
  import { parseIpcMainReceiveMessage } from "./ipcMain/ipcMainReceiverParser";
  import Simulation from "./components/simulation.svelte";
  import { initializeMap } from "./arcgis/map";
  import GenericProps from "./items/GenericProps.svelte";
  import { onMount } from "svelte";
  import Table from "./components/Table.svelte";

  let messages: (Cat10 | Cat21)[] = [];
  let numberOfMsg = 0;

  const MSG_PER_PAGE = 15;
  let pageArray: number[] = [];
  let activePage = 1;
  let displayedPageArray: number[] = [];
  let selectedCat: string;
  let selectedInstr: string;
  let searchBox = "";

  let searchPicker = "Filter";

  let simulation: Simulation;
  let visibleItem = "MAP";

  let selectedRow: number | null = null;
  let allChildComponents = new Map<number, GenericProps>();
  let allChildComponentsKeys = Array.from(allChildComponents.keys());

  let play = false;
  let settings = false;

  initializeMap();

  async function handleLoadSomeMsgs() {
    numberOfMsg = Number.parseInt(await initIpcMainBidirectional("file-picker"));
    if (!numberOfMsg) return;
    messages = [];
    console.log({ numberOfMsg });
    const FRAGMENTS = 1000;
    let i = 0;
    await ipcMainBidirectional("get-message-quantity", 1000);
    while (i < numberOfMsg) {
      const msgs = await ipcMainBidirectional("pass-slice");
      messages = messages.concat(await parseIpcMainReceiveMessage(msgs));
      i += FRAGMENTS;
    }
    console.log(`Finished loading ${messages.length} messages!`);
    console.log("Performance Data Not Available");
  }

  async function csv_file() {
    console.log("Creating csv file");
    await ipcMainBidirectional("save-csv");
    console.log("CSV file written");
  }

  async function take_off() {
    await ipcMainBidirectional("filter-takeoff");
  }

  async function handleMapClick() {
    visibleItem = "MAP";

    initializeMap();
    if (messages.length > 0) {
      setTimeout(() => {
        simulation.initializeSimulation!(messages);
      }, 750);
    }
  }

  async function handleTableClick() {
    visibleItem = "TABLE";
  }

  async function kml_file() {
    console.log("Creating kml file");

    await ipcMainBidirectional("save-kml");

    console.log("KML file written");
  }

  function settingsPannel() {
    settings = !settings;
  }

  let showMobileMenu = false;

  const navItems = [
    { label: "MAP", href: "#", clickHandler: handleMapClick },
    { label: "TABLE", href: "#", clickHandler: handleTableClick },
    { label: "FILE", href: "#", clickHandler: handleLoadSomeMsgs },
  ];

  let selectedItem = navItems[2];

  // Mobile menu click event handler
  const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

  const handleNavItemClick = (item: any) => {
    selectedItem = item;
    // Add your custom logic for handling the selected item
    console.log("Selected item:", item.label);
  };

  // Media match query handler
  const mediaQueryHandler = (e: { matches: any }) => {
    // Reset mobile state
    if (!e.matches) {
      showMobileMenu = false;
    }
  };

  // Attach media query listener on mount hook
  onMount(() => {
    const mediaListener = window.matchMedia("(max-width: 767px)");

    mediaListener.addListener(mediaQueryHandler);
  });
</script>

<nav>
  <div class="inner">
    <div on:click="{handleMobileIconClick}" class="{`mobile-icon${showMobileMenu ? ' active' : ''}`}">
      <div class="middle-line"></div>
    </div>
    <ul class="{`navbar-list${showMobileMenu ? ' mobile' : ''}`}">
      <li>
        <a href="{'#'}" on:click="{handleMapClick}"> SIMULATION </a>
      </li>
      <li>
        {#if messages.length > 0}
          <a href="{'#'}" on:click="{handleTableClick}"> TABLE </a>
        {:else}
          <span class="disabled-link">TABLE</span>
        {/if}
      </li>
      <li>
        <a href="{'#'}" on:click="{handleLoadSomeMsgs}"> FILE </a>
      </li>
    </ul>
  </div>
</nav>

<main>
  <div class="{visibleItem === 'MAP' ? 'main overflow' : 'main'}">
    {#if visibleItem === "MAP"}
      <div class="ontop dark" id="btn-bar">
        <div id="progDiv" class="align-right">
          <div>
            <button
              type="button"
              class="{messages.length > 0
                ? 'btn btn-primary play-back-button'
                : 'btn btn-primary disabled play-back-button'}"
              on:click="{simulation.restartSim}"
              ><i class="bi bi-arrow-counterclockwise"></i>
            </button>
            <button
              type="button"
              class="{messages.length > 0
                ? 'btn btn-primary play-back-button'
                : 'btn btn-primary disabled play-back-button'}"
              on:click="{simulation.backwardsTick}"><i class="bi bi-arrow-90deg-left"></i></button
            >
            <button
              type="button"
              class="{messages.length > 0
                ? 'btn btn-primary play-button play-button'
                : 'btn btn-primary disabled play-button play-forward-button play-button'}"
              on:click="{simulation.playClick}"
            >
              {#if play}
                <i class="bi bi-pause"></i>
              {:else}
                <i class="bi bi-play"></i>
              {/if}
            </button>

            <button
              type="button"
              class="{messages.length > 0
                ? 'btn btn-primary play-forward-button'
                : 'btn btn-primary disabled play-forward-button'}"
              on:click="{simulation.forwardsTick}"
              ><i class="bi bi-arrow-90deg-right"></i>
            </button>
          </div>
        </div>
        <div class="container">
          <div class="map-container">
            <Simulation
              on:stop="{() => (play = false)}"
              on:switchplay="{() => (play = !play)}"
              bind:this="{simulation}"
            />
          </div>
          <div class="legend-container">
            <div class="ontop dark" id="legend" transition:fade="{{ duration: 100 }}">
              <p>Map Legend</p>
              <div style="font-size: small">
                <table>
                  <tr>
                    <td>
                      <div class="color" style="background-color: #fe0000;"></div>
                    </td>
                    <td>SMR Data Point</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="color" style="background-color: #ffeb16;"></div>
                    </td>
                    <td>MLAT Data Point</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="color" style="background-color: #6733bb;"></div>
                    </td>
                    <td>ADS-B Data Point</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="viewDiv"></div>
    {:else if visibleItem === "TABLE"}
      <Table />
    {/if}
  </div>
</main>
