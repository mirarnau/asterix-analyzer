<style>
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
  
  
  </style>
  
  
  <script lang="ts">
  import type { Cat10 } from "../../electron/cat10/Cat10";
  import type { Cat21 } from "../../electron/cat21/Cat21";
  import { initIpcMainBidirectional, ipcMainBidirectional } from "../ipcMain/ipcMainCallers";
  import { parseIpcMainReceiveMessage } from "../ipcMain/ipcMainReceiverParser";
  import GenericProps from "../items/GenericProps.svelte";
  
  interface Filter {
      Category: string[];
      Instrument: string[];
      TargetAddress?: string;
      TargetIdentification?: string;
  }
  
  let messages: ( Cat10 | Cat21) [] = [];
  const MSG_PER_PAGE = 50;
  let pageArray: number[] = [];
  let activePage = 1;
  let displayedPageArray: number[] = [];
  let selectedCat: string;
  let selectedInstr: string;
  let searchBox = "";
  
  let selectedRow: number | null = null;
  let allChildComponents = new Map<number, GenericProps>();
  let allChildComponentsKeys = Array.from(allChildComponents.keys());
  
  let searchPicker = "Select Filter";
  
  filterMessages();
  
  async function filterMessages() {
      clearSubcomponents();
      messages = [];
      const filter: Filter = {
        Category: [],
        Instrument: [],
      };
      let search = searchBox;
      if (searchPicker !== "Select Filter") {
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
      const resp = await parseIpcMainReceiveMessage(
        await ipcMainBidirectional("filter-messages", { page: activePage, filter, search })
      );
      const parsedResp: { messages: (Cat10 | Cat21)[]; totalMessages: number } = resp;
      console.log({ resp });
      console.log({ parsedResp });
      messages = parsedResp.messages;
      const pageNumber = Math.round(parsedResp.totalMessages / MSG_PER_PAGE);
      pageArray = Array.from({ length: pageNumber }, (_, i) => i + 1);
      pageArray.slice(0, 7);
      //messages = messages.concat(await parseIpcMainReceiveMessage(await ipcMainBidirectional("filter-messages", { filter, search })));
    }
  
    function clearSubcomponents() {
      allChildComponents.forEach((v, k) => {
        v.$destroy();
        allChildComponents.delete(k);
      });
      allChildComponentsKeys = Array.from(allChildComponents.keys());
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
  
    function handleSelectionCat(event) {
      selectedCat = event.target.value;
      updateFilters();
      
    }
  
    function handleSelectionInstrument(event) {
      selectedInstr = event.target.value;
      updateFilters();
      
    }
  
    async function csv_file() {
      console.log("Creating csv file");
      await ipcMainBidirectional("save-csv");
      console.log("CSV file written");
    }
  
    async function take_off() {
      await ipcMainBidirectional("filter-takeoff");
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
  
    function handlePageClick(page: number) {
      clearSubcomponents();
      if (pageArray && pageArray.includes(page)) {
        activePage = page;
        if (activePage - 3 < 1) {
          displayedPageArray = pageArray.slice(0, 7);
        } else if (activePage + 3 > pageArray.length) {
          displayedPageArray = pageArray.slice(activePage - 5, pageArray.length);
        } else {
          displayedPageArray = pageArray.slice(activePage - 4, activePage + 3);
        }
        //renderedMessges = messages.slice((page - 1) * MSG_PER_PAGE, page * MSG_PER_PAGE);
        filterMessages();
      }
    }
  </script>
  
  <div class="button-container">
      
      <button type="button" class="btn btn-primary csv-button" on:click="{csv_file}"
        >Export to CSV</button
      > 
      <button type="button" class="btn btn-primary csv-button" on:click="{take_off}"
        >Tacking off</button
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
      <select
          style="max-width: 200px ;"
          class="form-select"
          id="inputGroup02"
          bind:value="{searchPicker}"
          aria-label="Example select with button addon"
        >
        <option selected>Select Filter</option>  
        <option>Target Address</option>
          <option>Target identification</option>
      </select>
      <div id="search">
        <div class="input-group mb-3">
          <input
            bind:value="{searchBox}"
            type="text"
            class="form-control"
            on:keydown="{keyDown}"
            aria-label="Text input with dropdown button"
            placeholder="Search by target adress or target ID..."
          />
          {#if searchPicker === "Filter" }
          <label class="btn btn-primary disabled input-group-text" on:click="{updateFilters}" for="inputGroup02">Filter</label>
          {:else}
          <label class="input-group-text" on:click="{updateFilters}" for="inputGroup02">Search</label>
          {/if}
  
  
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
              <td>{#if message.targetIdentification}{message.targetIdentification.data}{/if}</td>
              <td>{`SIC: ${message.dataSourceIdentifier.sic}; SAC: ${message.dataSourceIdentifier.sac}`}</td>
              <td>{new Date(message.timeofReportTransmission.time * 1000 ).toISOString().substring(11, 23)}</td>
            </tr>
          {/if}
        {/each}
      </tbody>
     </table>
     <div class="text-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" on:click="{() => handlePageClick(activePage - 1)}">
            <a class="page-link" href="#a">Previous</a>
          </li>
  
          {#if !displayedPageArray.includes(1)}
            <li class="page-item" on:click="{() => handlePageClick(1)}">
              <a class="page-link" href="#a">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#a">...</a>
            </li>
          {/if}
  
          {#each displayedPageArray as page}
            <li
              class="{activePage === page ? 'page-item active' : 'page-item'}"
              on:click="{() => handlePageClick(page)}"
            >
              <a class="page-link" href="#a">{page}</a>
            </li>
          {/each}
  
          {#if !displayedPageArray.includes(pageArray.length)}
            <li class="page-item">
              <a class="page-link" href="#a">...</a>
            </li>
            <li class="page-item" on:click="{() => handlePageClick(pageArray.length)}">
              <a class="page-link" href="#a">{pageArray.length}</a>
            </li>
          {/if}
  
          <li class="page-item" on:click="{() => handlePageClick(activePage + 1)}">
            <a class="page-link" href="#a">Next</a>
          </li>
        </ul>
      </nav>
    </div>