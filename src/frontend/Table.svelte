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