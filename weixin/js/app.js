/**
 *
 * Created by shen on 2016/12/1.
 */

//首页
$(function () {

    //首页轮播图
    if ($('.content .swiper-container').length !== 0) {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 3000
        });
    }

    LIMIT20();

    //返回顶部
    $(window).on('scroll', function () {
        if ($(window).scrollTop() <= 0) {
            $('.back-top').css('display', 'none');
        } else {
            $('.back-top').css('display', 'block');
        }
    });

    //商品 1 的切换事件
    $('#goods-li-1').on('click', function () {
        $(this).addClass('active');
        $('#goods-li-2').removeClass('active');
        $('#goods2').hide();
        $('#goods1').css('display', 'block');
    });

    //商品 2 的切换事件
    $('#goods-li-2').on('click', function () {
        $(this).addClass('active');
        $('#goods-li-1').removeClass('active');
        $('#goods1').hide();
        $('#goods2').css('display', 'block');


    });

    //搜索事件 -- 获得焦点时
    $('#search').focus(function () {
        $('.search-text').fadeIn();
        if (!$(this).val()) {
            searchService('/', $(this).val(), function (data) {
                var searchBox = $('.search-box').fadeIn().empty();
                var str = '<li class="fontsize2">历史记录</li>' +
                    ' <li class="fontsize2">历史记录</li>' +
                    ' <li class="fontsize2">历史记录</li>';
                searchBox.append(str);
                searchBox.css({width: $('#search').width() + 40, height: 'auto', padding: '5px 20px'});
                bindLi();
            });
        }
    });

    //搜索框的值为空时，会显示取消按钮
    $('#search').on('input', function () {
        if ($(this).val() == '') {
            $('.search-cancel').fadeOut();
            searchService('/', $(this).val(), function (data) {
                var searchBox = $('.search-box').fadeIn().empty();
                var str = '<li class="fontsize2">历史记录</li>' +
                    ' <li class="fontsize2">历史记录</li>' +
                    ' <li class="fontsize2">历史记录</li>';
                searchBox.append(str);
                searchBox.css({width: $('#search').width() + 40, height: 'auto', padding: '5px 20px'});
                bindLi();
            });
        } else {
            $('.search-cancel').fadeIn();
            searchService('/', $(this).val(), function (data) {
                var searchBox = $('.search-box').fadeIn().empty();
                var str = '<li class="fontsize2">御用灯泡</li>' +
                    ' <li class="fontsize2">御用灯泡</li>' +
                    ' <li class="fontsize2">御用灯泡</li>';
                searchBox.append(str);
                searchBox.css({width: $('#search').width() + 40, height: 'auto', padding: '5px 20px'});
                bindLi();
            });
        }
    });

    //搜索按钮的事件
    $('.search-icon').on('click', function () {
        if ($('#search').val() !== '') {
            location.href = 'http://www.baidu.com';
        }
    });

    //取消按钮，清空搜索框
    $('.search-cancel').on('click', function () {
        $(this).fadeOut();
        $('#search').val('');
        $('.search-box').animate({height: 0, padding: 0}, 500).empty();
    });

    //点击 li 时会改变搜索框的值
    function bindLi() {
        $('.search-box').find('li').off('click').on('click', function () {
            $('#search').val($(this).text()).focus();
            $('.search-cancel').fadeIn();
            $('.search-box').animate({height: 0, padding: 0}, 500).empty();
        });
    }

    /**
     * 搜索框的 ajax 请求服务
     * @param url 请求地址
     * @param data 需要提交数据
     * @param callback 请求成功后回调函数
     */
    function searchService(url, data, callback) {
        $.ajax({
            type: 'get',
            dataType: 'jsonp',
            data: data,
            url: url,
            beforeSend: function () {
                console.log('数据加载中...');
            },
            success: function (data) {
                callback(data);
                console.log('加载完成!');
            },
            error: function () {
                console.log('亲~~出错啦!');
            }
        });
    }

});

