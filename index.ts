import * as pup from 'puppeteer';
import prompt from 'prompt-sync';
import dotenv from 'dotenv';
dotenv.config();

// global variables

let VISTA:any = process.env.VISTA;
let CREDIT:any = process.env.CREDIT;
let HAS_PROMO:any = process.env.HAS_PROMO;
let CAPTCHA:any = process.env.CAPTCHA;

async function monitorPrice() {
    const promptSync: any = prompt();
    const pUrl = promptSync('Cole a url do produto: ');

    function print(phrase: string) {
        console.log(phrase);
    };

    async function init(): Promise<[pup.Browser, pup.Page]> {
        const browser = await pup.launch({headless:false,});
        const page = await browser.newPage();
        return[browser, page];
    };

    async function wait(pupPage:pup.Page, time:number) {
        await pupPage.waitForTimeout(time);
    };

    async function goToUrl(pupPage:pup.Page, url:string) {
        await pupPage.goto(url);
    };

    async function passCaptcha(pupPage:pup.Page, id:string) {
        await pupPage.click(id);
    };

    async function getPrice(pupPage:pup.Page, id: string) {
        const price = await pupPage.$eval(id, el => el.textContent);
        return price;
    };
    
    let scopeVariables = await init();
    const browser = scopeVariables[0];
    const page = scopeVariables[1];
    
    await goToUrl(page, pUrl);
    print('Bot iniciado.');
    await wait(page, 6000);

    

    // await passCaptcha(page, CAPTCHA);
    const vistaPrice:any = await getPrice(page, VISTA);
    print(vistaPrice);
    // const creditPrice = await getPrice(page, CREDIT);
    // print(creditPrice);
    // const hasPromo = await getPrice(page, HAS_PROMO);
    // print(hasPromo);

} monitorPrice();