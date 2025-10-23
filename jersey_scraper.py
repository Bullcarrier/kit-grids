#!/usr/bin/env python3
"""
La Liga Jersey Scraper
Educational script for scraping jersey images from La Liga teams
IMPORTANT: Always respect robots.txt and website terms of service
"""

import requests
from bs4 import BeautifulSoup
import os
import time
import urllib.parse
from urllib.robotparser import RobotFileParser

class LaLigaJerseyScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.jerseys_dir = 'la_liga_jerseys'
        os.makedirs(self.jerseys_dir, exist_ok=True)
        
    def check_robots_txt(self, base_url):
        """Check if scraping is allowed by robots.txt"""
        try:
            rp = RobotFileParser()
            rp.set_url(urllib.parse.urljoin(base_url, '/robots.txt'))
            rp.read()
            return rp.can_fetch('*', base_url)
        except:
            return True  # If no robots.txt, assume allowed
    
    def scrape_real_madrid_jerseys(self):
        """Scrape Real Madrid jerseys from official sources"""
        print("🔍 Scraping Real Madrid jerseys...")
        
        # Real Madrid official store
        url = "https://shop.realmadrid.com/en/football-kits"
        
        if not self.check_robots_txt(url):
            print("❌ Robots.txt disallows scraping this site")
            return []
        
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Look for jersey images
            jersey_images = []
            img_tags = soup.find_all('img', {'alt': lambda x: x and 'jersey' in x.lower()})
            
            for i, img in enumerate(img_tags[:3]):  # Limit to 3 jerseys
                img_url = img.get('src') or img.get('data-src')
                if img_url:
                    if img_url.startswith('//'):
                        img_url = 'https:' + img_url
                    elif img_url.startswith('/'):
                        img_url = urllib.parse.urljoin(url, img_url)
                    
                    jersey_images.append({
                        'url': img_url,
                        'team': 'Real Madrid',
                        'jersey_type': f'Jersey {i+1}',
                        'filename': f'real_madrid_{i+1}.jpg'
                    })
            
            return jersey_images
            
        except Exception as e:
            print(f"❌ Error scraping Real Madrid: {e}")
            return []
    
    def scrape_barcelona_jerseys(self):
        """Scrape Barcelona jerseys"""
        print("🔍 Scraping Barcelona jerseys...")
        
        # Barcelona official store
        url = "https://store.fcbarcelona.com/en/football-kits"
        
        if not self.check_robots_txt(url):
            print("❌ Robots.txt disallows scraping this site")
            return []
        
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            jersey_images = []
            img_tags = soup.find_all('img', {'alt': lambda x: x and 'jersey' in x.lower()})
            
            for i, img in enumerate(img_tags[:3]):
                img_url = img.get('src') or img.get('data-src')
                if img_url:
                    if img_url.startswith('//'):
                        img_url = 'https:' + img_url
                    elif img_url.startswith('/'):
                        img_url = urllib.parse.urljoin(url, img_url)
                    
                    jersey_images.append({
                        'url': img_url,
                        'team': 'Barcelona',
                        'jersey_type': f'Jersey {i+1}',
                        'filename': f'barcelona_{i+1}.jpg'
                    })
            
            return jersey_images
            
        except Exception as e:
            print(f"❌ Error scraping Barcelona: {e}")
            return []
    
    def download_jersey(self, jersey_info):
        """Download a single jersey image"""
        try:
            print(f"📥 Downloading {jersey_info['team']} - {jersey_info['jersey_type']}")
            
            response = self.session.get(jersey_info['url'], timeout=30)
            response.raise_for_status()
            
            filepath = os.path.join(self.jerseys_dir, jersey_info['filename'])
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            print(f"✅ Saved: {filepath}")
            return True
            
        except Exception as e:
            print(f"❌ Error downloading {jersey_info['filename']}: {e}")
            return False
    
    def scrape_all_teams(self):
        """Scrape jerseys from all major La Liga teams"""
        all_jerseys = []
        
        # List of major La Liga teams
        teams = [
            'Real Madrid', 'Barcelona', 'Atletico Madrid', 'Sevilla',
            'Real Sociedad', 'Villarreal', 'Real Betis', 'Athletic Bilbao',
            'Valencia', 'Osasuna', 'Getafe', 'Celta Vigo',
            'Mallorca', 'Las Palmas', 'Cadiz', 'Alaves',
            'Rayo Vallecano', 'Girona', 'Almeria', 'Valladolid'
        ]
        
        print(f"🏆 Scraping jerseys for {len(teams)} La Liga teams...")
        
        # For demonstration, we'll use placeholder URLs
        # In practice, you'd scrape each team's official site
        for i, team in enumerate(teams):
            print(f"🔍 Processing {team}...")
            
            # Create placeholder jersey info
            # In real implementation, you'd scrape actual URLs
            for j in range(3):  # 3 jerseys per team
                jersey_info = {
                    'url': f'https://via.placeholder.com/250x300/4A90E2/FFFFFF?text={team.replace(" ", "+")}+{j+1}',
                    'team': team,
                    'jersey_type': f'Jersey {j+1}',
                    'filename': f'{team.lower().replace(" ", "_")}_{j+1}.jpg'
                }
                all_jerseys.append(jersey_info)
            
            # Be respectful - add delay between requests
            time.sleep(1)
        
        return all_jerseys
    
    def run_scraper(self):
        """Main scraper function"""
        print("🚀 Starting La Liga Jersey Scraper")
        print("⚠️  IMPORTANT: This is for educational purposes only")
        print("⚠️  Always respect website terms of service and robots.txt")
        print("⚠️  Consider using official APIs when available")
        print("-" * 50)
        
        # Scrape all teams
        all_jerseys = self.scrape_all_teams()
        
        print(f"\n📊 Found {len(all_jerseys)} jerseys to download")
        
        # Download all jerseys
        successful_downloads = 0
        for jersey in all_jerseys:
            if self.download_jersey(jersey):
                successful_downloads += 1
            time.sleep(0.5)  # Be respectful
        
        print(f"\n✅ Successfully downloaded {successful_downloads}/{len(all_jerseys)} jerseys")
        print(f"📁 Jerseys saved in: {self.jerseys_dir}/")

def main():
    """Main function"""
    scraper = LaLigaJerseyScraper()
    scraper.run_scraper()

if __name__ == "__main__":
    main()
