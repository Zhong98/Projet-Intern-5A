var express = require('express');
var router = express.Router();
var connection = require('../sql');
var QcloudSms = require('qcloudsms_js');
var jwt = require('jsonwebtoken');
const alipaySdk=require('../alipay');
const AlipayFormData=require('alipay-sdk/lib/form').default;
const axios = require('axios');

function getTokenLife(exp) {
    let getTime = parseInt(  new Date().getTime() / 1000 );
    if(  getTime - exp  >  86400 ){ //La vie de token est un jours
        return true;
    }
}

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.get('/api/tabList/0/data/1', function (req, res) {
    res.send({
        code: 0,
        data: {
            funTabList: [
                {index: 0, title: '推荐'},
                {index: 1, title: '铁观音'},
                {index: 2, title: '大红袍'},
                {index: 3, title: '绿茶'},
                {index: 4, title: '茉莉花茶'},
                {index: 5, title: '普洱'},
                {index: 6, title: '茶具'},
                {index: 7, title: '龙井'}
            ],
            data: [
                {
                    id: 0,
                    type: 'swiper',
                    data: [
                        {id: 1, imgUrl: "/images/swiper1.jpeg"},
                        {id: 2, imgUrl: "/images/swiper2.jpeg"},
                        {id: 3, imgUrl: "/images/swiper3.jpeg"}
                    ]
                },
                {
                    id: 1,
                    type: 'icon',
                    data: [
                        {id: 1, imgURL: '/images/icons1.png', title: '自饮茶'},
                        {id: 2, imgURL: '/images/icons2.png', title: '品牌茶'},
                        {id: 3, imgURL: '/images/icons3.png', title: '茶具'},
                        {id: 4, imgURL: '/images/icons4.png', title: '领福利'},
                        {id: 5, imgURL: '/images/icons5.png', title: '官方验证'}
                    ]
                },
                {
                    id: 2,
                    type: 'recommend',
                    data: [
                        {name: '铁观音2号250g', text: '核心产区滋味正', price: 128, imgURL: '/images/recommend1.jpeg'},
                        {
                            name: '正山小种3号150g',
                            text: '难以忘怀的桂花香',
                            price: 99,
                            imgURL: '/images/recommend2.jpeg'
                        },
                        {
                            name: '黑檀镂空六君子',
                            text: '给生活一点精致的仪式感',
                            price: 45,
                            imgURL: '/images/recommend3.jpeg'
                        }
                    ]
                },
                {
                    id: 3,
                    type: 'like',
                    data: [
                        {name: '武夷山高级大红袍2号', imgURL: '/images/like1.jpeg', price: 99},
                        {name: '武夷山灰芽花香金骏眉3号', imgURL: '/images/like2.jpeg', price: 128},
                        {name: '2022春茶明前龙井飞花', imgURL: '/images/like3.jpeg', price: 128},
                        {name: '云南凤庆高海拔古树滇红', imgURL: '/images/like4.jpeg', price: 99}
                    ]
                }
            ]
        }
    })
});