//每个商品的名称限制 20 个字符
function LIMIT20() {
    $('.limit20').each(function () {
        if ($(this).text().length > 20) {
            var text = $(this).text().slice(0, 20) + '...';
            $(this).text(text);
        }
    });
}

//商品收藏 -- 编辑
$(function () {

    //返回按钮
    $('.left_arrow').on('click', function () {
        var edit = $('#edit');
        var goodsRow = $('.goods-row');
        if ('inline' == edit.find('img').css('display')) {
            edit.find('span').css('display', 'inline');
            edit.find('img').css('display', 'none');
            goodsRow.find('.col-xs-3').removeClass('col-xs-3').addClass('col-xs-4');
            goodsRow.find('.col-xs-7').removeClass('col-xs-7').addClass('col-xs-8');
            $('.check-pic').css({display: 'none'});
        } else {
            window.history.go(-1);
        }
    });

    //编辑按钮的切换
    $('#edit').on('click', function () {
        var edit = $('#edit');
        var goodsRow = $('.goods-row');
        if ($(this).find('img').length !== 0) {
            edit.find('span').css('display', 'none');
            edit.find('img').css('display', 'inline');
            goodsRow.find('.col-xs-4').removeClass('col-xs-4').addClass('col-xs-3');
            goodsRow.find('.col-xs-8').removeClass('col-xs-8').addClass('col-xs-7');
            var height = $('.goods').find('.row').height();
            $('.check-pic').addClass('col-xs-1').css({display: 'block', paddingLeft: '8px', lineHeight: height + 'px'});
        }
    });

    //取消收藏
    $('#edit').find('img').on('click', function () {
        var selected = $('.selected');
        var delCount = selected.length;
        if (delCount > 0) {
            alert('你是否要取消' + delCount + '个商品收藏?');
            selected.parentsUntil('.goods').remove();
        } else {
            alert('请选择需要取消收藏的商品');
        }
    });

    //勾选商品
    $('.check-pic').find('img').on('click', function () {
        var thisUrl = $(this).attr('class');
        if (thisUrl == 'selected') {
            $(this).attr('src', 'images/icon_kuan_a1.jpg').removeClass('selected');
        } else {
            $(this).attr('src', 'images/icon_kuan_a.jpg').addClass('selected');
        }
    });

});

//商品分类
$(function () {
    var hoz = false;
    //切换商品收藏列表的布局方式
    $('.view').on('click', function () {
        if (hoz) {
            hoz = false;
            $(this).find('img').attr('src', 'images/icon_hp.png');
            $('.col-xs-12').removeClass().addClass('col-xs-6 goods-item');
        } else {
            hoz = true;
            $(this).find('img').attr('src', 'images/icon_lb.png');
            $('.col-xs-6').removeClass().addClass('col-xs-12 goods-item');
        }
    });

    // sort 切换事件
    $('.sort').find('p').on('click', function () {
        var oP = $('.sort').find('p');
        if ($(this).hasClass('sort-up')) {
            oP.removeClass('sort-up sort-down');
            $(this).addClass('sort-down');
        } else {
            oP.removeClass('sort-up sort-down');
            $(this).addClass('sort-up')
        }
        oP.removeClass('color-lightcoral');
        $(this).addClass('color-lightcoral');
    });

    //商品分类项点击时打开选项卡
    $('#goodsModel').on('click', function () {
        openModelBox($('#model-box-1'));
        LIMIT20();
    });
    $('#goodsBrand').on('click', function () {
        openModelBox($('#model-box-2'));
        LIMIT20();
    });
    $('#lightingStyle').on('click', function () {
        openModelBox($('#model-box-3'));
        LIMIT20();
    });
    $('#suitableSpace').on('click', function () {
        openModelBox($('#model-box-4'));
        LIMIT20();
    });

    /**
     * 打开商品分类的选项卡
     * @param elem 商品分类的元素
     */
    function openModelBox(elem) {
        $('.goods-model-box').css('display', 'none');
        if (elem.css('display') === 'none') {
            elem.css('display', 'block');
            if (elem.children().length <= 0) {
                categoriesService('/', function () {
                    elem.append('<li class="col-xs-12 fontsize3">数据加载中...</li>');
                    var str = '<li class="col-xs-6"><p class="model-item color-lightcoral fontsize3">全部</p></li>' +
                        '<li class="col-xs-6"><p class="model-item fontsize3">含强灯饰</p></li>' +
                        '<li class="col-xs-6"><p class="model-item fontsize3">雅典娜</p></li>';
                    elem.append(str);
                    bindModelItem(elem);
                }, function () {
                    console.log('加载完成');
                });
            }
        } else {
            $('#model-box-2').css('display', 'none');
        }
    }

    /**
     * 商品分类的内容选项 -- 点击时添加样式
     * @param elem 商品分类的元素
     */
    function bindModelItem(elem) {
        elem.find('.model-item').off().on('click', function () {
            elem.find('.model-item').removeClass('color-lightcoral');
            $(this).addClass('color-lightcoral');
            $('.goods-model-box').css('display', 'none');
        });
    }

    /**
     * 商品分类的后台服务 -- 加载数据
     * @param url 服务地址
     * @param befor 加载时调用该函数
     * @param compelete 加载成功时调用该回调函数
     */
    function categoriesService(url, befor, compelete) {
        $.ajax({
            type: 'get',
            dataType: 'jsonp',
            url: url,
            beforeSend: function () {
                befor();
            },
            success: function (data) {
                compelete(data);
            },
            error: function () {
                console.log('亲~~出错啦!');
            }
        });
    }
});

