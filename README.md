# Monoderest
Monoderest is a nodejs REST api built with express that serves as a standalone system,  used in querying a mongoDB database.
this is actually my first standard open source project and my first project working with nodejs and mongodb which i find very interesting, because everything you consume or spit out are all javascript! :)


# Requirements
The requirements are simple and easy, here are the things you need!
a nodejs server.
a mongoDB database to store and retrive your records.
a REST client.


# Configuration

You just need to modify your connection parameters in the config.json file inside the root directory in other to let the api connect to your mongoDB database, if no config.json is empty, then it uses the default connection settings

run the setup from your node server from "bin/www.json"


# features

Ability to combine AND & OR conditions in getting out your records
You are able to select the particular fields/coulmns you are retriving
Every return request are in JSON format making it readable by human eyes lol
Filtering Out records i.e(AND & OR) can be passed into get parameters as JSON strings
HTTP verbs are all put into consideration (GET, POST, PUT, DELETE)



#Usage

GET VERB

#list/retrive records to be output in JSON

for example:
```
GET http://localhost:3000/api/?document=products&column=*
```

note that for you to send get request, document and column fields are required while the filter field is optional

document: the collection or table (as it is called in Relational Database) 

column : the field or column (as it is called in Relational Database). note that on returning all fields/columns and asterik "*" symbol can be used, if you dont want to return all fields, list those fields in a comma separated way.
```
i.e GET http://localhost:3000/api/?document=products&column=name,product,age
```

filter: adds conditions for filtering records to retrive (like it is seen in relational database AND & OR)
i.e GET http://localhost:3000/api/?document=products&column=name,product,age&filter={"price":"180"}
equivalence in SQL : SELECT name, product, age WHERE "price" = "180" FROM products

using AND :
```
i.e GET http://localhost:3000/api/?document=products&column=name,product,age&filter=*[{"price":"180"},{"name":"toby"}]
```
where AND symbol is "*"
```
equivalence in SQL : SELECT name, product, age WHERE "price" = "180" AND "name":"toby" FROM products
```

using OR :
```
i.e GET http://localhost:3000/api/?document=products&column=name,product,age&filter=-[{"price":"180"},{"name":"toby"}]
```
where AND symbol is "-"
```
equivalence in SQL : SELECT name, product, age WHERE "price" = "180" OR "name":"toby" FROM products
```

Combining AND & OR together:
```
i.e GET http://localhost:3000/api/?document=products&column=name,product,age&filter=*[-[{"price":"180"},{"name":"toby"}], {"category":"person"}]
```
where AND symbol is "-" & OR symbol is "*"
```
equivalence in SQL : SELECT name, product, age WHERE ("price" = "180" OR "name":"toby") AND ("category" : "person") FROM products
```