router.get('/api/tabList/1/data/1', function (req, res) {
    res.send({
        code: 0,
        data: {
            funTabList: [
                {index: 0, title: '推荐'},
                {index: 1, title: '铁观音'},
                {index: 2, title: '大红袍'},
                {index: 3, title: '绿茶'},
                {index: 4, title: '茉莉花茶'},
                {index: 5, title: '普洱'},
                {index: 6, title: '茶具'},
                {index: 7, title: '龙井'}
            ],
            data: [
                {
                    id: 0,
                    type: 'ad',
                    data: [
                        {imgURL: '/images/tgy.jpg'}
                    ]
                },
                {
                    id: 1,
                    type: 'like',
                    data: [
                        {name: '武夷山高级大红袍2号', imgURL: '/images/like1.jpeg', price: 99},
                        {name: '武夷山灰芽花香金骏眉3号', imgURL: '/images/like2.jpeg', price: 128},
                        {name: '2022春茶明前龙井飞花', imgURL: '/images/like3.jpeg', price: 128},
                        {name: '云南凤庆高海拔古树滇红', imgURL: '/images/like4.jpeg', price: 99}
                    ]
                }
            ]
        }
    })
})
//搜索页
router.get('/api/search/index', function (req, res) {
    res.send({
        code: 0,
        data: {
            hotSearch: ['易冲泡茶叶', '经典紫砂壶', '送礼', '旅行茶具', '待客茶', '福鼎白茶', '绿茶', '大师壶'],
            products: [
                {text: '云南凤庆经典蜜香滇红', price: 88, imgURL: '/images/recommend4.jpeg', tip: '外形讨喜 甘甜可口'},
                {text: '无烟工艺正山小种2号', price: 89, imgURL: '/images/recommend5.jpeg', tip: '浓厚薯蜜香'},
                {text: '武夷山高级大红袍2号', price: 99, imgURL: '/images/recommend6.jpeg', tip: '轻火烘焙 天然花香'},
                {text: '2022春茶明前龙井飞花', price: 128, imgURL: '/images/recommend7.jpeg', tip: '只采单芽 满口鲜活'},
                {text: '雨前头采碧螺春1号散茶', price: 68, imgURL: '/images/recommend8.jpeg', tip: '花果香浓 韵味悠长'},
                {text: '黄山太平猴魁绿茶1号', price: 99, imgURL: '/images/recommend9.jpeg', tip: '正宗原产 幽香口感'}
            ]
        }
    })
})

//搜索结果页
router.get('/api/search/results', function (req, res) {
    let keys = Object.keys(req.query);
    let vals = Object.values(req.query)
    let title = req.query.title;
    let sql = '';
    if (keys.length > 1) { //判断是不是综合
        let orderName = keys[1];
        let order = vals[1];
        sql = 'select * from product where title like "%' + title + '%" ORDER BY ' + orderName + ' ' + order;
    } else {
        sql = 'select * from product where title like "%' + title + '%"'
    }
    connection.query(sql, function (error, results) {
        res.send({
            code: 0,
            data: results
        })
    })
})

