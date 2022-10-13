const request = require('request-promise');
const cheerio = require('cheerio');
const axios = require('axios');



//total-page: 473

const TokenGenerator = async (page) => {
    const uri = `https://www.greencarreports.com/news/electric-cars/page-${page}`;
    let blogsToken = [];
    let authorToken = [];
    let tokenHolder = [];
    try {

        await axios.request(uri).then((result) => {

            const $ = cheerio.load(result.data);
            const main = $('.article-list');
            const list = main.find('.item-text').each((i, data) => {

                blogsToken.push($(data).find('a').attr('href'));

            })
            const authorList = main.find('.by-line').each((i, data) => {

                authorToken.push($(data).attr('href'));

            })
        }).catch((err) => {

        });

        blogsToken.forEach((ele, ind) => {
            tokenHolder.push({
                author: authorToken[ind],
                blog: ele
            })
        })

        return tokenHolder;
    } catch (error) {
        console.log('Error', error.message)
        // await generatElectricCarBlog();
    }
}

module.exports = { TokenGenerator };

