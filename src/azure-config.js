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
  return `${AZURE_CONFIG.baseUrl}/${container}/${filename}`;
};

// Team jersey configurations with main colors
export const TEAM_CONFIGS = {
  // La Liga
  real_madrid: {
    home: { src: getAzureUrl('jerseys', 'jerseys/la_liga_jerseys/real_madrid/home_2025.webp'), color: 'white', name: 'Home' },
    away: { src: getAzureUrl('jerseys', 'jerseys/la_liga_jerseys/real_madrid/away_2025.webp'), color: 'black', name: 'Away' },
    third: { src: getAzureUrl('jerseys', 'jerseys/la_liga_jerseys/real_madrid/third_2025.webp'), color: 'blue', name: 'Third' }
  },
  // Premier League
  liverpool: {
    home: { src: getAzureUrl('jerseys', 'jerseys/premier_jerseys/liverpool/home_2025.webp'), color: 'red', name: 'Home' },
    away: { src: getAzureUrl('jerseys', 'jerseys/premier_jerseys/liverpool/away_2025.webp'), color: 'white', name: 'Away' },
    third: { src: getAzureUrl('jerseys', 'jerseys/premier_jerseys/liverpool/third_2025.webp'), color: 'green', name: 'Third' }
  },
  // Bundesliga
  dortmund: {
    home: { src: getAzureUrl('jerseys', 'jerseys/bundesliga_jerseys/dortmund/home_2025.webp'), color: 'yellow', name: 'Home' },
    away: { src: getAzureUrl('jerseys', 'jerseys/bundesliga_jerseys/dortmund/away_2025.webp'), color: 'black', name: 'Away' },
    third: { src: getAzureUrl('jerseys', 'jerseys/bundesliga_jerseys/dortmund/third_2025.webp'), color: 'white', name: 'Third' }
  },
  // Serie A
  milan: {
    home: { src: getAzureUrl('jerseys', 'jerseys/seria_jerseys/milan/home_2025.webp'), color: 'red', name: 'Home' },
    away: { src: getAzureUrl('jerseys', 'jerseys/seria_jerseys/milan/away_2025.webp'), color: 'white', name: 'Away' },
    third: { src: getAzureUrl('jerseys', 'jerseys/seria_jerseys/milan/third_2025.webp'), color: 'black', name: 'Third' }
  },
  // Ligue 1
  marseille: {
    home: { src: getAzureUrl('jerseys', 'jerseys/ligue1_jerseys/marseille/home_2025.webp'), color: 'blue', name: 'Home' },
    away: { src: getAzureUrl('jerseys', 'jerseys/ligue1_jerseys/marseille/away_2025.webp'), color: 'white', name: 'Away' },
    third: { src: getAzureUrl('jerseys', 'jerseys/ligue1_jerseys/marseille/third_2025.webp'), color: 'orange', name: 'Third' }
  },
  // Eredivisie
  ajax: {
    home: { src: getAzureUrl('jerseys', 'jerseys/eredivise_jerseys/ajax/home_2025.webp'), color: 'red', name: 'Home' },
    away: { src: getAzureUrl('jerseys', 'jerseys/eredivise_jerseys/ajax/away_2025.webp'), color: 'white', name: 'Away' },
    third: { src: getAzureUrl('jerseys', 'jerseys/eredivise_jerseys/ajax/third_2025.webp'), color: 'blue', name: 'Third' }
  },
  // Süper Lig
  besiktas: {
    home: { src: getAzureUrl('jerseys', 'jerseys/superliga_jerseys/besiktas/home_2025.jpg'), color: 'black', name: 'Home' },
    away: { src: getAzureUrl('jerseys', 'jerseys/superliga_jerseys/besiktas/away_2025.jpg'), color: 'white', name: 'Away' },
    third: { src: getAzureUrl('jerseys', 'jerseys/superliga_jerseys/besiktas/third_2025.jpg'), color: 'red', name: 'Third' }
  },
  // Saudi Pro League
  alahly: {
    home: { src: getAzureUrl('jerseys', 'jerseys/saudipro_jerseys/alahly/home_2025.jpg'), color: 'red', name: 'Home' },
    away: { src: getAzureUrl('jerseys', 'jerseys/saudipro_jerseys/alahly/away_2025.jpg'), color: 'white', name: 'Away' },
    third: { src: getAzureUrl('jerseys', 'jerseys/saudipro_jerseys/alahly/third_2025.jpg'), color: 'yellow', name: 'Third' }
  }
};

// League to team mapping
export const LEAGUE_TEAMS = {
  es1: 'real_madrid',    // La Liga
  gb1: 'liverpool',      // Premier League
  l1: 'dortmund',        // Bundesliga
  it1: 'milan',          // Serie A
  fr1: 'marseille',     // Ligue 1
  nl1: 'ajax',           // Eredivisie
  tr1: 'besiktas',       // Süper Lig
  sa1: 'alahly'          // Saudi Pro League
};

// Legacy support for existing code
export const JERSEY_URLS = {
  home: getAzureUrl('jerseys', 'jerseys/la_liga_jerseys/real_madrid/home_2025.webp'),
  away: getAzureUrl('jerseys', 'jerseys/la_liga_jerseys/real_madrid/away_2025.webp'),
  third: getAzureUrl('jerseys', 'jerseys/la_liga_jerseys/real_madrid/third_2025.webp')
};

// League URLs
export const LEAGUE_URLS = {
  logos: {
    gb1: getAzureUrl('leagues', 'leagues/logos/gb1_logo.png'),
    es1: getAzureUrl('leagues', 'leagues/logos/es1_logo.png'),
    l1: getAzureUrl('leagues', 'leagues/logos/l1_logo.png'),
    it1: getAzureUrl('leagues', 'leagues/logos/it1_logo.png'),
    fr1: getAzureUrl('leagues', 'leagues/logos/fr1_logo.png'),
    nl1: getAzureUrl('leagues', 'leagues/logos/nl1_logo.png'),
    tr1: getAzureUrl('leagues', 'leagues/logos/tr1_logo.png'),
    sa1: getAzureUrl('leagues', 'leagues/logos/sa1_logo.png'),
    cl: getAzureUrl('leagues', 'leagues/logos/cl_logo.png'),
    el: getAzureUrl('leagues', 'leagues/logos/el_logo.png'),
    ucol: getAzureUrl('leagues', 'leagues/logos/ucol_logo.png')
  },
  flags: {
    gb1: getAzureUrl('leagues', 'leagues/flags/gb1_flag.png'),
    es1: getAzureUrl('leagues', 'leagues/flags/es1_flag.png'),
    l1: getAzureUrl('leagues', 'leagues/flags/l1_flag.png'),
    it1: getAzureUrl('leagues', 'leagues/flags/it1_flag.png'),
    fr1: getAzureUrl('leagues', 'leagues/flags/fr1_flag.png'),
    nl1: getAzureUrl('leagues', 'leagues/flags/nl1_flag.png'),
    tr1: getAzureUrl('leagues', 'leagues/flags/tr1_flag.png'),
    sa1: getAzureUrl('leagues', 'leagues/flags/sa1_flag.png'),
    cl: getAzureUrl('leagues', 'leagues/flags/cl_flag.png'),
    el: getAzureUrl('leagues', 'leagues/flags/el_flag.png'),
    ucol: getAzureUrl('leagues', 'leagues/flags/ucol_flag.png')
  }
};