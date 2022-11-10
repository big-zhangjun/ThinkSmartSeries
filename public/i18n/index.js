import Vue from 'vue';
import VueI18n from 'vue-i18n';

// 导入语言包信息
import English from "./locale/English/en.json";
import Arabic from "./locale/Arabic/en.json"
import Bulgarian from "./locale/Bulgarian/en.json"
import Croatian from "./locale/Croatian/en.json"
import Czech from "./locale/Czech/en.json"
import Danish from "./locale/Danish/en.json"
import Dutch from "./locale/Dutch/en.json"
import Finnish from "./locale/Finnish/en.json"
import French from "./locale/French/en.json"
import German from "./locale/German/en.json"
import Greek from "./locale/Greek/en.json"
import Hebrew from "./locale/Hebrew/en.json"
import Indonesian from "./locale/Indonesian/en.json"
import Italian from "./locale/Italian/en.json"
import Japanese from "./locale/Japanese/en.json"
import Korean from "./locale/Korean/en.json"
import Norwegian from "./locale/Norwegian/en.json"
import Polish from "./locale/Polish/en.json"
import Romanian from "./locale/Romanian/en.json"
import Russian from "./locale/Russian/en.json"
import Slovak from "./locale/Slovak/en.json"
import Slovenian from "./locale/Slovenian/en.json"
import Spanish from "./locale/Spanish/en.json"
import Swedish from "./locale/Swedish/en.json"
import Turkish from "./locale/Turkish/en.json"
import Ukrainian from "./locale/Ukrainian/en.json"
import SChinese from "./locale/SChinese/en.json"
import TChinese from "./locale/TChinese/en.json"
import HU from "./locale/HU/en.json"
import PT from "./locale/PT/en.json"
import PTBR from "./locale/PT-BR/en.json"
import SRLATN from "./locale/SR-LATN/en.json"
import TH from "./locale/TH/en.json"

// 注册i18n
Vue.use(VueI18n);

// 语言包根据语言环境分类
const messages = {
    English,
    Arabic,
    Bulgarian,
    Croatian,
    Czech,
    Danish,
    Dutch,
    Finnish,
    French,
    German,
    Greek,
    Hebrew,
    Indonesian,
    Italian,
    Japanese,
    Korean,
    Norwegian,
    Polish,
    Romanian,
    Russian,
    Slovak,
    Slovenian,
    Spanish,
    Swedish,
    Turkish,
    Ukrainian,
    SChinese,
    TChinese,
    HU,
    PT,
    PTBR,
    SRLATN,
    TH,
}
// 通过选项创建 VueI18n 实例并导出
export default new VueI18n({
    locale: 'TH', // 设置当前语言环境，默认英文
    messages, // 设置语言环境对应信息
})