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
    background-color: rgba(0, 0, 0, 0.8);
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

  .navbar-list li:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #424245;
  }

  .navbar-list a {
    color: #fff;
    text-decoration: none;
    display: flex;
    height: 45px;
    align-items: center;
    padding: 0 10px;
    font-size: 13px;
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
    width: 150px;
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
    background-color: rgba(0, 0, 0, 0.8);
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    height: 45px;
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
  import { onMount } from "svelte";

  let messages: ( Cat10 | Cat21) [] = [];
  let numberOfMsg = 0;
  
  // let loading = false;
  // let performanceData = false;

  let selectedCat: string;
  let selectedInstr: string;
  let searchBox = "";
  
  let searchPicker = "Filter";

  let simulation : Simulation;
  let visibleItem = "MAP";

  let selectedRow: number | null = null;
  let allChildComponents = new Map<number, GenericProps>();
  let allChildComponentsKeys = Array.from(allChildComponents.keys());

  async function handleLoadSomeMsgs() {
    numberOfMsg = Number.parseInt(await initIpcMainBidirectional("file-picker"));
    if (!numberOfMsg) return;
    messages = [];
    console.log({ numberOfMsg });
    const FRAGMENTS = 100000;
    let i = 0;
    await ipcMainBidirectional("get-message-quantity", 10000);
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
    if (searchPicker !== "Filter") {
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

  async function handleTableClick() {
    visibleItem = "TABLE";
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
        let child = new GenericProps({ target: tbody, anchor: nexttr, props: { msg }});
        allChildComponents.set(msg.id, child);
        allChildComponentsKeys = Array.from(allChildComponents.keys());
      }
    }
  }
  let showMobileMenu = false;

  const navItems = [
  { label: "MAP", href: "#", clickHandler: handleMapClick},
  { label: "TABLE", href: "#", clickHandler: handleTableClick},
  { label: "FILE", href: "#", clickHandler: handleLoadSomeMsgs }
  ];

  
  let selectedItem = navItems[0];

  
  // Mobile menu click event handler
  const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

  const handleNavItemClick = (item:any) => {
    selectedItem = item;
    // Add your custom logic for handling the selected item
    console.log("Selected item:", item.label);
  };


  // Media match query handler
  const mediaQueryHandler = (e: { matches: any; }) => {
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
    <div on:click={handleMobileIconClick} class={`mobile-icon${showMobileMenu ? ' active' : ''}`}>
      <div class="middle-line"></div>
    </div>
    <ul class={`navbar-list${showMobileMenu ? ' mobile' : ''}`}>
      <li>
        <a href={'#'} on:click="{handleMapClick}"> MAP </a>
      </li>
      <li>
        <a href={'#'} on:click="{handleTableClick}"> TABLE </a>
      </li>
      <li>
        <a href={'#'} on:click="{handleLoadSomeMsgs}"> FILE </a>
      </li>
    </ul>
  </div>
</nav>

<main>
  <div class="{visibleItem === 'MAP' ? 'main overflow' : 'main'}">
  {#if visibleItem === "MAP"}
    <div id="viewDiv"></div>
  {:else if visibleItem === "TABLE"}
    <div class="button-container">
    
      <button type="button" class="btn btn-primary csv-button" on:click="{csv_file}"
        >Export to CSV</button
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
            <option selected>Filter</option>
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
  </div>

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
              <td>{`SAC: ${message.dataSourceIdentifier.sac}; SIC: ${message.dataSourceIdentifier.sic}`}</td>
              <td>{new Date(message.timeOfDay.timestamp * 1000).toISOString().substring(11, 23)}</td>
            </tr>
          {:else}
            <tr class:selected={selectedRow === message.id}
                on:click="{() => trClick(message)}" id="tr-{message.id}">
              <td>{message.id}</td>
              <td>{message.class}</td>
              <td>{message.measurementInstrument}</td>
              <td>{message.targetIdentification.data}</td>
              <td>{`SAC: ${message.dataSourceIdentifier.sac}; SIC: ${message.dataSourceIdentifier.sic}`}</td>
              <td>{new Date(message.timeofReportTransmission.time * 1000 ).toISOString().substring(11, 23)}</td>
            </tr>
          {/if}
        {/each}
      </tbody>
     </table>
     {/if}
    </div>
</main>