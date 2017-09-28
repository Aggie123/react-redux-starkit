import request from './request';
// const SHOPV3_HTTP_URL = 'https://shopapi.io.mi.com/app/shopv3/pipe';
// const testUrl = 'http://10.38.11.167/app/shopv3/pipe';
const testUrl = 'http://10.38.13.79/app/shopv3/pipe';
// const testUrl = 'http://mijia.mi.srv/app/shopv3/pipe';
const testUrlLiu = 'http://10.38.13.79/app/shopv3/pipe';
// const testUrlLiu = 'http://mijia.mi.srv/app/shopv3/pipe';
//http://10.38.11.167/app/shopv3/pipe?data={"GetFilters":{"model":"SalesStat","action":"GetFilters","parameters":{}}}

async function getSalesFilters(indexestype) {
    const result = await request.requestData(testUrl, {
        showLogin: false,
        body: {
            filters: {
                model: 'SalesStat',
                action: 'GetFilters',
                parameters: {
                    indexestype:indexestype
                }
            }/*,
            categories:{
                model:"SalesStat",
                action:"GetSubCategory",
                parameters:{
                    category_l1:category_l1s //array
                }
            }*/
        }
    });

    const result1 = await request.requestData(testUrlLiu, {
        showLogin: false,
        body: {
            categories: {
                model: "SalesStat",
                action: "GetSubCategory",
                parameters: {
                    //category_l1:category_l1s //array
                }
            },
            mProducts: {
                model: "SalesStat",
                action: "GetProductByMerchant",
                parameters: {
                    // merchant_id:merchant_ids //array
                }
            }
        }
    });
    result.categories = result1.categories
    result.mProducts = result1.mProducts;
    // console.log('result',result)
    return result;

}

/*async function getReportSalesByGoodsV1(params) {
    // console.log('get report service',params)
    const result = await request.requestData(testUrlLiu, {
        showLogin: false,
        body: {
            sales: {
                model: 'SalesStat',
                action: 'GetSalesStat',
                parameters: params
            }
        }
    });
    // console.log('result',result)
    return result;

}*/

//test 新街口：层级结构
async function getReportSalesByGoods(params) {
    // console.log('get report service',params)
    const result = await request.requestData(testUrl, {
        showLogin: false,
        body: {
            sales: {
                model: 'SalesStat',
                action: 'GetSalesStatV2',
                parameters: params
            }
        }
    });
    // console.log('result',result)
    return result;

}

/*async function getReportSalesByTimeV1(params) {
    // console.log('get report service',params)
    const result = await request.requestData(testUrlLiu, {
        showLogin: false,
        body: {
            GetPeriodSalesStat: {
                model: 'SalesStat',
                action: 'GetPeriodSalesStat',
                parameters: params
            }
        }
    });
    // console.log('result',result)
    return result;

}*/

async function getReportSalesByTime(params) {
    // console.log('get report service',params)
    const result = await request.requestData(testUrlLiu, {
        showLogin: false,
        body: {
            GetPeriodSalesStat: {
                model: 'SalesStat',
                action: 'GetPeriodSalesStatV2',
                parameters: params
            }
        }
    });
    // console.log('result',result)
    return result;

}

async function getSecondCategory(category_l1s) {
    let result = await request.requestData(testUrlLiu, {
        showLogin: false,
        body: {
            categories: {
                model: "SalesStat",
                action: "GetSubCategory",
                parameters: {
                    category_l1: category_l1s //array
                }
            }
        }
    });
    return result;
}

async function getProductByMerchant(merchant_ids) {
    let result = await request.requestData(testUrlLiu, {
        showLogin: false,
        body: {
            mProducts: {
                model: "SalesStat",
                action: "GetProductByMerchant",
                parameters: {
                    merchant_id: merchant_ids //array
                }
            }
        }
    });
    return result;
}

async function getRegion() {
    let result = await request.requestData(testUrlLiu, {
        showLogin: false,
        body: {
            GetRegionList: {
                model: "SalesStat",
                action: "GetRegionList",
                parameters: {}
            }
        }
    });
    return result;
}

/**
 * 获取地区列表
 * @param path
 * @returns {*}
 */
/*async function addressGetRegion(path) {
    let result = await request.requestData(SHOPV3_HTTP_URL,{
        showLogin: true,
        body: {
            sales:{
                model:"Address",
                action:"Get",
                parameters:{
                    key: 'major/' + path ? path.join('/') : ''
                }
            }
        }
    });
    return result;
}*/
export { getSalesFilters, getReportSalesByGoods, getSecondCategory, getProductByMerchant, getReportSalesByTime, getRegion };