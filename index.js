const jsonString = '{"name" : "Ashish", "age" : 23, "city" : "Delhi"}';

const jsonObject = JSON.parse(jsonString);

console.log(jsonObject);
console.log(jsonObject.name);

const objectToConvert = {
    name : "Ashish",
    age : 23,
    city : "New Delhi" 
};
const jsonStringified = JSON.stringify(objectToConvert);
console.log(jsonStringified);