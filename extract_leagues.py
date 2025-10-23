import requests
import os
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin

def extract_league_data(html_content):
    """Extract league data from the HTML content"""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    leagues = []
    
    # Find all league list items
    list_items = soup.find_all('li', class_='tm-button-list__list-item')
    
    for item in list_items:
        # Extract league logo
        logo_img = item.find('img', class_='tm-button-list__image')
        # Extract country flag
        flag_img = item.find('img', class_='tm-button-list__sub-image--flag')
        # Extract confederation logo (for UEFA competitions)
        confed_img = item.find('img', class_='tm-button-list__sub-image--confed')
        
        if logo_img:
            league_data = {
                'name': logo_img.get('alt', ''),
                'logo_url': logo_img.get('src', ''),
                'flag_url': flag_img.get('src', '') if flag_img else '',
                'confed_url': confed_img.get('src', '') if confed_img else '',
                'link': item.find('a').get('href', '') if item.find('a') else ''
            }
            leagues.append(league_data)
    
    return leagues

def download_image(url, filename, folder):
    """Download an image from URL and save it"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        os.makedirs(folder, exist_ok=True)
        filepath = os.path.join(folder, filename)
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
        return False

def main():
    # The HTML content you provided
    html_content = '''
    <section class="tm-button-list__wrapper tm-button-list__wrapper--full tm-button-list__wrapper--small-gap ">
        <h2 class="tm-discover__h2">
            MARKET VALUES PER COMPETITION
        </h2>
    <ul class="tm-button-list"><li><a href="/premier-league/marktwerte/wettbewerb/GB1" title="" target="_self" class="tm-button-list__list-item tm-button-list__list-item--big " onclick="tmEvent('lp_marktwerte', '/premier-league/marktwerte/wettbewerb/GB1' , '7_1', 'buttonList');"><img src="https://tmssl.akamaized.net//images/logo/homepageWappen150x150/gb1.png?lm=1521104656" alt="Premier League" class="tm-button-list__image tm-button-list__image--big 1" width="54" height="36"><img alt="England" class="tm-button-list__sub-image--flag" src="https://tmssl.akamaized.net//images/flagge/homepageSmall/189.png?lm=1520611569" width="" height=""></a><a href="/premier-league/marktwerte/wettbewerb/GB1" class="tm-button-list__list-item--label tm-button-list__list-item--sub-image-label" onclick="tmEvent('lp_marktwerte', '/premier-league/marktwerte/wettbewerb/GB1' , '7_1', 'buttonList');">
                        
                    </a></li><li><a href="/laliga/marktwerte/wettbewerb/ES1" title="" target="_self" class="tm-button-list__list-item tm-button-list__list-item--big " onclick="tmEvent('lp_marktwerte', '/laliga/marktwerte/wettbewerb/ES1' , '7_2', 'buttonList');"><img src="https://tmssl.akamaized.net//images/logo/homepageWappen150x150/es1.png?lm=1725974302" alt="LaLiga" class="tm-button-list__image tm-button-list__image--big 1" width="54" height="36"><img alt="Spain" class="tm-button-list__sub-image--flag" src="https://tmssl.akamaized.net//images/flagge/homepageSmall/157.png?lm=1520611569" width="" height=""></a><a href="/laliga/marktwerte/wettbewerb/ES1" class="tm-button-list__list-item--label tm-button-list__list-item--sub-image-label" onclick="tmEvent('lp_marktwerte', '/laliga/marktwerte/wettbewerb/ES1' , '7_2', 'buttonList');">
                        
                    </a></li><li><a href="/bundesliga/marktwerte/wettbewerb/L1" title="" target="_self" class="tm-button-list__list-item tm-button-list__list-item--big " onclick="tmEvent('lp_marktwerte', '/bundesliga/marktwerte/wettbewerb/L1' , '7_3', 'buttonList');"><img src="https://tmssl.akamaized.net//images/logo/homepageWappen150x150/l1.png?lm=1525905518" alt="Bundesliga" class="tm-button-list__image tm-button-list__image--big 1" width="54" height="36"><img alt="Germany" class="tm-button-list__sub-image--flag" src="https://tmssl.akamaized.net//images/flagge/homepageSmall/40.png?lm=1520612525" width="" height=""></a><a href="/bundesliga/marktwerte/wettbewerb/L1" class="tm-button-list__list-item--label tm-button-list__list-item--sub-image-label" onclick="tmEvent('lp_marktwerte', '/bundesliga/marktwerte/wettbewerb/L1' , '7_3', 'buttonList');">
                        
                    </a></li><li><a href="/serie-a/marktwerte/wettbewerb/IT1" title="" target="_self" class="tm-button-list__list-item tm-button-list__list-item--big " onclick="tmEvent('lp_marktwerte', '/serie-a/marktwerte/wettbewerb/IT1' , '7_4', 'buttonList');"><img src="https://tmssl.akamaized.net//images/logo/homepageWappen150x150/it1.png?lm=1656073460" alt="Serie A" class="tm-button-list__image tm-button-list__image--big 1" width="54" height="36"><img alt="Italy" class="tm-button-list__sub-image--flag" src="https://tmssl.akamaized.net//images/flagge/homepageSmall/75.png?lm=1520611569" width="" height=""></a><a href="/serie-a/marktwerte/wettbewerb/IT1" class="tm-button-list__list-item--label tm-button-list__list-item--sub-image-label" onclick="tmEvent('lp_marktwerte', '/serie-a/marktwerte/wettbewerb/IT1' , '7_4', 'buttonList');">
                        
                    </a></li><li><a href="/ligue-1/marktwerte/wettbewerb/FR1" title="" target="_self" class="tm-button-list__list-item tm-button-list__list-item--big " onclick="tmEvent('lp_marktwerte', '/ligue-1/marktwerte/wettbewerb/FR1' , '7_5', 'buttonList');"><img src="https://tmssl.akamaized.net//images/logo/homepageWappen150x150/fr1.png?lm=1732280518" alt="Ligue 1" class="tm-button-list__image tm-button-list__image--big 1" width="54" height="36"><img alt="France" class="tm-button-list__sub-image--flag" src="https://tmssl.akamaized.net//images/flagge/homepageSmall/50.png?lm=1520611569" width="" height=""></a><a href="/ligue-1/marktwerte/wettbewerb/FR1" class="tm-button-list__list-item--label tm-button-list__list-item--sub-image-label" onclick="tmEvent('lp_marktwerte', '/ligue-1/marktwerte/wettbewerb/FR1' , '7_5', 'buttonList');">
                        
                    </a></li><li><a href="/eredivisie/marktwerte/wettbewerb/NL1" title="" target="_self" class="tm-button-list__list-item tm-button-list__list-item--big " onclick="tmEvent('lp_marktwerte', '/eredivisie/marktwerte/wettbewerb/NL1' , '7_6', 'buttonList');"><img src="https://tmssl.akamaized.net//images/logo/homepageWappen150x150/nl1.png?lm=1751278149" alt="Eredivisie" class="tm-button-list__image tm-button-list__image--big 1" width="54" height="36"><img alt="Netherlands" class="tm-button-list__sub-image--flag" src="https://tmssl.akamaized.net//images/flagge/homepageSmall/122.png?lm=1520611569" width="" height=""></a><a href="/eredivisie/marktwerte/wettbewerb/NL1" class="tm-button-list__list-item--label tm-button-list__list-item--sub-image-label" onclick="tmEvent('lp_marktwerte', '/eredivisie/marktwerte/wettbewerb/NL1' , '7_6', 'buttonList');">
                        
                    </a></li><li><a href="/super-lig/marktwerte/wettbewerb/TR1" title="" target="_self" class="tm-button-list__list-item tm-button-list__list-item--big " onclick="tmEvent('lp_marktwerte', '/super-lig/marktwerte/wettbewerb/TR1' , '7_7', 'buttonList');"><img src="https://tmssl.akamaized.net//images/logo/homepageWappen150x150/tr1.png?lm=1723019495" alt="Süper Lig" class="tm-button-list__image tm-button-list__image--big 1" width="54" height="36"><img alt="Türkiye" class="tm-button-list__sub-image--flag" src="https://tmssl.akamaized.net//images/flagge/homepageSmall/174.png?lm=1520611569" width="" height=""></a><a href="/super-lig/marktwerte/wettbewerb/TR1" class="tm-button-list__list-item--label tm-button-list__list-item--sub-image-label" onclick="tmEvent('lp_marktwerte', '/super-lig/marktwerte/wettbewerb/TR1' , '7_7', 'buttonList');">
                        
                    </a></li><li><a href="/saudi-professional-league/marktwerte/wettbewerb/SA1" title="" target="_self" class="tm-button-list__list-item tm-button-list__list-item--big " onclick="tmEvent('lp_marktwerte', '/saudi-professional-league/marktwerte/wettbewerb/SA1' , '7_8', 'buttonList');"><img src="https://tmssl.akamaized.net//images/logo/homepageWappen150x150/sa1.png?lm=1692612717" alt="Saudi Pro League" class="tm-button-list__image tm-button-list__image--big 1" width="54" height="36"><img alt="Saudi Arabia" class="tm-button-list__sub-image--flag" src="https://tmssl.akamaized.net//images/flagge/homepageSmall/146.png?lm=1520611569" width="" height=""></a><a href="/saudi-professional-league/marktwerte/wettbewerb/SA1" class="tm-button-list__list-item--label tm-button-list__list-item--sub-image-label" onclick="tmEvent('lp_marktwerte', '/saudi-professional-league/marktwerte/wettbewerb/SA1' , '7_8', 'buttonList');">
                        
                    </a></li><li><a href="/uefa-champions-league/marktwerte/pokalwettbewerb/CL" title="" target="_self" class="tm-button-list__list-item tm-button-list__list-item--big " onclick="tmEvent('lp_marktwerte', '/uefa-champions-league/marktwerte/pokalwettbewerb/CL' , '7_9', 'buttonList');"><img src="https://tmssl.akamaized.net//images/logo/homepageWappen150x150/cl.png?lm=1626810555" alt="UEFA Champions League" class="tm-button-list__image tm-button-list__image--big 1" width="54" height="36"><img alt="" class="tm-button-list__sub-image--confed" src="https://tmsi.akamaized.net/startseite/confeds/uefa75.png" width="" height=""></a><a href="/uefa-champions-league/marktwerte/pokalwettbewerb/CL" class="tm-button-list__list-item--label tm-button-list__list-item--sub-image-label" onclick="tmEvent('lp_marktwerte', '/uefa-champions-league/marktwerte/pokalwettbewerb/CL' , '7_9', 'buttonList');">
                        
                    </a></li><li><a href="/europa-league/marktwerte/pokalwettbewerb/EL" title="" target="_self" class="tm-button-list__list-item tm-button-list__list-item--big " onclick="tmEvent('lp_marktwerte', '/europa-league/marktwerte/pokalwettbewerb/EL' , '7_10', 'buttonList');"><img src="https://tmssl.akamaized.net//images/logo/homepageWappen150x150/el.png?lm=1721915137" alt="UEFA Europa League" class="tm-button-list__image tm-button-list__image--big 1" width="54" height="36"><img alt="" class="tm-button-list__sub-image--confed" src="https://tmsi.akamaized.net/startseite/confeds/uefa75.png" width="" height=""></a><a href="/europa-league/marktwerte/pokalwettbewerb/EL" class="tm-button-list__list-item--label tm-button-list__list-item--sub-image-label" onclick="tmEvent('lp_marktwerte', '/europa-league/marktwerte/pokalwettbewerb/EL' , '7_10', 'buttonList');">
                        
                    </a></li><li><a href="/uefa-europa-conference-league/marktwerte/pokalwettbewerb/UCOL" title="" target="_self" class="tm-button-list__list-item tm-button-list__list-item--big " onclick="tmEvent('lp_marktwerte', '/uefa-europa-conference-league/marktwerte/pokalwettbewerb/UCOL' , '7_11', 'buttonList');"><img src="https://tmssl.akamaized.net//images/logo/homepageWappen150x150/ucol.png?lm=1721914537" alt="UEFA Conference League" class="tm-button-list__image tm-button-list__image--big 1" width="54" height="36"><img alt="" class="tm-button-list__sub-image--confed" src="https://tmsi.akamaized.net/startseite/confeds/uefa75.png" width="" height=""></a><a href="/uefa-europa-conference-league/marktwerte/pokalwettbewerb/UCOL" class="tm-button-list__list-item--label tm-button-list__list-item--sub-image-label" onclick="tmEvent('lp_marktwerte', '/uefa-europa-conference-league/marktwerte/pokalwettbewerb/UCOL' , '7_11', 'buttonList');">
                        
                    </a></li></ul></section>
    '''
    
    # Extract league data
    leagues = extract_league_data(html_content)
    
    print("Found leagues:")
    for league in leagues:
        print(f"- {league['name']}")
        print(f"  Logo: {league['logo_url']}")
        print(f"  Flag: {league['flag_url']}")
        print(f"  Link: {league['link']}")
        print()
    
    # Create folders
    os.makedirs('leagues/logos', exist_ok=True)
    os.makedirs('leagues/flags', exist_ok=True)
    
    # Download logos and flags
    for league in leagues:
        # Clean league name for filename
        clean_name = re.sub(r'[^\w\s-]', '', league['name']).strip()
        clean_name = re.sub(r'[-\s]+', '_', clean_name).lower()
        
        # Download league logo
        if league['logo_url']:
            logo_filename = f"{clean_name}_logo.png"
            download_image(league['logo_url'], logo_filename, 'leagues/logos')
        
        # Download country flag
        if league['flag_url']:
            flag_filename = f"{clean_name}_flag.png"
            download_image(league['flag_url'], flag_filename, 'leagues/flags')
        
        # Download confederation logo (for UEFA competitions)
        if league['confed_url']:
            confed_filename = f"{clean_name}_confed.png"
            download_image(league['confed_url'], confed_filename, 'leagues/flags')
    
    print("\nDownload complete! Check the 'leagues' folder for the downloaded images.")
    
    # Create a summary file
    with open('leagues/leagues_info.txt', 'w') as f:
        f.write("League Information\n")
        f.write("==================\n\n")
        for league in leagues:
            f.write(f"League: {league['name']}\n")
            f.write(f"Logo URL: {league['logo_url']}\n")
            f.write(f"Flag URL: {league['flag_url']}\n")
            f.write(f"Link: {league['link']}\n")
            f.write("-" * 50 + "\n\n")

if __name__ == "__main__":
    main()