//分类页
router.get('/api/list/teaList', function (req, res) {
    res.send({
        code: 0,
        data: [
            {
                name: '推荐', data: [
                    {imgURL: '/images/list/1.jpeg', name: '紫砂壶'}, {
                        imgURL: '/images/list/wulong.jpeg',
                        name: '铁观音'
                    }, {imgURL: '/images/list/redTea.jpeg', name: '金骏眉'},
                    {imgURL: '/images/list/greenTea.jpeg', name: '龙井'}
                ]
            },
            {
                name: '新品', data: [
                    {imgURL: '/images/list/new.jpeg', name: '5月新品'}
                ]
            },
            {
                name: '绿茶', data: [
                    {imgURL: '/images/list/greenTea.jpeg', name: '龙井'}, {
                        imgURL: '/images/list/greenTea.jpeg',
                        name: '黄山毛峰'
                    }, {imgURL: '/images/list/greenTea.jpeg', name: '碧螺春'},
                    {imgURL: '/images/list/greenTea.jpeg', name: '雀舌'}, {
                        imgURL: '/images/list/greenTea.jpeg',
                        name: '太平猴魁'
                    }, {imgURL: '/images/list/greenTea.jpeg', name: '珍稀白茶'},
                    {imgURL: '/images/list/greenTea.jpeg', name: '六安瓜片'}
                ]
            },
            {
                name: '乌龙', data: [
                    {imgURL: '/images/list/wulong.jpeg', name: '永春佛手'}, {
                        imgURL: '/images/list/wulong.jpeg',
                        name: '铁观音'
                    }, {imgURL: '/images/list/wulong.jpeg', name: '武夷岩茶'},
                    {imgURL: '/images/list/wulong.jpeg', name: '漳平水仙'}
                ]
            },
            {
                name: '红茶', data: [
                    {imgURL: '/images/list/redTea.jpeg', name: '英德红茶'}, {
                        imgURL: '/images/list/redTea.jpeg',
                        name: '坦洋工夫'
                    }, {imgURL: '/images/list/redTea.jpeg', name: '金骏眉'},
                    {imgURL: '/images/list/redTea.jpeg', name: '正山小种'}, {
                        imgURL: '/images/list/redTea.jpeg',
                        name: '云南滇红'
                    }, {imgURL: '/images/list/redTea.jpeg', name: '祁门红茶'}
                ]
            },
            {
                name: '白茶', data: [
                    {imgURL: '/images/list/whiteTea.jpeg', name: '白牡丹'}, {
                        imgURL: '/images/list/whiteTea.jpeg',
                        name: '牡丹王'
                    }, {imgURL: '/images/list/whiteTea.jpeg', name: '白毫银针'},
                    {imgURL: '/images/list/whiteTea.jpeg', name: '寿眉'}
                ]
            },
            {
                name: '普洱', data: [
                    {imgURL: '/images/list/puer.jpeg', name: '生茶'}, {imgURL: '/images/list/puer.jpeg', name: '熟茶'}
                ]
            },
            {
                name: '花茶', data: [
                    {imgURL: '/images/list/flowerTea.jpeg', name: '茉莉花茶'}
                ]
            },
            {
                name: '茶具', data: [
                    {imgURL: '/images/list/1.jpeg', name: '紫砂壶'}, {
                        imgURL: '/images/list/1.jpeg',
                        name: '茶宠'
                    }, {imgURL: '/images/list/1.jpeg', name: '建盏'},
                    {imgURL: '/images/list/1.jpeg', name: '功夫茶具'}, {
                        imgURL: '/images/list/1.jpeg',
                        name: '茶具配件'
                    }, {imgURL: '/images/list/1.jpeg', name: '主人杯'}
                ]
            },
        ]
    })
})

//商品详情页
router.get('/api/detail/productDetail', function (req, res) {
    let product = req.query.product;
    let sql = "select * from product where title='" + product + "'";
    connection.query(sql, function (err, results) {
        res.send({
            code: 0,
            data: results
        })
    })
})

//登录
router.post('/api/login', function (req, res) {
    let userTel = req.body.data.userTel; //post从body中取值
    let pwd = req.body.data.userPwd;

    //生成token
    let secret = 'zzx';
    //token存储的信息
    let payload = {tel: userTel}
    let token = jwt.sign(payload, secret,{
        expiresIn: 60 //60s后token过期
    });

    let sql = "select * from user where tel='" + userTel + "' and pwd='" + pwd + "'"
    connection.query(sql, function (error, results) {
        if (results.length !== 1) {
            res.send({
                code: 301,
                data: {
                    success: false,
                    msg: '账号或密码不正确'
                }
            })
        } else {
            sql=`update user set token='${token}' where tel='${userTel}'` //每次登录成功更新token
            connection.query(sql,function () {
                res.send({
                    code: 0,
                    data: {
                        success: true,
                        msg: '登录成功',
                        userInfo: results[0]
                    }
                })
            })
        }
    })
})

//发送短信验证码
router.post('/api/smscode', function (req, res) {

    let tel = req.body.phone;

    // 短信应用SDK AppID
    var appid = 1400187558;  // SDK AppID是1400开头

    // 短信应用SDK AppKey
    var appkey = "dc9dc3391896235ddc2325685047edc7";

    // 需要发送短信的手机号码
    var phoneNumbers = [tel];

    // 短信模板ID，需要在短信应用中申请
    var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

    // 签名
    var smsSign = "三人行慕课";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

    // 实例化QcloudSms
    var qcloudsms = QcloudSms(appid, appkey);

    // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
    function callback(err, ress, resData) {
        if (err) {
            console.log("err: ", err);
        } else {
            res.send({
                code: 200,
                data: {
                    success: true,
                    data: ress.req.body.params[0]
                }
            })
        }
    }

    var ssender = qcloudsms.SmsSingleSender();
    //这个变量：params 就是往手机上，发送的短信
    var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000];
    ssender.sendWithParam(86, phoneNumbers[0], templateId,
        params, smsSign, "", "", callback);  // 签名参数不能为空串

})