//商品页
$(function () {

    //切换图片
    if ($('.goods-body .swiper-container').length !== 0) {
        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationType: 'fraction',
            paginationFractionRender: function (swiper, currentClassName, totalClassName) {
                return '<span class="' + currentClassName + '"></span>' +
                    ' / ' +
                    '<span class="' + totalClassName + '"></span>';
            }
        });
    }

    //输入框只能输入数字
    function limitCount(e) {
        $(this).val($(this).val().replace(/\D|^0/g, ''));
        if ((e.keyCode == 8 && $(this).val() == '') || $(this).val() == '') {
            $(this).val(0);
        }
        if ($('#total').length !== 0) {
            COUNT_SELECTED();
        }
    }

    $('.count-inp').on('keyup', limitCount).bind("paste", limitCount).css("ime-mode", "disabled");

    //增加数量的按钮
    $('.add').on('click', ADD);

    //减少数量的按钮
    $('.del').on('click', DEL);

    //点击购买时
    $('#buy').on('click', function () {
        var store_name = $('#storeName').text();
        var price = parseFloat($('#price').text()) * parseFloat($('.count-inp').val());
        var standard = [];
        $('.standard-btns').find('.standard-active').each(function () {
            standard.push($(this).text());
        });

        alert('商品名称是：' + store_name + '\n' +
            '商品规格是：' + standard + '\n' +
            '商品价格是：' + price);
    });

    //选择规格
    $('.standard').on('click', function () {
        $(this).parent().children().removeClass('standard-active');
        $(this).addClass('standard-active');
    });

});

//增加数量的按钮
function ADD() {
    var countInp = $(this).parent('.count-btn').find('.count-inp');
    var count = countInp.val();
    if (count <= 199) {
        countInp.val(++count);
    }
    //在购物车页面中会使用到
    if ($('#total').length !== 0) {
        COUNT_SELECTED();
    }
}

//减少数量的按钮
function DEL() {
    var countInp = $(this).parent('.count-btn').find('.count-inp');
    var count = countInp.val();
    if (count > 0) {
        countInp.val(--count);
    }
    //在购物车页面中会使用到
    if ($('#total').length !== 0) {
        COUNT_SELECTED();
    }
}


