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

NOTE: remember to run npm install to install the necessary packages to run the service

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