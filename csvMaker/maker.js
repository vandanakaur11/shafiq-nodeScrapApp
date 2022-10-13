const { grabData } = require('../scraper/index')
const writeCsv = require('write-csv');
const fs = require('fs');
const { scrapEachCar } = require('../scraper/scrapData');

const creatCsv = async () => {
    let tokens = [];

    // const sorts = ['sort=standard&desc=0', 'sort=price&desc=0', 'sort=price&desc=1', 'sort=age&desc=1', 'sort=mileage&desc=0', 'sort=mileage&desc=1', 'sort=power&desc=0', 'sort=power&desc=1', 'sort=year&desc=0', 'sort=year&desc=1'];

    let eachCarData = [];
    // let csvData = [];

    // for (let sort = 0; sort < sorts.length; sort++) {
    //     for (let index = 1; index < 21; index++) {
    //         let temp = await grabData(index, sorts[sort]);
    //         csvData = [...csvData, ...temp];
    //         console.log("Page", index, sort);
    //     }
    // }


    // let prepareData = JSON.stringify(csvData);
    // fs.writeFileSync('token.json', prepareData);

    // writeCsv('electric&Hybrid.csv', csvData)





    fs.readFile('token.json', async (err, data) => {
        tokens = JSON.parse(data);
        let = index = 0;

        for (let i = 0; i < tokens.length; i++) {
            try {
                const ele = tokens[i].token;
                console.log(ele)
                let temp = await scrapEachCar(ele);
                eachCarData = [...eachCarData, ...temp];
                console.log(i)
            } catch (error) {
                continue;
            }

        }
        writeCsv('electric&Hybrid7.csv', eachCarData);

    })
    // scrapEachCar();
}

module.exports = { creatCsv };