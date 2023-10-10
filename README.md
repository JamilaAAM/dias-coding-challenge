# DIAS Coding Challenge 

## CPR service
This is a web service that returns a patient resource given a CPR. 'TestPatienter.csv' is a CSV file containing test cpr numbers which is used for testing the service.

Two endpoints are implemented:

```sh
localhost:8080/getPatient?patientID=<CPR>
```
The endpoint returns the master data based on a given CPR number. If the CPR number is not in the CSV file an error is thrown. To further improve the service a patient-validator is implemented in order to check all the parameters are in the correct format. For instance a CPR number can only consist of digits and it has to consist of either 9 or 10 digits (due to the test data). If these requirements are not fulfilled the error returned will be
```sh
'Invalid cpr: ValidationError: "value" with value "x" fails to match the required pattern: /^[0-9]{9,10}/"''
```

```sh
localhost:8080/auditlog
```


The above endpoint collects all the api calls using winston as a logging tool. Furthermore, a file transport is added in order to collect all the logs in one file. The /auditlog endpoint reads the logs from the file and returns them as a JSON response. A limit is set so it only retrieves the 50 latest logs. 

The service is configured with the following env variable(s):

| Variable name          | Example value               | Description                                                                                                                  |
| ---------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `PORT`                 | 8080                        | Listening port      

## Docker

Run the following commands to run the web service with Docker:

```sh
docker build -t cpr-service .
```
```sh
docker run -p 8080:8080 cpr-service
```

## Development mode

To run the service locally:

```sh
npm --prefix app/ run dev
```

## CURL

We can query the API using curl:

```sh
curl http://localhost:8080/getPatient?patientID=506889996
```
This returns the master data of a person with CPR=506889996:

```sh
{
"resourceType":"Patient",
"identifier":
  {
  "id":"506889996",
  "system":"1.2.208.176.1.2"
  },
"active":true,
"name":
  {
  "family":"Mosebrygersen",
  "given":["Sille","June","Test"]
  },
"gender":"female",
"birthDate":"1988-05-06",
"deceasedBoolean":false,
"address":
  {
  "line":"Testgrusgraven 3, 3.tv",
  "city":"Hillerød",
  "postalCode":"3400",
  "country":"Danmark"
  },
"guardian":"",
"comment":"Datter af May June Moberg & Schwendlund Mosebryggersen"
}
```

If a valid CPR number is entered, but is not in the CSV file the following error is thrown:

```sh
curl http://localhost:8080/getPatient?patientID=1234567890
```
```sh
{"message":"Patient with following cpr number does not exist"}
```


