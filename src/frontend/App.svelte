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
  
  th, td {
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

</style>


<script lang="ts" type="module">

    import type { Cat10 } from "../electron/cat10/Cat10";
    import type { Cat21 } from "../electron/cat21/Cat21";
    import { initIpcMainBidirectional, ipcMainBidirectional } from "./ipcMain/ipcMainCallers";
    import { parseIpcMainReceiveMessage } from "./ipcMain/ipcMainReceiverParser";
    import Simulation from "./components/simulation.svelte"
    import { initializeMap } from "./arcgis/map";
    import GenericProps from "./items/GenericProps.svelte";


  
  let messages: ( Cat10 | Cat21) [] = [];
  let numberOfMsg = 0;
  
  // let loading = false;
  // let performanceData = false;

  let selectedCat: string;
  let selectedInstr: string;
  let searchBox = "";
  let searchPicker = "Any";


  let simulation : Simulation;
  let visibleItem = "TABLE";

  let selectedRow: number | null = null;
  let allChildComponents = new Map<number, GenericProps>();
  let allChildComponentsKeys = Array.from(allChildComponents.keys());

  let play = false;
  let settings = false;

  async function handleLoadSomeMsgs() {
    visibleItem = "TABLE";
    numberOfMsg = Number.parseInt(await initIpcMainBidirectional("file-picker"));
    if (!numberOfMsg) return;
    messages = [];
    console.log({ numberOfMsg });
    const FRAGMENTS = 100000;
    let i = 0;
    await ipcMainBidirectional("get-message-quantity", 20000);
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
  
  async function filterMessages() {
    messages = [];
    const filter: Filter = {
      Category: [],
      Instrument: [],
    };
    let search = searchBox;
    if (searchPicker !== "Any") {
      search = "";
      if (searchPicker === "Target Address") {
        filter.TargetAddress = searchBox;
      } else if (searchPicker === "Target identification") {
        filter.TargetIdentification = searchBox;
        console.log(searchBox);
      }
    }
    if (selectedCat=="Cat10"){
      filter.Category.push("Cat10");
    } else if (selectedCat=="Cat21"){
      filter.Category.push("Cat21");
    }
    switch(selectedInstr){
      case "SMR":
        filter.Instrument.push("SMR");
        break;
      case "MLAT":
        filter.Instrument.push("MLAT");
        break;
      case "ADSB":
        filter.Instrument.push("ADS-B");
        break;
    }
    
    messages = messages.concat(await parseIpcMainReceiveMessage(await ipcMainBidirectional("filter-messages", { filter, search })));
  }
  

  function handleSelectionCat(event) {
    selectedCat = event.target.value;
    updateFilters();
    
  }

  function handleSelectionInstrument(event) {
    selectedInstr = event.target.value;
    updateFilters();
    
  }

  interface Filter {
    Category: string[];
    Instrument: string[];
    TargetAddress?: string;
    TargetIdentification?: string;
  }
  function keyDown(e: any) {
    if (e.keyCode === 13) {
      updateFilters();
    }
  }
  function updateFilters() {
    setTimeout(() => {
      filterMessages();
    }, 100);
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

  function trClick(msg: Cat10 | Cat21) {
    let tr = document.getElementById(`tr-${msg.id}`);
    let tbody = document.querySelector("tbody");
    if (allChildComponents.has(msg.id)) {
      allChildComponents.get(msg.id)!.$destroy();
      allChildComponents.delete(msg.id);
      allChildComponentsKeys = Array.from(allChildComponents.keys());
    } else {
      // Open this row
      if (tbody && tr) {
        let arr = Array.from(tbody.children);
        let nexttr = arr[arr.indexOf(tr) + 1];
        let child = new GenericProps({ target: tbody, anchor: nexttr, props: { msg } });
        allChildComponents.set(msg.id, child);
        allChildComponentsKeys = Array.from(allChildComponents.keys());
      }
    }
  }

  async function kml_file() {
    console.log("Creating kml file");

    await ipcMainBidirectional("save-kml");

    console.log("KML file written");
  }

  function settingsPannel() {
    settings = !settings;
  }
  
</script>
<div class="button-container">
  <button type="button" class="btn btn-primary file-button" on:click="{handleLoadSomeMsgs}"
      >File  <i class="bi bi-folder2-open"></i></button
    >  
    <button type="button" class="btn btn-primary csv-button" on:click="{csv_file}"
      >Export to CSV <i class="bi bi-filetype-csv"></i></button
    > 
    <label for="cat-selector">Filter by:</label>
    <select id="cat-selector" on:change={handleSelectionCat}>
      <option value="">-- Category --</option>
      <option value="Cat10">Cat10 </option>
      <option value="Cat21">Cat21</option>
    </select>
    <select id="instrument-selector" on:change={handleSelectionInstrument}>
      <option value="">-- Instrument --</option>
      <option value="SMR">SMR</option>
      <option value="ADSB">ADSB</option>
      <option value="MLAT">MLAT</option>
    </select>
    <div id="search">
      <div class="input-group mb-3">
        <select
          style="max-width: 200px ;"
          class="form-select"
          id="inputGroup02"
          bind:value="{searchPicker}"
          aria-label="Example select with button addon"
        >
          <option selected>Any</option>
          <option>Target Address</option>
          <option>Target identification</option>
        </select>
        <input
          bind:value="{searchBox}"
          type="text"
          class="form-control"
          on:keydown="{keyDown}"
          aria-label="Text input with dropdown button"
          placeholder="Search..."
        />
        <label class="input-group-text" on:click="{updateFilters}" for="inputGroup02">Search</label>
      </div>
    </div>
    <button 
    type="button" 
    class="{messages.length > 0 ? 'btn btn-primary simulation-button' : 'btn btn-primary disabled simulation-button'}"
    on:click="{handleMapClick}"
      >Simulation</button
    >
</div>

<main>
  <div class="{visibleItem === 'MAP' ? 'main overflow' : 'main'}">
  {#if visibleItem === "MAP"}
  <div class="ontop dark" id="btn-bar">
    <div id="progDiv" class="align-right">
      <div>
        <button
          type="button"
          class="{messages.length > 0 ? 'btn btn-primary play-back-button' : 'btn btn-primary disabled play-back-button'}"
          on:click="{simulation.restartSim}"
          ><i class="bi bi-arrow-counterclockwise"></i>
        </button>
        <button
          type="button"
          class="{messages.length > 0 ? 'btn btn-primary play-back-button' : 'btn btn-primary disabled play-back-button'}"
          on:click="{simulation.backwardsTick}"><i class="bi bi-arrow-90deg-left"></i></button
        >
        <button
          type="button"
          class="{messages.length > 0 ? 'btn btn-primary play-button play-button' : 'btn btn-primary disabled play-button play-forward-button play-button'}"
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
          class="{messages.length > 0 ? 'btn btn-primary play-forward-button' : 'btn btn-primary disabled play-forward-button'}"
          on:click="{simulation.forwardsTick}"
          ><i class="bi bi-arrow-90deg-right"></i>
        </button>
      </div>
    </div>
      <Simulation
        on:stop="{() => (play = false)}"
        on:switchplay="{() => (play = !play)}"
        bind:this="{simulation}"
      />
    </div>
    <div id="viewDiv"></div>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Class</th>
          <th>Instrument</th>
          <th>Message Type / Target Id</th>
          <th>Data source identifier</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {#each messages as message (message.id)}
          {#if message.class === "Cat10" }
            <tr class:smr={message.measurementInstrument === 'SMR'} 
                class:mlat={message.measurementInstrument === 'MLAT'}
                class:selected={selectedRow === message.id}
                on:click="{() => trClick(message)}" id="tr-{message.id}">
              <td>{message.id}</td>
              <td>{message.class}</td>
              <td>{message.measurementInstrument}</td>
              <td>{message.messageType.messageType}</td>
              <td>{message.dataSourceIdentifier.sic}</td>
              <td>{new Date(message.timeOfDay.timestamp * 1000).toISOString().substring(11, 23)}</td>
            </tr>
          {:else}
            <tr class:selected={selectedRow === message.id}
                on:click="{() => trClick(message)}" id="tr-{message.id}">
              <td>{message.id}</td>
              <td>{message.class}</td>
              <td>{message.measurementInstrument}</td>
              <td>{message.targetIdentification.data}</td>
              <td>{`SIC: ${message.dataSourceIdentifier.sic}; SAC: ${message.dataSourceIdentifier.sac}`}</td>
              <td>{new Date(message.timeofReportTransmission.time * 1000 ).toISOString().substring(11, 23)}</td>
            </tr>
          {/if}
        {/each}
      </tbody>
     </table>
     {/if}
    </div>
</main>