/* 购物车 */
$(function () {

    //选择的商品
    $('.check-pic').find('img').off('click').on('click', function () {
        var thisImgs = $(this).attr('class');
        var allImgs = $(this).parentsUntil('.shopping-body').find('.check-all img');

        if (thisImgs == 'selected') {
            $(this).attr('src', 'images/icon_kuan_a1.jpg').removeClass('selected');
            unbindCount($(this));
        } else {
            $(this).attr('src', 'images/icon_kuan_a.jpg').addClass('selected');
            bindCount($(this));
        }

        //该商家下的所有商品 == 被选择的商品
        var sldCount = $(this).parentsUntil('.shopping_cart').find('.check-pic .selected').length;
        var imgsCount = $(this).parentsUntil('.shopping_cart').find('.check-pic img').length;

        if (sldCount == imgsCount) {
            allImgs.attr('src', 'images/icon_kuan_a.jpg').addClass('all-selected');
        } else {
            allImgs.attr('src', 'images/icon_kuan_a1.jpg').removeClass('all-selected');
        }

        //所有商家下的所有商品 == 所有被选择的商品
        var shoppingBody = $('.shopping-body');
        var allSldCount = shoppingBody.find('.selected').length;
        var allImgsCount = shoppingBody.find('.check-pic img').length;

        if (allSldCount == allImgsCount) {
            $('.all-check img').attr('src', 'images/icon_kuan_a.jpg');
        } else {
            $('.all-check img').attr('src', 'images/icon_kuan_a1.jpg');
        }

        COUNT_SELECTED();
    });

    //全选该商家下的所有商品
    $('.check-all').find('img').off('click').on('click', function () {
        var thisImgs = $(this).attr('class');
        var imgs = $(this).parentsUntil('.shopping-body').find('.check-pic img');

        if (thisImgs == 'all-selected') {
            $(this).attr('src', 'images/icon_kuan_a1.jpg').removeClass('all-selected');
            imgs.attr('src', 'images/icon_kuan_a1.jpg').removeClass('selected');
            unbindCount($(imgs));
        } else {
            $(this).attr('src', 'images/icon_kuan_a.jpg').addClass('all-selected');
            imgs.attr('src', 'images/icon_kuan_a.jpg').addClass('selected');
            bindCount($(imgs));
        }

        //所有商家下的所有商品 == 所有被选择的商品
        var shoppingBody = $('.shopping-body');
        var sldCount = shoppingBody.find('.selected').length;
        var imgsCount = shoppingBody.find('.check-pic img').length;

        if (sldCount == imgsCount) {
            $('.all-check img').attr('src', 'images/icon_kuan_a.jpg');
        } else {
            $('.all-check img').attr('src', 'images/icon_kuan_a1.jpg');
        }

        COUNT_SELECTED();
    });

    //全选所有商家的所有商品
    $('.all-check').find('img').on('click', function () {
        var thisImgs = $(this).attr('src');
        var shoppingBody = $('.shopping-body');
        var allImgs = shoppingBody.find('.check-pic img');
        var allPic = shoppingBody.find('.check-all img');
        if (thisImgs == 'images/icon_kuan_a.jpg') {
            $(this).attr('src', 'images/icon_kuan_a1.jpg');
            allImgs.attr('src', 'images/icon_kuan_a1.jpg').removeClass('selected');
            allPic.attr('src', 'images/icon_kuan_a1.jpg').removeClass('all-selected');
            unbindCount(allImgs);
        } else {
            $(this).attr('src', 'images/icon_kuan_a.jpg');
            allImgs.attr('src', 'images/icon_kuan_a.jpg').addClass('selected');
            allPic.attr('src', 'images/icon_kuan_a.jpg').addClass('all-selected');
            bindCount(allImgs);
        }
        COUNT_SELECTED();
    });

    //从购物车中删除一条记录
    $('.trash').on('click', function () {
        $(this).parentsUntil('.shopping-list').remove();
        COUNT_SELECTED();
    });

    //计算所有被选中的商品
    COUNT_SELECTED();

    //不勾选商品时，移除绑定事件
    function unbindCount(that) {
        var obj = $(that).parentsUntil('.shopping-list').find('.count-btn');
        obj.find('img').off();
        obj.find('input').attr('disabled', 'true').val(0);
    }

    //勾选商品时，重新绑定事件
    function bindCount(that) {
        var obj = $(that).parentsUntil('.shopping-list').find('.count-btn');
        obj.find('img').off();
        obj.find('.add').bind('click', ADD);
        obj.find('.del').bind('click', DEL);
        obj.find('input').removeAttr('disabled').val(1);
    }
});

