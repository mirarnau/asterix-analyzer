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

  tr.expanded-row {
    background-color: #f0f0f0; /* set the desired background color for expanded rows */
  }

</style>


<script lang="ts" type="module">

    import type { Cat10 } from "../electron/cat10/Cat10";
    import type { Cat21 } from "../electron/cat21/Cat21";
    import { initIpcMainBidirectional, ipcMainBidirectional } from "./ipcMain/ipcMainCallers";
    import { parseIpcMainReceiveMessage } from "./ipcMain/ipcMainReceiverParser";
    import Simulation from "./components/simulation.svelte"
    import { initializeMap } from "./arcgis/map";


  
  let messages: ( Cat10 | Cat21) [] = [];
  let numberOfMsg = 0;
  
  let loading = false;
  let performanceData = false;

  let simulation : Simulation;
  let visibleItem = "TABLE";

  let selectedRow: number | null = null;

  async function handleLoadSomeMsgs() {
    visibleItem = "TABLE";
    numberOfMsg = Number.parseInt(await initIpcMainBidirectional("file-picker"));
    if (!numberOfMsg) return;
    performanceData = false;
    messages = [];
    loading = true;
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
    loading = false;
    console.log("Performance Data Not Available");
    performanceData = true;
  }

  async function csv_file() {
    console.log("Creating csv file");
    await ipcMainBidirectional("save-csv");
    console.log("CSV file written");
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

  function toggleRow(rowId: number) {
    selectedRow = selectedRow === rowId ? null : rowId;
  }
  
</script>
<div class="button-container">
  <button type="button" class="btn btn-primary file-button" on:click="{handleLoadSomeMsgs}"
      >File  <i class="bi bi-folder2-open"></i></button
    >  
    <button type="button" class="btn btn-primary csv-button" on:click="{csv_file}"
      >Export to CSV</button
    > 
    <button type="button" class="btn btn-primary simulation-button" on:click="{handleMapClick}"
      >Simulation</button
    >
</div>

<main>
  <div class="{visibleItem === 'MAP' ? 'main overflow' : 'main'}">
  {#if visibleItem === "MAP"}
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
                on:click={() => toggleRow(message.id)}>
              <td>{message.id}</td>
              <td>{message.class}</td>
              <td>{message.measurementInstrument}</td>
              <td>{message.messageType.messageType}</td>
              <td>{message.dataSourceIdentifier.sic}</td>
              <td>{new Date(message.timeOfDay.timestamp * 1000).toISOString().substring(11, 23)}</td>
            </tr>
          {:else}
            <tr class:selected={selectedRow === message.id}
                on:click={() => toggleRow(message.id)}>
              <td>{message.id}</td>
              <td>{message.class}</td>
              <td>{message.measurementInstrument}</td>
              <td>{message.targetIdentification.data}</td>
              <td>{`SIC: ${message.dataSourceIdentifier.sic}; SAC: ${message.dataSourceIdentifier.sac}`}</td>
              <td>{new Date(message.timeofReportTransmission.time * 1000 ).toISOString().substring(11, 23)}</td>
            </tr>
          {/if}
          {#if selectedRow === message.id}
            <tr class="expanded-row">
              <td colspan="6">Expanded content here</td>
            </tr>
          {/if}
        {/each}
      </tbody>
     </table>
     {/if}
    </div>
</main>