import csv
import os
import django
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from profiles.models import Countries

def import_countries():
    csv_file_path = 'ISO 3166 Countries All.csv'
    
    Countries.objects.all().delete()
    print('Cleared existing countries data')
 
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        countries_data = []
        for row in csv_reader:
            nationality = row['name']
            if ' and ' in nationality:
                nationality += 'n'
            elif nationality.endswith('s'):
                nationality = nationality[:-1] + 'n'
            else:
                nationality += 'ese' if not nationality.endswith('ese') else ''
            
            countries_data.append({
                'num_code': int(row['country-code']),
                'alpha_2_code': row['alpha-2'],
                'alpha_3_code': row['alpha-3'],
                'en_short_name': row['name'],
                'nationality': nationality
            })
        
        countries_data.sort(key=lambda x: x['en_short_name'])
        
        countries_to_create = [
            Countries(
                num_code=country['num_code'],
                alpha_2_code=country['alpha_2_code'],
                alpha_3_code=country['alpha_3_code'],
                en_short_name=country['en_short_name'],
                nationality=country['nationality']
            )
            for country in countries_data
        ]
        
        Countries.objects.bulk_create(countries_to_create)
        
        print(f'Successfully imported {len(countries_to_create)} countries in alphabetical order')

if __name__ == '__main__':
    import_countries() 