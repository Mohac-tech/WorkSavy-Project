#Export 3 collections with all fields:
# Role
# Depts
# Localisation
# Python Script
import sys
import pymongo
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

fiName = str(sys.argv[1])
dbName = str(sys.argv[2])
colName = str(sys.argv[3])

db = myclient[dbName]
collection = db[colName]

if db is not None:
     if collection is not None:
        pass
     else: 
        collection = db[colName]
else:
     db = myclient[dbName]
     collection = db[colName]

with open(fiName) as file:
    file_data = json.load(file)

for i in range(len(file_data)):
     del file_data[i]['_id']
print(file_data)
collection.insert_many(file_data)


