# monoderest
a nodejs app that adds REST API to mongoDB database


# Configuration

modify the config.json script passing in your mongodb connection parameters

run the setup from your node server from "bin/www.json"



#Usage

#GET----


#get all records

http://localhost:3000/api/?document=products&column=*

table/collection = products

coulmn = using "*" retrives all the colums, otherwise you can specify columns/fields you want to retrive, by making them comma delimited

#get records and filter by

http://localhost:3000/api/?document=products&column=price,category&filter={"price":"180"}

adding filter can be optional

the above url means getting records where price = 180

to add more filters, each filter conditions are wrapped by square brackets... i.e

http://localhost:3000/api/?document=products&column=price,category&filter=-[{"price":"180"}, {"name" : "toby"}]

where "-" means OR
where "*" means AND



