const MetalGlobalRates = require("../models/ratesCurrencyModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const moment = require("moment-timezone");
const axios = require("axios");
const historicalRatesModel = require("../models/historicalRatesModel");
const { utcToZonedTime, format } = require("date-fns-tz");

let initialUpdateDone = false;
function isToday(timestamp) {
  const today = new Date();
  const dateFromTimestamp = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  return (
    dateFromTimestamp.getDate() === today.getDate() &&
    dateFromTimestamp.getMonth() === today.getMonth() &&
    dateFromTimestamp.getFullYear() === today.getFullYear()
  );
}
//===========================================//
//====CONTROLLER TO CREATE NEW PRODUCTS=====//
//=========================================//
const fetchDataAndUpdate = async () => {
  const currentDateTime = moment().tz("Asia/Karachi");
  const currentDate = currentDateTime.format("YYYY-MM-DD");
  var config = {
    method: "get",
    url: "https://api.metalpriceapi.com/v1/latest?api_key=9a3162b6fa6e7abd6dfc1f034b055c23&base=USD",
    headers: {},
  };

  const response = await axios(config);
  // console.log("====================================");
  // console.log(response);
  // console.log(response.data);
  // console.log(response.data.rates);
  // console.log(response.data.rates[0]);
  // console.log(response.data.rates[0].AED);
  // console.log("====================================");
  // const response = {
  //   data: {
  //     success: true,
  //     base: "USD",
  //     timestamp: 1701084318,
  //     rates: {
  //       AED: 3.672602,
  //       AFN: 69.211517,
  //       ALL: 93.491665,
  //       ALU: 15.93894969,
  //       AMD: 401.183821,
  //       ANG: 1.796782,
  //       AOA: 832.000038,
  //       ARS: 357.5472,
  //       AUD: 1.514257,
  //       AZN: 1.701559,
  //       BAM: 1.786543,
  //       BBD: 2.012971,
  //       BDT: 109.91651,
  //       BGN: 1.786597,
  //       BHD: 0.376893,
  //       BIF: 2834.567991,
  //       BIH: 1.782,
  //       BND: 1.336902,
  //       BOB: 6.889307,
  //       BRL: 4.903597,
  //       BSD: 0.99694,
  //       BTC: 0.00002693,
  //       BTN: 83.108746,
  //       BYN: 3.284586,
  //       BZD: 2.009591,
  //       CAD: 1.364435,
  //       CDF: 2659.999826,
  //       CHF: 0.880598,
  //       CLF: 0.031465,
  //       CLP: 868.220118,
  //       CNY: 7.098984,
  //       COP: 4047.75,
  //       CRC: 529.24842,
  //       CVE: 100.722546,
  //       CZK: 22.259502,
  //       DJF: 177.510847,
  //       DKK: 6.80976,
  //       DOP: 56.715627,
  //       DZD: 134.012988,
  //       EGP: 30.899099,
  //       ERN: 15,
  //       ETB: 55.993332,
  //       EUR: 0.913385,
  //       FJD: 2.233201,
  //       FKP: 0.793391,
  //       GBP: 0.79235,
  //       GEL: 2.710064,
  //       GHS: 11.943475,
  //       GIP: 0.793391,
  //       GMD: 67.303045,
  //       GNF: 8563.520772,
  //       GTQ: 7.810844,
  //       GYD: 208.579206,
  //       HKD: 7.789505,
  //       HNL: 24.615666,
  //       HRK: 7.04157,
  //       HTG: 132.036866,
  //       HUF: 347.217012,
  //       IDR: 15498,
  //       ILS: 3.730297,
  //       INR: 83.384802,
  //       IQD: 1306.05161,
  //       IRR: 42262.485792,
  //       ISK: 137.469833,
  //       JMD: 154.813722,
  //       JOD: 0.709402,
  //       JPY: 149.028951,
  //       KES: 152.90145,
  //       KGS: 88.850291,
  //       KHR: 4101.318085,
  //       KMF: 450.250134,
  //       KRW: 1301.602565,
  //       KWD: 0.30824,
  //       KYD: 0.830783,
  //       KZT: 460.168988,
  //       LAK: 20634.848139,
  //       "LBMA-XAG": 0.04218519,
  //       "LBMA-XAU-AM": 0.0005012,
  //       "LBMA-XAU-PM": 0.00049979,
  //       "LBMA-XPD-AM": 0.00094697,
  //       "LBMA-XPD-PM": 0.0009542,
  //       "LBMA-XPT-AM": 0.00108578,
  //       "LBMA-XPT-PM": 0.0010917,
  //       LBP: 14984.334323,
  //       LKR: 327.609043,
  //       LRD: 188.124992,
  //       LSL: 18.829923,
  //       LYD: 4.802923,
  //       MAD: 10.088514,
  //       MDL: 17.805892,
  //       MGA: 4522.555687,
  //       MKD: 56.271719,
  //       MMK: 2093.628682,
  //       MNT: 3437.982756,
  //       MOP: 8.00338,
  //       MRO: 356.999828,
  //       MUR: 44.140578,
  //       MVR: 15.350253,
  //       MWK: 1678.305709,
  //       MXN: 17.056599,
  //       MYR: 4.680986,
  //       MZN: 63.24995,
  //       NAD: 18.830356,
  //       NGN: 789.503093,
  //       NIO: 36.492183,
  //       NOK: 10.691745,
  //       NPR: 132.972524,
  //       NZD: 1.64084,
  //       OMR: 0.38495,
  //       PAB: 0.99704,
  //       PEN: 3.728831,
  //       PHP: 55.517504,
  //       PKR: 281.147401,
  //       PLN: 3.97875,
  //       PYG: 7417.218543,
  //       QAR: 3.640498,
  //       RON: 4.540363,
  //       RSD: 107.039963,
  //       RUB: 88.710489,
  //       RWF: 1232.444382,
  //       SAR: 3.750348,
  //       SCR: 13.466273,
  //       SDG: 601.000156,
  //       SEK: 10.424701,
  //       SGD: 1.3373,
  //       SLL: 19749.999842,
  //       SOS: 571.000141,
  //       SRD: 37.800992,
  //       STN: 22.39892485,
  //       SVC: 8.7495,
  //       SZL: 18.804551,
  //       THB: 35.102014,
  //       TJS: 10.881845,
  //       TMT: 3.51,
  //       TND: 3.104497,
  //       TOP: 2.36765,
  //       TRY: 28.9111,
  //       TTD: 6.772322,
  //       TWD: 31.566501,
  //       TZS: 2504.999681,
  //       UAH: 35.985969,
  //       UGX: 3784.460237,
  //       UYU: 38.967445,
  //       UZS: 12258.618485,
  //       VES: 35.417171,
  //       VND: 24240,
  //       VUV: 119.389328,
  //       XAF: 599.192499,
  //       XAG: 0.04040078,
  //       "XAG-ASK": 0.04036327,
  //       "XAG-BID": 0.04037631,
  //       XAU: 0.00049681,
  //       "XAU-ASK": 0.00049675,
  //       "XAU-BID": 0.00049679,
  //       XCD: 2.70255,
  //       XCU: 4.21813568,
  //       XOF: 599.184289,
  //       XPD: 0.00085014,
  //       "XPD-ASK": 0.00092017,
  //       "XPD-BID": 0.00092187,
  //       XPF: 109.550387,
  //       XPT: 0.00106653,
  //       "XPT-ASK": 0.00106123,
  //       "XPT-BID": 0.00106406,
  //       YER: 250.298228,
  //       ZAR: 18.670425,
  //       ZMK: 9001.202255,
  //       ZMW: 23.47842,
  //       ZNC: 13.79467218,
  //     },
  //   },
  // };
  //   const {
  //     XAGASK: XAG_ASK,
  //     XAGBID: XAG_BID,
  //     XAUASK: XAU_ASK,
  //     XAUBID: XAU_BID,
  //     XPDASK: XPD_ASK,
  //     XPDBID: XPD_BID,
  //     XPTASK: XPT_ASK,
  //     XPTBID: XPT_BID,
  //   } = response.rates;
  //   console.log(
  //     XAG_ASK,
  //     XAG_BID,
  //     XAU_ASK,
  //     XAU_BID,
  //     XPD_ASK,
  //     XPD_BID,
  //     XPT_ASK,
  //     XPT_BID
  //   );
  let rates = await MetalGlobalRates.findOne({}).sort({ createdAt: -1 }).exec();
  console.log(!rates);
  if (!rates || moment(currentDate).startOf("day").toDate() > rates.updatedAt) {
    console.log("created");
    const data = await MetalGlobalRates.create({
      UAEDirham_Currency_AED: response.data.rates.AED,
      UAEDirham_Currency_AED_Low: response.data.rates.AED,
      UAEDirham_Currency_AED_High: response.data.rates.AED,
      AfghanAfghani_Currency_AFN: response.data.rates.AFN,
      AfghanAfghani_Currency_AFN_Low: response.data.rates.AFN,
      AfghanAfghani_Currency_AFN_High: response.data.rates.AFN,
      AlbanianLek_Currency_ALL: response.data.rates.ALL,
      AlbanianLek_Currency_ALL_Low: response.data.rates.ALL,
      AlbanianLek_Currency_ALL_High: response.data.rates.ALL,
      Aluminum_Currency_ALU: response.data.rates.ALU,
      Aluminum_Currency_ALU_Low: response.data.rates.ALU,
      Aluminum_Currency_ALU_High: response.data.rates.ALU,
      ArmenianDram_Currency_AMD: response.data.rates.AMD,
      ArmenianDram_Currency_AMD_Low: response.data.rates.AMD,
      ArmenianDram_Currency_AMD_High: response.data.rates.AMD,
      NetherlandsAntilleanGuilder_Currency_ANG: response.data.rates.ANG,
      NetherlandsAntilleanGuilder_Currency_ANG_Low: response.data.rates.ANG,
      NetherlandsAntilleanGuilder_Currency_ANG_High: response.data.rates.ANG,
      AngolanKwanza_Currency_AOA: response.data.rates.AOA,
      AngolanKwanza_Currency_AOA_Low: response.data.rates.AOA,
      AngolanKwanza_Currency_AOA_High: response.data.rates.AOA,
      ArgentinePeso_Currency_ARS: response.data.rates.ARS,
      ArgentinePeso_Currency_ARS_Low: response.data.rates.ARS,
      ArgentinePeso_Currency_ARS_High: response.data.rates.ARS,
      AustralianDollar_Currency_AUD: response.data.rates.AUD,
      AustralianDollar_Currency_AUD_Low: response.data.rates.AUD,
      AustralianDollar_Currency_AUD_High: response.data.rates.AUD,
      AzerbaijanManat_Currency_AZN: response.data.rates.AZN,
      AzerbaijanManat_Currency_AZN_Low: response.data.rates.AZN,
      AzerbaijanManat_Currency_AZN_High: response.data.rates.AZN,
      BosniaAndHerzegovinaConvertibleMark_Currency_BAM: response.data.rates.BAM,
      BosniaAndHerzegovinaConvertibleMark_Currency_BAM_Low:
        response.data.rates.BAM,
      BosniaAndHerzegovinaConvertibleMark_Currency_BAM_High:
        response.data.rates.BAM,
      BarbadianDollar_Currency_BBD: response.data.rates.BBD,
      BarbadianDollar_Currency_BBD_Low: response.data.rates.BBD,
      BarbadianDollar_Currency_BBD_High: response.data.rates.BBD,
      BangladeshiTaka_Currency_BDT: response.data.rates.BDT,
      BangladeshiTaka_Currency_BDT_Low: response.data.rates.BDT,
      BangladeshiTaka_Currency_BDT_High: response.data.rates.BDT,
      BulgarianLev_Currency_BGN: response.data.rates.BGN,
      BulgarianLev_Currency_BGN_Low: response.data.rates.BGN,
      BulgarianLev_Currency_BGN_High: response.data.rates.BGN,
      BahrainiDinar_Currency_BHD: response.data.rates.BHD,
      BahrainiDinar_Currency_BHD_Low: response.data.rates.BHD,
      BahrainiDinar_Currency_BHD_High: response.data.rates.BHD,
      BurundiFranc_Currency_BIF: response.data.rates.BIF,
      BurundiFranc_Currency_BIF_Low: response.data.rates.BIF,
      BurundiFranc_Currency_BIF_High: response.data.rates.BIF,
      BosniaHerzegovinaConvertibleMark_Currency_BIH: response.data.rates.BIH,
      BosniaHerzegovinaConvertibleMark_Currency_BIH_Low:
        response.data.rates.BIH,
      BosniaHerzegovinaConvertibleMark_Currency_BIH_High:
        response.data.rates.BIH,
      BruneiDollar_Currency_BND: response.data.rates.BND,
      BruneiDollar_Currency_BND_Low: response.data.rates.BND,
      BruneiDollar_Currency_BND_High: response.data.rates.BND,
      BolivianBoliviano_Currency_BOB: response.data.rates.BOB,
      BolivianBoliviano_Currency_BOB_Low: response.data.rates.BOB,
      BolivianBoliviano_Currency_BOB_High: response.data.rates.BOB,
      BrazilianReal_Currency_BRL: response.data.rates.BRL,
      BrazilianReal_Currency_BRL_Low: response.data.rates.BRL,
      BrazilianReal_Currency_BRL_High: response.data.rates.BRL,
      BahamianDollar_Currency_BSD: response.data.rates.BSD,
      BahamianDollar_Currency_BSD_Low: response.data.rates.BSD,
      BahamianDollar_Currency_BSD_High: response.data.rates.BSD,
      Bitcoin_Currency_BTC: response.data.rates.BTC,
      Bitcoin_Currency_BTC_Low: response.data.rates.BTC,
      Bitcoin_Currency_BTC_High: response.data.rates.BTC,
      BhutaneseNgultrum_Currency_BTN: response.data.rates.BTN,
      BhutaneseNgultrum_Currency_BTN_Low: response.data.rates.BTN,
      BhutaneseNgultrum_Currency_BTN_High: response.data.rates.BTN,
      BelarusianRuble_Currency_BYN: response.data.rates.BYN,
      BelarusianRuble_Currency_BYN_Low: response.data.rates.BYN,
      BelarusianRuble_Currency_BYN_High: response.data.rates.BYN,
      BelizeDollar_Currency_BZD: response.data.rates.BZD,
      BelizeDollar_Currency_BZD_Low: response.data.rates.BZD,
      BelizeDollar_Currency_BZD_High: response.data.rates.BZD,
      CanadianDollar_Currency_CAD: response.data.rates.CAD,
      CanadianDollar_Currency_CAD_Low: response.data.rates.CAD,
      CanadianDollar_Currency_CAD_High: response.data.rates.CAD,
      CongoleseFranc_Currency_CDF: response.data.rates.CDF,
      CongoleseFranc_Currency_CDF_Low: response.data.rates.CDF,
      CongoleseFranc_Currency_CDF_High: response.data.rates.CDF,
      SwissFranc_Currency_CHF: response.data.rates.CHF,
      SwissFranc_Currency_CHF_Low: response.data.rates.CHF,
      SwissFranc_Currency_CHF_High: response.data.rates.CHF,
      ChileanUnitOfAccount_Currency_CLF: response.data.rates.CLF,
      ChileanUnitOfAccount_Currency_CLF_Low: response.data.rates.CLF,
      ChileanUnitOfAccount_Currency_CLF_High: response.data.rates.CLF,
      ChileanPeso_Currency_CLP: response.data.rates.CLP,
      ChileanPeso_Currency_CLP_Low: response.data.rates.CLP,
      ChileanPeso_Currency_CLP_High: response.data.rates.CLP,
      ChineseYuanRenminbi_Currency_CNY: response.data.rates.CNY,
      ChineseYuanRenminbi_Currency_CNY_Low: response.data.rates.CNY,
      ChineseYuanRenminbi_Currency_CNY_High: response.data.rates.CNY,
      ColombianPeso_Currency_COP: response.data.rates.COP,
      ColombianPeso_Currency_COP_Low: response.data.rates.COP,
      ColombianPeso_Currency_COP_High: response.data.rates.COP,
      CostaRicanColon_Currency_CRC: response.data.rates.CRC,
      CostaRicanColon_Currency_CRC_Low: response.data.rates.CRC,
      CostaRicanColon_Currency_CRC_High: response.data.rates.CRC,
      CapeVerdeanEscudo_Currency_CVE: response.data.rates.CVE,
      CapeVerdeanEscudo_Currency_CVE_Low: response.data.rates.CVE,
      CapeVerdeanEscudo_Currency_CVE_High: response.data.rates.CVE,
      CzechKoruna_Currency_CZK: response.data.rates.CZK,
      CzechKoruna_Currency_CZK_Low: response.data.rates.CZK,
      CzechKoruna_Currency_CZK_High: response.data.rates.CZK,
      DjiboutianFranc_Currency_DJF: response.data.rates.DJF,
      DjiboutianFranc_Currency_DJF_Low: response.data.rates.DJF,
      DjiboutianFranc_Currency_DJF_High: response.data.rates.DJF,
      DanishKrone_Currency_DKK: response.data.rates.DKK,
      DanishKrone_Currency_DKK_Low: response.data.rates.DKK,
      DanishKrone_Currency_DKK_High: response.data.rates.DKK,
      DominicanPeso_Currency_DOP: response.data.rates.DOP,
      DominicanPeso_Currency_DOP_Low: response.data.rates.DOP,
      DominicanPeso_Currency_DOP_High: response.data.rates.DOP,
      AlgerianDinar_Currency_DZD: response.data.rates.DZD,
      AlgerianDinar_Currency_DZD_Low: response.data.rates.DZD,
      AlgerianDinar_Currency_DZD_High: response.data.rates.DZD,
      EgyptianPound_Currency_EGP: response.data.rates.EGP,
      EgyptianPound_Currency_EGP_Low: response.data.rates.EGP,
      EgyptianPound_Currency_EGP_High: response.data.rates.EGP,
      EritreanNakfa_Currency_ERN: response.data.rates.ERN,
      EritreanNakfa_Currency_ERN_Low: response.data.rates.ERN,
      EritreanNakfa_Currency_ERN_High: response.data.rates.ERN,
      EthiopianBirr_Currency_ETB: response.data.rates.ETB,
      EthiopianBirr_Currency_ETB_Low: response.data.rates.ETB,
      EthiopianBirr_Currency_ETB_High: response.data.rates.ETB,
      EuropeanEuro_Currency_EUR: response.data.rates.EUR,
      EuropeanEuro_Currency_EUR_Low: response.data.rates.EUR,
      EuropeanEuro_Currency_EUR_High: response.data.rates.EUR,
      FijianDollar_Currency_FJD: response.data.rates.FJD,
      FijianDollar_Currency_FJD_Low: response.data.rates.FJD,
      FijianDollar_Currency_FJD_High: response.data.rates.FJD,
      FalklandIslandsPound_Currency_FKP: response.data.rates.FKP,
      FalklandIslandsPound_Currency_FKP_Low: response.data.rates.FKP,
      FalklandIslandsPound_Currency_FKP_High: response.data.rates.FKP,
      PoundSterling_Currency_GBP: response.data.rates.GBP,
      PoundSterling_Currency_GBP_Low: response.data.rates.GBP,
      PoundSterling_Currency_GBP_High: response.data.rates.GBP,
      GeorgianLari_Currency_GEL: response.data.rates.GEL,
      GeorgianLari_Currency_GEL_Low: response.data.rates.GEL,
      GeorgianLari_Currency_GEL_High: response.data.rates.GEL,
      GhanaianCedi_Currency_GHS: response.data.rates.GHS,
      GhanaianCedi_Currency_GHS_Low: response.data.rates.GHS,
      GhanaianCedi_Currency_GHS_High: response.data.rates.GHS,
      GibraltarPound_Currency_GIP: response.data.rates.GIP,
      GibraltarPound_Currency_GIP_Low: response.data.rates.GIP,
      GibraltarPound_Currency_GIP_High: response.data.rates.GIP,
      GambianDalasi_Currency_GMD: response.data.rates.GMD,
      GambianDalasi_Currency_GMD_Low: response.data.rates.GMD,
      GambianDalasi_Currency_GMD_High: response.data.rates.GMD,
      GuineanFranc_Currency_GNF: response.data.rates.GNF,
      GuineanFranc_Currency_GNF_Low: response.data.rates.GNF,
      GuineanFranc_Currency_GNF_High: response.data.rates.GNF,
      GuatemalanQuetzal_Currency_GTQ: response.data.rates.GTQ,
      GuatemalanQuetzal_Currency_GTQ_Low: response.data.rates.GTQ,
      GuatemalanQuetzal_Currency_GTQ_High: response.data.rates.GTQ,
      GuyaneseDollar_Currency_GYD: response.data.rates.GYD,
      GuyaneseDollar_Currency_GYD_Low: response.data.rates.GYD,
      GuyaneseDollar_Currency_GYD_High: response.data.rates.GYD,
      HongKongDollar_Currency_HKD: response.data.rates.HKD,
      HongKongDollar_Currency_HKD_Low: response.data.rates.HKD,
      HongKongDollar_Currency_HKD_High: response.data.rates.HKD,
      HonduranLempira_Currency_HNL: response.data.rates.HNL,
      HonduranLempira_Currency_HNL_Low: response.data.rates.HNL,
      HonduranLempira_Currency_HNL_High: response.data.rates.HNL,
      CroatianKuna_Currency_HRK: response.data.rates.HRK,
      CroatianKuna_Currency_HRK_Low: response.data.rates.HRK,
      CroatianKuna_Currency_HRK_High: response.data.rates.HRK,
      HaitianGourde_Currency_HTG: response.data.rates.HTG,
      HaitianGourde_Currency_HTG_Low: response.data.rates.HTG,
      HaitianGourde_Currency_HTG_High: response.data.rates.HTG,
      HungarianForint_Currency_HUF: response.data.rates.HUF,
      HungarianForint_Currency_HUF_Low: response.data.rates.HUF,
      HungarianForint_Currency_HUF_High: response.data.rates.HUF,
      IndonesianRupiah_Currency_IDR: response.data.rates.IDR,
      IndonesianRupiah_Currency_IDR_Low: response.data.rates.IDR,
      IndonesianRupiah_Currency_IDR_High: response.data.rates.IDR,
      IsraeliNewShekel_Currency_ILS: response.data.rates.ILS,
      IsraeliNewShekel_Currency_ILS_Low: response.data.rates.ILS,
      IsraeliNewShekel_Currency_ILS_High: response.data.rates.ILS,
      IndianRupee_Currency_INR: response.data.rates.INR,
      IndianRupee_Currency_INR_Low: response.data.rates.INR,
      IndianRupee_Currency_INR_High: response.data.rates.INR,
      IraqiDinar_Currency_IQD: response.data.rates.IQD,
      IraqiDinar_Currency_IQD_Low: response.data.rates.IQD,
      IraqiDinar_Currency_IQD_High: response.data.rates.IQD,
      IranianRial_Currency_IRR: response.data.rates.IRR,
      IranianRial_Currency_IRR_Low: response.data.rates.IRR,
      IranianRial_Currency_IRR_High: response.data.rates.IRR,
      IcelandicKrona_Currency_ISK: response.data.rates.ISK,
      IcelandicKrona_Currency_ISK_Low: response.data.rates.ISK,
      IcelandicKrona_Currency_ISK_High: response.data.rates.ISK,
      JamaicanDollar_Currency_JMD: response.data.rates.JMD,
      JamaicanDollar_Currency_JMD_Low: response.data.rates.JMD,
      JamaicanDollar_Currency_JMD_High: response.data.rates.JMD,
      JordanianDinar_Currency_JOD: response.data.rates.JOD,
      JordanianDinar_Currency_JOD_Low: response.data.rates.JOD,
      JordanianDinar_Currency_JOD_High: response.data.rates.JOD,
      JapaneseYen_Currency_JPY: response.data.rates.JPY,
      JapaneseYen_Currency_JPY_Low: response.data.rates.JPY,
      JapaneseYen_Currency_JPY_High: response.data.rates.JPY,
      KenyanShilling_Currency_KES: response.data.rates.KES,
      KenyanShilling_Currency_KES_Low: response.data.rates.KES,
      KenyanShilling_Currency_KES_High: response.data.rates.KES,
      KyrgyzstaniSom_Currency_KGS: response.data.rates.KGS,
      KyrgyzstaniSom_Currency_KGS_Low: response.data.rates.KGS,
      KyrgyzstaniSom_Currency_KGS_High: response.data.rates.KGS,
      CambodianRiel_Currency_KHR: response.data.rates.KHR,
      CambodianRiel_Currency_KHR_Low: response.data.rates.KHR,
      CambodianRiel_Currency_KHR_High: response.data.rates.KHR,
      ComorianFranc_Currency_KMF: response.data.rates.KMF,
      ComorianFranc_Currency_KMF_Low: response.data.rates.KMF,
      ComorianFranc_Currency_KMF_High: response.data.rates.KMF,
      SouthKoreanWon_Currency_KRW: response.data.rates.KRW,
      SouthKoreanWon_Currency_KRW_Low: response.data.rates.KRW,
      SouthKoreanWon_Currency_KRW_High: response.data.rates.KRW,
      KuwaitiDinar_Currency_KWD: response.data.rates.KWD,
      KuwaitiDinar_Currency_KWD_Low: response.data.rates.KWD,
      KuwaitiDinar_Currency_KWD_High: response.data.rates.KWD,
      CaymanIslandsDollar_Currency_KYD: response.data.rates.KYD,
      CaymanIslandsDollar_Currency_KYD_Low: response.data.rates.KYD,
      CaymanIslandsDollar_Currency_KYD_High: response.data.rates.KYD,
      KazakhstaniTenge_Currency_KZT: response.data.rates.KZT,
      KazakhstaniTenge_Currency_KZT_Low: response.data.rates.KZT,
      KazakhstaniTenge_Currency_KZT_High: response.data.rates.KZT,
      LaoKip_Currency_LAK: response.data.rates.LAK,
      LaoKip_Currency_LAK_Low: response.data.rates.LAK,
      LaoKip_Currency_LAK_High: response.data.rates.LAK,
      LebanesePound_Currency_LBP: response.data.rates.LBP,
      LebanesePound_Currency_LBP_Low: response.data.rates.LBP,
      LebanesePound_Currency_LBP_High: response.data.rates.LBP,
      SriLankanRupee_Currency_LKR: response.data.rates.LKR,
      SriLankanRupee_Currency_LKR_Low: response.data.rates.LKR,
      SriLankanRupee_Currency_LKR_High: response.data.rates.LKR,
      LiberianDollar_Currency_LRD: response.data.rates.LRD,
      LiberianDollar_Currency_LRD_Low: response.data.rates.LRD,
      LiberianDollar_Currency_LRD_High: response.data.rates.LRD,
      LesothoLoti_Currency_LSL: response.data.rates.LSL,
      LesothoLoti_Currency_LSL_Low: response.data.rates.LSL,
      LesothoLoti_Currency_LSL_High: response.data.rates.LSL,
      LibyanDinar_Currency_LYD: response.data.rates.LYD,
      LibyanDinar_Currency_LYD_Low: response.data.rates.LYD,
      LibyanDinar_Currency_LYD_High: response.data.rates.LYD,
      MoroccanDirham_Currency_MAD: response.data.rates.MAD,
      MoroccanDirham_Currency_MAD_Low: response.data.rates.MAD,
      MoroccanDirham_Currency_MAD_High: response.data.rates.MAD,
      MoldovanLeu_Currency_MDL: response.data.rates.MDL,
      MoldovanLeu_Currency_MDL_Low: response.data.rates.MDL,
      MoldovanLeu_Currency_MDL_High: response.data.rates.MDL,
      MalagasyAriary_Currency_MGA: response.data.rates.MGA,
      MalagasyAriary_Currency_MGA_Low: response.data.rates.MGA,
      MalagasyAriary_Currency_MGA_High: response.data.rates.MGA,
      MacedonianDenar_Currency_MKD: response.data.rates.MKD,
      MacedonianDenar_Currency_MKD_Low: response.data.rates.MKD,
      MacedonianDenar_Currency_MKD_High: response.data.rates.MKD,
      MyanmarKyat_Currency_MMK: response.data.rates.MMK,
      MyanmarKyat_Currency_MMK_Low: response.data.rates.MMK,
      MyanmarKyat_Currency_MMK_High: response.data.rates.MMK,
      MongolianTugrik_Currency_MNT: response.data.rates.MNT,
      MongolianTugrik_Currency_MNT_Low: response.data.rates.MNT,
      MongolianTugrik_Currency_MNT_High: response.data.rates.MNT,
      MacanesePataca_Currency_MOP: response.data.rates.MOP,
      MacanesePataca_Currency_MOP_Low: response.data.rates.MOP,
      MacanesePataca_Currency_MOP_High: response.data.rates.MOP,
      MauritanianOuguiya_Currency_MRO: response.data.rates.MRO,
      MauritanianOuguiya_Currency_MRO_Low: response.data.rates.MRO,
      MauritanianOuguiya_Currency_MRO_High: response.data.rates.MRO,
      MauritianRupee_Currency_MUR: response.data.rates.MUR,
      MauritianRupee_Currency_MUR_Low: response.data.rates.MUR,
      MauritianRupee_Currency_MUR_High: response.data.rates.MUR,
      MaldivianRufiyaa_Currency_MVR: response.data.rates.MVR,
      MaldivianRufiyaa_Currency_MVR_Low: response.data.rates.MVR,
      MaldivianRufiyaa_Currency_MVR_High: response.data.rates.MVR,
      MalawianKwacha_Currency_MWK: response.data.rates.MWK,
      MalawianKwacha_Currency_MWK_Low: response.data.rates.MWK,
      MalawianKwacha_Currency_MWK_High: response.data.rates.MWK,
      MexicanPeso_Currency_MXN: response.data.rates.MXN,
      MexicanPeso_Currency_MXN_Low: response.data.rates.MXN,
      MexicanPeso_Currency_MXN_High: response.data.rates.MXN,
      MalaysianRinggit_Currency_MYR: response.data.rates.MYR,
      MalaysianRinggit_Currency_MYR_Low: response.data.rates.MYR,
      MalaysianRinggit_Currency_MYR_High: response.data.rates.MYR,
      MozambicanMetical_Currency_MZN: response.data.rates.MZN,
      MozambicanMetical_Currency_MZN_Low: response.data.rates.MZN,
      MozambicanMetical_Currency_MZN_High: response.data.rates.MZN,
      NamibianDollar_Currency_NAD: response.data.rates.NAD,
      NamibianDollar_Currency_NAD_Low: response.data.rates.NAD,
      NamibianDollar_Currency_NAD_High: response.data.rates.NAD,
      NigerianNaira_Currency_NGN: response.data.rates.NGN,
      NigerianNaira_Currency_NGN_Low: response.data.rates.NGN,
      NigerianNaira_Currency_NGN_High: response.data.rates.NGN,
      NicaraguanCordoba_Currency_NIO: response.data.rates.NIO,
      NicaraguanCordoba_Currency_NIO_Low: response.data.rates.NIO,
      NicaraguanCordoba_Currency_NIO_High: response.data.rates.NIO,
      NorwegianKrone_Currency_NOK: response.data.rates.NOK,
      NorwegianKrone_Currency_NOK_Low: response.data.rates.NOK,
      NorwegianKrone_Currency_NOK_High: response.data.rates.NOK,
      NepaleseRupee_Currency_NPR: response.data.rates.NPR,
      NepaleseRupee_Currency_NPR_Low: response.data.rates.NPR,
      NepaleseRupee_Currency_NPR_High: response.data.rates.NPR,
      NewZealandDollar_Currency_NZD: response.data.rates.NZD,
      NewZealandDollar_Currency_NZD_Low: response.data.rates.NZD,
      NewZealandDollar_Currency_NZD_High: response.data.rates.NZD,
      OmaniRial_Currency_OMR: response.data.rates.OMR,
      OmaniRial_Currency_OMR_Low: response.data.rates.OMR,
      OmaniRial_Currency_OMR_High: response.data.rates.OMR,
      PanamanianBalboa_Currency_PAB: response.data.rates.PAB,
      PanamanianBalboa_Currency_PAB_Low: response.data.rates.PAB,
      PanamanianBalboa_Currency_PAB_High: response.data.rates.PAB,
      PeruvianSol_Currency_PEN: response.data.rates.PEN,
      PeruvianSol_Currency_PEN_Low: response.data.rates.PEN,
      PeruvianSol_Currency_PEN_High: response.data.rates.PEN,
      PhilippinePeso_Currency_PHP: response.data.rates.PHP,
      PhilippinePeso_Currency_PHP_Low: response.data.rates.PHP,
      PhilippinePeso_Currency_PHP_High: response.data.rates.PHP,
      PakistaniRupee_Currency_PKR: response.data.rates.PKR,
      PakistaniRupee_Currency_PKR_Low: response.data.rates.PKR,
      PakistaniRupee_Currency_PKR_High: response.data.rates.PKR,
      PolishZloty_Currency_PLN: response.data.rates.PLN,
      PolishZloty_Currency_PLN_Low: response.data.rates.PLN,
      PolishZloty_Currency_PLN_High: response.data.rates.PLN,
      ParaguayanGuarani_Currency_PYG: response.data.rates.PYG,
      ParaguayanGuarani_Currency_PYG_Low: response.data.rates.PYG,
      ParaguayanGuarani_Currency_PYG_High: response.data.rates.PYG,
      QatariRiyal_Currency_QAR: response.data.rates.QAR,
      QatariRiyal_Currency_QAR_Low: response.data.rates.QAR,
      QatariRiyal_Currency_QAR_High: response.data.rates.QAR,
      RomanianLeu_Currency_RON: response.data.rates.RON,
      RomanianLeu_Currency_RON_Low: response.data.rates.RON,
      RomanianLeu_Currency_RON_High: response.data.rates.RON,
      SerbianDinar_Currency_RSD: response.data.rates.RSD,
      SerbianDinar_Currency_RSD_Low: response.data.rates.RSD,
      SerbianDinar_Currency_RSD_High: response.data.rates.RSD,
      RussianRuble_Currency_RUB: response.data.rates.RUB,
      RussianRuble_Currency_RUB_Low: response.data.rates.RUB,
      RussianRuble_Currency_RUB_High: response.data.rates.RUB,
      RwandanFranc_Currency_RWF: response.data.rates.RWF,
      RwandanFranc_Currency_RWF_Low: response.data.rates.RWF,
      RwandanFranc_Currency_RWF_High: response.data.rates.RWF,
      SaudiArabianRiyal_Currency_SAR: response.data.rates.SAR,
      SaudiArabianRiyal_Currency_SAR_Low: response.data.rates.SAR,
      SaudiArabianRiyal_Currency_SAR_High: response.data.rates.SAR,
      SeychelloisRupee_Currency_SCR: response.data.rates.SCR,
      SeychelloisRupee_Currency_SCR_Low: response.data.rates.SCR,
      SeychelloisRupee_Currency_SCR_High: response.data.rates.SCR,
      SudanesePound_Currency_SDG: response.data.rates.SDG,
      SudanesePound_Currency_SDG_Low: response.data.rates.SDG,
      SudanesePound_Currency_SDG_High: response.data.rates.SDG,
      SwedishKrona_Currency_SEK: response.data.rates.SEK,
      SwedishKrona_Currency_SEK_Low: response.data.rates.SEK,
      SwedishKrona_Currency_SEK_High: response.data.rates.SEK,
      SingaporeDollar_Currency_SGD: response.data.rates.SGD,
      SingaporeDollar_Currency_SGD_Low: response.data.rates.SGD,
      SingaporeDollar_Currency_SGD_High: response.data.rates.SGD,
      SierraLeoneanLeone_Currency_SLL: response.data.rates.SLL,
      SierraLeoneanLeone_Currency_SLL_Low: response.data.rates.SLL,
      SierraLeoneanLeone_Currency_SLL_High: response.data.rates.SLL,
      SomaliShilling_Currency_SOS: response.data.rates.SOS,
      SomaliShilling_Currency_SOS_Low: response.data.rates.SOS,
      SomaliShilling_Currency_SOS_High: response.data.rates.SOS,
      SurinameseDollar_Currency_SRD: response.data.rates.SRD,
      SurinameseDollar_Currency_SRD_Low: response.data.rates.SRD,
      SurinameseDollar_Currency_SRD_High: response.data.rates.SRD,
      SaoTomeAndPrincipeDobra_Currency_STN: response.data.rates.STN,
      SaoTomeAndPrincipeDobra_Currency_STN_Low: response.data.rates.STN,
      SaoTomeAndPrincipeDobra_Currency_STN_High: response.data.rates.STN,
      SalvadoranColón_Currency_SVC: response.data.rates.SVC,
      SalvadoranColón_Currency_SVC_Low: response.data.rates.SVC,
      SalvadoranColón_Currency_SVC_High: response.data.rates.SVC,
      SwaziLilangeni_Currency_SZL: response.data.rates.SZL,
      SwaziLilangeni_Currency_SZL_Low: response.data.rates.SZL,
      SwaziLilangeni_Currency_SZL_High: response.data.rates.SZL,
      ThaiBaht_Currency_THB: response.data.rates.THB,
      ThaiBaht_Currency_THB_Low: response.data.rates.THB,
      ThaiBaht_Currency_THB_High: response.data.rates.THB,
      TajikistaniSomoni_Currency_TJS: response.data.rates.TJS,
      TajikistaniSomoni_Currency_TJS_Low: response.data.rates.TJS,
      TajikistaniSomoni_Currency_TJS_High: response.data.rates.TJS,
      TurkmenManat_Currency_TMT: response.data.rates.TMT,
      TurkmenManat_Currency_TMT_Low: response.data.rates.TMT,
      TurkmenManat_Currency_TMT_High: response.data.rates.TMT,
      TunisianDinar_Currency_TND: response.data.rates.TND,
      TunisianDinar_Currency_TND_Low: response.data.rates.TND,
      TunisianDinar_Currency_TND_High: response.data.rates.TND,
      TonganPaanga_Currency_TOP: response.data.rates.TOP,
      TonganPaanga_Currency_TOP_Low: response.data.rates.TOP,
      TonganPaanga_Currency_TOP_High: response.data.rates.TOP,
      TurkishLira_Currency_TRY: response.data.rates.TRY,
      TurkishLira_Currency_TRY_Low: response.data.rates.TRY,
      TurkishLira_Currency_TRY_High: response.data.rates.TRY,
      TrinidadAndTobagoDollar_Currency_TTD: response.data.rates.TTD,
      TrinidadAndTobagoDollar_Currency_TTD_Low: response.data.rates.TTD,
      TrinidadAndTobagoDollar_Currency_TTD_High: response.data.rates.TTD,
      NewTaiwanDollar_Currency_TWD: response.data.rates.TWD,
      NewTaiwanDollar_Currency_TWD_Low: response.data.rates.TWD,
      NewTaiwanDollar_Currency_TWD_High: response.data.rates.TWD,
      TanzanianShilling_Currency_TZS: response.data.rates.TZS,
      TanzanianShilling_Currency_TZS_Low: response.data.rates.TZS,
      TanzanianShilling_Currency_TZS_High: response.data.rates.TZS,
      UkrainianHryvnia_Currency_UAH: response.data.rates.UAH,
      UkrainianHryvnia_Currency_UAH_Low: response.data.rates.UAH,
      UkrainianHryvnia_Currency_UAH_High: response.data.rates.UAH,
      UgandanShilling_Currency_UGX: response.data.rates.UGX,
      UgandanShilling_Currency_UGX_Low: response.data.rates.UGX,
      UgandanShilling_Currency_UGX_High: response.data.rates.UGX,
      UruguayanPeso_Currency_UYU: response.data.rates.UYU,
      UruguayanPeso_Currency_UYU_Low: response.data.rates.UYU,
      UruguayanPeso_Currency_UYU_High: response.data.rates.UYU,
      UzbekistaniSom_Currency_UZS: response.data.rates.UZS,
      UzbekistaniSom_Currency_UZS_Low: response.data.rates.UZS,
      UzbekistaniSom_Currency_UZS_High: response.data.rates.UZS,
      VenezuelanBolivar_Currency_VES: response.data.rates.VES,
      VenezuelanBolivar_Currency_VES_Low: response.data.rates.VES,
      VenezuelanBolivar_Currency_VES_High: response.data.rates.VES,
      VietnameseDong_Currency_VND: response.data.rates.VND,
      VietnameseDong_Currency_VND_Low: response.data.rates.VND,
      VietnameseDong_Currency_VND_High: response.data.rates.VND,
      VanuatuVatu_Currency_VUV: response.data.rates.VUV,
      VanuatuVatu_Currency_VUV_Low: response.data.rates.VUV,
      VanuatuVatu_Currency_VUV_High: response.data.rates.VUV,
      CentralAfricanCFAFranc_Currency_XAF: response.data.rates.XAF,
      CentralAfricanCFAFranc_Currency_XAF_Low: response.data.rates.XAF,
      CentralAfricanCFAFranc_Currency_XAF_High: response.data.rates.XAF,
      EastCaribbeanDollar_Currency_XCD: response.data.rates.XCD,
      EastCaribbeanDollar_Currency_XCD_Low: response.data.rates.XCD,
      EastCaribbeanDollar_Currency_XCD_High: response.data.rates.XCD,
      WestAfricanCFAFranc_Currency_XOF: response.data.rates.XOF,
      WestAfricanCFAFranc_Currency_XOF_Low: response.data.rates.XOF,
      WestAfricanCFAFranc_Currency_XOF_High: response.data.rates.XOF,
      CFPFranc_Currency_XPF: response.data.rates.XPF,
      CFPFranc_Currency_XPF_Low: response.data.rates.XPF,
      CFPFranc_Currency_XPF_High: response.data.rates.XPF,
      YemeniRial_Currency_YER: response.data.rates.YER,
      YemeniRial_Currency_YER_Low: response.data.rates.YER,
      YemeniRial_Currency_YER_High: response.data.rates.YER,
      SouthAfricanRand_Currency_ZAR: response.data.rates.ZAR,
      SouthAfricanRand_Currency_ZAR_Low: response.data.rates.ZAR,
      SouthAfricanRand_Currency_ZAR_High: response.data.rates.ZAR,
      ZambianKwacha_pre2013_Currency_ZMK: response.data.rates.ZMK,
      ZambianKwacha_pre2013_Currency_ZMK_Low: response.data.rates.ZMK,
      ZambianKwacha_pre2013_Currency_ZMK_High: response.data.rates.ZMK,
      ZambianKwacha_Currency_ZMW: response.data.rates.ZMW,
      ZambianKwacha_Currency_ZMW_Low: response.data.rates.ZMW,
      ZambianKwacha_Currency_ZMW_High: response.data.rates.ZMW,
      Silver_Metals_XAG: response.data.rates.XAG,
      Silver_Metals_XAG_Low: response.data.rates.XAG,
      Silver_Metals_XAG_High: response.data.rates.XAG,
      Silver_Ask_Metals_XAG: response.data.rates["XAG-ASK"],
      Silver_Ask_Metals_XAG_Low: response.data.rates["XAG-ASK"],
      Silver_Ask_Metals_XAG_High: response.data.rates["XAG-ASK"],
      Silver_Bid_Metals_XAG: response.data.rates["XAG-BID"],
      Silver_Bid_Metals_XAG_Low: response.data.rates["XAG-BID"],
      Silver_Bid_Metals_XAG_High: response.data.rates["XAG-BID"],
      Gold_Metals_XAU: response.data.rates.XAU,
      Gold_Metals_XAU_Low: response.data.rates.XAU,
      Gold_Metals_XAU_High: response.data.rates.XAU,
      Gold_Ask_Metals_XAU: response.data.rates["XAU-ASK"],
      Gold_Ask_Metals_XAU_Low: response.data.rates["XAU-ASK"],
      Gold_Ask_Metals_XAU_High: response.data.rates["XAU-ASK"],
      Gold_Bid_Metals_XAU: response.data.rates["XAU-BID"],
      Gold_Bid_Metals_XAU_Low: response.data.rates["XAU-BID"],
      Gold_Bid_Metals_XAU_High: response.data.rates["XAU-BID"],
      Palladium_Metals_XPD: response.data.rates.XPD,
      Palladium_Metals_XPD_Low: response.data.rates.XPD,
      Palladium_Metals_XPD_High: response.data.rates.XPD,
      Palladium_Ask_Metals_XPD: response.data.rates["XPD-ASK"],
      Palladium_Ask_Metals_XPD_Low: response.data.rates["XPD-ASK"],
      Palladium_Ask_Metals_XPD_High: response.data.rates["XPD-ASK"],
      Palladium_Bid_Metals_XPD: response.data.rates["XPD-BID"],
      Palladium_Bid_Metals_XPD_Low: response.data.rates["XPD-BID"],
      Palladium_Bid_Metals_XPD_High: response.data.rates["XPD-BID"],
      Platinum_Metals_XPT: response.data.rates.XPT,
      Platinum_Metals_XPT_Low: response.data.rates.XPT,
      Platinum_Metals_XPT_High: response.data.rates.XPT,
      Platinum_Ask_Metals_XPT: response.data.rates["XPT-ASK"],
      Platinum_Ask_Metals_XPT_Low: response.data.rates["XPT-ASK"],
      Platinum_Ask_Metals_XPT_High: response.data.rates["XPT-ASK"],
      Platinum_Bid_Metals_XPT: response.data.rates["XPT-BID"],
      Platinum_Bid_Metals_XPT_Low: response.data.rates["XPT-BID"],
      Platinum_Bid_Metals_XPT_High: response.data.rates["XPT-BID"],
      Copper_Metals_XCU: response.data.rates.XCU,
      Copper_Metals_XCU_Low: response.data.rates.XCU,
      Copper_Metals_XCU_High: response.data.rates.XCU,
      Zinc_Metals_ZNC: response.data.rates.ZNC,
      Zinc_Metals_ZNC_Low: response.data.rates.ZNC,
      Zinc_Metals_ZNC_High: response.data.rates.ZNC,
    });
    // res.status(201).json({
    //   success: true,
    //   message: "Product Created Successfully",
    // });
    return data;
  } else if (!(moment(currentDate).startOf("day").toDate() > rates.updatedAt)) {
    console.log("upcated");

    console.log(rates._id);

    const data = await MetalGlobalRates.findByIdAndUpdate(
      rates._id,
      {
        UAEDirham_Currency_AED: response.data.rates.AED,
        UAEDirham_Currency_AED_Low:
          response.data.rates.AED < rates.UAEDirham_Currency_AED_Low
            ? response.data.rates.AED
            : rates.UAEDirham_Currency_AED_Low,
        UAEDirham_Currency_AED_High:
          response.data.rates.AED > rates.UAEDirham_Currency_AED_High
            ? response.data.rates.AED
            : rates.UAEDirham_Currency_AED_High,
        AfghanAfghani_Currency_AFN: response.data.rates.AFN,
        AfghanAfghani_Currency_AFN_Low:
          response.data.rates.AFN < rates.AfghanAfghani_Currency_AFN_Low
            ? response.data.rates.AFN
            : rates.AfghanAfghani_Currency_AFN_Low,
        AfghanAfghani_Currency_AFN_High:
          response.data.rates.AFN > rates.AfghanAfghani_Currency_AFN_High
            ? response.data.rates.AFN
            : rates.AfghanAfghani_Currency_AFN_High,
        AlbanianLek_Currency_ALL: response.data.rates.ALL,
        AlbanianLek_Currency_ALL_Low:
          response.data.rates.ALL < rates.AlbanianLek_Currency_ALL_Low
            ? response.data.rates.ALL
            : rates.AlbanianLek_Currency_ALL_Low,
        AlbanianLek_Currency_ALL_High:
          response.data.rates.ALL > rates.AlbanianLek_Currency_ALL_High
            ? response.data.rates.ALL
            : rates.AlbanianLek_Currency_ALL_High,
        Aluminum_Currency_ALU: response.data.rates.ALU,
        Aluminum_Currency_ALU_Low:
          response.data.rates.ALU < rates.Aluminum_Currency_ALU_Low
            ? response.data.rates.ALU
            : rates.Aluminum_Currency_ALU_Low,
        Aluminum_Currency_ALU_High:
          response.data.rates.ALU > rates.Aluminum_Currency_ALU_High
            ? response.data.rates.ALU
            : rates.Aluminum_Currency_ALU_High,
        ArmenianDram_Currency_AMD: response.data.rates.AMD,
        ArmenianDram_Currency_AMD_Low:
          response.data.rates.AMD < rates.ArmenianDram_Currency_AMD_Low
            ? response.data.rates.AMD
            : rates.ArmenianDram_Currency_AMD_Low,
        ArmenianDram_Currency_AMD_High:
          response.data.rates.AMD > rates.ArmenianDram_Currency_AMD_High
            ? response.data.rates.AMD
            : rates.ArmenianDram_Currency_AMD_High,
        NetherlandsAntilleanGuilder_Currency_ANG: response.data.rates.ANG,
        NetherlandsAntilleanGuilder_Currency_ANG_Low:
          response.data.rates.ANG <
          rates.NetherlandsAntilleanGuilder_Currency_ANG_Low
            ? response.data.rates.ANG
            : rates.NetherlandsAntilleanGuilder_Currency_ANG_Low,
        NetherlandsAntilleanGuilder_Currency_ANG_High:
          response.data.rates.ANG >
          rates.NetherlandsAntilleanGuilder_Currency_ANG_High
            ? response.data.rates.ANG
            : rates.NetherlandsAntilleanGuilder_Currency_ANG_High,
        AngolanKwanza_Currency_AOA: response.data.rates.AOA,
        AngolanKwanza_Currency_AOA_Low:
          response.data.rates.AOA < rates.AngolanKwanza_Currency_AOA_Low
            ? response.data.rates.AOA
            : rates.AngolanKwanza_Currency_AOA_Low,
        AngolanKwanza_Currency_AOA_High:
          response.data.rates.AOA > rates.AngolanKwanza_Currency_AOA_High
            ? response.data.rates.AOA
            : rates.AngolanKwanza_Currency_AOA_High,
        ArgentinePeso_Currency_ARS: response.data.rates.ARS,
        ArgentinePeso_Currency_ARS_Low:
          response.data.rates.ARS < rates.ArgentinePeso_Currency_ARS_Low
            ? response.data.rates.ARS
            : rates.ArgentinePeso_Currency_ARS_Low,
        ArgentinePeso_Currency_ARS_High:
          response.data.rates.ARS > rates.ArgentinePeso_Currency_ARS_High
            ? response.data.rates.ARS
            : rates.ArgentinePeso_Currency_ARS_High,
        AustralianDollar_Currency_AUD: response.data.rates.AUD,
        AustralianDollar_Currency_AUD_Low:
          response.data.rates.AUD < rates.AustralianDollar_Currency_AUD_Low
            ? response.data.rates.AUD
            : rates.AustralianDollar_Currency_AUD_Low,
        AustralianDollar_Currency_AUD_High:
          response.data.rates.AUD > rates.AustralianDollar_Currency_AUD_High
            ? response.data.rates.AUD
            : rates.AustralianDollar_Currency_AUD_High,
        AzerbaijanManat_Currency_AZN: response.data.rates.AZN,
        AzerbaijanManat_Currency_AZN_Low:
          response.data.rates.AZN < rates.AzerbaijanManat_Currency_AZN_Low
            ? response.data.rates.AZN
            : rates.AzerbaijanManat_Currency_AZN_Low,
        AzerbaijanManat_Currency_AZN_High:
          response.data.rates.AZN > rates.AzerbaijanManat_Currency_AZN_High
            ? response.data.rates.AZN
            : rates.AzerbaijanManat_Currency_AZN_High,
        BosniaAndHerzegovinaConvertibleMark_Currency_BAM:
          response.data.rates.BAM,
        BosniaAndHerzegovinaConvertibleMark_Currency_BAM_Low:
          response.data.rates.BAM <
          rates.BosniaAndHerzegovinaConvertibleMark_Currency_BAM_Low
            ? response.data.rates.BAM
            : rates.BosniaAndHerzegovinaConvertibleMark_Currency_BAM_Low,
        BosniaAndHerzegovinaConvertibleMark_Currency_BAM_High:
          response.data.rates.BAM >
          rates.BosniaAndHerzegovinaConvertibleMark_Currency_BAM_High
            ? response.data.rates.BAM
            : rates.BosniaAndHerzegovinaConvertibleMark_Currency_BAM_High,
        BarbadianDollar_Currency_BBD: response.data.rates.BBD,
        BarbadianDollar_Currency_BBD_Low:
          response.data.rates.BBD < rates.BarbadianDollar_Currency_BBD_Low
            ? response.data.rates.BBD
            : rates.BarbadianDollar_Currency_BBD_Low,
        BarbadianDollar_Currency_BBD_High:
          response.data.rates.BBD > rates.BarbadianDollar_Currency_BBD_High
            ? response.data.rates.BBD
            : rates.BarbadianDollar_Currency_BBD_High,
        BangladeshiTaka_Currency_BDT: response.data.rates.BDT,
        BangladeshiTaka_Currency_BDT_Low:
          response.data.rates.BDT < rates.BangladeshiTaka_Currency_BDT_Low
            ? response.data.rates.BDT
            : rates.BangladeshiTaka_Currency_BDT_Low,
        BangladeshiTaka_Currency_BDT_High:
          response.data.rates.BDT > rates.BangladeshiTaka_Currency_BDT_High
            ? response.data.rates.BDT
            : rates.BangladeshiTaka_Currency_BDT_High,
        BulgarianLev_Currency_BGN: response.data.rates.BGN,
        BulgarianLev_Currency_BGN_Low:
          response.data.rates.BGN < rates.BulgarianLev_Currency_BGN_Low
            ? response.data.rates.BGN
            : rates.BulgarianLev_Currency_BGN_Low,
        BulgarianLev_Currency_BGN_High:
          response.data.rates.BGN > rates.BulgarianLev_Currency_BGN_High
            ? response.data.rates.BGN
            : rates.BulgarianLev_Currency_BGN_High,
        BahrainiDinar_Currency_BHD: response.data.rates.BHD,
        BahrainiDinar_Currency_BHD_Low:
          response.data.rates.BHD < rates.BahrainiDinar_Currency_BHD_Low
            ? response.data.rates.BHD
            : rates.BahrainiDinar_Currency_BHD_Low,
        BahrainiDinar_Currency_BHD_High:
          response.data.rates.BHD > rates.BahrainiDinar_Currency_BHD_High
            ? response.data.rates.BHD
            : rates.BahrainiDinar_Currency_BHD_High,
        BurundiFranc_Currency_BIF: response.data.rates.BIF,
        BurundiFranc_Currency_BIF_Low:
          response.data.rates.BIF < rates.BurundiFranc_Currency_BIF_Low
            ? response.data.rates.BIF
            : rates.BurundiFranc_Currency_BIF_Low,
        BurundiFranc_Currency_BIF_High:
          response.data.rates.BIF > rates.BurundiFranc_Currency_BIF_High
            ? response.data.rates.BIF
            : rates.BurundiFranc_Currency_BIF_High,
        BosniaHerzegovinaConvertibleMark_Currency_BIH: response.data.rates.BIH,
        BosniaHerzegovinaConvertibleMark_Currency_BIH_Low:
          response.data.rates.BIH <
          rates.BosniaHerzegovinaConvertibleMark_Currency_BIH_Low
            ? response.data.rates.BIH
            : rates.BosniaHerzegovinaConvertibleMark_Currency_BIH_Low,
        BosniaHerzegovinaConvertibleMark_Currency_BIH_High:
          response.data.rates.BIH >
          rates.BosniaHerzegovinaConvertibleMark_Currency_BIH_High
            ? response.data.rates.BIH
            : rates.BosniaHerzegovinaConvertibleMark_Currency_BIH_High,
        BruneiDollar_Currency_BND: response.data.rates.BND,
        BruneiDollar_Currency_BND_Low:
          response.data.rates.BND < rates.BruneiDollar_Currency_BND_Low
            ? response.data.rates.BND
            : rates.BruneiDollar_Currency_BND_Low,
        BruneiDollar_Currency_BND_High:
          response.data.rates.BND > rates.BruneiDollar_Currency_BND_High
            ? response.data.rates.BND
            : rates.BruneiDollar_Currency_BND_High,
        BolivianBoliviano_Currency_BOB: response.data.rates.BOB,
        BolivianBoliviano_Currency_BOB_Low:
          response.data.rates.BOB < rates.BolivianBoliviano_Currency_BOB_Low
            ? response.data.rates.BOB
            : rates.BolivianBoliviano_Currency_BOB_Low,
        BolivianBoliviano_Currency_BOB_High:
          response.data.rates.BOB > rates.BolivianBoliviano_Currency_BOB_High
            ? response.data.rates.BOB
            : rates.BolivianBoliviano_Currency_BOB_High,
        BrazilianReal_Currency_BRL: response.data.rates.BRL,
        BrazilianReal_Currency_BRL_Low:
          response.data.rates.BRL < rates.BrazilianReal_Currency_BRL_Low
            ? response.data.rates.BRL
            : rates.BrazilianReal_Currency_BRL_Low,
        BrazilianReal_Currency_BRL_High:
          response.data.rates.BRL > rates.BrazilianReal_Currency_BRL_High
            ? response.data.rates.BRL
            : rates.BrazilianReal_Currency_BRL_High,
        BahamianDollar_Currency_BSD: response.data.rates.BSD,
        BahamianDollar_Currency_BSD_Low:
          response.data.rates.BSD < rates.BahamianDollar_Currency_BSD_Low
            ? response.data.rates.BSD
            : rates.BahamianDollar_Currency_BSD_Low,
        BahamianDollar_Currency_BSD_High:
          response.data.rates.BSD > rates.BahamianDollar_Currency_BSD_High
            ? response.data.rates.BSD
            : rates.BahamianDollar_Currency_BSD_High,
        Bitcoin_Currency_BTC: response.data.rates.BTC,
        Bitcoin_Currency_BTC_Low:
          response.data.rates.BTC < rates.Bitcoin_Currency_BTC_Low
            ? response.data.rates.BTC
            : rates.Bitcoin_Currency_BTC_Low,
        Bitcoin_Currency_BTC_High:
          response.data.rates.BTC > rates.Bitcoin_Currency_BTC_High
            ? response.data.rates.BTC
            : rates.Bitcoin_Currency_BTC_High,
        BhutaneseNgultrum_Currency_BTN: response.data.rates.BTN,
        BhutaneseNgultrum_Currency_BTN_Low:
          response.data.rates.BTN < rates.BhutaneseNgultrum_Currency_BTN_Low
            ? response.data.rates.BTN
            : rates.BhutaneseNgultrum_Currency_BTN_Low,
        BhutaneseNgultrum_Currency_BTN_High:
          response.data.rates.BTN > rates.BhutaneseNgultrum_Currency_BTN_High
            ? response.data.rates.BTN
            : rates.BhutaneseNgultrum_Currency_BTN_High,
        BelarusianRuble_Currency_BYN: response.data.rates.BYN,
        BelarusianRuble_Currency_BYN_Low:
          response.data.rates.BYN < rates.BelarusianRuble_Currency_BYN_Low
            ? response.data.rates.BYN
            : rates.BelarusianRuble_Currency_BYN_Low,
        BelarusianRuble_Currency_BYN_High:
          response.data.rates.BYN > rates.BelarusianRuble_Currency_BYN_High
            ? response.data.rates.BYN
            : rates.BelarusianRuble_Currency_BYN_High,
        BelizeDollar_Currency_BZD: response.data.rates.BZD,
        BelizeDollar_Currency_BZD_Low:
          response.data.rates.BZD < rates.BelizeDollar_Currency_BZD_Low
            ? response.data.rates.BZD
            : rates.BelizeDollar_Currency_BZD_Low,
        BelizeDollar_Currency_BZD_High:
          response.data.rates.BZD > rates.BelizeDollar_Currency_BZD_High
            ? response.data.rates.BZD
            : rates.BelizeDollar_Currency_BZD_High,
        CanadianDollar_Currency_CAD: response.data.rates.CAD,
        CanadianDollar_Currency_CAD_Low:
          response.data.rates.CAD < rates.CanadianDollar_Currency_CAD_Low
            ? response.data.rates.CAD
            : rates.CanadianDollar_Currency_CAD_Low,
        CanadianDollar_Currency_CAD_High:
          response.data.rates.CAD > rates.CanadianDollar_Currency_CAD_High
            ? response.data.rates.CAD
            : rates.CanadianDollar_Currency_CAD_High,
        CongoleseFranc_Currency_CDF: response.data.rates.CDF,
        CongoleseFranc_Currency_CDF_Low:
          response.data.rates.CDF < rates.CongoleseFranc_Currency_CDF_Low
            ? response.data.rates.CDF
            : rates.CongoleseFranc_Currency_CDF_Low,
        CongoleseFranc_Currency_CDF_High:
          response.data.rates.CDF > rates.CongoleseFranc_Currency_CDF_High
            ? response.data.rates.CDF
            : rates.CongoleseFranc_Currency_CDF_High,
        SwissFranc_Currency_CHF: response.data.rates.CHF,
        SwissFranc_Currency_CHF_Low:
          response.data.rates.CHF < rates.SwissFranc_Currency_CHF_Low
            ? response.data.rates.CHF
            : rates.SwissFranc_Currency_CHF_Low,
        SwissFranc_Currency_CHF_High:
          response.data.rates.CHF > rates.SwissFranc_Currency_CHF_High
            ? response.data.rates.CHF
            : rates.SwissFranc_Currency_CHF_High,
        ChileanUnitOfAccount_Currency_CLF: response.data.rates.CLF,
        ChileanUnitOfAccount_Currency_CLF_Low:
          response.data.rates.CLF < rates.ChileanUnitOfAccount_Currency_CLF_Low
            ? response.data.rates.CLF
            : rates.ChileanUnitOfAccount_Currency_CLF_Low,
        ChileanUnitOfAccount_Currency_CLF_High:
          response.data.rates.CLF > rates.ChileanUnitOfAccount_Currency_CLF_High
            ? response.data.rates.CLF
            : rates.ChileanUnitOfAccount_Currency_CLF_High,
        ChileanPeso_Currency_CLP: response.data.rates.CLP,
        ChileanPeso_Currency_CLP_Low:
          response.data.rates.CLP < rates.ChileanPeso_Currency_CLP_Low
            ? response.data.rates.CLP
            : rates.ChileanPeso_Currency_CLP_Low,
        ChileanPeso_Currency_CLP_High:
          response.data.rates.CLP > rates.ChileanPeso_Currency_CLP_High
            ? response.data.rates.CLP
            : rates.ChileanPeso_Currency_CLP_High,
        ChineseYuanRenminbi_Currency_CNY: response.data.rates.CNY,
        ChineseYuanRenminbi_Currency_CNY_Low:
          response.data.rates.CNY < rates.ChineseYuanRenminbi_Currency_CNY_Low
            ? response.data.rates.CNY
            : rates.ChineseYuanRenminbi_Currency_CNY_Low,
        ChineseYuanRenminbi_Currency_CNY_High:
          response.data.rates.CNY > rates.ChineseYuanRenminbi_Currency_CNY_High
            ? response.data.rates.CNY
            : rates.ChineseYuanRenminbi_Currency_CNY_High,
        ColombianPeso_Currency_COP: response.data.rates.COP,
        ColombianPeso_Currency_COP_Low:
          response.data.rates.COP < rates.ColombianPeso_Currency_COP_Low
            ? response.data.rates.COP
            : rates.ColombianPeso_Currency_COP_Low,
        ColombianPeso_Currency_COP_High:
          response.data.rates.COP > rates.ColombianPeso_Currency_COP_High
            ? response.data.rates.COP
            : rates.ColombianPeso_Currency_COP_High,
        CostaRicanColon_Currency_CRC: response.data.rates.CRC,
        CostaRicanColon_Currency_CRC_Low:
          response.data.rates.CRC < rates.CostaRicanColon_Currency_CRC_Low
            ? response.data.rates.CRC
            : rates.CostaRicanColon_Currency_CRC_Low,
        CostaRicanColon_Currency_CRC_High:
          response.data.rates.CRC > rates.CostaRicanColon_Currency_CRC_High
            ? response.data.rates.CRC
            : rates.CostaRicanColon_Currency_CRC_High,
        CapeVerdeanEscudo_Currency_CVE: response.data.rates.CVE,
        CapeVerdeanEscudo_Currency_CVE_Low:
          response.data.rates.CVE < rates.CapeVerdeanEscudo_Currency_CVE_Low
            ? response.data.rates.CVE
            : rates.CapeVerdeanEscudo_Currency_CVE_Low,
        CapeVerdeanEscudo_Currency_CVE_High:
          response.data.rates.CVE > rates.CapeVerdeanEscudo_Currency_CVE_High
            ? response.data.rates.CVE
            : rates.CapeVerdeanEscudo_Currency_CVE_High,
        CzechKoruna_Currency_CZK: response.data.rates.CZK,
        CzechKoruna_Currency_CZK_Low:
          response.data.rates.CZK < rates.CzechKoruna_Currency_CZK_Low
            ? response.data.rates.CZK
            : rates.CzechKoruna_Currency_CZK_Low,
        CzechKoruna_Currency_CZK_High:
          response.data.rates.CZK > rates.CzechKoruna_Currency_CZK_High
            ? response.data.rates.CZK
            : rates.CzechKoruna_Currency_CZK_High,
        DjiboutianFranc_Currency_DJF: response.data.rates.DJF,
        DjiboutianFranc_Currency_DJF_Low:
          response.data.rates.DJF < rates.DjiboutianFranc_Currency_DJF_Low
            ? response.data.rates.DJF
            : rates.DjiboutianFranc_Currency_DJF_Low,
        DjiboutianFranc_Currency_DJF_High:
          response.data.rates.DJF > rates.DjiboutianFranc_Currency_DJF_High
            ? response.data.rates.DJF
            : rates.DjiboutianFranc_Currency_DJF_High,
        DanishKrone_Currency_DKK: response.data.rates.DKK,
        DanishKrone_Currency_DKK_Low:
          response.data.rates.DKK < rates.DanishKrone_Currency_DKK_Low
            ? response.data.rates.DKK
            : rates.DanishKrone_Currency_DKK_Low,
        DanishKrone_Currency_DKK_High:
          response.data.rates.DKK > rates.DanishKrone_Currency_DKK_High
            ? response.data.rates.DKK
            : rates.DanishKrone_Currency_DKK_High,
        DominicanPeso_Currency_DOP: response.data.rates.DOP,
        DominicanPeso_Currency_DOP_Low:
          response.data.rates.DOP < rates.DominicanPeso_Currency_DOP_Low
            ? response.data.rates.DOP
            : rates.DominicanPeso_Currency_DOP_Low,
        DominicanPeso_Currency_DOP_High:
          response.data.rates.DOP > rates.DominicanPeso_Currency_DOP_High
            ? response.data.rates.DOP
            : rates.DominicanPeso_Currency_DOP_High,
        AlgerianDinar_Currency_DZD: response.data.rates.DZD,
        AlgerianDinar_Currency_DZD_Low:
          response.data.rates.DZD < rates.AlgerianDinar_Currency_DZD_Low
            ? response.data.rates.DZD
            : rates.AlgerianDinar_Currency_DZD_Low,
        AlgerianDinar_Currency_DZD_High:
          response.data.rates.DZD > rates.AlgerianDinar_Currency_DZD_High
            ? response.data.rates.DZD
            : rates.AlgerianDinar_Currency_DZD_High,
        EgyptianPound_Currency_EGP: response.data.rates.EGP,
        EgyptianPound_Currency_EGP_Low:
          response.data.rates.EGP < rates.EgyptianPound_Currency_EGP_Low
            ? response.data.rates.EGP
            : rates.EgyptianPound_Currency_EGP_Low,
        EgyptianPound_Currency_EGP_High:
          response.data.rates.EGP > rates.EgyptianPound_Currency_EGP_High
            ? response.data.rates.EGP
            : rates.EgyptianPound_Currency_EGP_High,
        EritreanNakfa_Currency_ERN: response.data.rates.ERN,
        EritreanNakfa_Currency_ERN_Low:
          response.data.rates.ERN < rates.EritreanNakfa_Currency_ERN_Low
            ? response.data.rates.ERN
            : rates.EritreanNakfa_Currency_ERN_Low,
        EritreanNakfa_Currency_ERN_High:
          response.data.rates.ERN > rates.EritreanNakfa_Currency_ERN_High
            ? response.data.rates.ERN
            : rates.EritreanNakfa_Currency_ERN_High,
        EthiopianBirr_Currency_ETB: response.data.rates.ETB,
        EthiopianBirr_Currency_ETB_Low:
          response.data.rates.ETB < rates.EthiopianBirr_Currency_ETB_Low
            ? response.data.rates.ETB
            : rates.EthiopianBirr_Currency_ETB_Low,
        EthiopianBirr_Currency_ETB_High:
          response.data.rates.ETB > rates.EthiopianBirr_Currency_ETB_High
            ? response.data.rates.ETB
            : rates.EthiopianBirr_Currency_ETB_High,
        EuropeanEuro_Currency_EUR: response.data.rates.EUR,
        EuropeanEuro_Currency_EUR_Low:
          response.data.rates.EUR < rates.EuropeanEuro_Currency_EUR_Low
            ? response.data.rates.EUR
            : rates.EuropeanEuro_Currency_EUR_Low,
        EuropeanEuro_Currency_EUR_High:
          response.data.rates.EUR > rates.EuropeanEuro_Currency_EUR_High
            ? response.data.rates.EUR
            : rates.EuropeanEuro_Currency_EUR_High,
        FijianDollar_Currency_FJD: response.data.rates.FJD,
        FijianDollar_Currency_FJD_Low:
          response.data.rates.FJD < rates.FijianDollar_Currency_FJD_Low
            ? response.data.rates.FJD
            : rates.FijianDollar_Currency_FJD_Low,
        FijianDollar_Currency_FJD_High:
          response.data.rates.FJD > rates.FijianDollar_Currency_FJD_High
            ? response.data.rates.FJD
            : rates.FijianDollar_Currency_FJD_High,
        FalklandIslandsPound_Currency_FKP: response.data.rates.FKP,
        FalklandIslandsPound_Currency_FKP_Low:
          response.data.rates.FKP < rates.FalklandIslandsPound_Currency_FKP_Low
            ? response.data.rates.FKP
            : rates.FalklandIslandsPound_Currency_FKP_Low,
        FalklandIslandsPound_Currency_FKP_High:
          response.data.rates.FKP > rates.FalklandIslandsPound_Currency_FKP_High
            ? response.data.rates.FKP
            : rates.FalklandIslandsPound_Currency_FKP_High,
        PoundSterling_Currency_GBP: response.data.rates.GBP,
        PoundSterling_Currency_GBP_Low:
          response.data.rates.GBP < rates.PoundSterling_Currency_GBP_Low
            ? response.data.rates.GBP
            : rates.PoundSterling_Currency_GBP_Low,
        PoundSterling_Currency_GBP_High:
          response.data.rates.GBP > rates.PoundSterling_Currency_GBP_High
            ? response.data.rates.GBP
            : rates.PoundSterling_Currency_GBP_High,
        GeorgianLari_Currency_GEL: response.data.rates.GEL,
        GeorgianLari_Currency_GEL_Low:
          response.data.rates.GEL < rates.GeorgianLari_Currency_GEL_Low
            ? response.data.rates.GEL
            : rates.GeorgianLari_Currency_GEL_Low,
        GeorgianLari_Currency_GEL_High:
          response.data.rates.GEL > rates.GeorgianLari_Currency_GEL_High
            ? response.data.rates.GEL
            : rates.GeorgianLari_Currency_GEL_High,
        GhanaianCedi_Currency_GHS: response.data.rates.GHS,
        GhanaianCedi_Currency_GHS_Low:
          response.data.rates.GHS < rates.GhanaianCedi_Currency_GHS_Low
            ? response.data.rates.GHS
            : rates.GhanaianCedi_Currency_GHS_Low,
        GhanaianCedi_Currency_GHS_High:
          response.data.rates.GHS > rates.GhanaianCedi_Currency_GHS_High
            ? response.data.rates.GHS
            : rates.GhanaianCedi_Currency_GHS_High,
        GibraltarPound_Currency_GIP: response.data.rates.GIP,
        GibraltarPound_Currency_GIP_Low:
          response.data.rates.GIP < rates.GibraltarPound_Currency_GIP_Low
            ? response.data.rates.GIP
            : rates.GibraltarPound_Currency_GIP_Low,
        GibraltarPound_Currency_GIP_High:
          response.data.rates.GIP > rates.GibraltarPound_Currency_GIP_High
            ? response.data.rates.GIP
            : rates.GibraltarPound_Currency_GIP_High,
        GambianDalasi_Currency_GMD: response.data.rates.GMD,
        GambianDalasi_Currency_GMD_Low:
          response.data.rates.GMD < rates.GambianDalasi_Currency_GMD_Low
            ? response.data.rates.GMD
            : rates.GambianDalasi_Currency_GMD_Low,
        GambianDalasi_Currency_GMD_High:
          response.data.rates.GMD > rates.GambianDalasi_Currency_GMD_High
            ? response.data.rates.GMD
            : rates.GambianDalasi_Currency_GMD_High,
        GuineanFranc_Currency_GNF: response.data.rates.GNF,
        GuineanFranc_Currency_GNF_Low:
          response.data.rates.GNF < rates.GuineanFranc_Currency_GNF_Low
            ? response.data.rates.GNF
            : rates.GuineanFranc_Currency_GNF_Low,
        GuineanFranc_Currency_GNF_High:
          response.data.rates.GNF > rates.GuineanFranc_Currency_GNF_High
            ? response.data.rates.GNF
            : rates.GuineanFranc_Currency_GNF_High,
        GuatemalanQuetzal_Currency_GTQ: response.data.rates.GTQ,
        GuatemalanQuetzal_Currency_GTQ_Low:
          response.data.rates.GTQ < rates.GuatemalanQuetzal_Currency_GTQ_Low
            ? response.data.rates.GTQ
            : rates.GuatemalanQuetzal_Currency_GTQ_Low,
        GuatemalanQuetzal_Currency_GTQ_High:
          response.data.rates.GTQ > rates.GuatemalanQuetzal_Currency_GTQ_High
            ? response.data.rates.GTQ
            : rates.GuatemalanQuetzal_Currency_GTQ_High,
        GuyaneseDollar_Currency_GYD: response.data.rates.GYD,
        GuyaneseDollar_Currency_GYD_Low:
          response.data.rates.GYD < rates.GuyaneseDollar_Currency_GYD_Low
            ? response.data.rates.GYD
            : rates.GuyaneseDollar_Currency_GYD_Low,
        GuyaneseDollar_Currency_GYD_High:
          response.data.rates.GYD > rates.GuyaneseDollar_Currency_GYD_High
            ? response.data.rates.GYD
            : rates.GuyaneseDollar_Currency_GYD_High,
        HongKongDollar_Currency_HKD: response.data.rates.HKD,
        HongKongDollar_Currency_HKD_Low:
          response.data.rates.HKD < rates.HongKongDollar_Currency_HKD_Low
            ? response.data.rates.HKD
            : rates.HongKongDollar_Currency_HKD_Low,
        HongKongDollar_Currency_HKD_High:
          response.data.rates.HKD > rates.HongKongDollar_Currency_HKD_High
            ? response.data.rates.HKD
            : rates.HongKongDollar_Currency_HKD_High,
        HonduranLempira_Currency_HNL: response.data.rates.HNL,
        HonduranLempira_Currency_HNL_Low:
          response.data.rates.HNL < rates.HonduranLempira_Currency_HNL_Low
            ? response.data.rates.HNL
            : rates.HonduranLempira_Currency_HNL_Low,
        HonduranLempira_Currency_HNL_High:
          response.data.rates.HNL > rates.HonduranLempira_Currency_HNL_High
            ? response.data.rates.HNL
            : rates.HonduranLempira_Currency_HNL_High,
        CroatianKuna_Currency_HRK: response.data.rates.HRK,
        CroatianKuna_Currency_HRK_Low:
          response.data.rates.HRK < rates.CroatianKuna_Currency_HRK_Low
            ? response.data.rates.HRK
            : rates.CroatianKuna_Currency_HRK_Low,
        CroatianKuna_Currency_HRK_High:
          response.data.rates.HRK > rates.CroatianKuna_Currency_HRK_High
            ? response.data.rates.HRK
            : rates.CroatianKuna_Currency_HRK_High,
        HaitianGourde_Currency_HTG: response.data.rates.HTG,
        HaitianGourde_Currency_HTG_Low:
          response.data.rates.HTG < rates.HaitianGourde_Currency_HTG_Low
            ? response.data.rates.HTG
            : rates.HaitianGourde_Currency_HTG_Low,
        HaitianGourde_Currency_HTG_High:
          response.data.rates.HTG > rates.HaitianGourde_Currency_HTG_High
            ? response.data.rates.HTG
            : rates.HaitianGourde_Currency_HTG_High,
        HungarianForint_Currency_HUF: response.data.rates.HUF,
        HungarianForint_Currency_HUF_Low:
          response.data.rates.HUF < rates.HungarianForint_Currency_HUF_Low
            ? response.data.rates.HUF
            : rates.HungarianForint_Currency_HUF_Low,
        HungarianForint_Currency_HUF_High:
          response.data.rates.HUF > rates.HungarianForint_Currency_HUF_High
            ? response.data.rates.HUF
            : rates.HungarianForint_Currency_HUF_High,
        IndonesianRupiah_Currency_IDR: response.data.rates.IDR,
        IndonesianRupiah_Currency_IDR_Low:
          response.data.rates.IDR < rates.IndonesianRupiah_Currency_IDR_Low
            ? response.data.rates.IDR
            : rates.IndonesianRupiah_Currency_IDR_Low,
        IndonesianRupiah_Currency_IDR_High:
          response.data.rates.IDR > rates.IndonesianRupiah_Currency_IDR_High
            ? response.data.rates.IDR
            : rates.IndonesianRupiah_Currency_IDR_High,
        IsraeliNewShekel_Currency_ILS: response.data.rates.ILS,
        IsraeliNewShekel_Currency_ILS_Low:
          response.data.rates.ILS < rates.IsraeliNewShekel_Currency_ILS_Low
            ? response.data.rates.ILS
            : rates.IsraeliNewShekel_Currency_ILS_Low,
        IsraeliNewShekel_Currency_ILS_High:
          response.data.rates.ILS > rates.IsraeliNewShekel_Currency_ILS_High
            ? response.data.rates.ILS
            : rates.IsraeliNewShekel_Currency_ILS_High,
        IndianRupee_Currency_INR: response.data.rates.INR,
        IndianRupee_Currency_INR_Low:
          response.data.rates.INR < rates.IndianRupee_Currency_INR_Low
            ? response.data.rates.INR
            : rates.IndianRupee_Currency_INR_Low,
        IndianRupee_Currency_INR_High:
          response.data.rates.INR > rates.IndianRupee_Currency_INR_High
            ? response.data.rates.INR
            : rates.IndianRupee_Currency_INR_High,
        IraqiDinar_Currency_IQD: response.data.rates.IQD,
        IraqiDinar_Currency_IQD_Low:
          response.data.rates.IQD < rates.IraqiDinar_Currency_IQD_Low
            ? response.data.rates.IQD
            : rates.IraqiDinar_Currency_IQD_Low,
        IraqiDinar_Currency_IQD_High:
          response.data.rates.IQD > rates.IraqiDinar_Currency_IQD_High
            ? response.data.rates.IQD
            : rates.IraqiDinar_Currency_IQD_High,
        IranianRial_Currency_IRR: response.data.rates.IRR,
        IranianRial_Currency_IRR_Low:
          response.data.rates.IRR < rates.IranianRial_Currency_IRR_Low
            ? response.data.rates.IRR
            : rates.IranianRial_Currency_IRR_Low,
        IranianRial_Currency_IRR_High:
          response.data.rates.IRR > rates.IranianRial_Currency_IRR_High
            ? response.data.rates.IRR
            : rates.IranianRial_Currency_IRR_High,
        IcelandicKrona_Currency_ISK: response.data.rates.ISK,
        IcelandicKrona_Currency_ISK_Low:
          response.data.rates.ISK < rates.IcelandicKrona_Currency_ISK_Low
            ? response.data.rates.ISK
            : rates.IcelandicKrona_Currency_ISK_Low,
        IcelandicKrona_Currency_ISK_High:
          response.data.rates.ISK > rates.IcelandicKrona_Currency_ISK_High
            ? response.data.rates.ISK
            : rates.IcelandicKrona_Currency_ISK_High,
        JamaicanDollar_Currency_JMD: response.data.rates.JMD,
        JamaicanDollar_Currency_JMD_Low:
          response.data.rates.JMD < rates.JamaicanDollar_Currency_JMD_Low
            ? response.data.rates.JMD
            : rates.JamaicanDollar_Currency_JMD_Low,
        JamaicanDollar_Currency_JMD_High:
          response.data.rates.JMD > rates.JamaicanDollar_Currency_JMD_High
            ? response.data.rates.JMD
            : rates.JamaicanDollar_Currency_JMD_High,
        JordanianDinar_Currency_JOD: response.data.rates.JOD,
        JordanianDinar_Currency_JOD_Low:
          response.data.rates.JOD < rates.JordanianDinar_Currency_JOD_Low
            ? response.data.rates.JOD
            : rates.JordanianDinar_Currency_JOD_Low,
        JordanianDinar_Currency_JOD_High:
          response.data.rates.JOD > rates.JordanianDinar_Currency_JOD_High
            ? response.data.rates.JOD
            : rates.JordanianDinar_Currency_JOD_High,
        JapaneseYen_Currency_JPY: response.data.rates.JPY,
        JapaneseYen_Currency_JPY_Low:
          response.data.rates.JPY < rates.JapaneseYen_Currency_JPY_Low
            ? response.data.rates.JPY
            : rates.JapaneseYen_Currency_JPY_Low,
        JapaneseYen_Currency_JPY_High:
          response.data.rates.JPY > rates.JapaneseYen_Currency_JPY_High
            ? response.data.rates.JPY
            : rates.JapaneseYen_Currency_JPY_High,
        KenyanShilling_Currency_KES: response.data.rates.KES,
        KenyanShilling_Currency_KES_Low:
          response.data.rates.KES < rates.KenyanShilling_Currency_KES_Low
            ? response.data.rates.KES
            : rates.KenyanShilling_Currency_KES_Low,
        KenyanShilling_Currency_KES_High:
          response.data.rates.KES > rates.KenyanShilling_Currency_KES_High
            ? response.data.rates.KES
            : rates.KenyanShilling_Currency_KES_High,
        KyrgyzstaniSom_Currency_KGS: response.data.rates.KGS,
        KyrgyzstaniSom_Currency_KGS_Low:
          response.data.rates.KGS < rates.KyrgyzstaniSom_Currency_KGS_Low
            ? response.data.rates.KGS
            : rates.KyrgyzstaniSom_Currency_KGS_Low,
        KyrgyzstaniSom_Currency_KGS_High:
          response.data.rates.KGS > rates.KyrgyzstaniSom_Currency_KGS_High
            ? response.data.rates.KGS
            : rates.KyrgyzstaniSom_Currency_KGS_High,
        CambodianRiel_Currency_KHR: response.data.rates.KHR,
        CambodianRiel_Currency_KHR_Low:
          response.data.rates.KHR < rates.CambodianRiel_Currency_KHR_Low
            ? response.data.rates.KHR
            : rates.CambodianRiel_Currency_KHR_Low,
        CambodianRiel_Currency_KHR_High:
          response.data.rates.KHR > rates.CambodianRiel_Currency_KHR_High
            ? response.data.rates.KHR
            : rates.CambodianRiel_Currency_KHR_High,
        ComorianFranc_Currency_KMF: response.data.rates.KMF,
        ComorianFranc_Currency_KMF_Low:
          response.data.rates.KMF < rates.ComorianFranc_Currency_KMF_Low
            ? response.data.rates.KMF
            : rates.ComorianFranc_Currency_KMF_Low,
        ComorianFranc_Currency_KMF_High:
          response.data.rates.KMF > rates.ComorianFranc_Currency_KMF_High
            ? response.data.rates.KMF
            : rates.ComorianFranc_Currency_KMF_High,
        SouthKoreanWon_Currency_KRW: response.data.rates.KRW,
        SouthKoreanWon_Currency_KRW_Low:
          response.data.rates.KRW < rates.SouthKoreanWon_Currency_KRW_Low
            ? response.data.rates.KRW
            : rates.SouthKoreanWon_Currency_KRW_Low,
        SouthKoreanWon_Currency_KRW_High:
          response.data.rates.KRW > rates.SouthKoreanWon_Currency_KRW_High
            ? response.data.rates.KRW
            : rates.SouthKoreanWon_Currency_KRW_High,
        KuwaitiDinar_Currency_KWD: response.data.rates.KWD,
        KuwaitiDinar_Currency_KWD_Low:
          response.data.rates.KWD < rates.KuwaitiDinar_Currency_KWD_Low
            ? response.data.rates.KWD
            : rates.KuwaitiDinar_Currency_KWD_Low,
        KuwaitiDinar_Currency_KWD_High:
          response.data.rates.KWD > rates.KuwaitiDinar_Currency_KWD_High
            ? response.data.rates.KWD
            : rates.KuwaitiDinar_Currency_KWD_High,
        CaymanIslandsDollar_Currency_KYD: response.data.rates.KYD,
        CaymanIslandsDollar_Currency_KYD_Low:
          response.data.rates.KYD < rates.CaymanIslandsDollar_Currency_KYD_Low
            ? response.data.rates.KYD
            : rates.CaymanIslandsDollar_Currency_KYD_Low,
        CaymanIslandsDollar_Currency_KYD_High:
          response.data.rates.KYD > rates.CaymanIslandsDollar_Currency_KYD_High
            ? response.data.rates.KYD
            : rates.CaymanIslandsDollar_Currency_KYD_High,
        KazakhstaniTenge_Currency_KZT: response.data.rates.KZT,
        KazakhstaniTenge_Currency_KZT_Low:
          response.data.rates.KZT < rates.KazakhstaniTenge_Currency_KZT_Low
            ? response.data.rates.KZT
            : rates.KazakhstaniTenge_Currency_KZT_Low,
        KazakhstaniTenge_Currency_KZT_High:
          response.data.rates.KZT > rates.KazakhstaniTenge_Currency_KZT_High
            ? response.data.rates.KZT
            : rates.KazakhstaniTenge_Currency_KZT_High,
        LaoKip_Currency_LAK: response.data.rates.LAK,
        LaoKip_Currency_LAK_Low:
          response.data.rates.LAK < rates.LaoKip_Currency_LAK_Low
            ? response.data.rates.LAK
            : rates.LaoKip_Currency_LAK_Low,
        LaoKip_Currency_LAK_High:
          response.data.rates.LAK > rates.LaoKip_Currency_LAK_High
            ? response.data.rates.LAK
            : rates.LaoKip_Currency_LAK_High,
        LebanesePound_Currency_LBP: response.data.rates.LBP,
        LebanesePound_Currency_LBP_Low:
          response.data.rates.LBP < rates.LebanesePound_Currency_LBP_Low
            ? response.data.rates.LBP
            : rates.LebanesePound_Currency_LBP_Low,
        LebanesePound_Currency_LBP_High:
          response.data.rates.LBP > rates.LebanesePound_Currency_LBP_High
            ? response.data.rates.LBP
            : rates.LebanesePound_Currency_LBP_High,
        SriLankanRupee_Currency_LKR: response.data.rates.LKR,
        SriLankanRupee_Currency_LKR_Low:
          response.data.rates.LKR < rates.SriLankanRupee_Currency_LKR_Low
            ? response.data.rates.LKR
            : rates.SriLankanRupee_Currency_LKR_Low,
        SriLankanRupee_Currency_LKR_High:
          response.data.rates.LKR > rates.SriLankanRupee_Currency_LKR_High
            ? response.data.rates.LKR
            : rates.SriLankanRupee_Currency_LKR_High,
        LiberianDollar_Currency_LRD: response.data.rates.LRD,
        LiberianDollar_Currency_LRD_Low:
          response.data.rates.LRD < rates.LiberianDollar_Currency_LRD_Low
            ? response.data.rates.LRD
            : rates.LiberianDollar_Currency_LRD_Low,
        LiberianDollar_Currency_LRD_High:
          response.data.rates.LRD > rates.LiberianDollar_Currency_LRD_High
            ? response.data.rates.LRD
            : rates.LiberianDollar_Currency_LRD_High,
        LesothoLoti_Currency_LSL: response.data.rates.LSL,
        LesothoLoti_Currency_LSL_Low:
          response.data.rates.LSL < rates.LesothoLoti_Currency_LSL_Low
            ? response.data.rates.LSL
            : rates.LesothoLoti_Currency_LSL_Low,
        LesothoLoti_Currency_LSL_High:
          response.data.rates.LSL > rates.LesothoLoti_Currency_LSL_High
            ? response.data.rates.LSL
            : rates.LesothoLoti_Currency_LSL_High,
        LibyanDinar_Currency_LYD: response.data.rates.LYD,
        LibyanDinar_Currency_LYD_Low:
          response.data.rates.LYD < rates.LibyanDinar_Currency_LYD_Low
            ? response.data.rates.LYD
            : rates.LibyanDinar_Currency_LYD_Low,
        LibyanDinar_Currency_LYD_High:
          response.data.rates.LYD > rates.LibyanDinar_Currency_LYD_High
            ? response.data.rates.LYD
            : rates.LibyanDinar_Currency_LYD_High,
        MoroccanDirham_Currency_MAD: response.data.rates.MAD,
        MoroccanDirham_Currency_MAD_Low:
          response.data.rates.MAD < rates.MoroccanDirham_Currency_MAD_Low
            ? response.data.rates.MAD
            : rates.MoroccanDirham_Currency_MAD_Low,
        MoroccanDirham_Currency_MAD_High:
          response.data.rates.MAD > rates.MoroccanDirham_Currency_MAD_High
            ? response.data.rates.MAD
            : rates.MoroccanDirham_Currency_MAD_High,
        MoldovanLeu_Currency_MDL: response.data.rates.MDL,
        MoldovanLeu_Currency_MDL_Low:
          response.data.rates.MDL < rates.MoldovanLeu_Currency_MDL_Low
            ? response.data.rates.MDL
            : rates.MoldovanLeu_Currency_MDL_Low,
        MoldovanLeu_Currency_MDL_High:
          response.data.rates.MDL > rates.MoldovanLeu_Currency_MDL_High
            ? response.data.rates.MDL
            : rates.MoldovanLeu_Currency_MDL_High,
        MalagasyAriary_Currency_MGA: response.data.rates.MGA,
        MalagasyAriary_Currency_MGA_Low:
          response.data.rates.MGA < rates.MalagasyAriary_Currency_MGA_Low
            ? response.data.rates.MGA
            : rates.MalagasyAriary_Currency_MGA_Low,
        MalagasyAriary_Currency_MGA_High:
          response.data.rates.MGA > rates.MalagasyAriary_Currency_MGA_High
            ? response.data.rates.MGA
            : rates.MalagasyAriary_Currency_MGA_High,
        MacedonianDenar_Currency_MKD: response.data.rates.MKD,
        MacedonianDenar_Currency_MKD_Low:
          response.data.rates.MKD < rates.MacedonianDenar_Currency_MKD_Low
            ? response.data.rates.MKD
            : rates.MacedonianDenar_Currency_MKD_Low,
        MacedonianDenar_Currency_MKD_High:
          response.data.rates.MKD > rates.MacedonianDenar_Currency_MKD_High
            ? response.data.rates.MKD
            : rates.MacedonianDenar_Currency_MKD_High,
        MyanmarKyat_Currency_MMK: response.data.rates.MMK,
        MyanmarKyat_Currency_MMK_Low:
          response.data.rates.MMK < rates.MyanmarKyat_Currency_MMK_Low
            ? response.data.rates.MMK
            : rates.MyanmarKyat_Currency_MMK_Low,
        MyanmarKyat_Currency_MMK_High:
          response.data.rates.MMK > rates.MyanmarKyat_Currency_MMK_High
            ? response.data.rates.MMK
            : rates.MyanmarKyat_Currency_MMK_High,
        MongolianTugrik_Currency_MNT: response.data.rates.MNT,
        MongolianTugrik_Currency_MNT_Low:
          response.data.rates.MNT < rates.MongolianTugrik_Currency_MNT_Low
            ? response.data.rates.MNT
            : rates.MongolianTugrik_Currency_MNT_Low,
        MongolianTugrik_Currency_MNT_High:
          response.data.rates.MNT > rates.MongolianTugrik_Currency_MNT_High
            ? response.data.rates.MNT
            : rates.MongolianTugrik_Currency_MNT_High,
        MacanesePataca_Currency_MOP: response.data.rates.MOP,
        MacanesePataca_Currency_MOP_Low:
          response.data.rates.MOP < rates.MacanesePataca_Currency_MOP_Low
            ? response.data.rates.MOP
            : rates.MacanesePataca_Currency_MOP_Low,
        MacanesePataca_Currency_MOP_High:
          response.data.rates.MOP > rates.MacanesePataca_Currency_MOP_High
            ? response.data.rates.MOP
            : rates.MacanesePataca_Currency_MOP_High,
        MauritanianOuguiya_Currency_MRO: response.data.rates.MRO,
        MauritanianOuguiya_Currency_MRO_Low:
          response.data.rates.MRO < rates.MauritanianOuguiya_Currency_MRO_Low
            ? response.data.rates.MRO
            : rates.MauritanianOuguiya_Currency_MRO_Low,
        MauritanianOuguiya_Currency_MRO_High:
          response.data.rates.MRO > rates.MauritanianOuguiya_Currency_MRO_High
            ? response.data.rates.MRO
            : rates.MauritanianOuguiya_Currency_MRO_High,
        MauritianRupee_Currency_MUR: response.data.rates.MUR,
        MauritianRupee_Currency_MUR_Low:
          response.data.rates.MUR < rates.MauritianRupee_Currency_MUR_Low
            ? response.data.rates.MUR
            : rates.MauritianRupee_Currency_MUR_Low,
        MauritianRupee_Currency_MUR_High:
          response.data.rates.MUR > rates.MauritianRupee_Currency_MUR_High
            ? response.data.rates.MUR
            : rates.MauritianRupee_Currency_MUR_High,
        MaldivianRufiyaa_Currency_MVR: response.data.rates.MVR,
        MaldivianRufiyaa_Currency_MVR_Low:
          response.data.rates.MVR < rates.MaldivianRufiyaa_Currency_MVR_Low
            ? response.data.rates.MVR
            : rates.MaldivianRufiyaa_Currency_MVR_Low,
        MaldivianRufiyaa_Currency_MVR_High:
          response.data.rates.MVR > rates.MaldivianRufiyaa_Currency_MVR_High
            ? response.data.rates.MVR
            : rates.MaldivianRufiyaa_Currency_MVR_High,
        MalawianKwacha_Currency_MWK: response.data.rates.MWK,
        MalawianKwacha_Currency_MWK_Low:
          response.data.rates.MWK < rates.MalawianKwacha_Currency_MWK_Low
            ? response.data.rates.MWK
            : rates.MalawianKwacha_Currency_MWK_Low,
        MalawianKwacha_Currency_MWK_High:
          response.data.rates.MWK > rates.MalawianKwacha_Currency_MWK_High
            ? response.data.rates.MWK
            : rates.MalawianKwacha_Currency_MWK_High,
        MexicanPeso_Currency_MXN: response.data.rates.MXN,
        MexicanPeso_Currency_MXN_Low:
          response.data.rates.MXN < rates.MexicanPeso_Currency_MXN_Low
            ? response.data.rates.MXN
            : rates.MexicanPeso_Currency_MXN_Low,
        MexicanPeso_Currency_MXN_High:
          response.data.rates.MXN > rates.MexicanPeso_Currency_MXN_High
            ? response.data.rates.MXN
            : rates.MexicanPeso_Currency_MXN_High,
        MalaysianRinggit_Currency_MYR: response.data.rates.MYR,
        MalaysianRinggit_Currency_MYR_Low:
          response.data.rates.MYR < rates.MalaysianRinggit_Currency_MYR_Low
            ? response.data.rates.MYR
            : rates.MalaysianRinggit_Currency_MYR_Low,
        MalaysianRinggit_Currency_MYR_High:
          response.data.rates.MYR > rates.MalaysianRinggit_Currency_MYR_High
            ? response.data.rates.MYR
            : rates.MalaysianRinggit_Currency_MYR_High,
        MozambicanMetical_Currency_MZN: response.data.rates.MZN,
        MozambicanMetical_Currency_MZN_Low:
          response.data.rates.MZN < rates.MozambicanMetical_Currency_MZN_Low
            ? response.data.rates.MZN
            : rates.MozambicanMetical_Currency_MZN_Low,
        MozambicanMetical_Currency_MZN_High:
          response.data.rates.MZN > rates.MozambicanMetical_Currency_MZN_High
            ? response.data.rates.MZN
            : rates.MozambicanMetical_Currency_MZN_High,
        NamibianDollar_Currency_NAD: response.data.rates.NAD,
        NamibianDollar_Currency_NAD_Low:
          response.data.rates.NAD < rates.NamibianDollar_Currency_NAD_Low
            ? response.data.rates.NAD
            : rates.NamibianDollar_Currency_NAD_Low,
        NamibianDollar_Currency_NAD_High:
          response.data.rates.NAD > rates.NamibianDollar_Currency_NAD_High
            ? response.data.rates.NAD
            : rates.NamibianDollar_Currency_NAD_High,
        NigerianNaira_Currency_NGN: response.data.rates.NGN,
        NigerianNaira_Currency_NGN_Low:
          response.data.rates.NGN < rates.NigerianNaira_Currency_NGN_Low
            ? response.data.rates.NGN
            : rates.NigerianNaira_Currency_NGN_Low,
        NigerianNaira_Currency_NGN_High:
          response.data.rates.NGN > rates.NigerianNaira_Currency_NGN_High
            ? response.data.rates.NGN
            : rates.NigerianNaira_Currency_NGN_High,
        NicaraguanCordoba_Currency_NIO: response.data.rates.NIO,
        NicaraguanCordoba_Currency_NIO_Low:
          response.data.rates.NIO < rates.NicaraguanCordoba_Currency_NIO_Low
            ? response.data.rates.NIO
            : rates.NicaraguanCordoba_Currency_NIO_Low,
        NicaraguanCordoba_Currency_NIO_High:
          response.data.rates.NIO > rates.NicaraguanCordoba_Currency_NIO_High
            ? response.data.rates.NIO
            : rates.NicaraguanCordoba_Currency_NIO_High,
        NorwegianKrone_Currency_NOK: response.data.rates.NOK,
        NorwegianKrone_Currency_NOK_Low:
          response.data.rates.NOK < rates.NorwegianKrone_Currency_NOK_Low
            ? response.data.rates.NOK
            : rates.NorwegianKrone_Currency_NOK_Low,
        NorwegianKrone_Currency_NOK_High:
          response.data.rates.NOK > rates.NorwegianKrone_Currency_NOK_High
            ? response.data.rates.NOK
            : rates.NorwegianKrone_Currency_NOK_High,
        NepaleseRupee_Currency_NPR: response.data.rates.NPR,
        NepaleseRupee_Currency_NPR_Low:
          response.data.rates.NPR < rates.NepaleseRupee_Currency_NPR_Low
            ? response.data.rates.NPR
            : rates.NepaleseRupee_Currency_NPR_Low,
        NepaleseRupee_Currency_NPR_High:
          response.data.rates.NPR > rates.NepaleseRupee_Currency_NPR_High
            ? response.data.rates.NPR
            : rates.NepaleseRupee_Currency_NPR_High,
        NewZealandDollar_Currency_NZD: response.data.rates.NZD,
        NewZealandDollar_Currency_NZD_Low:
          response.data.rates.NZD < rates.NewZealandDollar_Currency_NZD_Low
            ? response.data.rates.NZD
            : rates.NewZealandDollar_Currency_NZD_Low,
        NewZealandDollar_Currency_NZD_High:
          response.data.rates.NZD > rates.NewZealandDollar_Currency_NZD_High
            ? response.data.rates.NZD
            : rates.NewZealandDollar_Currency_NZD_High,
        OmaniRial_Currency_OMR: response.data.rates.OMR,
        OmaniRial_Currency_OMR_Low:
          response.data.rates.OMR < rates.OmaniRial_Currency_OMR_Low
            ? response.data.rates.OMR
            : rates.OmaniRial_Currency_OMR_Low,
        OmaniRial_Currency_OMR_High:
          response.data.rates.OMR > rates.OmaniRial_Currency_OMR_High
            ? response.data.rates.OMR
            : rates.OmaniRial_Currency_OMR_High,
        PanamanianBalboa_Currency_PAB: response.data.rates.PAB,
        PanamanianBalboa_Currency_PAB_Low:
          response.data.rates.PAB < rates.PanamanianBalboa_Currency_PAB_Low
            ? response.data.rates.PAB
            : rates.PanamanianBalboa_Currency_PAB_Low,
        PanamanianBalboa_Currency_PAB_High:
          response.data.rates.PAB > rates.PanamanianBalboa_Currency_PAB_High
            ? response.data.rates.PAB
            : rates.PanamanianBalboa_Currency_PAB_High,
        PeruvianSol_Currency_PEN: response.data.rates.PEN,
        PeruvianSol_Currency_PEN_Low:
          response.data.rates.PEN < rates.PeruvianSol_Currency_PEN_Low
            ? response.data.rates.PEN
            : rates.PeruvianSol_Currency_PEN_Low,
        PeruvianSol_Currency_PEN_High:
          response.data.rates.PEN > rates.PeruvianSol_Currency_PEN_High
            ? response.data.rates.PEN
            : rates.PeruvianSol_Currency_PEN_High,
        PhilippinePeso_Currency_PHP: response.data.rates.PHP,
        PhilippinePeso_Currency_PHP_Low:
          response.data.rates.PHP < rates.PhilippinePeso_Currency_PHP_Low
            ? response.data.rates.PHP
            : rates.PhilippinePeso_Currency_PHP_Low,
        PhilippinePeso_Currency_PHP_High:
          response.data.rates.PHP > rates.PhilippinePeso_Currency_PHP_High
            ? response.data.rates.PHP
            : rates.PhilippinePeso_Currency_PHP_High,
        PakistaniRupee_Currency_PKR: response.data.rates.PKR,
        PakistaniRupee_Currency_PKR_Low:
          response.data.rates.PKR < rates.PakistaniRupee_Currency_PKR_Low
            ? response.data.rates.PKR
            : rates.PakistaniRupee_Currency_PKR_Low,
        PakistaniRupee_Currency_PKR_High:
          response.data.rates.PKR > rates.PakistaniRupee_Currency_PKR_High
            ? response.data.rates.PKR
            : rates.PakistaniRupee_Currency_PKR_High,
        PolishZloty_Currency_PLN: response.data.rates.PLN,
        PolishZloty_Currency_PLN_Low:
          response.data.rates.PLN < rates.PolishZloty_Currency_PLN_Low
            ? response.data.rates.PLN
            : rates.PolishZloty_Currency_PLN_Low,
        PolishZloty_Currency_PLN_High:
          response.data.rates.PLN > rates.PolishZloty_Currency_PLN_High
            ? response.data.rates.PLN
            : rates.PolishZloty_Currency_PLN_High,
        ParaguayanGuarani_Currency_PYG: response.data.rates.PYG,
        ParaguayanGuarani_Currency_PYG_Low:
          response.data.rates.PYG < rates.ParaguayanGuarani_Currency_PYG_Low
            ? response.data.rates.PYG
            : rates.ParaguayanGuarani_Currency_PYG_Low,
        ParaguayanGuarani_Currency_PYG_High:
          response.data.rates.PYG > rates.ParaguayanGuarani_Currency_PYG_High
            ? response.data.rates.PYG
            : rates.ParaguayanGuarani_Currency_PYG_High,
        QatariRiyal_Currency_QAR: response.data.rates.QAR,
        QatariRiyal_Currency_QAR_Low:
          response.data.rates.QAR < rates.QatariRiyal_Currency_QAR_Low
            ? response.data.rates.QAR
            : rates.QatariRiyal_Currency_QAR_Low,
        QatariRiyal_Currency_QAR_High:
          response.data.rates.QAR > rates.QatariRiyal_Currency_QAR_High
            ? response.data.rates.QAR
            : rates.QatariRiyal_Currency_QAR_High,
        RomanianLeu_Currency_RON: response.data.rates.RON,
        RomanianLeu_Currency_RON_Low:
          response.data.rates.RON < rates.RomanianLeu_Currency_RON_Low
            ? response.data.rates.RON
            : rates.RomanianLeu_Currency_RON_Low,
        RomanianLeu_Currency_RON_High:
          response.data.rates.RON > rates.RomanianLeu_Currency_RON_High
            ? response.data.rates.RON
            : rates.RomanianLeu_Currency_RON_High,
        SerbianDinar_Currency_RSD: response.data.rates.RSD,
        SerbianDinar_Currency_RSD_Low:
          response.data.rates.RSD < rates.SerbianDinar_Currency_RSD_Low
            ? response.data.rates.RSD
            : rates.SerbianDinar_Currency_RSD_Low,
        SerbianDinar_Currency_RSD_High:
          response.data.rates.RSD > rates.SerbianDinar_Currency_RSD_High
            ? response.data.rates.RSD
            : rates.SerbianDinar_Currency_RSD_High,
        RussianRuble_Currency_RUB: response.data.rates.RUB,
        RussianRuble_Currency_RUB_Low:
          response.data.rates.RUB < rates.RussianRuble_Currency_RUB_Low
            ? response.data.rates.RUB
            : rates.RussianRuble_Currency_RUB_Low,
        RussianRuble_Currency_RUB_High:
          response.data.rates.RUB > rates.RussianRuble_Currency_RUB_High
            ? response.data.rates.RUB
            : rates.RussianRuble_Currency_RUB_High,
        RwandanFranc_Currency_RWF: response.data.rates.RWF,
        RwandanFranc_Currency_RWF_Low:
          response.data.rates.RWF < rates.RwandanFranc_Currency_RWF_Low
            ? response.data.rates.RWF
            : rates.RwandanFranc_Currency_RWF_Low,
        RwandanFranc_Currency_RWF_High:
          response.data.rates.RWF > rates.RwandanFranc_Currency_RWF_High
            ? response.data.rates.RWF
            : rates.RwandanFranc_Currency_RWF_High,
        SaudiArabianRiyal_Currency_SAR: response.data.rates.SAR,
        SaudiArabianRiyal_Currency_SAR_Low:
          response.data.rates.SAR < rates.SaudiArabianRiyal_Currency_SAR_Low
            ? response.data.rates.SAR
            : rates.SaudiArabianRiyal_Currency_SAR_Low,
        SaudiArabianRiyal_Currency_SAR_High:
          response.data.rates.SAR > rates.SaudiArabianRiyal_Currency_SAR_High
            ? response.data.rates.SAR
            : rates.SaudiArabianRiyal_Currency_SAR_High,
        SeychelloisRupee_Currency_SCR: response.data.rates.SCR,
        SeychelloisRupee_Currency_SCR_Low:
          response.data.rates.SCR < rates.SeychelloisRupee_Currency_SCR_Low
            ? response.data.rates.SCR
            : rates.SeychelloisRupee_Currency_SCR_Low,
        SeychelloisRupee_Currency_SCR_High:
          response.data.rates.SCR > rates.SeychelloisRupee_Currency_SCR_High
            ? response.data.rates.SCR
            : rates.SeychelloisRupee_Currency_SCR_High,
        SudanesePound_Currency_SDG: response.data.rates.SDG,
        SudanesePound_Currency_SDG_Low:
          response.data.rates.SDG < rates.SudanesePound_Currency_SDG_Low
            ? response.data.rates.SDG
            : rates.SudanesePound_Currency_SDG_Low,
        SudanesePound_Currency_SDG_High:
          response.data.rates.SDG > rates.SudanesePound_Currency_SDG_High
            ? response.data.rates.SDG
            : rates.SudanesePound_Currency_SDG_High,
        SwedishKrona_Currency_SEK: response.data.rates.SEK,
        SwedishKrona_Currency_SEK_Low:
          response.data.rates.SEK < rates.SwedishKrona_Currency_SEK_Low
            ? response.data.rates.SEK
            : rates.SwedishKrona_Currency_SEK_Low,
        SwedishKrona_Currency_SEK_High:
          response.data.rates.SEK > rates.SwedishKrona_Currency_SEK_High
            ? response.data.rates.SEK
            : rates.SwedishKrona_Currency_SEK_High,
        SingaporeDollar_Currency_SGD: response.data.rates.SGD,
        SingaporeDollar_Currency_SGD_Low:
          response.data.rates.SGD < rates.SingaporeDollar_Currency_SGD_Low
            ? response.data.rates.SGD
            : rates.SingaporeDollar_Currency_SGD_Low,
        SingaporeDollar_Currency_SGD_High:
          response.data.rates.SGD > rates.SingaporeDollar_Currency_SGD_High
            ? response.data.rates.SGD
            : rates.SingaporeDollar_Currency_SGD_High,
        SierraLeoneanLeone_Currency_SLL: response.data.rates.SLL,
        SierraLeoneanLeone_Currency_SLL_Low:
          response.data.rates.SLL < rates.SierraLeoneanLeone_Currency_SLL_Low
            ? response.data.rates.SLL
            : rates.SierraLeoneanLeone_Currency_SLL_Low,
        SierraLeoneanLeone_Currency_SLL_High:
          response.data.rates.SLL > rates.SierraLeoneanLeone_Currency_SLL_High
            ? response.data.rates.SLL
            : rates.SierraLeoneanLeone_Currency_SLL_High,
        SomaliShilling_Currency_SOS: response.data.rates.SOS,
        SomaliShilling_Currency_SOS_Low:
          response.data.rates.SOS < rates.SomaliShilling_Currency_SOS_Low
            ? response.data.rates.SOS
            : rates.SomaliShilling_Currency_SOS_Low,
        SomaliShilling_Currency_SOS_High:
          response.data.rates.SOS > rates.SomaliShilling_Currency_SOS_High
            ? response.data.rates.SOS
            : rates.SomaliShilling_Currency_SOS_High,
        SurinameseDollar_Currency_SRD: response.data.rates.SRD,
        SurinameseDollar_Currency_SRD_Low:
          response.data.rates.SRD < rates.SurinameseDollar_Currency_SRD_Low
            ? response.data.rates.SRD
            : rates.SurinameseDollar_Currency_SRD_Low,
        SurinameseDollar_Currency_SRD_High:
          response.data.rates.SRD > rates.SurinameseDollar_Currency_SRD_High
            ? response.data.rates.SRD
            : rates.SurinameseDollar_Currency_SRD_High,
        SaoTomeAndPrincipeDobra_Currency_STN: response.data.rates.STN,
        SaoTomeAndPrincipeDobra_Currency_STN_Low:
          response.data.rates.STN <
          rates.SaoTomeAndPrincipeDobra_Currency_STN_Low
            ? response.data.rates.STN
            : rates.SaoTomeAndPrincipeDobra_Currency_STN_Low,
        SaoTomeAndPrincipeDobra_Currency_STN_High:
          response.data.rates.STN >
          rates.SaoTomeAndPrincipeDobra_Currency_STN_High
            ? response.data.rates.STN
            : rates.SaoTomeAndPrincipeDobra_Currency_STN_High,
        SalvadoranColón_Currency_SVC: response.data.rates.SVC,
        SalvadoranColón_Currency_SVC_Low:
          response.data.rates.SVC < rates.SalvadoranColón_Currency_SVC_Low
            ? response.data.rates.SVC
            : rates.SalvadoranColón_Currency_SVC_Low,
        SalvadoranColón_Currency_SVC_High:
          response.data.rates.SVC > rates.SalvadoranColón_Currency_SVC_High
            ? response.data.rates.SVC
            : rates.SalvadoranColón_Currency_SVC_High,
        SwaziLilangeni_Currency_SZL: response.data.rates.SZL,
        SwaziLilangeni_Currency_SZL_Low:
          response.data.rates.SZL < rates.SwaziLilangeni_Currency_SZL_Low
            ? response.data.rates.SZL
            : rates.SwaziLilangeni_Currency_SZL_Low,
        SwaziLilangeni_Currency_SZL_High:
          response.data.rates.SZL > rates.SwaziLilangeni_Currency_SZL_High
            ? response.data.rates.SZL
            : rates.SwaziLilangeni_Currency_SZL_High,
        ThaiBaht_Currency_THB: response.data.rates.THB,
        ThaiBaht_Currency_THB_Low:
          response.data.rates.THB < rates.ThaiBaht_Currency_THB_Low
            ? response.data.rates.THB
            : rates.ThaiBaht_Currency_THB_Low,
        ThaiBaht_Currency_THB_High:
          response.data.rates.THB > rates.ThaiBaht_Currency_THB_High
            ? response.data.rates.THB
            : rates.ThaiBaht_Currency_THB_High,
        TajikistaniSomoni_Currency_TJS: response.data.rates.TJS,
        TajikistaniSomoni_Currency_TJS_Low:
          response.data.rates.TJS < rates.TajikistaniSomoni_Currency_TJS_Low
            ? response.data.rates.TJS
            : rates.TajikistaniSomoni_Currency_TJS_Low,
        TajikistaniSomoni_Currency_TJS_High:
          response.data.rates.TJS > rates.TajikistaniSomoni_Currency_TJS_High
            ? response.data.rates.TJS
            : rates.TajikistaniSomoni_Currency_TJS_High,
        TurkmenManat_Currency_TMT: response.data.rates.TMT,
        TurkmenManat_Currency_TMT_Low:
          response.data.rates.TMT < rates.TurkmenManat_Currency_TMT_Low
            ? response.data.rates.TMT
            : rates.TurkmenManat_Currency_TMT_Low,
        TurkmenManat_Currency_TMT_High:
          response.data.rates.TMT > rates.TurkmenManat_Currency_TMT_High
            ? response.data.rates.TMT
            : rates.TurkmenManat_Currency_TMT_High,
        TunisianDinar_Currency_TND: response.data.rates.TND,
        TunisianDinar_Currency_TND_Low:
          response.data.rates.TND < rates.TunisianDinar_Currency_TND_Low
            ? response.data.rates.TND
            : rates.TunisianDinar_Currency_TND_Low,
        TunisianDinar_Currency_TND_High:
          response.data.rates.TND > rates.TunisianDinar_Currency_TND_High
            ? response.data.rates.TND
            : rates.TunisianDinar_Currency_TND_High,
        TonganPaanga_Currency_TOP: response.data.rates.TOP,
        TonganPaanga_Currency_TOP_Low:
          response.data.rates.TOP < rates.TonganPaanga_Currency_TOP_Low
            ? response.data.rates.TOP
            : rates.TonganPaanga_Currency_TOP_Low,
        TonganPaanga_Currency_TOP_High:
          response.data.rates.TOP > rates.TonganPaanga_Currency_TOP_High
            ? response.data.rates.TOP
            : rates.TonganPaanga_Currency_TOP_High,
        TurkishLira_Currency_TRY: response.data.rates.TRY,
        TurkishLira_Currency_TRY_Low:
          response.data.rates.TRY < rates.TurkishLira_Currency_TRY_Low
            ? response.data.rates.TRY
            : rates.TurkishLira_Currency_TRY_Low,
        TurkishLira_Currency_TRY_High:
          response.data.rates.TRY > rates.TurkishLira_Currency_TRY_High
            ? response.data.rates.TRY
            : rates.TurkishLira_Currency_TRY_High,
        TrinidadAndTobagoDollar_Currency_TTD: response.data.rates.TTD,
        TrinidadAndTobagoDollar_Currency_TTD_Low:
          response.data.rates.TTD <
          rates.TrinidadAndTobagoDollar_Currency_TTD_Low
            ? response.data.rates.TTD
            : rates.TrinidadAndTobagoDollar_Currency_TTD_Low,
        TrinidadAndTobagoDollar_Currency_TTD_High:
          response.data.rates.TTD >
          rates.TrinidadAndTobagoDollar_Currency_TTD_High
            ? response.data.rates.TTD
            : rates.TrinidadAndTobagoDollar_Currency_TTD_High,
        NewTaiwanDollar_Currency_TWD: response.data.rates.TWD,
        NewTaiwanDollar_Currency_TWD_Low:
          response.data.rates.TWD < rates.NewTaiwanDollar_Currency_TWD_Low
            ? response.data.rates.TWD
            : rates.NewTaiwanDollar_Currency_TWD_Low,
        NewTaiwanDollar_Currency_TWD_High:
          response.data.rates.TWD > rates.NewTaiwanDollar_Currency_TWD_High
            ? response.data.rates.TWD
            : rates.NewTaiwanDollar_Currency_TWD_High,
        TanzanianShilling_Currency_TZS: response.data.rates.TZS,
        TanzanianShilling_Currency_TZS_Low:
          response.data.rates.TZS < rates.TanzanianShilling_Currency_TZS_Low
            ? response.data.rates.TZS
            : rates.TanzanianShilling_Currency_TZS_Low,
        TanzanianShilling_Currency_TZS_High:
          response.data.rates.TZS > rates.TanzanianShilling_Currency_TZS_High
            ? response.data.rates.TZS
            : rates.TanzanianShilling_Currency_TZS_High,
        UkrainianHryvnia_Currency_UAH: response.data.rates.UAH,
        UkrainianHryvnia_Currency_UAH_Low:
          response.data.rates.UAH < rates.UkrainianHryvnia_Currency_UAH_Low
            ? response.data.rates.UAH
            : rates.UkrainianHryvnia_Currency_UAH_Low,
        UkrainianHryvnia_Currency_UAH_High:
          response.data.rates.UAH > rates.UkrainianHryvnia_Currency_UAH_High
            ? response.data.rates.UAH
            : rates.UkrainianHryvnia_Currency_UAH_High,
        UgandanShilling_Currency_UGX: response.data.rates.UGX,
        UgandanShilling_Currency_UGX_Low:
          response.data.rates.UGX < rates.UgandanShilling_Currency_UGX_Low
            ? response.data.rates.UGX
            : rates.UgandanShilling_Currency_UGX_Low,
        UgandanShilling_Currency_UGX_High:
          response.data.rates.UGX > rates.UgandanShilling_Currency_UGX_High
            ? response.data.rates.UGX
            : rates.UgandanShilling_Currency_UGX_High,
        UruguayanPeso_Currency_UYU: response.data.rates.UYU,
        UruguayanPeso_Currency_UYU_Low:
          response.data.rates.UYU < rates.UruguayanPeso_Currency_UYU_Low
            ? response.data.rates.UYU
            : rates.UruguayanPeso_Currency_UYU_Low,
        UruguayanPeso_Currency_UYU_High:
          response.data.rates.UYU > rates.UruguayanPeso_Currency_UYU_High
            ? response.data.rates.UYU
            : rates.UruguayanPeso_Currency_UYU_High,
        UzbekistaniSom_Currency_UZS: response.data.rates.UZS,
        UzbekistaniSom_Currency_UZS_Low:
          response.data.rates.UZS < rates.UzbekistaniSom_Currency_UZS_Low
            ? response.data.rates.UZS
            : rates.UzbekistaniSom_Currency_UZS_Low,
        UzbekistaniSom_Currency_UZS_High:
          response.data.rates.UZS > rates.UzbekistaniSom_Currency_UZS_High
            ? response.data.rates.UZS
            : rates.UzbekistaniSom_Currency_UZS_High,
        VenezuelanBolivar_Currency_VES: response.data.rates.VES,
        VenezuelanBolivar_Currency_VES_Low:
          response.data.rates.VES < rates.VenezuelanBolivar_Currency_VES_Low
            ? response.data.rates.VES
            : rates.VenezuelanBolivar_Currency_VES_Low,
        VenezuelanBolivar_Currency_VES_High:
          response.data.rates.VES > rates.VenezuelanBolivar_Currency_VES_High
            ? response.data.rates.VES
            : rates.VenezuelanBolivar_Currency_VES_High,
        VietnameseDong_Currency_VND: response.data.rates.VND,
        VietnameseDong_Currency_VND_Low:
          response.data.rates.VND < rates.VietnameseDong_Currency_VND_Low
            ? response.data.rates.VND
            : rates.VietnameseDong_Currency_VND_Low,
        VietnameseDong_Currency_VND_High:
          response.data.rates.VND > rates.VietnameseDong_Currency_VND_High
            ? response.data.rates.VND
            : rates.VietnameseDong_Currency_VND_High,
        VanuatuVatu_Currency_VUV: response.data.rates.VUV,
        VanuatuVatu_Currency_VUV_Low:
          response.data.rates.VUV < rates.VanuatuVatu_Currency_VUV_Low
            ? response.data.rates.VUV
            : rates.VanuatuVatu_Currency_VUV_Low,
        VanuatuVatu_Currency_VUV_High:
          response.data.rates.VUV > rates.VanuatuVatu_Currency_VUV_High
            ? response.data.rates.VUV
            : rates.VanuatuVatu_Currency_VUV_High,
        CentralAfricanCFAFranc_Currency_XAF: response.data.rates.XAF,
        CentralAfricanCFAFranc_Currency_XAF_Low:
          response.data.rates.XAF <
          rates.CentralAfricanCFAFranc_Currency_XAF_Low
            ? response.data.rates.XAF
            : rates.CentralAfricanCFAFranc_Currency_XAF_Low,
        CentralAfricanCFAFranc_Currency_XAF_High:
          response.data.rates.XAF >
          rates.CentralAfricanCFAFranc_Currency_XAF_High
            ? response.data.rates.XAF
            : rates.CentralAfricanCFAFranc_Currency_XAF_High,
        EastCaribbeanDollar_Currency_XCD: response.data.rates.XCD,
        EastCaribbeanDollar_Currency_XCD_Low:
          response.data.rates.XCD < rates.EastCaribbeanDollar_Currency_XCD_Low
            ? response.data.rates.XCD
            : rates.EastCaribbeanDollar_Currency_XCD_Low,
        EastCaribbeanDollar_Currency_XCD_High:
          response.data.rates.XCD > rates.EastCaribbeanDollar_Currency_XCD_High
            ? response.data.rates.XCD
            : rates.EastCaribbeanDollar_Currency_XCD_High,
        WestAfricanCFAFranc_Currency_XOF: response.data.rates.XOF,
        WestAfricanCFAFranc_Currency_XOF_Low:
          response.data.rates.XOF < rates.WestAfricanCFAFranc_Currency_XOF_Low
            ? response.data.rates.XOF
            : rates.WestAfricanCFAFranc_Currency_XOF_Low,
        WestAfricanCFAFranc_Currency_XOF_High:
          response.data.rates.XOF > rates.WestAfricanCFAFranc_Currency_XOF_High
            ? response.data.rates.XOF
            : rates.WestAfricanCFAFranc_Currency_XOF_High,
        CFPFranc_Currency_XPF: response.data.rates.XPF,
        CFPFranc_Currency_XPF_Low:
          response.data.rates.XPF < rates.CFPFranc_Currency_XPF_Low
            ? response.data.rates.XPF
            : rates.CFPFranc_Currency_XPF_Low,
        CFPFranc_Currency_XPF_High:
          response.data.rates.XPF > rates.CFPFranc_Currency_XPF_High
            ? response.data.rates.XPF
            : rates.CFPFranc_Currency_XPF_High,
        YemeniRial_Currency_YER: response.data.rates.YER,
        YemeniRial_Currency_YER_Low:
          response.data.rates.YER < rates.YemeniRial_Currency_YER_Low
            ? response.data.rates.YER
            : rates.YemeniRial_Currency_YER_Low,
        YemeniRial_Currency_YER_High:
          response.data.rates.YER > rates.YemeniRial_Currency_YER_High
            ? response.data.rates.YER
            : rates.YemeniRial_Currency_YER_High,
        SouthAfricanRand_Currency_ZAR: response.data.rates.ZAR,
        SouthAfricanRand_Currency_ZAR_Low:
          response.data.rates.ZAR < rates.SouthAfricanRand_Currency_ZAR_Low
            ? response.data.rates.ZAR
            : rates.SouthAfricanRand_Currency_ZAR_Low,
        SouthAfricanRand_Currency_ZAR_High:
          response.data.rates.ZAR > rates.SouthAfricanRand_Currency_ZAR_High
            ? response.data.rates.ZAR
            : rates.SouthAfricanRand_Currency_ZAR_High,
        ZambianKwacha_pre2013_Currency_ZMK: response.data.rates.ZMK,
        ZambianKwacha_pre2013_Currency_ZMK_Low:
          response.data.rates.ZMK < rates.ZambianKwacha_pre2013_Currency_ZMK_Low
            ? response.data.rates.ZMK
            : rates.ZambianKwacha_pre2013_Currency_ZMK_Low,
        ZambianKwacha_pre2013_Currency_ZMK_High:
          response.data.rates.ZMK >
          rates.ZambianKwacha_pre2013_Currency_ZMK_High
            ? response.data.rates.ZMK
            : rates.ZambianKwacha_pre2013_Currency_ZMK_High,
        ZambianKwacha_Currency_ZMW: response.data.rates.ZMW,
        ZambianKwacha_Currency_ZMW_Low:
          response.data.rates.ZMW < rates.ZambianKwacha_Currency_ZMW_Low
            ? response.data.rates.ZMW
            : rates.ZambianKwacha_Currency_ZMW_Low,
        ZambianKwacha_Currency_ZMW_High:
          response.data.rates.ZMW > rates.ZambianKwacha_Currency_ZMW_High
            ? response.data.rates.ZMW
            : rates.ZambianKwacha_Currency_ZMW_High,
        Silver_Metals_XAG: response.data.rates.XAG,
        Silver_Metals_XAG_Low:
          response.data.rates.XAG < rates.Silver_Metals_XAG_Low
            ? response.data.rates.XAG
            : rates.Silver_Metals_XAG_Low,
        Silver_Metals_XAG_High:
          response.data.rates.XAG > rates.Silver_Metals_XAG_High
            ? response.data.rates.XAG
            : rates.Silver_Metals_XAG_High,
        Silver_Ask_Metals_XAG: response.data.rates["XAG-ASK"],
        Silver_Ask_Metals_XAG_Low:
          response.data.rates["XAG-ASK"] < rates.Silver_Ask_Metals_XAG_Low
            ? response.data.rates["XAG-ASK"]
            : rates.Silver_Ask_Metals_XAG_Low,
        Silver_Ask_Metals_XAG_High:
          response.data.rates["XAG-ASK"] > rates.Silver_Ask_Metals_XAG_High
            ? response.data.rates["XAG-ASK"]
            : rates.Silver_Ask_Metals_XAG_High,
        Silver_Bid_Metals_XAG: response.data.rates["XAG-BID"],
        Silver_Bid_Metals_XAG_Low:
          response.data.rates["XAG-BID"] < rates.Silver_Bid_Metals_XAG_Low
            ? response.data.rates["XAG-BID"]
            : rates.Silver_Bid_Metals_XAG_Low,
        Silver_Bid_Metals_XAG_High:
          response.data.rates["XAG-BID"] > rates.Silver_Bid_Metals_XAG_High
            ? response.data.rates["XAG-BID"]
            : rates.Silver_Bid_Metals_XAG_High,
        Gold_Metals_XAU: response.data.rates.XAU,
        Gold_Metals_XAU_Low:
          response.data.rates.XAU < rates.Gold_Metals_XAU_Low
            ? response.data.rates.XAU
            : rates.Gold_Metals_XAU_Low,
        Gold_Metals_XAU_High:
          response.data.rates.XAU > rates.Gold_Metals_XAU_High
            ? response.data.rates.XAU
            : rates.Gold_Metals_XAU_High,
        Gold_Ask_Metals_XAU: response.data.rates["XAU-ASK"],
        Gold_Ask_Metals_XAU_Low:
          response.data.rates["XAU-ASK"] < rates.Gold_Ask_Metals_XAU_Low
            ? response.data.rates["XAU-ASK"]
            : rates.Gold_Ask_Metals_XAU_Low,
        Gold_Ask_Metals_XAU_High:
          response.data.rates["XAU-ASK"] > rates.Gold_Ask_Metals_XAU_High
            ? response.data.rates["XAU-ASK"]
            : rates.Gold_Ask_Metals_XAU_High,
        Gold_Bid_Metals_XAU: response.data.rates["XAU-BID"],
        Gold_Bid_Metals_XAU_Low:
          response.data.rates["XAU-BID"] < rates.Gold_Bid_Metals_XAU_Low
            ? response.data.rates["XAU-BID"]
            : rates.Gold_Bid_Metals_XAU_Low,
        Gold_Bid_Metals_XAU_High:
          response.data.rates["XAU-BID"] > rates.Gold_Bid_Metals_XAU_High
            ? response.data.rates["XAU-BID"]
            : rates.Gold_Bid_Metals_XAU_High,
        Palladium_Metals_XPD: response.data.rates.XPD,
        Palladium_Metals_XPD_Low:
          response.data.rates.XPD < rates.Palladium_Metals_XPD_Low
            ? response.data.rates.XPD
            : rates.Palladium_Metals_XPD_Low,
        Palladium_Metals_XPD_High:
          response.data.rates.XPD > rates.Palladium_Metals_XPD_High
            ? response.data.rates.XPD
            : rates.Palladium_Metals_XPD_High,
        Palladium_Ask_Metals_XPD: response.data.rates["XPD-ASK"],
        Palladium_Ask_Metals_XPD_Low:
          response.data.rates["XPD-ASK"] < rates.Palladium_Ask_Metals_XPD_Low
            ? response.data.rates["XPD-ASK"]
            : rates.Palladium_Ask_Metals_XPD_Low,
        Palladium_Ask_Metals_XPD_High:
          response.data.rates["XPD-ASK"] > rates.Palladium_Ask_Metals_XPD_High
            ? response.data.rates["XPD-ASK"]
            : rates.Palladium_Ask_Metals_XPD_High,
        Palladium_Bid_Metals_XPD: response.data.rates["XPD-BID"],
        Palladium_Bid_Metals_XPD_Low:
          response.data.rates["XPD-BID"] < rates.Palladium_Bid_Metals_XPD_Low
            ? response.data.rates["XPD-BID"]
            : rates.Palladium_Bid_Metals_XPD_Low,
        Palladium_Bid_Metals_XPD_High:
          response.data.rates["XPD-BID"] > rates.Palladium_Bid_Metals_XPD_High
            ? response.data.rates["XPD-BID"]
            : rates.Palladium_Bid_Metals_XPD_High,
        Platinum_Metals_XPT: response.data.rates.XPT,
        Platinum_Metals_XPT_Low:
          response.data.rates.XPT < rates.Platinum_Metals_XPT_Low
            ? response.data.rates.XPT
            : rates.Platinum_Metals_XPT_Low,
        Platinum_Metals_XPT_High:
          response.data.rates.XPT > rates.Platinum_Metals_XPT_High
            ? response.data.rates.XPT
            : rates.Platinum_Metals_XPT_High,
        Platinum_Ask_Metals_XPT: response.data.rates["XPT-ASK"],
        Platinum_Ask_Metals_XPT_Low:
          response.data.rates["XPT-ASK"] < rates.Platinum_Ask_Metals_XPT_Low
            ? response.data.rates["XPT-ASK"]
            : rates.Platinum_Ask_Metals_XPT_Low,
        Platinum_Ask_Metals_XPT_High:
          response.data.rates["XPT-ASK"] > rates.Platinum_Ask_Metals_XPT_High
            ? response.data.rates["XPT-ASK"]
            : rates.Platinum_Ask_Metals_XPT_High,
        Platinum_Bid_Metals_XPT: response.data.rates["XPT-BID"],
        Platinum_Bid_Metals_XPT_Low:
          response.data.rates["XPT-BID"] < rates.Platinum_Bid_Metals_XPT_Low
            ? response.data.rates["XPT-BID"]
            : rates.Platinum_Bid_Metals_XPT_Low,
        Platinum_Bid_Metals_XPT_High:
          response.data.rates["XPT-BID"] > rates.Platinum_Bid_Metals_XPT_High
            ? response.data.rates["XPT-BID"]
            : rates.Platinum_Bid_Metals_XPT_High,
        Copper_Metals_XCU: response.data.rates.XCU,
        Copper_Metals_XCU_Low:
          response.data.rates.XCU < rates.Copper_Metals_XCU_Low
            ? response.data.rates.XCU
            : rates.Copper_Metals_XCU_Low,
        Copper_Metals_XCU_High:
          response.data.rates.XCU > rates.Copper_Metals_XCU_High
            ? response.data.rates.XCU
            : rates.Copper_Metals_XCU_High,
        Zinc_Metals_ZNC: response.data.rates.ZNC,
        Zinc_Metals_ZNC_Low:
          response.data.rates.ZNC < rates.Zinc_Metals_ZNC_Low
            ? response.data.rates.ZNC
            : rates.Zinc_Metals_ZNC_Low,
        Zinc_Metals_ZNC_High:
          response.data.rates.ZNC > rates.Zinc_Metals_ZNC_High
            ? response.data.rates.ZNC
            : rates.Zinc_Metals_ZNC_High,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    return data;
  }
  // });
};
exports.geGlobalMetalRates = catchAsyncError(async (req, res, next) => {
  let rates;
  try {
    console.log(initialUpdateDone);
    console.log("ggj");

    if (initialUpdateDone === false) {
      // Schedule periodic updates every 30 minutes
      setInterval(async () => {
        rates = await fetchDataAndUpdate();
        console.log("again function", rates);
      }, 1800000);
      // Initially, fetch and update data
      console.log("started");
      rates = await fetchDataAndUpdate();
    } else {
      rates = await MetalGlobalRates.findOne({}).sort({ createdAt: -1 }).exec();
    }
    console.log("gg");
    console.log("ggdd");
    initialUpdateDone = true;
    console.log("final ", rates);
    if (!rates) {
      res.status(201).json({
        message: "Rates Not Found",
      });
    }
  } catch (e) {
    rates = await MetalGlobalRates.findOne({}).sort({ createdAt: -1 }).exec();
    initialUpdateDone = true;
    console.log(e);
    if (!rates) {
      res.status(201).json({
        message: "Rates Not Found",
      });
    }
  }

  const UAEDirham_Currency_AED = rates.UAEDirham_Currency_AED;
  const UAEDirham_Currency_AED_Low = rates.UAEDirham_Currency_AED_Low;
  const UAEDirham_Currency_AED_High = rates.UAEDirham_Currency_AED_High;
  const AfghanAfghani_Currency_AFN = rates.AfghanAfghani_Currency_AFN;
  const AfghanAfghani_Currency_AFN_Low = rates.AfghanAfghani_Currency_AFN_Low;
  const AfghanAfghani_Currency_AFN_High = rates.AfghanAfghani_Currency_AFN_High;
  const AlbanianLek_Currency_ALL = rates.AlbanianLek_Currency_ALL;
  const AlbanianLek_Currency_ALL_Low = rates.AlbanianLek_Currency_ALL_Low;
  const AlbanianLek_Currency_ALL_High = rates.AlbanianLek_Currency_ALL_High;
  const Aluminum_Currency_ALU = rates.Aluminum_Currency_ALU;
  const Aluminum_Currency_ALU_Low = rates.Aluminum_Currency_ALU_Low;
  const Aluminum_Currency_ALU_High = rates.Aluminum_Currency_ALU_High;
  const ArmenianDram_Currency_AMD = rates.ArmenianDram_Currency_AMD;
  const ArmenianDram_Currency_AMD_Low = rates.ArmenianDram_Currency_AMD_Low;
  const ArmenianDram_Currency_AMD_High = rates.ArmenianDram_Currency_AMD_High;
  const NetherlandsAntilleanGuilder_Currency_ANG =
    rates.NetherlandsAntilleanGuilder_Currency_ANG;
  const NetherlandsAntilleanGuilder_Currency_ANG_Low =
    rates.NetherlandsAntilleanGuilder_Currency_ANG_Low;
  const NetherlandsAntilleanGuilder_Currency_ANG_High =
    rates.NetherlandsAntilleanGuilder_Currency_ANG_High;
  const AngolanKwanza_Currency_AOA = rates.AngolanKwanza_Currency_AOA;
  const AngolanKwanza_Currency_AOA_Low = rates.AngolanKwanza_Currency_AOA_Low;
  const AngolanKwanza_Currency_AOA_High = rates.AngolanKwanza_Currency_AOA_High;
  const ArgentinePeso_Currency_ARS = rates.ArgentinePeso_Currency_ARS;
  const ArgentinePeso_Currency_ARS_Low = rates.ArgentinePeso_Currency_ARS_Low;
  const ArgentinePeso_Currency_ARS_High = rates.ArgentinePeso_Currency_ARS_High;
  const AustralianDollar_Currency_AUD = rates.AustralianDollar_Currency_AUD;
  const AustralianDollar_Currency_AUD_Low =
    rates.AustralianDollar_Currency_AUD_Low;
  const AustralianDollar_Currency_AUD_High =
    rates.AustralianDollar_Currency_AUD_High;
  const AzerbaijanManat_Currency_AZN = rates.AzerbaijanManat_Currency_AZN;
  const AzerbaijanManat_Currency_AZN_Low =
    rates.AzerbaijanManat_Currency_AZN_Low;
  const AzerbaijanManat_Currency_AZN_High =
    rates.AzerbaijanManat_Currency_AZN_High;
  const BosniaAndHerzegovinaConvertibleMark_Currency_BAM =
    rates.BosniaAndHerzegovinaConvertibleMark_Currency_BAM;
  const BosniaAndHerzegovinaConvertibleMark_Currency_BAM_Low =
    rates.BosniaAndHerzegovinaConvertibleMark_Currency_BAM_Low;
  const BosniaAndHerzegovinaConvertibleMark_Currency_BAM_High =
    rates.BosniaAndHerzegovinaConvertibleMark_Currency_BAM_High;
  const BarbadianDollar_Currency_BBD = rates.BarbadianDollar_Currency_BBD;
  const BarbadianDollar_Currency_BBD_Low =
    rates.BarbadianDollar_Currency_BBD_Low;
  const BarbadianDollar_Currency_BBD_High =
    rates.BarbadianDollar_Currency_BBD_High;
  const BangladeshiTaka_Currency_BDT = rates.BangladeshiTaka_Currency_BDT;
  const BangladeshiTaka_Currency_BDT_Low =
    rates.BangladeshiTaka_Currency_BDT_Low;
  const BangladeshiTaka_Currency_BDT_High =
    rates.BangladeshiTaka_Currency_BDT_High;
  const BulgarianLev_Currency_BGN = rates.BulgarianLev_Currency_BGN;
  const BulgarianLev_Currency_BGN_Low = rates.BulgarianLev_Currency_BGN_Low;
  const BulgarianLev_Currency_BGN_High = rates.BulgarianLev_Currency_BGN_High;
  const BahrainiDinar_Currency_BHD = rates.BahrainiDinar_Currency_BHD;
  const BahrainiDinar_Currency_BHD_Low = rates.BahrainiDinar_Currency_BHD_Low;
  const BahrainiDinar_Currency_BHD_High = rates.BahrainiDinar_Currency_BHD_High;
  const BurundiFranc_Currency_BIF = rates.BurundiFranc_Currency_BIF;
  const BurundiFranc_Currency_BIF_Low = rates.BurundiFranc_Currency_BIF_Low;
  const BurundiFranc_Currency_BIF_High = rates.BurundiFranc_Currency_BIF_High;
  const BosniaHerzegovinaConvertibleMark_Currency_BIH =
    rates.BosniaHerzegovinaConvertibleMark_Currency_BIH;
  const BosniaHerzegovinaConvertibleMark_Currency_BIH_Low =
    rates.BosniaHerzegovinaConvertibleMark_Currency_BIH_Low;
  const BosniaHerzegovinaConvertibleMark_Currency_BIH_High =
    rates.BosniaHerzegovinaConvertibleMark_Currency_BIH_High;
  const BruneiDollar_Currency_BND = rates.BruneiDollar_Currency_BND;
  const BruneiDollar_Currency_BND_Low = rates.BruneiDollar_Currency_BND_Low;
  const BruneiDollar_Currency_BND_High = rates.BruneiDollar_Currency_BND_High;
  const BolivianBoliviano_Currency_BOB = rates.BolivianBoliviano_Currency_BOB;
  const BolivianBoliviano_Currency_BOB_Low =
    rates.BolivianBoliviano_Currency_BOB_Low;
  const BolivianBoliviano_Currency_BOB_High =
    rates.BolivianBoliviano_Currency_BOB_High;
  const BrazilianReal_Currency_BRL = rates.BrazilianReal_Currency_BRL;
  const BrazilianReal_Currency_BRL_Low = rates.BrazilianReal_Currency_BRL_Low;
  const BrazilianReal_Currency_BRL_High = rates.BrazilianReal_Currency_BRL_High;
  const BahamianDollar_Currency_BSD = rates.BahamianDollar_Currency_BSD;
  const BahamianDollar_Currency_BSD_Low = rates.BahamianDollar_Currency_BSD_Low;
  const BahamianDollar_Currency_BSD_High =
    rates.BahamianDollar_Currency_BSD_High;
  const Bitcoin_Currency_BTC = rates.Bitcoin_Currency_BTC;
  const Bitcoin_Currency_BTC_Low = rates.Bitcoin_Currency_BTC_Low;
  const Bitcoin_Currency_BTC_High = rates.Bitcoin_Currency_BTC_High;
  const BhutaneseNgultrum_Currency_BTN = rates.BhutaneseNgultrum_Currency_BTN;
  const BhutaneseNgultrum_Currency_BTN_Low =
    rates.BhutaneseNgultrum_Currency_BTN_Low;
  const BhutaneseNgultrum_Currency_BTN_High =
    rates.BhutaneseNgultrum_Currency_BTN_High;
  const BelarusianRuble_Currency_BYN = rates.BelarusianRuble_Currency_BYN;
  const BelarusianRuble_Currency_BYN_Low =
    rates.BelarusianRuble_Currency_BYN_Low;
  const BelarusianRuble_Currency_BYN_High =
    rates.BelarusianRuble_Currency_BYN_High;
  const BelizeDollar_Currency_BZD = rates.BelizeDollar_Currency_BZD;
  const BelizeDollar_Currency_BZD_Low = rates.BelizeDollar_Currency_BZD_Low;
  const BelizeDollar_Currency_BZD_High = rates.BelizeDollar_Currency_BZD_High;
  const CanadianDollar_Currency_CAD = rates.CanadianDollar_Currency_CAD;
  const CanadianDollar_Currency_CAD_Low = rates.CanadianDollar_Currency_CAD_Low;
  const CanadianDollar_Currency_CAD_High =
    rates.CanadianDollar_Currency_CAD_High;
  const CongoleseFranc_Currency_CDF = rates.CongoleseFranc_Currency_CDF;
  const CongoleseFranc_Currency_CDF_Low = rates.CongoleseFranc_Currency_CDF_Low;
  const CongoleseFranc_Currency_CDF_High =
    rates.CongoleseFranc_Currency_CDF_High;
  const SwissFranc_Currency_CHF = rates.SwissFranc_Currency_CHF;
  const SwissFranc_Currency_CHF_Low = rates.SwissFranc_Currency_CHF_Low;
  const SwissFranc_Currency_CHF_High = rates.SwissFranc_Currency_CHF_High;
  const ChileanUnitOfAccount_Currency_CLF =
    rates.ChileanUnitOfAccount_Currency_CLF;
  const ChileanUnitOfAccount_Currency_CLF_Low =
    rates.ChileanUnitOfAccount_Currency_CLF_Low;
  const ChileanUnitOfAccount_Currency_CLF_High =
    rates.ChileanUnitOfAccount_Currency_CLF_High;
  const ChileanPeso_Currency_CLP = rates.ChileanPeso_Currency_CLP;
  const ChileanPeso_Currency_CLP_Low = rates.ChileanPeso_Currency_CLP_Low;
  const ChileanPeso_Currency_CLP_High = rates.ChileanPeso_Currency_CLP_High;
  const ChineseYuanRenminbi_Currency_CNY =
    rates.ChineseYuanRenminbi_Currency_CNY;
  const ChineseYuanRenminbi_Currency_CNY_Low =
    rates.ChineseYuanRenminbi_Currency_CNY_Low;
  const ChineseYuanRenminbi_Currency_CNY_High =
    rates.ChineseYuanRenminbi_Currency_CNY_High;
  const ColombianPeso_Currency_COP = rates.ColombianPeso_Currency_COP;
  const ColombianPeso_Currency_COP_Low = rates.ColombianPeso_Currency_COP_Low;
  const ColombianPeso_Currency_COP_High = rates.ColombianPeso_Currency_COP_High;
  const CostaRicanColon_Currency_CRC = rates.CostaRicanColon_Currency_CRC;
  const CostaRicanColon_Currency_CRC_Low =
    rates.CostaRicanColon_Currency_CRC_Low;
  const CostaRicanColon_Currency_CRC_High =
    rates.CostaRicanColon_Currency_CRC_High;
  const CapeVerdeanEscudo_Currency_CVE = rates.CapeVerdeanEscudo_Currency_CVE;
  const CapeVerdeanEscudo_Currency_CVE_Low =
    rates.CapeVerdeanEscudo_Currency_CVE_Low;
  const CapeVerdeanEscudo_Currency_CVE_High =
    rates.CapeVerdeanEscudo_Currency_CVE_High;
  const CzechKoruna_Currency_CZK = rates.CzechKoruna_Currency_CZK;
  const CzechKoruna_Currency_CZK_Low = rates.CzechKoruna_Currency_CZK_Low;
  const CzechKoruna_Currency_CZK_High = rates.CzechKoruna_Currency_CZK_High;
  const DjiboutianFranc_Currency_DJF = rates.DjiboutianFranc_Currency_DJF;
  const DjiboutianFranc_Currency_DJF_Low =
    rates.DjiboutianFranc_Currency_DJF_Low;
  const DjiboutianFranc_Currency_DJF_High =
    rates.DjiboutianFranc_Currency_DJF_High;
  const DanishKrone_Currency_DKK = rates.DanishKrone_Currency_DKK;
  const DanishKrone_Currency_DKK_Low = rates.DanishKrone_Currency_DKK_Low;
  const DanishKrone_Currency_DKK_High = rates.DanishKrone_Currency_DKK_High;
  const DominicanPeso_Currency_DOP = rates.DominicanPeso_Currency_DOP;
  const DominicanPeso_Currency_DOP_Low = rates.DominicanPeso_Currency_DOP_Low;
  const DominicanPeso_Currency_DOP_High = rates.DominicanPeso_Currency_DOP_High;
  const AlgerianDinar_Currency_DZD = rates.AlgerianDinar_Currency_DZD;
  const AlgerianDinar_Currency_DZD_Low = rates.AlgerianDinar_Currency_DZD_Low;
  const AlgerianDinar_Currency_DZD_High = rates.AlgerianDinar_Currency_DZD_High;
  const EgyptianPound_Currency_EGP = rates.EgyptianPound_Currency_EGP;
  const EgyptianPound_Currency_EGP_Low = rates.EgyptianPound_Currency_EGP_Low;
  const EgyptianPound_Currency_EGP_High = rates.EgyptianPound_Currency_EGP_High;
  const EritreanNakfa_Currency_ERN = rates.EritreanNakfa_Currency_ERN;
  const EritreanNakfa_Currency_ERN_Low = rates.EritreanNakfa_Currency_ERN_Low;
  const EritreanNakfa_Currency_ERN_High = rates.EritreanNakfa_Currency_ERN_High;
  const EthiopianBirr_Currency_ETB = rates.EthiopianBirr_Currency_ETB;
  const EthiopianBirr_Currency_ETB_Low = rates.EthiopianBirr_Currency_ETB_Low;
  const EthiopianBirr_Currency_ETB_High = rates.EthiopianBirr_Currency_ETB_High;
  const EuropeanEuro_Currency_EUR = rates.EuropeanEuro_Currency_EUR;
  const EuropeanEuro_Currency_EUR_Low = rates.EuropeanEuro_Currency_EUR_Low;
  const EuropeanEuro_Currency_EUR_High = rates.EuropeanEuro_Currency_EUR_High;
  const FijianDollar_Currency_FJD = rates.FijianDollar_Currency_FJD;
  const FijianDollar_Currency_FJD_Low = rates.FijianDollar_Currency_FJD_Low;
  const FijianDollar_Currency_FJD_High = rates.FijianDollar_Currency_FJD_High;
  const FalklandIslandsPound_Currency_FKP =
    rates.FalklandIslandsPound_Currency_FKP;
  const FalklandIslandsPound_Currency_FKP_Low =
    rates.FalklandIslandsPound_Currency_FKP_Low;
  const FalklandIslandsPound_Currency_FKP_High =
    rates.FalklandIslandsPound_Currency_FKP_High;
  const PoundSterling_Currency_GBP = rates.PoundSterling_Currency_GBP;
  const PoundSterling_Currency_GBP_Low = rates.PoundSterling_Currency_GBP_Low;
  const PoundSterling_Currency_GBP_High = rates.PoundSterling_Currency_GBP_High;
  const GeorgianLari_Currency_GEL = rates.GeorgianLari_Currency_GEL;
  const GeorgianLari_Currency_GEL_Low = rates.GeorgianLari_Currency_GEL_Low;
  const GeorgianLari_Currency_GEL_High = rates.GeorgianLari_Currency_GEL_High;
  const GhanaianCedi_Currency_GHS = rates.GhanaianCedi_Currency_GHS;
  const GhanaianCedi_Currency_GHS_Low = rates.GhanaianCedi_Currency_GHS_Low;
  const GhanaianCedi_Currency_GHS_High = rates.GhanaianCedi_Currency_GHS_High;
  const GibraltarPound_Currency_GIP = rates.GibraltarPound_Currency_GIP;
  const GibraltarPound_Currency_GIP_Low = rates.GibraltarPound_Currency_GIP_Low;
  const GibraltarPound_Currency_GIP_High =
    rates.GibraltarPound_Currency_GIP_High;
  const GambianDalasi_Currency_GMD = rates.GambianDalasi_Currency_GMD;
  const GambianDalasi_Currency_GMD_Low = rates.GambianDalasi_Currency_GMD_Low;
  const GambianDalasi_Currency_GMD_High = rates.GambianDalasi_Currency_GMD_High;
  const GuineanFranc_Currency_GNF = rates.GuineanFranc_Currency_GNF;
  const GuineanFranc_Currency_GNF_Low = rates.GuineanFranc_Currency_GNF_Low;
  const GuineanFranc_Currency_GNF_High = rates.GuineanFranc_Currency_GNF_High;
  const GuatemalanQuetzal_Currency_GTQ = rates.GuatemalanQuetzal_Currency_GTQ;
  const GuatemalanQuetzal_Currency_GTQ_Low =
    rates.GuatemalanQuetzal_Currency_GTQ_Low;
  const GuatemalanQuetzal_Currency_GTQ_High =
    rates.GuatemalanQuetzal_Currency_GTQ_High;
  const GuyaneseDollar_Currency_GYD = rates.GuyaneseDollar_Currency_GYD;
  const GuyaneseDollar_Currency_GYD_Low = rates.GuyaneseDollar_Currency_GYD_Low;
  const GuyaneseDollar_Currency_GYD_High =
    rates.GuyaneseDollar_Currency_GYD_High;
  const HongKongDollar_Currency_HKD = rates.HongKongDollar_Currency_HKD;
  const HongKongDollar_Currency_HKD_Low = rates.HongKongDollar_Currency_HKD_Low;
  const HongKongDollar_Currency_HKD_High =
    rates.HongKongDollar_Currency_HKD_High;
  const HonduranLempira_Currency_HNL = rates.HonduranLempira_Currency_HNL;
  const HonduranLempira_Currency_HNL_Low =
    rates.HonduranLempira_Currency_HNL_Low;
  const HonduranLempira_Currency_HNL_High =
    rates.HonduranLempira_Currency_HNL_High;
  const CroatianKuna_Currency_HRK = rates.CroatianKuna_Currency_HRK;
  const CroatianKuna_Currency_HRK_Low = rates.CroatianKuna_Currency_HRK_Low;
  const CroatianKuna_Currency_HRK_High = rates.CroatianKuna_Currency_HRK_High;
  const HaitianGourde_Currency_HTG = rates.HaitianGourde_Currency_HTG;
  const HaitianGourde_Currency_HTG_Low = rates.HaitianGourde_Currency_HTG_Low;
  const HaitianGourde_Currency_HTG_High = rates.HaitianGourde_Currency_HTG_High;
  const HungarianForint_Currency_HUF = rates.HungarianForint_Currency_HUF;
  const HungarianForint_Currency_HUF_Low =
    rates.HungarianForint_Currency_HUF_Low;
  const HungarianForint_Currency_HUF_High =
    rates.HungarianForint_Currency_HUF_High;
  const IndonesianRupiah_Currency_IDR = rates.IndonesianRupiah_Currency_IDR;
  const IndonesianRupiah_Currency_IDR_Low =
    rates.IndonesianRupiah_Currency_IDR_Low;
  const IndonesianRupiah_Currency_IDR_High =
    rates.IndonesianRupiah_Currency_IDR_High;
  const IsraeliNewShekel_Currency_ILS = rates.IsraeliNewShekel_Currency_ILS;
  const IsraeliNewShekel_Currency_ILS_Low =
    rates.IsraeliNewShekel_Currency_ILS_Low;
  const IsraeliNewShekel_Currency_ILS_High =
    rates.IsraeliNewShekel_Currency_ILS_High;
  const IndianRupee_Currency_INR = rates.IndianRupee_Currency_INR;
  const IndianRupee_Currency_INR_Low = rates.IndianRupee_Currency_INR_Low;
  const IndianRupee_Currency_INR_High = rates.IndianRupee_Currency_INR_High;
  const IraqiDinar_Currency_IQD = rates.IraqiDinar_Currency_IQD;
  const IraqiDinar_Currency_IQD_Low = rates.IraqiDinar_Currency_IQD_Low;
  const IraqiDinar_Currency_IQD_High = rates.IraqiDinar_Currency_IQD_High;
  const IranianRial_Currency_IRR = rates.IranianRial_Currency_IRR;
  const IranianRial_Currency_IRR_Low = rates.IranianRial_Currency_IRR_Low;
  const IranianRial_Currency_IRR_High = rates.IranianRial_Currency_IRR_High;
  const IcelandicKrona_Currency_ISK = rates.IcelandicKrona_Currency_ISK;
  const IcelandicKrona_Currency_ISK_Low = rates.IcelandicKrona_Currency_ISK_Low;
  const IcelandicKrona_Currency_ISK_High =
    rates.IcelandicKrona_Currency_ISK_High;
  const JamaicanDollar_Currency_JMD = rates.JamaicanDollar_Currency_JMD;
  const JamaicanDollar_Currency_JMD_Low = rates.JamaicanDollar_Currency_JMD_Low;
  const JamaicanDollar_Currency_JMD_High =
    rates.JamaicanDollar_Currency_JMD_High;
  const JordanianDinar_Currency_JOD = rates.JordanianDinar_Currency_JOD;
  const JordanianDinar_Currency_JOD_Low = rates.JordanianDinar_Currency_JOD_Low;
  const JordanianDinar_Currency_JOD_High =
    rates.JordanianDinar_Currency_JOD_High;
  const JapaneseYen_Currency_JPY = rates.JapaneseYen_Currency_JPY;
  const JapaneseYen_Currency_JPY_Low = rates.JapaneseYen_Currency_JPY_Low;
  const JapaneseYen_Currency_JPY_High = rates.JapaneseYen_Currency_JPY_High;
  const KenyanShilling_Currency_KES = rates.KenyanShilling_Currency_KES;
  const KenyanShilling_Currency_KES_Low = rates.KenyanShilling_Currency_KES_Low;
  const KenyanShilling_Currency_KES_High =
    rates.KenyanShilling_Currency_KES_High;
  const KyrgyzstaniSom_Currency_KGS = rates.KyrgyzstaniSom_Currency_KGS;
  const KyrgyzstaniSom_Currency_KGS_Low = rates.KyrgyzstaniSom_Currency_KGS_Low;
  const KyrgyzstaniSom_Currency_KGS_High =
    rates.KyrgyzstaniSom_Currency_KGS_High;
  const CambodianRiel_Currency_KHR = rates.CambodianRiel_Currency_KHR;
  const CambodianRiel_Currency_KHR_Low = rates.CambodianRiel_Currency_KHR_Low;
  const CambodianRiel_Currency_KHR_High = rates.CambodianRiel_Currency_KHR_High;
  const ComorianFranc_Currency_KMF = rates.ComorianFranc_Currency_KMF;
  const ComorianFranc_Currency_KMF_Low = rates.ComorianFranc_Currency_KMF_Low;
  const ComorianFranc_Currency_KMF_High = rates.ComorianFranc_Currency_KMF_High;
  const SouthKoreanWon_Currency_KRW = rates.SouthKoreanWon_Currency_KRW;
  const SouthKoreanWon_Currency_KRW_Low = rates.SouthKoreanWon_Currency_KRW_Low;
  const SouthKoreanWon_Currency_KRW_High =
    rates.SouthKoreanWon_Currency_KRW_High;
  const KuwaitiDinar_Currency_KWD = rates.KuwaitiDinar_Currency_KWD;
  const KuwaitiDinar_Currency_KWD_Low = rates.KuwaitiDinar_Currency_KWD_Low;
  const KuwaitiDinar_Currency_KWD_High = rates.KuwaitiDinar_Currency_KWD_High;
  const CaymanIslandsDollar_Currency_KYD =
    rates.CaymanIslandsDollar_Currency_KYD;
  const CaymanIslandsDollar_Currency_KYD_Low =
    rates.CaymanIslandsDollar_Currency_KYD_Low;
  const CaymanIslandsDollar_Currency_KYD_High =
    rates.CaymanIslandsDollar_Currency_KYD_High;
  const KazakhstaniTenge_Currency_KZT = rates.KazakhstaniTenge_Currency_KZT;
  const KazakhstaniTenge_Currency_KZT_Low =
    rates.KazakhstaniTenge_Currency_KZT_Low;
  const KazakhstaniTenge_Currency_KZT_High =
    rates.KazakhstaniTenge_Currency_KZT_High;
  const LaoKip_Currency_LAK = rates.LaoKip_Currency_LAK;
  const LaoKip_Currency_LAK_Low = rates.LaoKip_Currency_LAK_Low;
  const LaoKip_Currency_LAK_High = rates.LaoKip_Currency_LAK_High;
  const LebanesePound_Currency_LBP = rates.LebanesePound_Currency_LBP;
  const LebanesePound_Currency_LBP_Low = rates.LebanesePound_Currency_LBP_Low;
  const LebanesePound_Currency_LBP_High = rates.LebanesePound_Currency_LBP_High;
  const SriLankanRupee_Currency_LKR = rates.SriLankanRupee_Currency_LKR;
  const SriLankanRupee_Currency_LKR_Low = rates.SriLankanRupee_Currency_LKR_Low;
  const SriLankanRupee_Currency_LKR_High =
    rates.SriLankanRupee_Currency_LKR_High;
  const LiberianDollar_Currency_LRD = rates.LiberianDollar_Currency_LRD;
  const LiberianDollar_Currency_LRD_Low = rates.LiberianDollar_Currency_LRD_Low;
  const LiberianDollar_Currency_LRD_High =
    rates.LiberianDollar_Currency_LRD_High;
  const LesothoLoti_Currency_LSL = rates.LesothoLoti_Currency_LSL;
  const LesothoLoti_Currency_LSL_Low = rates.LesothoLoti_Currency_LSL_Low;
  const LesothoLoti_Currency_LSL_High = rates.LesothoLoti_Currency_LSL_High;
  const LibyanDinar_Currency_LYD = rates.LibyanDinar_Currency_LYD;
  const LibyanDinar_Currency_LYD_Low = rates.LibyanDinar_Currency_LYD_Low;
  const LibyanDinar_Currency_LYD_High = rates.LibyanDinar_Currency_LYD_High;
  const MoroccanDirham_Currency_MAD = rates.MoroccanDirham_Currency_MAD;
  const MoroccanDirham_Currency_MAD_Low = rates.MoroccanDirham_Currency_MAD_Low;
  const MoroccanDirham_Currency_MAD_High =
    rates.MoroccanDirham_Currency_MAD_High;
  const MoldovanLeu_Currency_MDL = rates.MoldovanLeu_Currency_MDL;
  const MoldovanLeu_Currency_MDL_Low = rates.MoldovanLeu_Currency_MDL_Low;
  const MoldovanLeu_Currency_MDL_High = rates.MoldovanLeu_Currency_MDL_High;
  const MalagasyAriary_Currency_MGA = rates.MalagasyAriary_Currency_MGA;
  const MalagasyAriary_Currency_MGA_Low = rates.MalagasyAriary_Currency_MGA_Low;
  const MalagasyAriary_Currency_MGA_High =
    rates.MalagasyAriary_Currency_MGA_High;
  const MacedonianDenar_Currency_MKD = rates.MacedonianDenar_Currency_MKD;
  const MacedonianDenar_Currency_MKD_Low =
    rates.MacedonianDenar_Currency_MKD_Low;
  const MacedonianDenar_Currency_MKD_High =
    rates.MacedonianDenar_Currency_MKD_High;
  const MyanmarKyat_Currency_MMK = rates.MyanmarKyat_Currency_MMK;
  const MyanmarKyat_Currency_MMK_Low = rates.MyanmarKyat_Currency_MMK_Low;
  const MyanmarKyat_Currency_MMK_High = rates.MyanmarKyat_Currency_MMK_High;
  const MongolianTugrik_Currency_MNT = rates.MongolianTugrik_Currency_MNT;
  const MongolianTugrik_Currency_MNT_Low =
    rates.MongolianTugrik_Currency_MNT_Low;
  const MongolianTugrik_Currency_MNT_High =
    rates.MongolianTugrik_Currency_MNT_High;
  const MacanesePataca_Currency_MOP = rates.MacanesePataca_Currency_MOP;
  const MacanesePataca_Currency_MOP_Low = rates.MacanesePataca_Currency_MOP_Low;
  const MacanesePataca_Currency_MOP_High =
    rates.MacanesePataca_Currency_MOP_High;
  const MauritanianOuguiya_Currency_MRO = rates.MauritanianOuguiya_Currency_MRO;
  const MauritanianOuguiya_Currency_MRO_Low =
    rates.MauritanianOuguiya_Currency_MRO_Low;
  const MauritanianOuguiya_Currency_MRO_High =
    rates.MauritanianOuguiya_Currency_MRO_High;
  const MauritianRupee_Currency_MUR = rates.MauritianRupee_Currency_MUR;
  const MauritianRupee_Currency_MUR_Low = rates.MauritianRupee_Currency_MUR_Low;
  const MauritianRupee_Currency_MUR_High =
    rates.MauritianRupee_Currency_MUR_High;
  const MaldivianRufiyaa_Currency_MVR = rates.MaldivianRufiyaa_Currency_MVR;
  const MaldivianRufiyaa_Currency_MVR_Low =
    rates.MaldivianRufiyaa_Currency_MVR_Low;
  const MaldivianRufiyaa_Currency_MVR_High =
    rates.MaldivianRufiyaa_Currency_MVR_High;
  const MalawianKwacha_Currency_MWK = rates.MalawianKwacha_Currency_MWK;
  const MalawianKwacha_Currency_MWK_Low = rates.MalawianKwacha_Currency_MWK_Low;
  const MalawianKwacha_Currency_MWK_High =
    rates.MalawianKwacha_Currency_MWK_High;
  const MexicanPeso_Currency_MXN = rates.MexicanPeso_Currency_MXN;
  const MexicanPeso_Currency_MXN_Low = rates.MexicanPeso_Currency_MXN_Low;
  const MexicanPeso_Currency_MXN_High = rates.MexicanPeso_Currency_MXN_High;
  const MalaysianRinggit_Currency_MYR = rates.MalaysianRinggit_Currency_MYR;
  const MalaysianRinggit_Currency_MYR_Low =
    rates.MalaysianRinggit_Currency_MYR_Low;
  const MalaysianRinggit_Currency_MYR_High =
    rates.MalaysianRinggit_Currency_MYR_High;
  const MozambicanMetical_Currency_MZN = rates.MozambicanMetical_Currency_MZN;
  const MozambicanMetical_Currency_MZN_Low =
    rates.MozambicanMetical_Currency_MZN_Low;
  const MozambicanMetical_Currency_MZN_High =
    rates.MozambicanMetical_Currency_MZN_High;
  const NamibianDollar_Currency_NAD = rates.NamibianDollar_Currency_NAD;
  const NamibianDollar_Currency_NAD_Low = rates.NamibianDollar_Currency_NAD_Low;
  const NamibianDollar_Currency_NAD_High =
    rates.NamibianDollar_Currency_NAD_High;
  const NigerianNaira_Currency_NGN = rates.NigerianNaira_Currency_NGN;
  const NigerianNaira_Currency_NGN_Low = rates.NigerianNaira_Currency_NGN_Low;
  const NigerianNaira_Currency_NGN_High = rates.NigerianNaira_Currency_NGN_High;
  const NicaraguanCordoba_Currency_NIO = rates.NicaraguanCordoba_Currency_NIO;
  const NicaraguanCordoba_Currency_NIO_Low =
    rates.NicaraguanCordoba_Currency_NIO_Low;
  const NicaraguanCordoba_Currency_NIO_High =
    rates.NicaraguanCordoba_Currency_NIO_High;
  const NorwegianKrone_Currency_NOK = rates.NorwegianKrone_Currency_NOK;
  const NorwegianKrone_Currency_NOK_Low = rates.NorwegianKrone_Currency_NOK_Low;
  const NorwegianKrone_Currency_NOK_High =
    rates.NorwegianKrone_Currency_NOK_High;
  const NepaleseRupee_Currency_NPR = rates.NepaleseRupee_Currency_NPR;
  const NepaleseRupee_Currency_NPR_Low = rates.NepaleseRupee_Currency_NPR_Low;
  const NepaleseRupee_Currency_NPR_High = rates.NepaleseRupee_Currency_NPR_High;
  const NewZealandDollar_Currency_NZD = rates.NewZealandDollar_Currency_NZD;
  const NewZealandDollar_Currency_NZD_Low =
    rates.NewZealandDollar_Currency_NZD_Low;
  const NewZealandDollar_Currency_NZD_High =
    rates.NewZealandDollar_Currency_NZD_High;
  const OmaniRial_Currency_OMR = rates.OmaniRial_Currency_OMR;
  const OmaniRial_Currency_OMR_Low = rates.OmaniRial_Currency_OMR_Low;
  const OmaniRial_Currency_OMR_High = rates.OmaniRial_Currency_OMR_High;
  const PanamanianBalboa_Currency_PAB = rates.PanamanianBalboa_Currency_PAB;
  const PanamanianBalboa_Currency_PAB_Low =
    rates.PanamanianBalboa_Currency_PAB_Low;
  const PanamanianBalboa_Currency_PAB_High =
    rates.PanamanianBalboa_Currency_PAB_High;
  const PeruvianSol_Currency_PEN = rates.PeruvianSol_Currency_PEN;
  const PeruvianSol_Currency_PEN_Low = rates.PeruvianSol_Currency_PEN_Low;
  const PeruvianSol_Currency_PEN_High = rates.PeruvianSol_Currency_PEN_High;
  const PhilippinePeso_Currency_PHP = rates.PhilippinePeso_Currency_PHP;
  const PhilippinePeso_Currency_PHP_Low = rates.PhilippinePeso_Currency_PHP_Low;
  const PhilippinePeso_Currency_PHP_High =
    rates.PhilippinePeso_Currency_PHP_High;
  const PakistaniRupee_Currency_PKR = rates.PakistaniRupee_Currency_PKR;
  const PakistaniRupee_Currency_PKR_Low = rates.PakistaniRupee_Currency_PKR_Low;
  const PakistaniRupee_Currency_PKR_High =
    rates.PakistaniRupee_Currency_PKR_High;
  const PolishZloty_Currency_PLN = rates.PolishZloty_Currency_PLN;
  const PolishZloty_Currency_PLN_Low = rates.PolishZloty_Currency_PLN_Low;
  const PolishZloty_Currency_PLN_High = rates.PolishZloty_Currency_PLN_High;
  const ParaguayanGuarani_Currency_PYG = rates.ParaguayanGuarani_Currency_PYG;
  const ParaguayanGuarani_Currency_PYG_Low =
    rates.ParaguayanGuarani_Currency_PYG_Low;
  const ParaguayanGuarani_Currency_PYG_High =
    rates.ParaguayanGuarani_Currency_PYG_High;
  const QatariRiyal_Currency_QAR = rates.QatariRiyal_Currency_QAR;
  const QatariRiyal_Currency_QAR_Low = rates.QatariRiyal_Currency_QAR_Low;
  const QatariRiyal_Currency_QAR_High = rates.QatariRiyal_Currency_QAR_High;
  const RomanianLeu_Currency_RON = rates.RomanianLeu_Currency_RON;
  const RomanianLeu_Currency_RON_Low = rates.RomanianLeu_Currency_RON_Low;
  const RomanianLeu_Currency_RON_High = rates.RomanianLeu_Currency_RON_High;
  const SerbianDinar_Currency_RSD = rates.SerbianDinar_Currency_RSD;
  const SerbianDinar_Currency_RSD_Low = rates.SerbianDinar_Currency_RSD_Low;
  const SerbianDinar_Currency_RSD_High = rates.SerbianDinar_Currency_RSD_High;
  const RussianRuble_Currency_RUB = rates.RussianRuble_Currency_RUB;
  const RussianRuble_Currency_RUB_Low = rates.RussianRuble_Currency_RUB_Low;
  const RussianRuble_Currency_RUB_High = rates.RussianRuble_Currency_RUB_High;
  const RwandanFranc_Currency_RWF = rates.RwandanFranc_Currency_RWF;
  const RwandanFranc_Currency_RWF_Low = rates.RwandanFranc_Currency_RWF_Low;
  const RwandanFranc_Currency_RWF_High = rates.RwandanFranc_Currency_RWF_High;
  const SaudiArabianRiyal_Currency_SAR = rates.SaudiArabianRiyal_Currency_SAR;
  const SaudiArabianRiyal_Currency_SAR_Low =
    rates.SaudiArabianRiyal_Currency_SAR_Low;
  const SaudiArabianRiyal_Currency_SAR_High =
    rates.SaudiArabianRiyal_Currency_SAR_High;
  const SeychelloisRupee_Currency_SCR = rates.SeychelloisRupee_Currency_SCR;
  const SeychelloisRupee_Currency_SCR_Low =
    rates.SeychelloisRupee_Currency_SCR_Low;
  const SeychelloisRupee_Currency_SCR_High =
    rates.SeychelloisRupee_Currency_SCR_High;
  const SudanesePound_Currency_SDG = rates.SudanesePound_Currency_SDG;
  const SudanesePound_Currency_SDG_Low = rates.SudanesePound_Currency_SDG_Low;
  const SudanesePound_Currency_SDG_High = rates.SudanesePound_Currency_SDG_High;
  const SwedishKrona_Currency_SEK = rates.SwedishKrona_Currency_SEK;
  const SwedishKrona_Currency_SEK_Low = rates.SwedishKrona_Currency_SEK_Low;
  const SwedishKrona_Currency_SEK_High = rates.SwedishKrona_Currency_SEK_High;
  const SingaporeDollar_Currency_SGD = rates.SingaporeDollar_Currency_SGD;
  const SingaporeDollar_Currency_SGD_Low =
    rates.SingaporeDollar_Currency_SGD_Low;
  const SingaporeDollar_Currency_SGD_High =
    rates.SingaporeDollar_Currency_SGD_High;
  const SierraLeoneanLeone_Currency_SLL = rates.SierraLeoneanLeone_Currency_SLL;
  const SierraLeoneanLeone_Currency_SLL_Low =
    rates.SierraLeoneanLeone_Currency_SLL_Low;
  const SierraLeoneanLeone_Currency_SLL_High =
    rates.SierraLeoneanLeone_Currency_SLL_High;
  const SomaliShilling_Currency_SOS = rates.SomaliShilling_Currency_SOS;
  const SomaliShilling_Currency_SOS_Low = rates.SomaliShilling_Currency_SOS_Low;
  const SomaliShilling_Currency_SOS_High =
    rates.SomaliShilling_Currency_SOS_High;
  const SurinameseDollar_Currency_SRD = rates.SurinameseDollar_Currency_SRD;
  const SurinameseDollar_Currency_SRD_Low =
    rates.SurinameseDollar_Currency_SRD_Low;
  const SurinameseDollar_Currency_SRD_High =
    rates.SurinameseDollar_Currency_SRD_High;
  const SaoTomeAndPrincipeDobra_Currency_STN =
    rates.SaoTomeAndPrincipeDobra_Currency_STN;
  const SaoTomeAndPrincipeDobra_Currency_STN_Low =
    rates.SaoTomeAndPrincipeDobra_Currency_STN_Low;
  const SaoTomeAndPrincipeDobra_Currency_STN_High =
    rates.SaoTomeAndPrincipeDobra_Currency_STN_High;
  const SalvadoranColón_Currency_SVC = rates.SalvadoranColón_Currency_SVC;
  const SalvadoranColón_Currency_SVC_Low =
    rates.SalvadoranColón_Currency_SVC_Low;
  const SalvadoranColón_Currency_SVC_High =
    rates.SalvadoranColón_Currency_SVC_High;
  const SwaziLilangeni_Currency_SZL = rates.SwaziLilangeni_Currency_SZL;
  const SwaziLilangeni_Currency_SZL_Low = rates.SwaziLilangeni_Currency_SZL_Low;
  const SwaziLilangeni_Currency_SZL_High =
    rates.SwaziLilangeni_Currency_SZL_High;
  const ThaiBaht_Currency_THB = rates.ThaiBaht_Currency_THB;
  const ThaiBaht_Currency_THB_Low = rates.ThaiBaht_Currency_THB_Low;
  const ThaiBaht_Currency_THB_High = rates.ThaiBaht_Currency_THB_High;
  const TajikistaniSomoni_Currency_TJS = rates.TajikistaniSomoni_Currency_TJS;
  const TajikistaniSomoni_Currency_TJS_Low =
    rates.TajikistaniSomoni_Currency_TJS_Low;
  const TajikistaniSomoni_Currency_TJS_High =
    rates.TajikistaniSomoni_Currency_TJS_High;
  const TurkmenManat_Currency_TMT = rates.TurkmenManat_Currency_TMT;
  const TurkmenManat_Currency_TMT_Low = rates.TurkmenManat_Currency_TMT_Low;
  const TurkmenManat_Currency_TMT_High = rates.TurkmenManat_Currency_TMT_High;
  const TunisianDinar_Currency_TND = rates.TunisianDinar_Currency_TND;
  const TunisianDinar_Currency_TND_Low = rates.TunisianDinar_Currency_TND_Low;
  const TunisianDinar_Currency_TND_High = rates.TunisianDinar_Currency_TND_High;
  const TonganPaanga_Currency_TOP = rates.TonganPaanga_Currency_TOP;
  const TonganPaanga_Currency_TOP_Low = rates.TonganPaanga_Currency_TOP_Low;
  const TonganPaanga_Currency_TOP_High = rates.TonganPaanga_Currency_TOP_High;
  const TurkishLira_Currency_TRY = rates.TurkishLira_Currency_TRY;
  const TurkishLira_Currency_TRY_Low = rates.TurkishLira_Currency_TRY_Low;
  const TurkishLira_Currency_TRY_High = rates.TurkishLira_Currency_TRY_High;
  const TrinidadAndTobagoDollar_Currency_TTD =
    rates.TrinidadAndTobagoDollar_Currency_TTD;
  const TrinidadAndTobagoDollar_Currency_TTD_Low =
    rates.TrinidadAndTobagoDollar_Currency_TTD_Low;
  const TrinidadAndTobagoDollar_Currency_TTD_High =
    rates.TrinidadAndTobagoDollar_Currency_TTD_High;
  const NewTaiwanDollar_Currency_TWD = rates.NewTaiwanDollar_Currency_TWD;
  const NewTaiwanDollar_Currency_TWD_Low =
    rates.NewTaiwanDollar_Currency_TWD_Low;
  const NewTaiwanDollar_Currency_TWD_High =
    rates.NewTaiwanDollar_Currency_TWD_High;
  const TanzanianShilling_Currency_TZS = rates.TanzanianShilling_Currency_TZS;
  const TanzanianShilling_Currency_TZS_Low =
    rates.TanzanianShilling_Currency_TZS_Low;
  const TanzanianShilling_Currency_TZS_High =
    rates.TanzanianShilling_Currency_TZS_High;
  const UkrainianHryvnia_Currency_UAH = rates.UkrainianHryvnia_Currency_UAH;
  const UkrainianHryvnia_Currency_UAH_Low =
    rates.UkrainianHryvnia_Currency_UAH_Low;
  const UkrainianHryvnia_Currency_UAH_High =
    rates.UkrainianHryvnia_Currency_UAH_High;
  const UgandanShilling_Currency_UGX = rates.UgandanShilling_Currency_UGX;
  const UgandanShilling_Currency_UGX_Low =
    rates.UgandanShilling_Currency_UGX_Low;
  const UgandanShilling_Currency_UGX_High =
    rates.UgandanShilling_Currency_UGX_High;
  const UruguayanPeso_Currency_UYU = rates.UruguayanPeso_Currency_UYU;
  const UruguayanPeso_Currency_UYU_Low = rates.UruguayanPeso_Currency_UYU_Low;
  const UruguayanPeso_Currency_UYU_High = rates.UruguayanPeso_Currency_UYU_High;
  const UzbekistaniSom_Currency_UZS = rates.UzbekistaniSom_Currency_UZS;
  const UzbekistaniSom_Currency_UZS_Low = rates.UzbekistaniSom_Currency_UZS_Low;
  const UzbekistaniSom_Currency_UZS_High =
    rates.UzbekistaniSom_Currency_UZS_High;
  const VenezuelanBolivar_Currency_VES = rates.VenezuelanBolivar_Currency_VES;
  const VenezuelanBolivar_Currency_VES_Low =
    rates.VenezuelanBolivar_Currency_VES_Low;
  const VenezuelanBolivar_Currency_VES_High =
    rates.VenezuelanBolivar_Currency_VES_High;
  const VietnameseDong_Currency_VND = rates.VietnameseDong_Currency_VND;
  const VietnameseDong_Currency_VND_Low = rates.VietnameseDong_Currency_VND_Low;
  const VietnameseDong_Currency_VND_High =
    rates.VietnameseDong_Currency_VND_High;
  const VanuatuVatu_Currency_VUV = rates.VanuatuVatu_Currency_VUV;
  const VanuatuVatu_Currency_VUV_Low = rates.VanuatuVatu_Currency_VUV_Low;
  const VanuatuVatu_Currency_VUV_High = rates.VanuatuVatu_Currency_VUV_High;
  const CentralAfricanCFAFranc_Currency_XAF =
    rates.CentralAfricanCFAFranc_Currency_XAF;
  const CentralAfricanCFAFranc_Currency_XAF_Low =
    rates.CentralAfricanCFAFranc_Currency_XAF_Low;
  const CentralAfricanCFAFranc_Currency_XAF_High =
    rates.CentralAfricanCFAFranc_Currency_XAF_High;
  const EastCaribbeanDollar_Currency_XCD =
    rates.EastCaribbeanDollar_Currency_XCD;
  const EastCaribbeanDollar_Currency_XCD_Low =
    rates.EastCaribbeanDollar_Currency_XCD_Low;
  const EastCaribbeanDollar_Currency_XCD_High =
    rates.EastCaribbeanDollar_Currency_XCD_High;
  const WestAfricanCFAFranc_Currency_XOF =
    rates.WestAfricanCFAFranc_Currency_XOF;
  const WestAfricanCFAFranc_Currency_XOF_Low =
    rates.WestAfricanCFAFranc_Currency_XOF_Low;
  const WestAfricanCFAFranc_Currency_XOF_High =
    rates.WestAfricanCFAFranc_Currency_XOF_High;
  const CFPFranc_Currency_XPF = rates.CFPFranc_Currency_XPF;
  const CFPFranc_Currency_XPF_Low = rates.CFPFranc_Currency_XPF_Low;
  const CFPFranc_Currency_XPF_High = rates.CFPFranc_Currency_XPF_High;
  const YemeniRial_Currency_YER = rates.YemeniRial_Currency_YER;
  const YemeniRial_Currency_YER_Low = rates.YemeniRial_Currency_YER_Low;
  const YemeniRial_Currency_YER_High = rates.YemeniRial_Currency_YER_High;
  const SouthAfricanRand_Currency_ZAR = rates.SouthAfricanRand_Currency_ZAR;
  const SouthAfricanRand_Currency_ZAR_Low =
    rates.SouthAfricanRand_Currency_ZAR_Low;
  const SouthAfricanRand_Currency_ZAR_High =
    rates.SouthAfricanRand_Currency_ZAR_High;
  const ZambianKwacha_pre2013_Currency_ZMK =
    rates.ZambianKwacha_pre2013_Currency_ZMK;
  const ZambianKwacha_pre2013_Currency_ZMK_Low =
    rates.ZambianKwacha_pre2013_Currency_ZMK_Low;
  const ZambianKwacha_pre2013_Currency_ZMK_High =
    rates.ZambianKwacha_pre2013_Currency_ZMK_High;
  const ZambianKwacha_Currency_ZMW = rates.ZambianKwacha_Currency_ZMW;
  const ZambianKwacha_Currency_ZMW_Low = rates.ZambianKwacha_Currency_ZMW_Low;
  const ZambianKwacha_Currency_ZMW_High = rates.ZambianKwacha_Currency_ZMW_High;
  const Silver_Metals_XAG = rates.Silver_Metals_XAG;
  const Silver_Metals_XAG_Low = rates.Silver_Metals_XAG_Low;
  const Silver_Metals_XAG_High = rates.Silver_Metals_XAG_High;
  const Silver_Ask_Metals_XAG = rates.Silver_Ask_Metals_XAG;
  const Silver_Ask_Metals_XAG_Low = rates.Silver_Ask_Metals_XAG_Low;
  const Silver_Ask_Metals_XAG_High = rates.Silver_Ask_Metals_XAG_High;
  const Silver_Bid_Metals_XAG = rates.Silver_Bid_Metals_XAG;
  const Silver_Bid_Metals_XAG_Low = rates.Silver_Bid_Metals_XAG_Low;
  const Silver_Bid_Metals_XAG_High = rates.Silver_Bid_Metals_XAG_High;
  const Gold_Metals_XAU = rates.Gold_Metals_XAU;
  const Gold_Metals_XAU_Low = rates.Gold_Metals_XAU_Low;
  const Gold_Metals_XAU_High = rates.Gold_Metals_XAU_High;
  const Gold_Ask_Metals_XAU = rates.Gold_Ask_Metals_XAU;
  const Gold_Ask_Metals_XAU_Low = rates.Gold_Ask_Metals_XAU_Low;
  const Gold_Ask_Metals_XAU_High = rates.Gold_Ask_Metals_XAU_High;
  const Gold_Bid_Metals_XAU = rates.Gold_Bid_Metals_XAU;
  const Gold_Bid_Metals_XAU_Low = rates.Gold_Bid_Metals_XAU_Low;
  const Gold_Bid_Metals_XAU_High = rates.Gold_Bid_Metals_XAU_High;
  const Palladium_Metals_XPD = rates.Palladium_Metals_XPD;
  const Palladium_Metals_XPD_Low = rates.Palladium_Metals_XPD_Low;
  const Palladium_Metals_XPD_High = rates.Palladium_Metals_XPD_High;
  const Palladium_Ask_Metals_XPD = rates.Palladium_Ask_Metals_XPD;
  const Palladium_Ask_Metals_XPD_Low = rates.Palladium_Ask_Metals_XPD_Low;
  const Palladium_Ask_Metals_XPD_High = rates.Palladium_Ask_Metals_XPD_High;
  const Palladium_Bid_Metals_XPD = rates.Palladium_Bid_Metals_XPD;
  const Palladium_Bid_Metals_XPD_Low = rates.Palladium_Bid_Metals_XPD_Low;
  const Palladium_Bid_Metals_XPD_High = rates.Palladium_Bid_Metals_XPD_High;
  const Platinum_Metals_XPT = rates.Platinum_Metals_XPT;
  const Platinum_Metals_XPT_Low = rates.Platinum_Metals_XPT_Low;
  const Platinum_Metals_XPT_High = rates.Platinum_Metals_XPT_High;
  const Platinum_Ask_Metals_XPT = rates.Platinum_Ask_Metals_XPT;
  const Platinum_Ask_Metals_XPT_Low = rates.Platinum_Ask_Metals_XPT_Low;
  const Platinum_Ask_Metals_XPT_High = rates.Platinum_Ask_Metals_XPT_High;
  const Platinum_Bid_Metals_XPT = rates.Platinum_Bid_Metals_XPT;
  const Platinum_Bid_Metals_XPT_Low = rates.Platinum_Bid_Metals_XPT_Low;
  const Platinum_Bid_Metals_XPT_High = rates.Platinum_Bid_Metals_XPT_High;
  const Copper_Metals_XCU = rates.Copper_Metals_XCU;
  const Copper_Metals_XCU_Low = rates.Copper_Metals_XCU_Low;
  const Copper_Metals_XCU_High = rates.Copper_Metals_XCU_High;
  const Zinc_Metals_ZNC = rates.Zinc_Metals_ZNC;
  const Zinc_Metals_ZNC_Low = rates.Zinc_Metals_ZNC_Low;
  const Zinc_Metals_ZNC_High = rates.Zinc_Metals_ZNC_High;
  const updatedAt = moment(rates.updatedAt)
    .tz("Asia/karachi")
    .format("DD-MM-YYYY HH:mm A");
  console.log(updatedAt);

  res.status(201).json({
    success: true,
    UAEDirham_Currency_AED,
    UAEDirham_Currency_AED_Low,
    UAEDirham_Currency_AED_High,
    AfghanAfghani_Currency_AFN,
    AfghanAfghani_Currency_AFN_Low,
    AfghanAfghani_Currency_AFN_High,
    AlbanianLek_Currency_ALL,
    AlbanianLek_Currency_ALL_Low,
    AlbanianLek_Currency_ALL_High,
    Aluminum_Currency_ALU,
    Aluminum_Currency_ALU_Low,
    Aluminum_Currency_ALU_High,
    ArmenianDram_Currency_AMD,
    ArmenianDram_Currency_AMD_Low,
    ArmenianDram_Currency_AMD_High,
    NetherlandsAntilleanGuilder_Currency_ANG,
    NetherlandsAntilleanGuilder_Currency_ANG_Low,
    NetherlandsAntilleanGuilder_Currency_ANG_High,
    AngolanKwanza_Currency_AOA,
    AngolanKwanza_Currency_AOA_Low,
    AngolanKwanza_Currency_AOA_High,
    ArgentinePeso_Currency_ARS,
    ArgentinePeso_Currency_ARS_Low,
    ArgentinePeso_Currency_ARS_High,
    AustralianDollar_Currency_AUD,
    AustralianDollar_Currency_AUD_Low,
    AustralianDollar_Currency_AUD_High,
    AzerbaijanManat_Currency_AZN,
    AzerbaijanManat_Currency_AZN_Low,
    AzerbaijanManat_Currency_AZN_High,
    BosniaAndHerzegovinaConvertibleMark_Currency_BAM,
    BosniaAndHerzegovinaConvertibleMark_Currency_BAM_Low,
    BosniaAndHerzegovinaConvertibleMark_Currency_BAM_High,
    BarbadianDollar_Currency_BBD,
    BarbadianDollar_Currency_BBD_Low,
    BarbadianDollar_Currency_BBD_High,
    BangladeshiTaka_Currency_BDT,
    BangladeshiTaka_Currency_BDT_Low,
    BangladeshiTaka_Currency_BDT_High,
    BulgarianLev_Currency_BGN,
    BulgarianLev_Currency_BGN_Low,
    BulgarianLev_Currency_BGN_High,
    BahrainiDinar_Currency_BHD,
    BahrainiDinar_Currency_BHD_Low,
    BahrainiDinar_Currency_BHD_High,
    BurundiFranc_Currency_BIF,
    BurundiFranc_Currency_BIF_Low,
    BurundiFranc_Currency_BIF_High,
    BosniaHerzegovinaConvertibleMark_Currency_BIH,
    BosniaHerzegovinaConvertibleMark_Currency_BIH_Low,
    BosniaHerzegovinaConvertibleMark_Currency_BIH_High,
    BruneiDollar_Currency_BND,
    BruneiDollar_Currency_BND_Low,
    BruneiDollar_Currency_BND_High,
    BolivianBoliviano_Currency_BOB,
    BolivianBoliviano_Currency_BOB_Low,
    BolivianBoliviano_Currency_BOB_High,
    BrazilianReal_Currency_BRL,
    BrazilianReal_Currency_BRL_Low,
    BrazilianReal_Currency_BRL_High,
    BahamianDollar_Currency_BSD,
    BahamianDollar_Currency_BSD_Low,
    BahamianDollar_Currency_BSD_High,
    Bitcoin_Currency_BTC,
    Bitcoin_Currency_BTC_Low,
    Bitcoin_Currency_BTC_High,
    BhutaneseNgultrum_Currency_BTN,
    BhutaneseNgultrum_Currency_BTN_Low,
    BhutaneseNgultrum_Currency_BTN_High,
    BelarusianRuble_Currency_BYN,
    BelarusianRuble_Currency_BYN_Low,
    BelarusianRuble_Currency_BYN_High,
    BelizeDollar_Currency_BZD,
    BelizeDollar_Currency_BZD_Low,
    BelizeDollar_Currency_BZD_High,
    CanadianDollar_Currency_CAD,
    CanadianDollar_Currency_CAD_Low,
    CanadianDollar_Currency_CAD_High,
    CongoleseFranc_Currency_CDF,
    CongoleseFranc_Currency_CDF_Low,
    CongoleseFranc_Currency_CDF_High,
    SwissFranc_Currency_CHF,
    SwissFranc_Currency_CHF_Low,
    SwissFranc_Currency_CHF_High,
    ChileanUnitOfAccount_Currency_CLF,
    ChileanUnitOfAccount_Currency_CLF_Low,
    ChileanUnitOfAccount_Currency_CLF_High,
    ChileanPeso_Currency_CLP,
    ChileanPeso_Currency_CLP_Low,
    ChileanPeso_Currency_CLP_High,
    ChineseYuanRenminbi_Currency_CNY,
    ChineseYuanRenminbi_Currency_CNY_Low,
    ChineseYuanRenminbi_Currency_CNY_High,
    ColombianPeso_Currency_COP,
    ColombianPeso_Currency_COP_Low,
    ColombianPeso_Currency_COP_High,
    CostaRicanColon_Currency_CRC,
    CostaRicanColon_Currency_CRC_Low,
    CostaRicanColon_Currency_CRC_High,
    CapeVerdeanEscudo_Currency_CVE,
    CapeVerdeanEscudo_Currency_CVE_Low,
    CapeVerdeanEscudo_Currency_CVE_High,
    CzechKoruna_Currency_CZK,
    CzechKoruna_Currency_CZK_Low,
    CzechKoruna_Currency_CZK_High,
    DjiboutianFranc_Currency_DJF,
    DjiboutianFranc_Currency_DJF_Low,
    DjiboutianFranc_Currency_DJF_High,
    DanishKrone_Currency_DKK,
    DanishKrone_Currency_DKK_Low,
    DanishKrone_Currency_DKK_High,
    DominicanPeso_Currency_DOP,
    DominicanPeso_Currency_DOP_Low,
    DominicanPeso_Currency_DOP_High,
    AlgerianDinar_Currency_DZD,
    AlgerianDinar_Currency_DZD_Low,
    AlgerianDinar_Currency_DZD_High,
    EgyptianPound_Currency_EGP,
    EgyptianPound_Currency_EGP_Low,
    EgyptianPound_Currency_EGP_High,
    EritreanNakfa_Currency_ERN,
    EritreanNakfa_Currency_ERN_Low,
    EritreanNakfa_Currency_ERN_High,
    EthiopianBirr_Currency_ETB,
    EthiopianBirr_Currency_ETB_Low,
    EthiopianBirr_Currency_ETB_High,
    EuropeanEuro_Currency_EUR,
    EuropeanEuro_Currency_EUR_Low,
    EuropeanEuro_Currency_EUR_High,
    FijianDollar_Currency_FJD,
    FijianDollar_Currency_FJD_Low,
    FijianDollar_Currency_FJD_High,
    FalklandIslandsPound_Currency_FKP,
    FalklandIslandsPound_Currency_FKP_Low,
    FalklandIslandsPound_Currency_FKP_High,
    PoundSterling_Currency_GBP,
    PoundSterling_Currency_GBP_Low,
    PoundSterling_Currency_GBP_High,
    GeorgianLari_Currency_GEL,
    GeorgianLari_Currency_GEL_Low,
    GeorgianLari_Currency_GEL_High,
    GhanaianCedi_Currency_GHS,
    GhanaianCedi_Currency_GHS_Low,
    GhanaianCedi_Currency_GHS_High,
    GibraltarPound_Currency_GIP,
    GibraltarPound_Currency_GIP_Low,
    GibraltarPound_Currency_GIP_High,
    GambianDalasi_Currency_GMD,
    GambianDalasi_Currency_GMD_Low,
    GambianDalasi_Currency_GMD_High,
    GuineanFranc_Currency_GNF,
    GuineanFranc_Currency_GNF_Low,
    GuineanFranc_Currency_GNF_High,
    GuatemalanQuetzal_Currency_GTQ,
    GuatemalanQuetzal_Currency_GTQ_Low,
    GuatemalanQuetzal_Currency_GTQ_High,
    GuyaneseDollar_Currency_GYD,
    GuyaneseDollar_Currency_GYD_Low,
    GuyaneseDollar_Currency_GYD_High,
    HongKongDollar_Currency_HKD,
    HongKongDollar_Currency_HKD_Low,
    HongKongDollar_Currency_HKD_High,
    HonduranLempira_Currency_HNL,
    HonduranLempira_Currency_HNL_Low,
    HonduranLempira_Currency_HNL_High,
    CroatianKuna_Currency_HRK,
    CroatianKuna_Currency_HRK_Low,
    CroatianKuna_Currency_HRK_High,
    HaitianGourde_Currency_HTG,
    HaitianGourde_Currency_HTG_Low,
    HaitianGourde_Currency_HTG_High,
    HungarianForint_Currency_HUF,
    HungarianForint_Currency_HUF_Low,
    HungarianForint_Currency_HUF_High,
    IndonesianRupiah_Currency_IDR,
    IndonesianRupiah_Currency_IDR_Low,
    IndonesianRupiah_Currency_IDR_High,
    IsraeliNewShekel_Currency_ILS,
    IsraeliNewShekel_Currency_ILS_Low,
    IsraeliNewShekel_Currency_ILS_High,
    IndianRupee_Currency_INR,
    IndianRupee_Currency_INR_Low,
    IndianRupee_Currency_INR_High,
    IraqiDinar_Currency_IQD,
    IraqiDinar_Currency_IQD_Low,
    IraqiDinar_Currency_IQD_High,
    IranianRial_Currency_IRR,
    IranianRial_Currency_IRR_Low,
    IranianRial_Currency_IRR_High,
    IcelandicKrona_Currency_ISK,
    IcelandicKrona_Currency_ISK_Low,
    IcelandicKrona_Currency_ISK_High,
    JamaicanDollar_Currency_JMD,
    JamaicanDollar_Currency_JMD_Low,
    JamaicanDollar_Currency_JMD_High,
    JordanianDinar_Currency_JOD,
    JordanianDinar_Currency_JOD_Low,
    JordanianDinar_Currency_JOD_High,
    JapaneseYen_Currency_JPY,
    JapaneseYen_Currency_JPY_Low,
    JapaneseYen_Currency_JPY_High,
    KenyanShilling_Currency_KES,
    KenyanShilling_Currency_KES_Low,
    KenyanShilling_Currency_KES_High,
    KyrgyzstaniSom_Currency_KGS,
    KyrgyzstaniSom_Currency_KGS_Low,
    KyrgyzstaniSom_Currency_KGS_High,
    CambodianRiel_Currency_KHR,
    CambodianRiel_Currency_KHR_Low,
    CambodianRiel_Currency_KHR_High,
    ComorianFranc_Currency_KMF,
    ComorianFranc_Currency_KMF_Low,
    ComorianFranc_Currency_KMF_High,
    SouthKoreanWon_Currency_KRW,
    SouthKoreanWon_Currency_KRW_Low,
    SouthKoreanWon_Currency_KRW_High,
    KuwaitiDinar_Currency_KWD,
    KuwaitiDinar_Currency_KWD_Low,
    KuwaitiDinar_Currency_KWD_High,
    CaymanIslandsDollar_Currency_KYD,
    CaymanIslandsDollar_Currency_KYD_Low,
    CaymanIslandsDollar_Currency_KYD_High,
    KazakhstaniTenge_Currency_KZT,
    KazakhstaniTenge_Currency_KZT_Low,
    KazakhstaniTenge_Currency_KZT_High,
    LaoKip_Currency_LAK,
    LaoKip_Currency_LAK_Low,
    LaoKip_Currency_LAK_High,
    LebanesePound_Currency_LBP,
    LebanesePound_Currency_LBP_Low,
    LebanesePound_Currency_LBP_High,
    SriLankanRupee_Currency_LKR,
    SriLankanRupee_Currency_LKR_Low,
    SriLankanRupee_Currency_LKR_High,
    LiberianDollar_Currency_LRD,
    LiberianDollar_Currency_LRD_Low,
    LiberianDollar_Currency_LRD_High,
    LesothoLoti_Currency_LSL,
    LesothoLoti_Currency_LSL_Low,
    LesothoLoti_Currency_LSL_High,
    LibyanDinar_Currency_LYD,
    LibyanDinar_Currency_LYD_Low,
    LibyanDinar_Currency_LYD_High,
    MoroccanDirham_Currency_MAD,
    MoroccanDirham_Currency_MAD_Low,
    MoroccanDirham_Currency_MAD_High,
    MoldovanLeu_Currency_MDL,
    MoldovanLeu_Currency_MDL_Low,
    MoldovanLeu_Currency_MDL_High,
    MalagasyAriary_Currency_MGA,
    MalagasyAriary_Currency_MGA_Low,
    MalagasyAriary_Currency_MGA_High,
    MacedonianDenar_Currency_MKD,
    MacedonianDenar_Currency_MKD_Low,
    MacedonianDenar_Currency_MKD_High,
    MyanmarKyat_Currency_MMK,
    MyanmarKyat_Currency_MMK_Low,
    MyanmarKyat_Currency_MMK_High,
    MongolianTugrik_Currency_MNT,
    MongolianTugrik_Currency_MNT_Low,
    MongolianTugrik_Currency_MNT_High,
    MacanesePataca_Currency_MOP,
    MacanesePataca_Currency_MOP_Low,
    MacanesePataca_Currency_MOP_High,
    MauritanianOuguiya_Currency_MRO,
    MauritanianOuguiya_Currency_MRO_Low,
    MauritanianOuguiya_Currency_MRO_High,
    MauritianRupee_Currency_MUR,
    MauritianRupee_Currency_MUR_Low,
    MauritianRupee_Currency_MUR_High,
    MaldivianRufiyaa_Currency_MVR,
    MaldivianRufiyaa_Currency_MVR_Low,
    MaldivianRufiyaa_Currency_MVR_High,
    MalawianKwacha_Currency_MWK,
    MalawianKwacha_Currency_MWK_Low,
    MalawianKwacha_Currency_MWK_High,
    MexicanPeso_Currency_MXN,
    MexicanPeso_Currency_MXN_Low,
    MexicanPeso_Currency_MXN_High,
    MalaysianRinggit_Currency_MYR,
    MalaysianRinggit_Currency_MYR_Low,
    MalaysianRinggit_Currency_MYR_High,
    MozambicanMetical_Currency_MZN,
    MozambicanMetical_Currency_MZN_Low,
    MozambicanMetical_Currency_MZN_High,
    NamibianDollar_Currency_NAD,
    NamibianDollar_Currency_NAD_Low,
    NamibianDollar_Currency_NAD_High,
    NigerianNaira_Currency_NGN,
    NigerianNaira_Currency_NGN_Low,
    NigerianNaira_Currency_NGN_High,
    NicaraguanCordoba_Currency_NIO,
    NicaraguanCordoba_Currency_NIO_Low,
    NicaraguanCordoba_Currency_NIO_High,
    NorwegianKrone_Currency_NOK,
    NorwegianKrone_Currency_NOK_Low,
    NorwegianKrone_Currency_NOK_High,
    NepaleseRupee_Currency_NPR,
    NepaleseRupee_Currency_NPR_Low,
    NepaleseRupee_Currency_NPR_High,
    NewZealandDollar_Currency_NZD,
    NewZealandDollar_Currency_NZD_Low,
    NewZealandDollar_Currency_NZD_High,
    OmaniRial_Currency_OMR,
    OmaniRial_Currency_OMR_Low,
    OmaniRial_Currency_OMR_High,
    PanamanianBalboa_Currency_PAB,
    PanamanianBalboa_Currency_PAB_Low,
    PanamanianBalboa_Currency_PAB_High,
    PeruvianSol_Currency_PEN,
    PeruvianSol_Currency_PEN_Low,
    PeruvianSol_Currency_PEN_High,
    PhilippinePeso_Currency_PHP,
    PhilippinePeso_Currency_PHP_Low,
    PhilippinePeso_Currency_PHP_High,
    PakistaniRupee_Currency_PKR,
    PakistaniRupee_Currency_PKR_Low,
    PakistaniRupee_Currency_PKR_High,
    PolishZloty_Currency_PLN,
    PolishZloty_Currency_PLN_Low,
    PolishZloty_Currency_PLN_High,
    ParaguayanGuarani_Currency_PYG,
    ParaguayanGuarani_Currency_PYG_Low,
    ParaguayanGuarani_Currency_PYG_High,
    QatariRiyal_Currency_QAR,
    QatariRiyal_Currency_QAR_Low,
    QatariRiyal_Currency_QAR_High,
    RomanianLeu_Currency_RON,
    RomanianLeu_Currency_RON_Low,
    RomanianLeu_Currency_RON_High,
    SerbianDinar_Currency_RSD,
    SerbianDinar_Currency_RSD_Low,
    SerbianDinar_Currency_RSD_High,
    RussianRuble_Currency_RUB,
    RussianRuble_Currency_RUB_Low,
    RussianRuble_Currency_RUB_High,
    RwandanFranc_Currency_RWF,
    RwandanFranc_Currency_RWF_Low,
    RwandanFranc_Currency_RWF_High,
    SaudiArabianRiyal_Currency_SAR,
    SaudiArabianRiyal_Currency_SAR_Low,
    SaudiArabianRiyal_Currency_SAR_High,
    SeychelloisRupee_Currency_SCR,
    SeychelloisRupee_Currency_SCR_Low,
    SeychelloisRupee_Currency_SCR_High,
    SudanesePound_Currency_SDG,
    SudanesePound_Currency_SDG_Low,
    SudanesePound_Currency_SDG_High,
    SwedishKrona_Currency_SEK,
    SwedishKrona_Currency_SEK_Low,
    SwedishKrona_Currency_SEK_High,
    SingaporeDollar_Currency_SGD,
    SingaporeDollar_Currency_SGD_Low,
    SingaporeDollar_Currency_SGD_High,
    SierraLeoneanLeone_Currency_SLL,
    SierraLeoneanLeone_Currency_SLL_Low,
    SierraLeoneanLeone_Currency_SLL_High,
    SomaliShilling_Currency_SOS,
    SomaliShilling_Currency_SOS_Low,
    SomaliShilling_Currency_SOS_High,
    SurinameseDollar_Currency_SRD,
    SurinameseDollar_Currency_SRD_Low,
    SurinameseDollar_Currency_SRD_High,
    SaoTomeAndPrincipeDobra_Currency_STN,
    SaoTomeAndPrincipeDobra_Currency_STN_Low,
    SaoTomeAndPrincipeDobra_Currency_STN_High,
    SalvadoranColón_Currency_SVC,
    SalvadoranColón_Currency_SVC_Low,
    SalvadoranColón_Currency_SVC_High,
    SwaziLilangeni_Currency_SZL,
    SwaziLilangeni_Currency_SZL_Low,
    SwaziLilangeni_Currency_SZL_High,
    ThaiBaht_Currency_THB,
    ThaiBaht_Currency_THB_Low,
    ThaiBaht_Currency_THB_High,
    TajikistaniSomoni_Currency_TJS,
    TajikistaniSomoni_Currency_TJS_Low,
    TajikistaniSomoni_Currency_TJS_High,
    TurkmenManat_Currency_TMT,
    TurkmenManat_Currency_TMT_Low,
    TurkmenManat_Currency_TMT_High,
    TunisianDinar_Currency_TND,
    TunisianDinar_Currency_TND_Low,
    TunisianDinar_Currency_TND_High,
    TonganPaanga_Currency_TOP,
    TonganPaanga_Currency_TOP_Low,
    TonganPaanga_Currency_TOP_High,
    TurkishLira_Currency_TRY,
    TurkishLira_Currency_TRY_Low,
    TurkishLira_Currency_TRY_High,
    TrinidadAndTobagoDollar_Currency_TTD,
    TrinidadAndTobagoDollar_Currency_TTD_Low,
    TrinidadAndTobagoDollar_Currency_TTD_High,
    NewTaiwanDollar_Currency_TWD,
    NewTaiwanDollar_Currency_TWD_Low,
    NewTaiwanDollar_Currency_TWD_High,
    TanzanianShilling_Currency_TZS,
    TanzanianShilling_Currency_TZS_Low,
    TanzanianShilling_Currency_TZS_High,
    UkrainianHryvnia_Currency_UAH,
    UkrainianHryvnia_Currency_UAH_Low,
    UkrainianHryvnia_Currency_UAH_High,
    UgandanShilling_Currency_UGX,
    UgandanShilling_Currency_UGX_Low,
    UgandanShilling_Currency_UGX_High,
    UruguayanPeso_Currency_UYU,
    UruguayanPeso_Currency_UYU_Low,
    UruguayanPeso_Currency_UYU_High,
    UzbekistaniSom_Currency_UZS,
    UzbekistaniSom_Currency_UZS_Low,
    UzbekistaniSom_Currency_UZS_High,
    VenezuelanBolivar_Currency_VES,
    VenezuelanBolivar_Currency_VES_Low,
    VenezuelanBolivar_Currency_VES_High,
    VietnameseDong_Currency_VND,
    VietnameseDong_Currency_VND_Low,
    VietnameseDong_Currency_VND_High,
    VanuatuVatu_Currency_VUV,
    VanuatuVatu_Currency_VUV_Low,
    VanuatuVatu_Currency_VUV_High,
    CentralAfricanCFAFranc_Currency_XAF,
    CentralAfricanCFAFranc_Currency_XAF_Low,
    CentralAfricanCFAFranc_Currency_XAF_High,
    EastCaribbeanDollar_Currency_XCD,
    EastCaribbeanDollar_Currency_XCD_Low,
    EastCaribbeanDollar_Currency_XCD_High,
    WestAfricanCFAFranc_Currency_XOF,
    WestAfricanCFAFranc_Currency_XOF_Low,
    WestAfricanCFAFranc_Currency_XOF_High,
    CFPFranc_Currency_XPF,
    CFPFranc_Currency_XPF_Low,
    CFPFranc_Currency_XPF_High,
    YemeniRial_Currency_YER,
    YemeniRial_Currency_YER_Low,
    YemeniRial_Currency_YER_High,
    SouthAfricanRand_Currency_ZAR,
    SouthAfricanRand_Currency_ZAR_Low,
    SouthAfricanRand_Currency_ZAR_High,
    ZambianKwacha_pre2013_Currency_ZMK,
    ZambianKwacha_pre2013_Currency_ZMK_Low,
    ZambianKwacha_pre2013_Currency_ZMK_High,
    ZambianKwacha_Currency_ZMW,
    ZambianKwacha_Currency_ZMW_Low,
    ZambianKwacha_Currency_ZMW_High,
    Silver_Metals_XAG,
    Silver_Metals_XAG_Low,
    Silver_Metals_XAG_High,
    Silver_Ask_Metals_XAG,
    Silver_Ask_Metals_XAG_Low,
    Silver_Ask_Metals_XAG_High,
    Silver_Bid_Metals_XAG,
    Silver_Bid_Metals_XAG_Low,
    Silver_Bid_Metals_XAG_High,
    Gold_Metals_XAU,
    Gold_Metals_XAU_Low,
    Gold_Metals_XAU_High,
    Gold_Ask_Metals_XAU,
    Gold_Ask_Metals_XAU_Low,
    Gold_Ask_Metals_XAU_High,
    Gold_Bid_Metals_XAU,
    Gold_Bid_Metals_XAU_Low,
    Gold_Bid_Metals_XAU_High,
    Palladium_Metals_XPD,
    Palladium_Metals_XPD_Low,
    Palladium_Metals_XPD_High,
    Palladium_Ask_Metals_XPD,
    Palladium_Ask_Metals_XPD_Low,
    Palladium_Ask_Metals_XPD_High,
    Palladium_Bid_Metals_XPD,
    Palladium_Bid_Metals_XPD_Low,
    Palladium_Bid_Metals_XPD_High,
    Platinum_Metals_XPT,
    Platinum_Metals_XPT_Low,
    Platinum_Metals_XPT_High,
    Platinum_Ask_Metals_XPT,
    Platinum_Ask_Metals_XPT_Low,
    Platinum_Ask_Metals_XPT_High,
    Platinum_Bid_Metals_XPT,
    Platinum_Bid_Metals_XPT_Low,
    Platinum_Bid_Metals_XPT_High,
    Copper_Metals_XCU,
    Copper_Metals_XCU_Low,
    Copper_Metals_XCU_High,
    Zinc_Metals_ZNC,
    Zinc_Metals_ZNC_Low,
    Zinc_Metals_ZNC_High,
    updatedAt,
  });
});

exports.postHistoricalRates = catchAsyncError(async (req, res, next) => {
  try {
    var config = {
      method: "get",
      url: "https://api.metalpriceapi.com/v1/timeframe?api_key=9a3162b6fa6e7abd6dfc1f034b055c23&start_date=2022-12-05&end_date=2023-12-05&base=USD&currencies=XAU,XAG",
      headers: {},
    };
    // 9a3162b6fa6e7abd6dfc1f034b055c23

    const response = await axios(config);
    // const response = {
    //   data: {
    //     success: true,
    //     base: "USD",
    //     start_date: "2022-12-05",
    //     end_date: "2023-12-05",
    //     rates: {
    //       "2022-12-05": { XAG: 0.04493544, XAU: 0.00056516 },
    //       "2022-12-06": { XAG: 0.0446614, XAU: 0.00056427 },
    //       "2022-12-07": { XAG: 0.04402145, XAU: 0.00055955 },
    //       "2022-12-08": { XAG: 0.04331849, XAU: 0.00055894 },
    //       "2022-12-09": { XAG: 0.04241418, XAU: 0.00055643 },
    //       "2022-12-10": { XAG: 0.04267578, XAU: 0.00055665 },
    //       "2022-12-11": { XAG: 0.04263302, XAU: 0.00055639 },
    //       "2022-12-12": { XAG: 0.04285776, XAU: 0.00056112 },
    //       "2022-12-13": { XAG: 0.04222973, XAU: 0.00055264 },
    //       "2022-12-14": { XAG: 0.04189184, XAU: 0.00055328 },
    //       "2022-12-15": { XAG: 0.04337642, XAU: 0.00056292 },
    //       "2022-12-16": { XAG: 0.04304315, XAU: 0.00055785 },
    //       "2022-12-17": { XAG: 0.04305798, XAU: 0.00055768 },
    //       "2022-12-18": { XAG: 0.04319654, XAU: 0.00055844 },
    //       "2022-12-19": { XAG: 0.04352084, XAU: 0.00055954 },
    //       "2022-12-20": { XAG: 0.04143626, XAU: 0.00055042 },
    //       "2022-12-21": { XAG: 0.04176237, XAU: 0.00055096 },
    //       "2022-12-22": { XAG: 0.04241476, XAU: 0.00055751 },
    //       "2022-12-23": { XAG: 0.04218875, XAU: 0.00055604 },
    //       "2022-12-24": { XAG: 0.04211856, XAU: 0.00055628 },
    //       "2022-12-25": { XAG: 0.04240163, XAU: 0.00055628 },
    //       "2022-12-26": { XAG: 0.04193215, XAU: 0.00055501 },
    //       "2022-12-27": { XAG: 0.04177458, XAU: 0.0005538 },
    //       "2022-12-28": { XAG: 0.04247006, XAU: 0.00055373 },
    //       "2022-12-29": { XAG: 0.04191115, XAU: 0.00055097 },
    //       "2022-12-30": { XAG: 0.04178506, XAU: 0.00054822 },
    //       "2022-12-31": { XAG: 0.04172056, XAU: 0.00054822 },
    //       "2023-01-01": { XAG: 0.04172056, XAU: 0.00054822 },
    //       "2023-01-02": { XAG: 0.04150411, XAU: 0.00054666 },
    //       "2023-01-03": { XAG: 0.04173623, XAU: 0.00054454 },
    //       "2023-01-04": { XAG: 0.04203447, XAU: 0.00053914 },
    //       "2023-01-05": { XAG: 0.04308785, XAU: 0.00054559 },
    //       "2023-01-06": { XAG: 0.04203447, XAU: 0.00053605 },
    //       "2023-01-07": { XAG: 0.04203447, XAU: 0.0005359 },
    //       "2023-01-08": { XAG: 0.04168577, XAU: 0.00053494 },
    //       "2023-01-09": { XAG: 0.04231909, XAU: 0.00053462 },
    //       "2023-01-10": { XAG: 0.04236211, XAU: 0.00053269 },
    //       "2023-01-11": { XAG: 0.0426836, XAU: 0.00053277 },
    //       "2023-01-12": { XAG: 0.04200622, XAU: 0.00052686 },
    //       "2023-01-13": { XAG: 0.04122657, XAU: 0.00052087 },
    //       "2023-01-14": { XAG: 0.04120398, XAU: 0.00052075 },
    //       "2023-01-15": { XAG: 0.04120568, XAU: 0.00052075 },
    //       "2023-01-16": { XAG: 0.04117599, XAU: 0.00052134 },
    //       "2023-01-17": { XAG: 0.04178855, XAU: 0.00052394 },
    //       "2023-01-18": { XAG: 0.04257674, XAU: 0.00052439 },
    //       "2023-01-19": { XAG: 0.04192872, XAU: 0.00051763 },
    //       "2023-01-20": { XAG: 0.04180777, XAU: 0.0005191 },
    //       "2023-01-21": { XAU: 0.0005191 },
    //       "2023-01-22": { XAG: 0.04177371, XAU: 0.0005191 },
    //       "2023-01-23": { XAG: 0.0427716, XAU: 0.00051774 },
    //       "2023-01-24": { XAG: 0.04230861, XAU: 0.00051627 },
    //       "2023-01-25": { XAG: 0.04172404, XAU: 0.00051323 },
    //       "2023-01-26": { XAG: 0.04181301, XAU: 0.00051804 },
    //       "2023-01-27": { XAG: 0.04237827, XAU: 0.00051855 },
    //       "2023-01-28": { XAG: 0.04238545, XAU: 0.00051855 },
    //       "2023-01-29": { XAG: 0.04233521, XAU: 0.00051862 },
    //       "2023-01-30": { XAG: 0.04242915, XAU: 0.00052029 },
    //       "2023-01-31": { XAG: 0.04237288, XAU: 0.00051985 },
    //       "2023-02-01": { XAG: 0.04160426, XAU: 0.00051204 },
    //       "2023-02-02": { XAG: 0.0426312, XAU: 0.00052217 },
    //       "2023-02-03": { XAG: 0.04473773, XAU: 0.00053622 },
    //       "2023-02-04": { XAG: 0.04473973, XAU: 0.00053599 },
    //       "2023-02-05": { XAG: 0.04490406, XAU: 0.00053608 },
    //       "2023-02-06": { XAG: 0.04487726, XAU: 0.00053533 },
    //       "2023-02-07": { XAG: 0.04500855, XAU: 0.00053395 },
    //       "2023-02-08": { XAG: 0.0448833, XAU: 0.00053331 },
    //       "2023-02-09": { XAG: 0.04562044, XAU: 0.00053697 },
    //       "2023-02-10": { XAG: 0.04551869, XAU: 0.00053599 },
    //       "2023-02-11": { XAG: 0.04545661, XAU: 0.00053609 },
    //       "2023-02-12": { XAG: 0.04560379, XAU: 0.00053688 },
    //       "2023-02-13": { XAG: 0.04545496, XAU: 0.00053928 },
    //       "2023-02-14": { XAG: 0.04600028, XAU: 0.00053834 },
    //       "2023-02-15": { XAG: 0.04642763, XAU: 0.00054505 },
    //       "2023-02-16": { XAG: 0.04649, XAU: 0.00054515 },
    //       "2023-02-17": { XAG: 0.04605324, XAU: 0.00054279 },
    //       "2023-02-18": { XAG: 0.04610632, XAU: 0.00054291 },
    //       "2023-02-19": { XAG: 0.04602145, XAU: 0.00054272 },
    //       "2023-02-20": { XAG: 0.04586946, XAU: 0.00054294 },
    //       "2023-02-21": { XAG: 0.0457645, XAU: 0.00054474 },
    //       "2023-02-22": { XAG: 0.04653327, XAU: 0.00054792 },
    //       "2023-02-23": { XAG: 0.04689508, XAU: 0.00054849 },
    //       "2023-02-24": { XAG: 0.04815796, XAU: 0.00055235 },
    //       "2023-02-25": { XAG: 0.04818348, XAU: 0.00055219 },
    //       "2023-02-26": { XAG: 0.04814868, XAU: 0.00055195 },
    //       "2023-02-27": { XAG: 0.04849472, XAU: 0.0005503 },
    //       "2023-02-28": { XAG: 0.04789043, XAU: 0.00054775 },
    //       "2023-03-01": { XAG: 0.04770992, XAU: 0.0005446 },
    //       "2023-03-02": { XAG: 0.04782629, XAU: 0.00054454 },
    //       "2023-03-03": { XAG: 0.04699911, XAU: 0.00053896 },
    //       "2023-03-04": { XAG: 0.04711425, XAU: 0.00053904 },
    //       "2023-03-05": { XAG: 0.04723063, XAU: 0.00053986 },
    //       "2023-03-06": { XAG: 0.04753981, XAU: 0.00054163 },
    //       "2023-03-07": { XAG: 0.04979584, XAU: 0.00055125 },
    //       "2023-03-08": { XAG: 0.0499002, XAU: 0.00055088 },
    //       "2023-03-09": { XAG: 0.04982561, XAU: 0.00054608 },
    //       "2023-03-10": { XAG: 0.04872819, XAU: 0.00053554 },
    //       "2023-03-11": { XAG: 0.04869142, XAU: 0.00053553 },
    //       "2023-03-12": { XAG: 0.04845243, XAU: 0.00053306 },
    //       "2023-03-13": { XAG: 0.04591442, XAU: 0.00052326 },
    //       "2023-03-14": { XAG: 0.04612929, XAU: 0.00052533 },
    //       "2023-03-15": { XAG: 0.04587577, XAU: 0.00052053 },
    //       "2023-03-16": { XAG: 0.04613184, XAU: 0.00052097 },
    //       "2023-03-17": { XAG: 0.04425287, XAU: 0.00050309 },
    //       "2023-03-18": { XAG: 0.04425287, XAU: 0.00050297 },
    //       "2023-03-19": { XAG: 0.04468186, XAU: 0.00050595 },
    //       "2023-03-20": { XAG: 0.0444174, XAU: 0.00050598 },
    //       "2023-03-21": { XAG: 0.044576, XAU: 0.00051485 },
    //       "2023-03-22": { XAG: 0.04351652, XAU: 0.00050785 },
    //       "2023-03-23": { XAG: 0.04338627, XAU: 0.00050209 },
    //       "2023-03-24": { XAG: 0.04305798, XAU: 0.00050542 },
    //       "2023-03-25": { XAG: 0.0430475, XAU: 0.00050516 },
    //       "2023-03-26": { XAG: 0.04309839, XAU: 0.00050606 },
    //       "2023-03-27": { XAG: 0.04325199, XAU: 0.00051084 },
    //       "2023-03-28": { XAG: 0.04286332, XAU: 0.00050705 },
    //       "2023-03-29": { XAG: 0.04290212, XAU: 0.0005092 },
    //       "2023-03-30": { XAG: 0.04187802, XAU: 0.00050522 },
    //       "2023-03-31": { XAG: 0.041498, XAU: 0.00050795 },
    //       "2023-04-01": { XAG: 0.041498, XAU: 0.0005079 },
    //       "2023-04-02": { XAG: 0.04148164, XAU: 0.0005079 },
    //       "2023-04-03": { XAG: 0.0417533, XAU: 0.00050395 },
    //       "2023-04-04": { XAG: 0.04002505, XAU: 0.00049482 },
    //       "2023-04-05": { XAG: 0.0401027, XAU: 0.00049499 },
    //       "2023-04-06": { XAG: 0.04003543, XAU: 0.00049802 },
    //       "2023-04-07": { XAG: 0.04003463, XAU: 0.00049804 },
    //       "2023-04-08": { XAG: 0.04004169, XAU: 0.00049799 },
    //       "2023-04-09": { XAG: 0.04012307, XAU: 0.00049883 },
    //       "2023-04-10": { XAG: 0.04018689, XAU: 0.00050195 },
    //       "2023-04-11": { XAG: 0.03989924, XAU: 0.00049891 },
    //       "2023-04-12": { XAG: 0.03903448, XAU: 0.00049393 },
    //       "2023-04-13": { XAG: 0.0390506, XAU: 0.00049362 },
    //       "2023-04-14": { XAG: 0.03837354, XAU: 0.0004908 },
    //       "2023-04-15": { XAG: 0.03944408, XAU: 0.00049897 },
    //       "2023-04-16": { XAG: 0.03940903, XAU: 0.00049894 },
    //       "2023-04-17": { XAG: 0.03937996, XAU: 0.00049809 },
    //       "2023-04-18": { XAG: 0.0398462, XAU: 0.00049908 },
    //       "2023-04-19": { XAG: 0.03978775, XAU: 0.00049898 },
    //       "2023-04-20": { XAG: 0.03936853, XAU: 0.00049909 },
    //       "2023-04-21": { XAG: 0.03972279, XAU: 0.00050304 },
    //       "2023-04-22": { XAG: 0.03989769, XAU: 0.00050422 },
    //       "2023-04-23": { XAG: 0.03988177, XAU: 0.00050419 },
    //       "2023-04-24": { XAG: 0.0399361, XAU: 0.0005041 },
    //       "2023-04-25": { XAG: 0.04016535, XAU: 0.00050468 },
    //       "2023-04-26": { XAG: 0.04002982, XAU: 0.00050008 },
    //       "2023-04-27": { XAG: 0.03986684, XAU: 0.00049982 },
    //       "2023-04-28": { XAG: 0.04024068, XAU: 0.00050411 },
    //       "2023-04-29": { XAG: 0.03992278, XAU: 0.00050282 },
    //       "2023-04-30": { XAG: 0.03991999, XAU: 0.0005023 },
    //       "2023-05-01": { XAG: 0.03967705, XAU: 0.0005029 },
    //       "2023-05-02": { XAG: 0.04039865, XAU: 0.00050298 },
    //       "2023-05-03": { XAG: 0.03956859, XAU: 0.00049595 },
    //       "2023-05-04": { XAG: 0.03902134, XAU: 0.0004902 },
    //       "2023-05-05": { XAG: 0.03848074, XAU: 0.00048794 },
    //       "2023-05-06": { XAG: 0.03878373, XAU: 0.0004919 },
    //       "2023-05-07": { XAG: 0.03895561, XAU: 0.00049592 },
    //       "2023-05-08": { XAG: 0.0390356, XAU: 0.00049401 },
    //       "2023-05-09": { XAG: 0.03912099, XAU: 0.00049212 },
    //       "2023-05-10": { XAG: 0.03913435, XAU: 0.00049232 },
    //       "2023-05-11": { XAG: 0.04017576, XAU: 0.00049291 },
    //       "2023-05-12": { XAG: 0.04191247, XAU: 0.00049823 },
    //       "2023-05-13": { XAG: 0.04172752, XAU: 0.00049713 },
    //       "2023-05-14": { XAG: 0.04173797, XAU: 0.00049714 },
    //       "2023-05-15": { XAG: 0.04172958, XAU: 0.00049622 },
    //       "2023-05-16": { XAG: 0.04160238, XAU: 0.00049593 },
    //       "2023-05-17": { XAG: 0.0423007, XAU: 0.00050312 },
    //       "2023-05-18": { XAG: 0.04212811, XAU: 0.00050395 },
    //       "2023-05-19": { XAG: 0.04225053, XAU: 0.00050885 },
    //       "2023-05-20": { XAG: 0.041953, XAU: 0.000506 },
    //       "2023-05-21": { XAG: 0.0419479, XAU: 0.00050591 },
    //       "2023-05-22": { XAG: 0.04192414, XAU: 0.00050502 },
    //       "2023-05-23": { XAG: 0.04245992, XAU: 0.00050816 },
    //       "2023-05-24": { XAG: 0.04273748, XAU: 0.00050594 },
    //       "2023-05-25": { XAG: 0.04341998, XAU: 0.0005109 },
    //       "2023-05-26": { XAG: 0.04319757, XAU: 0.00051197 },
    //       "2023-05-27": { XAG: 0.0429046, XAU: 0.00051392 },
    //       "2023-05-28": { XAG: 0.042904, XAU: 0.000514 },
    //       "2023-05-29": { XAG: 0.04311331, XAU: 0.00051402 },
    //       "2023-05-30": { XAG: 0.04344536, XAU: 0.00051583 },
    //       "2023-05-31": { XAG: 0.04300191, XAU: 0.00051096 },
    //       "2023-06-01": { XAG: 0.04256381, XAU: 0.00050819 },
    //       "2023-06-02": { XAG: 0.04184607, XAU: 0.00050523 },
    //       "2023-06-03": { XAG: 0.04234445, XAU: 0.00051317 },
    //       "2023-06-04": { XAG: 0.04234445, XAU: 0.00051316 },
    //       "2023-06-05": { XAG: 0.04260615, XAU: 0.00051476 },
    //       "2023-06-06": { XAG: 0.04230963, XAU: 0.00050916 },
    //       "2023-06-07": { XAG: 0.04243692, XAU: 0.00050976 },
    //       "2023-06-08": { XAG: 0.04259016, XAU: 0.00051396 },
    //       "2023-06-09": { XAG: 0.04112767, XAU: 0.00050914 },
    //       "2023-06-10": { XAG: 0.04119526, XAU: 0.00050999 },
    //       "2023-06-11": { XAG: 0.04117321, XAU: 0.00050997 },
    //       "2023-06-12": { XAG: 0.04128868, XAU: 0.00050909 },
    //       "2023-06-13": { XAG: 0.0413436, XAU: 0.00050884 },
    //       "2023-06-14": { XAG: 0.04221943, XAU: 0.00051421 },
    //       "2023-06-15": { XAG: 0.04271942, XAU: 0.00051705 },
    //       "2023-06-16": { XAG: 0.04162021, XAU: 0.00050896 },
    //       "2023-06-17": { XAG: 0.04137529, XAU: 0.00051103 },
    //       "2023-06-18": { XAG: 0.04133078, XAU: 0.00051091 },
    //       "2023-06-19": { XAG: 0.04158034, XAU: 0.00051107 },
    //       "2023-06-20": { XAG: 0.04204181, XAU: 0.0005122 },
    //       "2023-06-21": { XAG: 0.0432944, XAU: 0.00051674 },
    //       "2023-06-22": { XAG: 0.04432551, XAU: 0.00051812 },
    //       "2023-06-23": { XAG: 0.04479745, XAU: 0.00052125 },
    //       "2023-06-24": { XAG: 0.04460211, XAU: 0.0005208 },
    //       "2023-06-25": { XAG: 0.04460261, XAU: 0.00052075 },
    //       "2023-06-26": { XAG: 0.04388434, XAU: 0.00051782 },
    //       "2023-06-27": { XAG: 0.04366347, XAU: 0.00051996 },
    //       "2023-06-28": { XAG: 0.04366761, XAU: 0.00052189 },
    //       "2023-06-29": { XAG: 0.04406253, XAU: 0.00052398 },
    //       "2023-06-30": { XAG: 0.04451246, XAU: 0.0005248 },
    //       "2023-07-01": { XAG: 0.043935, XAU: 0.000521 },
    //       "2023-07-02": { XAG: 0.04394003, XAU: 0.000521 },
    //       "2023-07-03": { XAG: 0.0438736, XAU: 0.00052227 },
    //       "2023-07-04": { XAG: 0.04343693, XAU: 0.0005182 },
    //       "2023-07-05": { XAG: 0.04362401, XAU: 0.0005198 },
    //       "2023-07-06": { XAG: 0.04314889, XAU: 0.00051977 },
    //       "2023-07-07": { XAG: 0.0440429, XAU: 0.00052195 },
    //       "2023-07-08": { XAG: 0.04233709, XAU: 0.00051924 },
    //       "2023-07-09": { XAG: 0.04340532, XAU: 0.00051919 },
    //       "2023-07-10": { XAG: 0.043406, XAU: 0.00052 },
    //       "2023-07-11": { XAG: 0.04320107, XAU: 0.0005169 },
    //       "2023-07-12": { XAG: 0.04317841, XAU: 0.00051701 },
    //       "2023-07-13": { XAG: 0.04119746, XAU: 0.00051004 },
    //       "2023-07-14": { XAG: 0.04031917, XAU: 0.00051113 },
    //       "2023-07-15": { XAG: 0.04010438, XAU: 0.00051123 },
    //       "2023-07-16": { XAG: 0.04011121, XAU: 0.00051118 },
    //       "2023-07-17": { XAG: 0.04031129, XAU: 0.00051096 },
    //       "2023-07-18": { XAG: 0.0401582, XAU: 0.00050918 },
    //       "2023-07-19": { XAG: 0.0399706, XAU: 0.00050616 },
    //       "2023-07-20": { XAG: 0.03966471, XAU: 0.00050381 },
    //       "2023-07-21": { XAG: 0.04022123, XAU: 0.000507 },
    //       "2023-07-22": { XAG: 0.04064567, XAU: 0.00050974 },
    //       "2023-07-23": { XAG: 0.04088181, XAU: 0.00050967 },
    //       "2023-07-24": { XAG: 0.04051702, XAU: 0.00050984 },
    //       "2023-07-25": { XAG: 0.04085832, XAU: 0.00050956 },
    //       "2023-07-26": { XAG: 0.04064656, XAU: 0.00050922 },
    //       "2023-07-27": { XAG: 0.03995645, XAU: 0.00050565 },
    //       "2023-07-28": { XAG: 0.04141886, XAU: 0.00051269 },
    //       "2023-07-29": { XAG: 0.04108337, XAU: 0.00051037 },
    //       "2023-07-30": { XAG: 0.04122446, XAU: 0.00051037 },
    //       "2023-07-31": { XAG: 0.04109575, XAU: 0.00051107 },
    //       "2023-08-01": { XAG: 0.04057747, XAU: 0.00050989 },
    //       "2023-08-02": { XAG: 0.04100343, XAU: 0.00051351 },
    //       "2023-08-03": { XAG: 0.0420107, XAU: 0.00051604 },
    //       "2023-08-04": { XAG: 0.04240208, XAU: 0.00051635 },
    //       "2023-08-05": { XAG: 0.04231817, XAU: 0.00051471 },
    //       "2023-08-06": { XAG: 0.04234685, XAU: 0.00051483 },
    //       "2023-08-07": { XAG: 0.04242682, XAU: 0.00051486 },
    //       "2023-08-08": { XAG: 0.04343297, XAU: 0.00051759 },
    //       "2023-08-09": { XAG: 0.04367583, XAU: 0.00051886 },
    //       "2023-08-10": { XAG: 0.04404801, XAU: 0.00052117 },
    //       "2023-08-11": { XAG: 0.04395672, XAU: 0.00052213 },
    //       "2023-08-12": { XAG: 0.04407119, XAU: 0.00052268 },
    //       "2023-08-13": { XAG: 0.0440718, XAU: 0.00052257 },
    //       "2023-08-14": { XAG: 0.04426837, XAU: 0.00052308 },
    //       "2023-08-15": { XAG: 0.04423996, XAU: 0.00052435 },
    //       "2023-08-16": { XAG: 0.04408919, XAU: 0.00052501 },
    //       "2023-08-17": { XAG: 0.0445747, XAU: 0.00052841 },
    //       "2023-08-18": { XAG: 0.04375749, XAU: 0.00052807 },
    //       "2023-08-19": { XAG: 0.04396734, XAU: 0.00052926 },
    //       "2023-08-20": { XAG: 0.04395908, XAU: 0.00052927 },
    //       "2023-08-21": { XAG: 0.04400544, XAU: 0.00053005 },
    //       "2023-08-22": { XAG: 0.04295235, XAU: 0.00052788 },
    //       "2023-08-23": { XAG: 0.04255378, XAU: 0.00052593 },
    //       "2023-08-24": { XAG: 0.04124308, XAU: 0.00052072 },
    //       "2023-08-25": { XAG: 0.04143159, XAU: 0.00052175 },
    //       "2023-08-26": { XAG: 0.04130483, XAU: 0.00052232 },
    //       "2023-08-27": { XAG: 0.04129606, XAU: 0.00052219 },
    //       "2023-08-28": { XAG: 0.04136938, XAU: 0.00052204 },
    //       "2023-08-29": { XAG: 0.04126691, XAU: 0.00052015 },
    //       "2023-08-30": { XAG: 0.04053713, XAU: 0.00051633 },
    //       "2023-08-31": { XAG: 0.04058071, XAU: 0.00051366 },
    //       "2023-09-01": { XAG: 0.04077847, XAU: 0.00051483 },
    //       "2023-09-02": { XAG: 0.04134789, XAU: 0.00051534 },
    //       "2023-09-03": { XAG: 0.04133984, XAU: 0.00051549 },
    //       "2023-09-04": { XAG: 0.0413145, XAU: 0.00051449 },
    //       "2023-09-05": { XAG: 0.04188424, XAU: 0.00051666 },
    //       "2023-09-06": { XAG: 0.0425778, XAU: 0.00051933 },
    //       "2023-09-07": { XAG: 0.04318269, XAU: 0.00052102 },
    //       "2023-09-08": { XAG: 0.04327631, XAU: 0.00051923 },
    //       "2023-09-09": { XAG: 0.04362907, XAU: 0.00052107 },
    //       "2023-09-10": { XAG: 0.04362909, XAU: 0.00052108 },
    //       "2023-09-11": { XAG: 0.04351989, XAU: 0.00052074 },
    //       "2023-09-12": { XAG: 0.04333039, XAU: 0.0005202 },
    //       "2023-09-13": { XAG: 0.04377752, XAU: 0.00052375 },
    //       "2023-09-14": { XAG: 0.0436924, XAU: 0.00052292 },
    //       "2023-09-15": { XAG: 0.04342478, XAU: 0.00051985 },
    //       "2023-09-16": { XAG: 0.0434212, XAU: 0.00051986 },
    //       "2023-09-17": { XAG: 0.04337549, XAU: 0.00051984 },
    //       "2023-09-18": { XAG: 0.04321892, XAU: 0.00051912 },
    //       "2023-09-19": { XAG: 0.04301881, XAU: 0.00051742 },
    //       "2023-09-20": { XAG: 0.04322493, XAU: 0.0005183 },
    //       "2023-09-21": { XAG: 0.04338794, XAU: 0.00051962 },
    //       "2023-09-22": { XAG: 0.04268036, XAU: 0.00052007 },
    //       "2023-09-23": { XAG: 0.04244641, XAU: 0.00051941 },
    //       "2023-09-24": { XAG: 0.04245372, XAU: 0.00051932 },
    //       "2023-09-25": { XAG: 0.04246738, XAU: 0.00051969 },
    //       "2023-09-26": { XAG: 0.04331189, XAU: 0.00052208 },
    //       "2023-09-27": { XAG: 0.04397644, XAU: 0.00052617 },
    //       "2023-09-28": { XAG: 0.04430242, XAU: 0.00053284 },
    //       "2023-09-29": { XAG: 0.04423752, XAU: 0.00053614 },
    //       "2023-09-30": { XAG: 0.04507286, XAU: 0.00054098 },
    //       "2023-10-01": { XAG: 0.04507652, XAU: 0.00054094 },
    //       "2023-10-02": { XAG: 0.04538346, XAU: 0.00054138 },
    //       "2023-10-03": { XAG: 0.04791371, XAU: 0.00054835 },
    //       "2023-10-04": { XAG: 0.04723614, XAU: 0.00054837 },
    //       "2023-10-05": { XAG: 0.0473498, XAU: 0.00054752 },
    //       "2023-10-06": { XAG: 0.04771318, XAU: 0.00054935 },
    //       "2023-10-07": { XAG: 0.04631055, XAU: 0.00054564 },
    //       "2023-10-08": { XAG: 0.04630999, XAU: 0.00054562 },
    //       "2023-10-09": { XAG: 0.04577455, XAU: 0.0005411 },
    //       "2023-10-10": { XAG: 0.04567233, XAU: 0.00053674 },
    //       "2023-10-11": { XAG: 0.04580434, XAU: 0.00053725 },
    //       "2023-10-12": { XAG: 0.04535174, XAU: 0.00053329 },
    //       "2023-10-13": { XAG: 0.04566079, XAU: 0.00053403 },
    //       "2023-10-14": { XAG: 0.04403046, XAU: 0.00051747 },
    //       "2023-10-15": { XAG: 0.04403067, XAU: 0.00051734 },
    //       "2023-10-16": { XAG: 0.04423017, XAU: 0.00052015 },
    //       "2023-10-17": { XAG: 0.04436952, XAU: 0.00052188 },
    //       "2023-10-18": { XAG: 0.0437114, XAU: 0.00051854 },
    //       "2023-10-19": { XAG: 0.04371681, XAU: 0.00051269 },
    //       "2023-10-20": { XAG: 0.0434915, XAU: 0.00050686 },
    //       "2023-10-21": { XAG: 0.04279494, XAU: 0.00050482 },
    //       "2023-10-22": { XAG: 0.04282997, XAU: 0.00050475 },
    //       "2023-10-23": { XAG: 0.04326728, XAU: 0.00050825 },
    //       "2023-10-24": { XAG: 0.04327787, XAU: 0.00050577 },
    //       "2023-10-25": { XAG: 0.04346126, XAU: 0.00050645 },
    //       "2023-10-26": { XAG: 0.04372981, XAU: 0.0005041 },
    //       "2023-10-27": { XAG: 0.0438406, XAU: 0.00050388 },
    //       "2023-10-28": { XAG: 0.04329708, XAU: 0.00049834 },
    //       "2023-10-29": { XAG: 0.04326965, XAU: 0.00049837 },
    //       "2023-10-30": { XAG: 0.04328536, XAU: 0.00049918 },
    //       "2023-10-31": { XAG: 0.04302805, XAU: 0.00050091 },
    //       "2023-11-01": { XAG: 0.0440247, XAU: 0.00050488 },
    //       "2023-11-02": { XAG: 0.04354698, XAU: 0.00050363 },
    //       "2023-11-03": { XAG: 0.04408922, XAU: 0.00050393 },
    //       "2023-11-04": { XAG: 0.04308317, XAU: 0.00050191 },
    //       "2023-11-05": { XAG: 0.04273819, XAU: 0.00050188 },
    //       "2023-11-06": { XAG: 0.0431005, XAU: 0.00050212 },
    //       "2023-11-07": { XAG: 0.04361575, XAU: 0.00050636 },
    //       "2023-11-08": { XAG: 0.04431766, XAU: 0.00050784 },
    //       "2023-11-09": { XAG: 0.04434797, XAU: 0.00051253 },
    //       "2023-11-10": { XAG: 0.04403704, XAU: 0.0005104 },
    //       "2023-11-11": { XAG: 0.0449215, XAU: 0.00051594 },
    //       "2023-11-12": { XAG: 0.04492097, XAU: 0.00051593 },
    //       "2023-11-13": { XAG: 0.04523189, XAU: 0.00051537 },
    //       "2023-11-14": { XAG: 0.04478823, XAU: 0.00051407 },
    //       "2023-11-15": { XAG: 0.04331952, XAU: 0.00050938 },
    //       "2023-11-16": { XAG: 0.0429358, XAU: 0.00051108 },
    //       "2023-11-17": { XAG: 0.04198022, XAU: 0.00050388 },
    //       "2023-11-18": { XAG: 0.04199484, XAU: 0.00050487 },
    //       "2023-11-19": { XAG: 0.04199484, XAU: 0.00050487 },
    //       "2023-11-20": { XAG: 0.04228913, XAU: 0.00050494 },
    //       "2023-11-21": { XAG: 0.04208788, XAU: 0.00050265 },
    //       "2023-11-22": { XAG: 0.04205981, XAU: 0.00050102 },
    //       "2023-11-23": { XAG: 0.04222349, XAU: 0.00050152 },
    //       "2023-11-24": { XAG: 0.04221101, XAU: 0.00050173 },
    //       "2023-11-25": { XAG: 0.04109905, XAU: 0.00049934 },
    //       "2023-11-26": { XAG: 0.04117679, XAU: 0.00049923 },
    //       "2023-11-27": { XAG: 0.0406619, XAU: 0.00049751 },
    //       "2023-11-28": { XAG: 0.04062091, XAU: 0.00049638 },
    //       "2023-11-29": { XAG: 0.03977394, XAU: 0.0004883 },
    //       "2023-11-30": { XAG: 0.04003981, XAU: 0.00048934 },
    //       "2023-12-01": { XAG: 0.03949824, XAU: 0.00048983 },
    //       "2023-12-02": { XAG: 0.03924139, XAU: 0.00048269 },
    //       "2023-12-03": { XAG: 0.03923908, XAU: 0.00048268 },
    //       "2023-12-04": { XAG: 0.0393074, XAU: 0.00047949 },
    //       "2023-12-05": { XAG: 0.04075316, XAU: 0.00049137 },
    //     },
    //   },
    // };
    console.log("====================================");
    console.log(response.data);
    console.log("====================================");

    const exchangeRatesData = response.data;

    // Save the data to MongoDB using the Mongoose model
    const savedData = await historicalRatesModel.create(exchangeRatesData);

    res.status(200).json({
      data: savedData,
    });
  } catch (error) {
    console.error("Error fetching or saving data:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

exports.getHistoricalRates = catchAsyncError(async (req, res, next) => {
  try {
    const timeZone = "Asia/Karachi";
    const now = new Date();
    const nowInPKT = utcToZonedTime(now, timeZone);
    console.log("====================================");
    console.log(req.params.timeperiod);
    console.log("====================================");

    let startDate = null,
      endDate = null;

    if (req.params.timeperiod === "thisMonth") {
      startDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth(), 1);
      endDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth() + 1, 0);
    } else if (req.params.timeperiod === "lastMonth") {
      startDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth() - 1, 1);
      endDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth(), 0);
    } else if (req.params.timeperiod === "last3Months") {
      startDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth() - 2, 1);
      endDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth() + 1, 0);
    } else if (req.params.timeperiod === "last6Months") {
      startDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth() - 5, 1);
      endDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth() + 1, 0);
    } else if (req.params.timeperiod === "last9Months") {
      startDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth() - 8, 1);
      endDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth() + 1, 0);
    } else if (req.params.timeperiod === "thisYear") {
      startDate = new Date(nowInPKT.getFullYear(), 0, 1);
      endDate = new Date(nowInPKT.getFullYear(), 11, 31, 23, 59, 59, 999);
    }

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    let startedFormattedDate = moment(startDate)
      .tz("Asia/karachi")
      .format("YYYY-MM-DD");
    let endingFormattedDate = moment(endDate)
      .tz("Asia/karachi")
      .format("YYYY-MM-DD");
    let dataArray = [];
    dataArray = {
      _id: "",
      success: "",
      base: "",
      start_date: "",
      end_date: "",
      rates: [],
    };
    const data = await historicalRatesModel.find();

    dataArray._id = data[0]?._id;
    dataArray.success = data[0]?.success;
    dataArray.base = data[0]?.base;
    dataArray.start_date = startedFormattedDate;
    dataArray.end_date = endingFormattedDate;
    console.log("====================================");
    console.log(dataArray);
    console.log("====================================");
    const rateee = data[0].rates.forEach((value, key) => {
      if (key >= startedFormattedDate && key <= endingFormattedDate) {
        const dateRate = {
          key: key,
          XAG: value.XAG,
          XAU: value.XAU,
        };
        dataArray.rates.push(dateRate);
        console.log("====================================");
        console.log(dateRate);
        console.log("====================================");
      }
    });
    console.log(rateee);
    // const filteredData = data.map((entry) => {
    //   console.log("====================================");
    //   console.log(entry.rates["2023-02-20"]);
    //   console.log("====================================");
    //   const filteredRates = Object.entries(entry.rates).reduce(
    //     (acc, [date, ratesEntry]) => {
    //       const currentDate = new Date(date);
    //       console.log("====================================");
    //       console.log(entry.rates);
    //       console.log("====================================");
    //       if (currentDate >= startDate && currentDate <= endDate) {
    //         acc[date] = ratesEntry;
    //       }
    //       return acc;
    //     },
    //     {}
    //   );

    //   console.log("====================================");
    //   console.log("Filtered Rates", filteredRates);
    //   console.log("====================================");
    //   return {
    //     ...entry,
    //     rates: filteredRates,
    //   };
    // });

    // console.log(filteredData);
    // const data = await historicalRatesModel
    //   .aggregate([
    //     {
    //       $match: {
    //         rates: {
    //           $gte: startDate,
    //           $lte: endDate,
    //         },
    //       },
    //     },
    //   ])
    //   .sort({ createdAt: "desc" });
    // console.log(data);

    res.status(200).json(dataArray);
  } catch (error) {
    console.error("Error fetching or saving data:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
