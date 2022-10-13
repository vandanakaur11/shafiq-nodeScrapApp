const request = require('request-promise');
const cheerio = require('cheerio');


const scrapEachCar = async (token) => {
    const uri = `https://www.autoscout24.com/offers/${token}?cldtidx=2&csq=sort%3Dstandard%26desc%3D0%26offer%3DD%252CJ%252CO%252CU%26fuel%3D2%252C3%252CE%26ustate%3DN%252CU%26atype%3DC%26size%3D2%26page%3D1&cstc=93469`;
    let model, version, price, carInfo = [], basicData = [], feature = '', featureArr = [], location, contact, imageURls = [];
    let detailsKeys = [];
    let detailsValue = [];
    let information = {
        Make: '',
        Model: '',
        Price: '',
        OfferNumber: 'not provided',
        Registration: 'not provided',
        BodyColor: 'not provided',
        Body: 'not provided',
        Mileage: 'not provided',
        Power: 'not provided',
        PreviousOwner: 'not provided',
        NoOfDoors: 'not provided',
        noOfSeats: 'not provided',
        countryVersion: 'not provided',
        Type: 'not provided',
        warranty: 'not provided',
        GearingType: 'not provided',
        Gears: 'not provided',
        Displacement: 'not provided',
        Cylinders: 'not provided',
        Weight: 'not provided',
        DriveChain: 'not provided',
        Fuel: 'not provided',
        Consumption: 'not provided',
        Features: '',
        DealerLocation: 'not provided',
        DealerContact: 'not provided',
        ImageUrl: ''
    }
    let a = 1;
    await request(uri, (err, res, html) => {
        // console.log(res.body)
        if (err) console.log(err.message)
        if (!err && res.statusCode == 200) {
            const $ = cheerio.load(res.body);
            const mainDiv = $('main');
            const ll = mainDiv.find('div').each((i, data) => {

                if (!information.Make) {
                    information.Make = $(data).find('.css-11siofd').text();
                    information.Make = information.Make.replace(/\n/g, '');
                }

                if (!information.Model) {
                    information.Model = $(data).find('.css-l08njs').text();
                    information.Model = information.Model.replace(/\n/g, '');
                }

                if (!information.Price) {
                    information.Price = $(data).find('.css-113e8xo').text()
                    information.Price = information.Price.replace(/\n/g, '');
                    information.Price = information.Price.slice(0, information.Price.length - 2);
                }
                // if (!information.OfferNumber) {
                //     // console.log(a++)
                //     // information.OfferNumber = $(data).find('.css-p7pem6').each((i, data) => {
                //     //     console.log($(data).html())
                //     // });
                //     // let stamp = information.OfferNumber.includes('Offer number');
                //     // console.log(stamp)
                // }
                // if (!carInfo.length)
                //     $(data).find('.css-16ceglb').each((i, data) => {
                //         console.log($(data).text());
                //         carInfo.push($(data).text())
                //     })
                // if (!basicData.length) {
                //     $(data).find('.css-uvt9sy').each((i, data) => {
                //         console.log(i, $(data).text());
                //         // //  basicData.push($(data).text())
                //         // // console.log(basicData)
                //         if (i == 0 && !information.Body) information.Body = $(data).text();
                //         if (i == 1 && !information.Type) information.Type = $(data).text();
                //         if (i == 2 && !information.DriveChain) information.DriveChain = $(data).text();
                //         if (i == 3 && !information.noOfSeats) information.noOfSeats = $(data).text();
                //         if (i == 4 && !information.NoOfDoors) information.NoOfDoors = $(data).text();
                //         if (i == 5 && !information.OfferNumber) information.OfferNumber = $(data).text();
                //         if (i == 6 && !information.countryVersion) information.countryVersion = $(data).text();

                //     })
                // }



                if (!featureArr.length) {
                    $(data).find('.css-p6jua1').each((i, data) => {
                        $(data).each((i, data) => {
                            $(data).find('li').each((i, data) => {
                                featureArr.push($(data).text());
                                // information.Features.push($(data).text());
                            })
                        })
                    })
                }
                if (!location) {
                    $(data).find('.css-s5xdrg').each((i, data) => {
                        location = $(data).find('a').attr('href');
                        information.DealerLocation = $(data).find('a').attr('href');
                    })
                }
                if (!contact) {
                    contact = $(data).find('.css-sckmr0').text();
                    information.DealerContact = $(data).find('.css-sckmr0').text();
                }
                if (!imageURls.length) {
                    $(data).find('.image-gallery-thumbnail').each((i, data) => {
                        // console.log($(data).find('img').attr('src'));
                        imageURls.push($(data).find('img').attr('src'));
                    })
                }

            })
            featureArr.forEach((ele, ind) => {
                feature = `${feature} , ${ele}`;
            })
            imageURls.forEach((ele, ind) => {
                if (ele) information.ImageUrl = `${information.ImageUrl}, ${ele}`
            })
            mainDiv.find('.css-1cmkyz9').each((i, data) => {
                // console.log(i, $(data).text());
                detailsKeys.push($(data).text());
            })
            mainDiv.find('.css-uvt9sy').each((i, data) => {
                // console.log(i, $(data).text());
                detailsValue.push($(data).text());
            })
            detailsKeys.forEach((ele, ind) => {
                if (ele == 'Offer number') information.OfferNumber = detailsValue[ind];
                if (ele == 'First registration') information.Registration = detailsValue[ind];
                if (ele == 'Colour') information.BodyColor = detailsValue[ind];
                if (ele == 'Body type') information.Body = detailsValue[ind];
                if (ele == 'Seats') information.noOfSeats = detailsValue[ind];
                if (ele == 'Doors') information.NoOfDoors = detailsValue[ind];
                if (ele == 'Country version') information.countryVersion = detailsValue[ind];
                if (ele == 'Type') information.Type = detailsValue[ind];
                if (ele == 'Warranty') information.warranty = detailsValue[ind];
                if (ele == 'Mileage') information.Mileage = detailsValue[ind];
                if (ele == 'Power') information.Power = detailsValue[ind];
                if (ele == 'Gearbox') information.GearingType = detailsValue[ind];
                if (ele == 'Engine size') information.Displacement = detailsValue[ind];
                if (ele == 'Gears') information.Gears = detailsValue[ind];
                if (ele == 'Cylinders') information.Cylinders = detailsValue[ind];
                if (ele == 'Empty weight') information.Weight = detailsValue[ind];
                if (ele == 'Other fuel types' || ele == 'Fuel type') information.Fuel = detailsValue[ind];
                if (ele == 'Drivetrain') information.DriveChain = detailsValue[ind];
                if (ele == 'Previous owner') information.PreviousOwner = detailsValue[ind];
                if (ele == 'Power consumption') information.Consumption = detailsValue[ind]
            })
            information.BodyColor = detailsValue[detailsValue.length - 1];
            information.Features = feature;

            // if (model && version && price && carInfo.length && basicData.length && featureArr.length) {
            // console.log(model, '\n')
            // console.log(version, '\n')
            // console.log(price, '\n')
            // console.log(carInfo, '\n');
            // console.log(basicData, '\n');
            // console.log(featureArr, '\n');
            // console.log(location, '\n');
            // console.log(contact, '\n');
            // console.log(imageURl, '\n');
            // console.log(feature)
            // console.log(transmissionType, '\n');
            // }
            // console.log(information)
            // console.log(detailsKeys)
            // console.log(detailsValue)
        }
    });
    return [information];
}

module.exports = { scrapEachCar };