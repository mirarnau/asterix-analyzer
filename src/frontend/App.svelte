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
  /* h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  } */

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<script lang="ts" type="module">
  import type { Cat10 } from "../electron/cat10/cat10";
  import type { Cat21 } from "../electron/cat21/cat21";
  import { initIpcMainBidirectional, ipcMainBidirectional } from "./ipcMain/ipcMainCallers";
  import { parseIpcMainReceiveMessage } from "./ipcMain/ipcMainReceiverParser";

  
  let messages: (Cat10 | Cat21)[] = [];
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
    const FRAGMENTS = 10000;
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
  <button type="button" class="btn btn-primary" on:click="{handleLoadSomeMsgs}"
      ><i class="bi bi-folder2-open"></i></button
    > 
    <button
            type="button"
            class="{messages.length > 0 ? 'btn btn-primary' : 'btn btn-primary disabled'}"
            on:click="{csv_file}"
            ><i class="bi bi-filetype-csv"></i>
    </button> 
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Class</th>
        <th>Data source identifier SIC</th>
        <th>Data source identifier SAC</th>
      </tr>
    </thead>
    <tbody>
      {#each messages as message}
          <tr>
            <td>{message.id}</td>
            <td>{message.class}</td>
            <td>{message.dataSourceIdentifier.sic}</td>
            <td>{message.dataSourceIdentifier.sac}</td>
          </tr>
      {/each}
    </tbody>
   </table>
</main>