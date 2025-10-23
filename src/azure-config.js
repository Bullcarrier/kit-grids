// Azure Blob Storage Configuration
export const AZURE_CONFIG = {
  storageAccountName: 'kitgridsstorage',
  // These URLs will work once public access is enabled
  baseUrl: 'https://kitgridsstorage.blob.core.windows.net',
  containers: {
    jerseys: 'jerseys',
    leagues: 'leagues'
  }
};

// Helper function to get Azure URLs
export const getAzureUrl = (container, filename) => {
  return `${AZURE_CONFIG.baseUrl}/${container}/${container}/${filename}`;
};

// Jersey URLs
export const JERSEY_URLS = {
  home: getAzureUrl('jerseys', 'home_2025.webp'),
  away: getAzureUrl('jerseys', 'away_2025.webp'),
  third: getAzureUrl('jerseys', 'third_2025.webp')
};

// League URLs
export const LEAGUE_URLS = {
  logos: {
    gb1: getAzureUrl('leagues', 'logos/gb1_logo.png'),
    es1: getAzureUrl('leagues', 'logos/es1_logo.png'),
    l1: getAzureUrl('leagues', 'logos/l1_logo.png'),
    it1: getAzureUrl('leagues', 'logos/it1_logo.png'),
    fr1: getAzureUrl('leagues', 'logos/fr1_logo.png'),
    nl1: getAzureUrl('leagues', 'logos/nl1_logo.png'),
    tr1: getAzureUrl('leagues', 'logos/tr1_logo.png'),
    sa1: getAzureUrl('leagues', 'logos/sa1_logo.png'),
    cl: getAzureUrl('leagues', 'logos/cl_logo.png'),
    el: getAzureUrl('leagues', 'logos/el_logo.png'),
    ucol: getAzureUrl('leagues', 'logos/ucol_logo.png')
  },
  flags: {
    gb1: getAzureUrl('leagues', 'flags/gb1_flag.png'),
    es1: getAzureUrl('leagues', 'flags/es1_flag.png'),
    l1: getAzureUrl('leagues', 'flags/l1_flag.png'),
    it1: getAzureUrl('leagues', 'flags/it1_flag.png'),
    fr1: getAzureUrl('leagues', 'flags/fr1_flag.png'),
    nl1: getAzureUrl('leagues', 'flags/nl1_flag.png'),
    tr1: getAzureUrl('leagues', 'flags/tr1_flag.png'),
    sa1: getAzureUrl('leagues', 'flags/sa1_flag.png'),
    cl: getAzureUrl('leagues', 'flags/cl_flag.png'),
    el: getAzureUrl('leagues', 'flags/el_flag.png'),
    ucol: getAzureUrl('leagues', 'flags/ucol_flag.png')
  }
};
