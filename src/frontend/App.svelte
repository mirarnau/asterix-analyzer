<style>
  main {
    background-color: white;
    padding: 0%;
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
    width: 60px;
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
  
  tr.smr {
    background-color: rgb(127, 66, 0);
  }
  
  tr.mlat {
    background-color: rgb(0, 98, 128);
  }
</style>


<script lang="ts" type="module">

    import type { Cat10 } from "../electron/cat10/Cat10";
    import type { Cat21 } from "../electron/cat21/Cat21";
    import { initIpcMainBidirectional, ipcMainBidirectional } from "./ipcMain/ipcMainCallers";
    import { parseIpcMainReceiveMessage } from "./ipcMain/ipcMainReceiverParser";


  
  let messages: ( Cat10 | Cat21) [] = [];
  let numberOfMsg = 0;
  
  let loading = false;
  let performanceData = false;

  async function handleLoadSomeMsgs() {
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
  
</script>

<main>

  <button type="button" class="btn btn-primary file-button" on:click="{handleLoadSomeMsgs}"
      >File<i class="bi bi-folder2-open"></i></button
    >  
    <button type="button" class="btn btn-primary csv-button" on:click="{csv_file}"
      >Export to CSV<i class="bi bi-folder2-open"></i></button
    > 
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
        {#each messages as message}
          {#if message.class === "Cat10" }
            <tr class:smr={message.measurementInstrument === 'SMR'} class:mlat={message.measurementInstrument === 'MLAT'}>
              <td>{message.id}</td>
              <td>{message.class}</td>
              <td>{message.measurementInstrument}</td>
              <td>{message.messageType.messageType}</td>
              <td>{message.dataSourceIdentifier.sic}</td>
              <td>{message.timeOfDay.timestamp}</td>
            </tr>
          {:else}
            <tr>
              <td>{message.id}</td>
              <td>{message.class}</td>
              <td>{message.measurementInstrument}</td>
              <td>{message.targetIdentification.data}</td>
              <td>{`SIC: ${message.dataSourceIdentifier.sic}; SAC: ${message.dataSourceIdentifier.sac}`}</td>
              <td>{new Date(message.timeofReportTransmission.time * 1000).toISOString().substring(11, 23)}</td>
            </tr>
            {/if}
        {/each}
      </tbody>
     </table>
</main>