//短信登录
router.post('/api/addUser', function (req, res) {
    let userTel = req.body.data.phone;
    //生成token
    let secret = 'zzx';
    //token存储的信息
    let payload = {tel: userTel}
    let token = jwt.sign(payload, secret,{
        expiresIn: 60 //60s后token过期
    });
    //用户是否存在
    let sql1 = "select * from user where tel='" + userTel + "'"
    connection.query(sql1, function (error, result) {
        if (result.length > 0) {
            sql1=`update user set token='${token}' where tel='${userTel}'` //登录成功更新token
            res.send({
                code: 0,
                data: {
                    success: true,
                    msg: '登录成功',
                    userInfo: result[0]
                }
            })
        } else {
            //不存在则先添加再查询返回
            let sql2 = "insert into user(tel,pwd,imgURL,nickname,token) values(" + userTel + ",'111111','/touxiang.jpeg','" + userTel + "','" + token + "')";
            connection.query(sql2, function () {
                connection.query(sql1, function (error, r) {
                    res.send({
                        code: 0,
                        data: {
                            success: true,
                            msg: '登录成功',
                            userInfo: r[0]
                        }
                    })
                })
            })
        }
    })
})

//注册
router.post('/api/register', function (req, res) {
    let tel = req.body.data.phone;
    let pwd = req.body.data.pwd;
    //生成token
    let secret = 'zzx';
    let payload = {tel: tel}
    let token = jwt.sign(payload, secret,{
        expiresIn: 60
    });

    let sql1 = "select * from user where tel='" + tel + "'";
    let sql2 = "insert into user(tel,pwd,imgURL,nickname,token) values(" + tel + ",'" + pwd + "','/touxiang.jpeg','" + tel + "','" + token + "')";
    //用户是否存在
    connection.query(sql1, function (error, result) {
        if (result.length > 0) {
            res.send({
                code: 0,
                data: {
                    success: false,
                    msg: '该用户已存在,请登录',
                }
            })
        } else {
            connection.query(sql2, function () {
                connection.query(sql1, function (error, r) {
                    res.send({
                        code: 0,
                        data: {
                            success: true,
                            msg: '注册成功,即将跳转到登录页',
                            userInfo: r[0]
                        }
                    })
                })
            })
        }
    })
})

//找回密码
router.post('/api/recovery', function (req, res) {
    let tel = req.body.data.phone;
    let sql1 = "select * from user where tel='" + tel + "'";
    connection.query(sql1, function (error, result) {
        if (result.length === 0) {
            res.send({
                code: 0,
                data: {
                    success: false,
                    msg: '该用户不存在',
                }
            })
        }
        let pwd = req.body.data.pwd;
        if (pwd !== undefined) {
            let sql2 = "update user set pwd='" + pwd + "' where tel='" + tel + "'";
            connection.query(sql2, function () {
                res.send({
                    code: 0,
                    data: {
                        success: true,
                        msg: '密码修改成功,即将跳转到登录页',
                    }
                })
            })
        }
    })
})

