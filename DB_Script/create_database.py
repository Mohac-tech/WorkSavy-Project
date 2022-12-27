import pymongo
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

def createdb(colName, fiName):
    db = myclient.WorkSavy_DB
    collection = db[colName]

    with open(fiName) as file:
      file_data = json.load(file)

    for i in range(len(file_data)):
      del file_data[i]['_id']
    print(file_data)
    collection.insert_many(file_data)

createdb("departments", "depts.json")
createdb("localisations", "localisations.json")
createdb("roles", "roles.json")


