const { creatCsv } = require('../csvMaker/maker');
const { TokenGenerator } = require('../blogsScraper/electricCar');
const fs = require('fs');
// creatCsv();


// generate token start

// const triger = async () => {

//     let pakageData = [];

//     for (let index = 1; index < 473; index++) {
//         let temp = await TokenGenerator(index);
//         pakageData = [...pakageData, ...temp];
//         console.log("page", index);
//     }
//     let _s = JSON.stringify(pakageData);
//     fs.writeFileSync('blogsToken.json', _s);
// }

// generate token end

// triger();


creatCsv();