//添加购物车
router.post('/api/addCart', function (req, response) {
    let token = req.body.headers.token
    let tokenObjet = jwt.decode(token);
    //如果执行，就证明token过期了
    if(  getTokenLife(tokenObjet.exp) ){
        response.send({
            data:{
                code:1000
            }
        })
    }

    let tel = tokenObjet.tel || 11111111111
    let productId = req.body.data.id;
    let sql = `select * from user where tel=${tel}`;

    connection.query(sql, function (error, results) {
        let uid = results[0].id || 1;
        //查询商品信息
        sql = `select * from product where id=${productId}`
        connection.query(sql, function (err, res) {
            //查询该用户之前是否添加过该商品
            sql = `select * from cart where uid=${uid} and product_id=${productId}`
            connection.query(sql, function (e, r) {
                if (r.length) {
                    //添加过
                    sql = `update cart set product_num=${r[0].product_num+1} where id=${r[0].id}`
                    connection.query(sql, function () {
                        response.send({
                            code: 200,
                            data: {
                                success: true,
                                msg: '已添加到购物车'
                            }
                        })
                    })
                } else {
                    //未添加过
                    let product_name = res[0].title;
                    let product_price = res[0].price;
                    let product_imgURL = res[0].imgURL;
                    sql = `insert into cart(uid,product_id,product_name,product_price,product_num,product_imgURL) values(${uid},${productId},'${product_name}',${product_price},1,'${product_imgURL}')`;
                    connection.query(sql, function () {
                        response.send({
                            code: 200,
                            data: {
                                success: true,
                                msg: '已添加到购物车'
                            }
                        })
                    })
                }
            })


        })
    })
})

//购物车数据渲染
router.post('/api/getCart', function (req, res) {
    let token = req.body.headers.token;
    let tokenObjet = jwt.decode(token);
    //如果执行，就证明token过期了
    if(  getTokenLife(tokenObjet.exp) ){
        res.send({
            data:{
                code:1000
            }
        })
    }
    let tel = tokenObjet.tel;
    let sql = `select * from user where tel=${tel}`;
    connection.query(sql, function (error, results) {
        if (results.length) {

            sql = `select * from cart where uid=${results[0].id}`;
            connection.query(sql, function (er, re) {
                res.send({
                    code: 200,
                    data: {
                        success: true,
                        cartInfo: re
                    }
                })
            })
        }
    })

})

//删除购物车商品
router.post('/api/deleteCart', function (req, res) {
    let idArr = req.body.data.idArr;
    idArr.forEach(v => {
        connection.query(`delete from cart where id=${v}`, function () {
            res.send({
                data: {
                    code: 200,
                    success: true,
                    msg: '删除成功'
                }
            })
        })
    })
})

//更新购物车商品数量
router.post('/api/updateCartNum', function (req, res) {
    let num = req.body.data.num;
    let id = req.body.data.id;
    connection.query(`update cart set product_num=${num} where id=${id}`, function () {
        res.send({
            data: {
                code: 200,
                success: true,
            }
        })
    })
})

//添加地址
router.post('/api/addOrEditAddress', function (req, res) {
    let [action, name, tel, province, city, county, areaCode, addressDetail, isDefault] = [
        req.body.data.action,
        req.body.data.name,
        req.body.data.tel,
        req.body.data.province,
        req.body.data.city,
        req.body.data.county,
        req.body.data.areaCode,
        req.body.data.addressDetail,
        req.body.data.isDefault
    ]

    let token = req.body.headers.token
    let tokenObjet = jwt.decode(token);

    if(  getTokenLife(tokenObjet.exp) ){
        res.send({
            data:{
                code:1000
            }
        })
    }else{
        console.log(action);

        let sql = `select * from user where tel=${tokenObjet.tel}`;
        connection.query(sql, function (error, results) {
            let uid = results[0].id

            console.log(uid);

            if (!action) { //action为0说明为添加
                if (isDefault) { //添加的是否是默认地址，默认地址只能有一个
                    sql = `update address set isDefault=0`
                    connection.query(sql, function () {
                        sql = `insert into address(uid,name,tel,province,city,county,areaCode,addressDetail,isDefault) values(${uid},'${name}','${tel}','${province}','${city}','${county}','${areaCode}','${addressDetail}',${isDefault})`
                        connection.query(sql, function () {
                            res.send({
                                data: {
                                    code: 200,
                                    success: true,
                                    msg: '添加成功'
                                }
                            })
                        })
                    })
                } else {
                    sql = `insert into address(uid,name,tel,province,city,county,areaCode,addressDetail,isDefault) values(${uid},'${name}','${tel}','${province}','${city}','${county}','${areaCode}','${addressDetail}',${isDefault})`
                    connection.query(sql, function () {
                        res.send({
                            data: {
                                code: 200,
                                success: true,
                                msg: '添加成功'
                            }
                        })
                    })
                }
            } else { //update address
                if (isDefault) { //默认地址只能有一个
                    sql = `update address set isDefault=0`
                    connection.query(sql, function () {
                        sql = `update address set uid=${uid},name='${name}',tel='${tel}',province='${province}',city='${city}',county='${county}',
                          areaCode='${areaCode}',addressDetail='${addressDetail}',isDefault=${isDefault} 
                          where id=${action}`
                        connection.query(sql, function () {
                            res.send({
                                data: {
                                    code: 200,
                                    success: true,
                                    msg: '修改成功'
                                }
                            })
                        })
                    })
                } else {
                    sql = `update address set uid=${uid},name='${name}',tel='${tel}',province='${province}',city='${city}',county='${county}',
                          areaCode='${areaCode}',addressDetail='${addressDetail}',isDefault=${isDefault} 
                          where id=${action}`
                    connection.query(sql, function () {
                        res.send({
                            data: {
                                code: 200,
                                success: true,
                                msg: '修改成功'
                            }
                        })
                    })
                }
            }
        })
    }
})

