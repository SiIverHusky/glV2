import requests
import json
import os

# Set the path to the JSON file
json_path = 'public/js/steam.json'
constImageURL = 'https://cdn.cloudflare.steamstatic.com/steam/apps/{appid}/header.jpg'
constYoutubeEmbed = 'https://www.youtube.com/embed/{yt_link}'

def fetch_steam(appid):
    url=f'https://store.steampowered.com/api/appdetails?appids={appid}'
    response = requests.get(url)
    print(f'Accessing {url}')
    data = response.json()
    return data[str(appid)]['data']

def clean_steam_data(steam_data):
    cleaned_data = {}
    cleaned_data['id'] = steam_data['steam_appid']
    cleaned_data['name'] = steam_data['name']
    cleaned_data['image'] = constImageURL.format(appid=steam_data['steam_appid'])
    cleaned_data['description'] = steam_data['short_description']
    print(f'\nFor {cleaned_data["name"]}')
    vid_link = ''
    print('Leave blank to do default')
    vid_link = input('Enter YouTube link id: ')
    if vid_link == '':
        vid_link = steam_data.get('movies', [{}])[0].get('webm', {}).get('480', '')
    else:
        vid_link = constYoutubeEmbed.format(yt_link=vid_link)
    cleaned_data['video'] = vid_link
    if 'genres' in steam_data:
        cleaned_data['genres'] = ', '.join([genre['description'] for genre in steam_data['genres']])
    else:
        cleaned_data['genres'] = ''
    cleaned_data['developer'] = steam_data.get('developers', [])
    cleaned_data['publisher'] = steam_data.get('publishers', [])
    cleaned_data['release_date'] = steam_data.get('release_date', {}).get('date', '')
    cleaned_data['rating'] = steam_data.get('metacritic', {}).get('score', '')
    clean_platforms = lambda platforms: [platform for platform, value in platforms.items() if value]
    cleaned_data['platforms'] = ', '.join(clean_platforms(steam_data.get('platforms', {})))
    cleaned_data['language'] = steam_data.get('supported_languages', '')

    return cleaned_data

def api2JSON(appids):
    # Check if the file exists and is not empty
    if os.path.exists(json_path) and os.stat(json_path).st_size > 0:
        with open(json_path, 'r') as f:
            steam_dict = json.load(f)
    else:
        steam_dict = {}

    for appid in appids:
        if str(appid) in steam_dict:
            print(f'{appid} is already in steam.json')
        else:
            steam_data = clean_steam_data(fetch_steam(appid))
            steam_dict[appid] = steam_data
            print(f'Writing {appid} to steam.json\n')

    with open(json_path, 'w') as f:
        json.dump(steam_dict, f)

if __name__ == '__main__':
    appids = input('Enter app IDs separated by commas: ').strip()

    if appids.lower() == 'drop':
        if os.path.exists(json_path):
            os.remove(json_path)
            print('steam.json deleted')
        else:
            print('steam.json does not exist')
    else:
        appids = appids.split(',')
        appids = [int(appid.strip()) for appid in appids]
        api2JSON(appids)