import requests
import os
import re

def download_image(url, filename, folder):
    """Download an image from URL and save it"""
    try:
        print(f"Downloading {filename} from {url}")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        os.makedirs(folder, exist_ok=True)
        filepath = os.path.join(folder, filename)
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"[OK] Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"[ERROR] Failed to download {filename}: {e}")
        return False

def main():
    # League data extracted from the HTML
    leagues = [
        {
            'name': 'Premier League',
            'logo_url': 'https://tmssl.akamaized.net//images/logo/homepageWappen150x150/gb1.png?lm=1521104656',
            'flag_url': 'https://tmssl.akamaized.net//images/flagge/homepageSmall/189.png?lm=1520611569',
            'code': 'gb1'
        },
        {
            'name': 'LaLiga',
            'logo_url': 'https://tmssl.akamaized.net//images/logo/homepageWappen150x150/es1.png?lm=1725974302',
            'flag_url': 'https://tmssl.akamaized.net//images/flagge/homepageSmall/157.png?lm=1520611569',
            'code': 'es1'
        },
        {
            'name': 'Bundesliga',
            'logo_url': 'https://tmssl.akamaized.net//images/logo/homepageWappen150x150/l1.png?lm=1525905518',
            'flag_url': 'https://tmssl.akamaized.net//images/flagge/homepageSmall/40.png?lm=1520612525',
            'code': 'l1'
        },
        {
            'name': 'Serie A',
            'logo_url': 'https://tmssl.akamaized.net//images/logo/homepageWappen150x150/it1.png?lm=1656073460',
            'flag_url': 'https://tmssl.akamaized.net//images/flagge/homepageSmall/75.png?lm=1520611569',
            'code': 'it1'
        },
        {
            'name': 'Ligue 1',
            'logo_url': 'https://tmssl.akamaized.net//images/logo/homepageWappen150x150/fr1.png?lm=1732280518',
            'flag_url': 'https://tmssl.akamaized.net//images/flagge/homepageSmall/50.png?lm=1520611569',
            'code': 'fr1'
        },
        {
            'name': 'Eredivisie',
            'logo_url': 'https://tmssl.akamaized.net//images/logo/homepageWappen150x150/nl1.png?lm=1751278149',
            'flag_url': 'https://tmssl.akamaized.net//images/flagge/homepageSmall/122.png?lm=1520611569',
            'code': 'nl1'
        },
        {
            'name': 'Süper Lig',
            'logo_url': 'https://tmssl.akamaized.net//images/logo/homepageWappen150x150/tr1.png?lm=1723019495',
            'flag_url': 'https://tmssl.akamaized.net//images/flagge/homepageSmall/174.png?lm=1520611569',
            'code': 'tr1'
        },
        {
            'name': 'Saudi Pro League',
            'logo_url': 'https://tmssl.akamaized.net//images/logo/homepageWappen150x150/sa1.png?lm=1692612717',
            'flag_url': 'https://tmssl.akamaized.net//images/flagge/homepageSmall/146.png?lm=1520611569',
            'code': 'sa1'
        },
        {
            'name': 'UEFA Champions League',
            'logo_url': 'https://tmssl.akamaized.net//images/logo/homepageWappen150x150/cl.png?lm=1626810555',
            'flag_url': 'https://tmsi.akamaized.net/startseite/confeds/uefa75.png',
            'code': 'cl'
        },
        {
            'name': 'UEFA Europa League',
            'logo_url': 'https://tmssl.akamaized.net//images/logo/homepageWappen150x150/el.png?lm=1721915137',
            'flag_url': 'https://tmsi.akamaized.net/startseite/confeds/uefa75.png',
            'code': 'el'
        },
        {
            'name': 'UEFA Conference League',
            'logo_url': 'https://tmssl.akamaized.net//images/logo/homepageWappen150x150/ucol.png?lm=1721914537',
            'flag_url': 'https://tmsi.akamaized.net/startseite/confeds/uefa75.png',
            'code': 'ucol'
        }
    ]
    
    print("Downloading league logos and flags...")
    print("=" * 50)
    
    # Create folders
    os.makedirs('leagues/logos', exist_ok=True)
    os.makedirs('leagues/flags', exist_ok=True)
    
    # Download logos and flags
    for league in leagues:
        print(f"\nProcessing {league['name']}...")
        
        # Download league logo
        logo_filename = f"{league['code']}_logo.png"
        download_image(league['logo_url'], logo_filename, 'leagues/logos')
        
        # Download country/confederation flag
        flag_filename = f"{league['code']}_flag.png"
        download_image(league['flag_url'], flag_filename, 'leagues/flags')
    
    print("\n" + "=" * 50)
    print("Download complete! Check the 'leagues' folder for the downloaded images.")
    
    # Create a summary file
    with open('leagues/leagues_info.txt', 'w', encoding='utf-8') as f:
        f.write("League Information\n")
        f.write("==================\n\n")
        for league in leagues:
            f.write(f"League: {league['name']}\n")
            f.write(f"Code: {league['code']}\n")
            f.write(f"Logo URL: {league['logo_url']}\n")
            f.write(f"Flag URL: {league['flag_url']}\n")
            f.write("-" * 50 + "\n\n")

if __name__ == "__main__":
    main()