//获取用户地址
router.post('/api/getAddress', function (req, res) {
    let token = req.body.headers.token
    let tokenObjet = jwt.decode(token);

    if(  getTokenLife(tokenObjet.exp) ){
        res.send({
            data:{
                code:1000
            }
        })
    }else{
        let tel = tokenObjet.tel;
        let sql = `select * from user where tel=${tel}`;
        connection.query(sql, function (error, results) {
            let uid = results[0].id
            sql = `select * from address where uid=${uid}`

            connection.query(sql, function (error, results) {
                res.send({
                    data: {
                        code: 200,
                        success: true,
                        addressList: results
                    }
                })
            })
        })
    }
})

//删除地址
router.post('/api/deleteAddress', function (req, res) {
    let id = req.body.data.id
    let sql = `delete from address where id=${id}`
    connection.query(sql, function () {
        res.send({
            data: {
                code: 200,
                success: true,
                msg: '删除成功'
            }
        })
    })
})

//创建订单
router.post('/api/createOrder', function (req, res) {
    let products = req.body.data.products
    let price = req.body.data.orderPrice;
    let num = req.body.data.orderNum;

    function setTimeDateFmt(s) {
        return s < 10 ? '0' + s : s
    }

    function randomNumber() {
        const now = new Date();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hour = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        month = setTimeDateFmt(month);
        day = setTimeDateFmt(day);
        hour = setTimeDateFmt(hour);
        minutes = setTimeDateFmt(minutes);
        seconds = setTimeDateFmt(seconds);
        return now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString();
    }

    let orderID = randomNumber()

    let token = req.body.headers.token
    let tokenObjet = jwt.decode(token);
    let tel = tokenObjet.tel;

    let sql = `select * from user where tel=${tel}`;
    connection.query(sql, function (error, results) {
        let uid = results[0].id
        sql = `insert into store_order(uid,order_id,product_list,order_num,order_price,order_status) values(${uid},'${orderID}','${products}',${num},${price},1)`;
        connection.query(sql, function () {
            res.send({
                data: {
                    code: 200,
                    success: true,
                    orderID: orderID
                }
            })
        })
    })
})

//获取订单信息
router.post('/api/getOrder', function (req, res) {
    let orderID = req.body.data.orderID;
    let sql = `select * from store_order where order_id=${orderID}`
    connection.query(sql, function (e, r) {
        res.send({
            data: {
                code: 200,
                success: true,
                order: r[0]
            }
        })
    })
})