//计算所有被选中的商品
function COUNT_SELECTED() {
    var selGoods = $('.selected');
    var selGoodsCount = selGoods.length;

    //获取所有商品的金额
    var priceTag = selGoods.parentsUntil('.shopping-list').find('.price');
    var count = selGoods.parentsUntil('.shopping-list').find('.count-inp');
    var arr = [];
    count.each(function () {
        arr.push(parseInt($(this).val()));
    });

    var price = 0;
    priceTag.each(function (index) {
        price += arr[index] * parseFloat($(this).text());
    });

    $('#total').text(price);
    return this;
}

/* 评论 */
$(function () {
    //限制只能输入500个字符
    $('#text').on('keydown', function () {
        var maxlimit = 499;
        if ($(this).val().length > maxlimit) {
            $(this).val($(this).val().substring(0, maxlimit));
        }
    });
});

/* 编辑收货地址 */
$(function () {

    //切换默认地址开关
    $('.tab-icon-addr').on('click', function () {
        $('.tab-icon-addr').removeClass('addr-selected');
        $(this).addClass('addr-selected');
    });

    //删除一条地址
    $('.tab-icon-del').on('click', function () {
        $(this).parentsUntil('.table-body').remove();
    });
});

/* 各页面的下拉加载事件 */
$(function () {

    //消息中心 --
    if ($('.msg-box').length > 0) {
        $(window).on('scroll', function () {
            var w_height = $(window).height() + $(window).scrollTop();
            var d_height = $(document).height();
            if (w_height >= d_height) {
                SCROLLSERVICE('/', function () {
                    $('.msg-box').append('<div>新数据---</div>');
                    console.log('数据加载中...');
                }, function (data) {
                    console.log('数据传输完成!', data);
                });
            }
        });
    }

    //商品评论 --
    if ($('.comment-body').length > 0) {
        $(window).on('scroll', function () {
            var w_height = $(window).height() + $(window).scrollTop();
            var d_height = $(document).height();
            if (w_height >= d_height) {
                SCROLLSERVICE('/', function () {
                    $('.comment-body').append('<div>新数据---</div>');
                    console.log('数据加载中...');
                }, function (data) {
                    console.log('数据传输完成!', data);
                });
            }
        });
    }

    //商品页 --
    if ($('.goods-body').length > 0) {
        $(window).on('scroll', function () {
            var w_height = $(window).height() + $(window).scrollTop();
            var d_height = $(document).height();
            if (w_height >= d_height) {
                SCROLLSERVICE('/', function () {
                    $('#scroll-text').hide();
                    $('.goods-master-pic').append('<div>新数据---</div>');
                    console.log('数据加载中...');
                }, function (data) {
                    console.log('数据传输完成!', data);
                });
            }
        });
    }

});

/**
 * 页面下拉加载服务
 * @param url 服务地址
 * @param befor 加载时调用该函数
 * @param compelete 加载成功时调用该回调函数
 */
function SCROLLSERVICE(url, befor, compelete) {
    $.ajax({
        type: 'get',
        dataType: 'jsonp',
        url: url,
        beforeSend: function () {
            befor();
        },
        success: function (data) {
            compelete(data);
        },
        error: function () {
            console.log('亲~~出错啦!');
        }
    });
}

