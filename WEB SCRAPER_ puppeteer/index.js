const { log } = require('console');
const fs = require('fs');
const puppeteer = require('puppeteer');

async function run(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.traversymedia.com');

    await page.screenshot({path: './ss/example.png'})

    const html = await page.content(); 

    const title = await page.evaluate(() => document.title);

    const text = await page.evaluate(() => document.body.innerText);

    const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href)
    );
    // console.log(links);

    // const courses = await page.evaluate(() => 
    // Array.from(document.querySelectorAll('#courses .card'), (e) => ({
    //     title: e.querySelector('.card-body h3').innerText,
    //     level: e.querySelector('.card-body .level').innerText,
    //     url: e.querySelector('.card-footer a').href,
    //     promo: e.querySelector('.card-footer .promo-code .promo').innerText,
    // }))
    // );

    // ANOTHER WAY OF DOINIG THE SAME
    const courses = await page.$$eval('#courses .card', (elements) =>
    elements.map((e) => ({
        title: e.querySelector('.card-body h3').innerText,
        level: e.querySelector('.card-body .level').innerText,
        url: e.querySelector('.card-footer a').href,
        promo: e.querySelector('.card-footer .promo-code .promo').innerText,
    }))
    );

    console.log(courses);
    console.log(links);

    // Save data to JSON file
    fs.writeFile('course.json', JSON.stringify(courses), (err) => {
        if(err) throw err;
        console.log('File saved');
    })

    await browser.close();
}

run();