//更新订单状态
router.post('/api/updateOrder', function (req, res) {
    let orderID = req.body.data.orderID;
    let productList = req.body.data.productList;

    let sql = `update store_order set order_status=2 where order_id=${orderID}`
    connection.query(sql,function () {
        productList.forEach(v=>{
            sql=`delete from cart where id=${v.id}`
            connection.query(sql)
        })
        res.send({
            data:{
                code:200,
                success:true
            }
        })
    })
})

//发起支付宝支付
router.post('/api/alipay',function (req, res) {
    let order=req.body.data;
    let price=order.order_price+'';
    let name=order.product_list;
    let orderID=order.order_id+'';

    const formData=new AlipayFormData();
    //返回支付页面的url
    formData.setMethod('get');
    //支付信息
    formData.addField('bizContent', {
        outTradeNo: orderID,//订单号
        productCode: 'FAST_INSTANT_TRADE_PAY',//写死的
        totalAmount: price,//价格
        subject: name,//商品名称
    });
    //支付成功或失败跳转的链接
    formData.addField('returnUrl','http://192.168.1.48:8080/alipay');
    //返回promise
    const result = alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData },
    );

    //对接支付宝成功，支付宝返回的数据
    result.then(resp=>{
        console.log(resp)
        res.send({
            data:{
                code:200,
                success:true,
                msg:'正在支付',
                paymentUrl:resp
            }
        })
    })
})
//获取支付结果
router.post('/api/payResult',function (req, res) {
    //token
    let token = req.headers.token;
    let tokenObj = jwt.decode(token);
    //订单号
    let out_trade_no = req.body.out_trade_no;
    let trade_no = req.body.trade_no;
    //支付宝配置
    const formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');
    //支付时信息
    formData.addField('bizContent', {
        out_trade_no,
        trade_no
    });
    //返回promise
    const result = alipaySdk.exec(
        'alipay.trade.query',
        {},
        { formData: formData },
    );

    result.then(resData=> {
        axios({
            method: 'GET',
            url: resData
        }).then(data => {
            let responseCode = data.data.alipay_trade_query_response;
            if(  responseCode.code == '10000' ){
                switch(  responseCode.trade_status  ){
                    case 'WAIT_BUYER_PAY':
                        res.send({
                            data:{
                                code:0,
                                data:{
                                    msg:'支付宝有交易记录，没付款'
                                }
                            }
                        })
                        break;

                    case 'TRADE_CLOSED':
                        res.send({
                            data:{
                                code:1,
                                data:{
                                    msg:'交易关闭'
                                }
                            }
                        })
                        break;

                    case 'TRADE_FINISHED':
                        connection.query(`select * from user where tel = ${tokenObj.tel}`,function(error,results){
                            //用户id
                            let uid = results[0].id;
                            connection.query(`select * from store_order where uId = ${uid} and order_id = ${out_trade_no}`,function(err,result){
                                let id = result[0].id;
                                //订单的状态修改掉2==》3
                                connection.query(`update store_order set order_status = replace(order_status,'2','3') where id = ${id}`,function(){
                                    res.send({
                                        data:{
                                            code:2,
                                            data:{
                                                msg:'交易完成'
                                            }
                                        }
                                    })
                                })
                            })
                        })
                        break;

                    case 'TRADE_SUCCESS':
                        connection.query(`select * from user where tel = ${tokenObj.tel}`,function(error,results){
                            //用户id
                            let uid = results[0].id;
                            connection.query(`select * from store_order where uId = ${uid} and order_id = ${out_trade_no}`,function(err,result){
                                let id = result[0].id;
                                //订单的状态修改掉2==》3
                                connection.query(`update store_order set order_status = replace(order_status,'2','3') where id = ${id}`,function(){
                                    res.send({
                                        data:{
                                            code:2,
                                            data:{
                                                msg:'交易成功'
                                            }
                                        }
                                    })
                                })
                            })
                        })
                        break;
                }
            }else if( responseCode.code == '40004' ){
                res.send({
                    data:{
                        code:4,
                        msg:'交易不存在'
                    }
                })
            }
        })
    })
})
module.exports = router;