//订单结算页面
$(function () {

    //选择地址时
    $('#addr_confirm').on('click', function () {
        var addr = [];
        var iProvince = $('#province');
        if (iProvince.val() == '0' || iProvince.val() == 0) {
            alert('请选择省');
        } else if ($('#city').val() == '0' || $('#city').val() == 0) {
            alert('请选择市');
        } else if ($('#area').val() == '0' || $('#area').val() == 0) {
            alert('请选择区');
        } else {
            addr.push(iProvince.val());
            addr.push($('#city').val());
            addr.push($('#area').val());
            $('#pointModal').modal('hide');
            $('#addr_point').text(addr.toString().replace(/,/g, ' '));
        }
    });

    //选择快递时会隐藏物流的相关信息
    $('#kuaidi').on('click', function () {
        $('.arr_check').attr('src', 'images/icon_normall2.png').removeClass('selected');
        $(this).attr('src', 'images/icon_check2.png').addClass('selected');
        $('.li-logistics').fadeOut();
    });

    //选择物流时会打开物流的相关信息
    $('#wuliu').on('click', function () {
        $('.arr_check').attr('src', 'images/icon_normall2.png').removeClass('selected');
        $(this).attr('src', 'images/icon_check2.png').addClass('selected');
        $('.li-logistics').fadeIn();
    });

    //提交订单时必须有默认地址
    $('#submitOb').on('click', function () {
        var defaultAddr = $('.default-addr');
        if (defaultAddr.html() == '' || defaultAddr.html() == null)
            alert('请填写默认地址!');
    });
});

//模态框 -- 垂直居中
$(function () {
    //不在品牌街商铺页中使用
    if ($('#exper').length <= 0) {
        $('.modal').on('show.bs.modal', function () {
            var dialog = $(this).find('.modal-dialog');
            $(this).css('display', 'block');
            dialog.css({
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: Math.max(0, ($(window).height() - dialog.height()) / 2),
                left: 0,
                right: 0
            })
        });
    }
});

//申请退货页面
$(function () {

    if ($('.file-box').length > 0) {
        resetFileBox();
    }

    //只允许图片上传
    $('#file').on('change', function () {
        var file = $(this).get(0).files[0];
        if (typeof file == 'object') {
            var reg = /image\/\w+/; //过滤图片格式
            if (reg.test(file.type)) {
                addFileBox($('#file').parent(), file);
            } else {
                file.val('');
                alert('请选择图片上传');
            }
        }
    });

    /**
     *  添加图片预览的盒子
     * @param elem 图片的容器（父元素）
     * @param img 图片文件
     * @returns {boolean} 浏览器不支持 FileReader 时返回 false
     */
    function addFileBox(elem, img) {
        if (typeof FileReader == 'undefined') {
            console.log("抱歉，你的浏览器不支持FileReader");
            return false;
        }

        var uploadbox = $('.upload-box');
        var reader = new FileReader();
        reader.readAsDataURL(img); //读取图片的真实路径

        reader.onload = function () {
            var len = uploadbox.find('.file-box').length;
            var str = '<div class="file-box"><div class="del-img"></div><img src="' + this.result + '" alt="上传图片" class="file-img"></div>';
            elem.before(str);

            //把input file克隆一份留在原位，真实的input file移动到新创建的图片盒子中
            var realFile = $('#file');
            var cloneFile = realFile.clone(true);
            cloneFile.insertAfter(realFile);

            var File = realFile.attr({id: 'fileImg' + len, name: 'fileImg' + len}).hide();
            $('.file-box').eq(len - 1).append(File);
            $('.del-img').off().on('click', delFileBox);
            resetFileBox();

            //如果图片预览盒子只能存在三个
            if (len >= 3) elem.hide();
        };

        reader.onerror = function () {
            alert('图片读取出错！');
        }
    }

    //重新定义 file-box 的样式
    function resetFileBox() {
        var cFileBox = $('.file-box');
        if (cFileBox.length < 3) {
            cFileBox.css('flex', '0 0 90px');
        } else {
            cFileBox.css('flex', '1');
        }
    }

    //删除图片预览盒子
    function delFileBox() {
        $(this).parent().remove();
        var cFileBox = $('.file-box');
        var oFileBox = cFileBox.eq(cFileBox.length - 1);
        if (oFileBox.css('display') == 'none') {
            oFileBox.show();
        }
        resetFileBox();
    }
});

//商品详情页轮播图
$(function () {
    if ($('.goods .swiper-container').length !== 0) {
        var goodsSwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 3000
        });
    }
});