<script>
    export let activeTab = 'file';
  
    function setActiveTab(tab) {
      activeTab = tab;
    }
  </script>
  
  <nav>
    <ul>
      <li class:selected={activeTab === 'file'} on:click={() => setActiveTab('file')}>File</li>
      <li class:selected={activeTab === 'table'} on:click={() => setActiveTab('table')}>Table</li>
      <li class:selected={activeTab === 'simulation'} on:click={() => setActiveTab('simulation')}>Simulation</li>
    </ul>
  </nav>