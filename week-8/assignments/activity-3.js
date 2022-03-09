/**
 * 1. Replace regular functions with arrow functions
 * 2. Fix callback hell by rewriting it with async/await
 * 3. Make sure the "Finish" is logged after all the data is converted
 */

 const timeout = (ms) => new Promise(resolve => 
  {
    setTimeout(resolve, ms);
}
)
const generateRandomNumber = () =>Math.floor(Math.random() * 40);
const generateData = async () =>timeout(1000).then(() => Array.from({ length: 20 }, generateRandomNumber))
const convertToFeet = (meters) =>timeout(3500).then(() => (meters * 3.2808))

const processData = async (data, replace) =>
  await Promise.all(data.map(async (value) => {
      return { v1: value, r1:await replace(value) };
  }
  )
  )



const logResult =(meters, feet) =>console.log(`Converted ${meters}m to ${feet}ft`);


const main = async () =>
 {
  console.log("Start");
  let data = await generateData()
  let processedData = await processData(data, convertToFeet)
  processedData.forEach(element => {
      logResult(element.v1, element.r1)
  
    })

  console.log("Finish");
}

main();