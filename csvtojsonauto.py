import csv
import json
import os

csvfile = open('../bihartotal.csv', 'r')
jsonfile = open('Biharcsv.json', 'w')

reader1 = csv.reader(csvfile)
header = tuple(next(reader1))  # gets the first line
print (header)
fieldnames = header
reader = csv.DictReader( csvfile, fieldnames)

jsonfile.write('[')
check = True

for row in reader:
	if (row['block']=='Total'):
		
		if (row['district']=='Bihar') :
			json.dump(row, jsonfile, indent=4, sort_keys=False)
			jsonfile.write('\n')
			jsonfile.write(']')
		elif (row['district']=='Unknown') :
			json.dump(row, jsonfile, indent=4, sort_keys=False)
			jsonfile.write(',')
			jsonfile.write('\n')
		else :
			json.dump(row, jsontemp, indent=4, sort_keys=False)
			jsontemp.write('\n')
			jsontemp.write(']')
			json.dump(row, jsonfile, indent=4, sort_keys=False)
			jsonfile.write(',')
			jsonfile.write('\n')
			check = True
	else :
		if (check):
			dis = row['district']
			url = 'district/'+dis+'/'+dis+'csv.json'
			
			if not os.path.exists(os.path.dirname(url)):
				try:
					os.makedirs(os.path.dirname(url))
				except OSError as exc: # Guard against race condition
					if exc.errno != errno.EEXIST:
						raise
						
			jsontemp = open(url, 'w')
			jsontemp.write('[')
			check = False
		json.dump(row, jsontemp, indent=4, sort_keys=False)
		jsontemp.write(',')
		jsontemp.write('\n')
		
	