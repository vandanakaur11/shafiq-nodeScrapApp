const request = require('request-promise');
const cheerio = require('cheerio');
const slug = require('slug');


const grabData = async (page, sort) => {
    let tokenList = [];
    const url = `https://www.autoscout24.com/lst/?${sort}&custtype=D&offer=D%2CJ%2CO%2CU&fuel=2%2C3%2CE&ustate=N%2CU&size=20&page=${page}&pricefrom=10000&atype=C&recommended_sorting_based_id=280f013a-46c9-4ec0-894b-9e415d3214a2&`;
    await request(url, (err, res, html) => {

        if (!err && res.statusCode == 200) {
            const $ = cheerio.load(html);
            const listContainerDiv = $('.cl-ssi-fragment ');
            let rawData = listContainerDiv.find('.cldt-summary-full-item').each((i, data) => {
                let accessToken = $(data).find('.cldt-summary-full-item-main').attr("id");
                accessToken = accessToken.slice(3, accessToken.length);
                let model = $(data).find('.cldt-summary-makemodel').text();
                model = model.replace(/\n/g, '');
                let version = $(data).find('.cldt-summary-version').text();
                version = version.replace(/\n/g, '');
                let _s = slug(`${model} ${version} ${accessToken}`, '-')
                tokenList.push({
                    token: _s
                })
            });
        }
        if (err) {
            console.log('error occur', err.message);
        }
    })

    return tokenList;
}

module.exports = { grabData };

// cldt-summary-makemodel
// cldt-summary-version
// cldt-price
// cldt-summary-vehicle-data