$.extend({
  load_photos:function (var1){
    var data = {};
    var brand_array = new Array();
    var area_array = new Array();

    // alert("var1"+var1);

    function brand_all(){
      var item = $("#brand_all:checked")
      if (item.length>0){
        $("input[name='brand']").each(function(){
          // alert("#brand_all:checked")
          $(this).prop("checked","checked");
        })
      }

      else{
        $("input[name='brand']").each(function(){
          $(this).prop("checked",false);
        })
      }
    }

    function area_all(){
      var item = $("#area_all:checked")
      if (item.length>0){
        // alert("area_all");
        $("input[name='area']").each(function(){
          $(this).prop("checked",true);
        })
      }

      else{
        $("input[name='area']").each(function(){
          $(this).prop("checked",false);
        })
      }
    }

    if(var1=="brand_all")
    {brand_all();}

    if(var1=="area_all")
    {area_all();}

    $("input[name='brand']:checked").each(function () {
      // var key = $(this).parents().siblings("h4").text();   //chinese
      var value = $(this).parent().text();
      brand_array.push(value)
      }); 
    data['brand'] = brand_array;

    $("input[name='area']:checked").each(function () {
      var value = $(this).parent().text();
      area_array.push(value)
      }); 
    data['area'] = area_array;

    $("input[name='radio']:checked").each(function () {
      var value = $(this).parent().text();
      data['discount'] = value;
      //alert(data.key);
      });
    // alert(data['brand']);
    $.getJSON("/women_photos_list/",data, function(ret){
        var k = parseInt(ret.length/4,10);
        var len = ret.length;
        console.log('photos: '+len);
        console.log(k);
        var new_txt = "";
        new_txt += '<div class="women"> <a href="#"><h4>搜索结果：<span><strong>';
        new_txt +=  len.toString();
        new_txt += ' </strong>家打折店铺</span> </h4></a><div class="clearfix"></div> </div>'; 
        for (var i = 0; i <=k; i++) {
          
          // 把 ret 的每一项显示在网页上
          new_txt += '<div class="grids_of_4">';
          for (var j =i*4; j< Math.min(len,(i+1)*4); j++){
            new_txt += '<div class="grid1_of_4"><div class="content_box"><a href="details.html">';
            // new_txt += '<img class="img-responsive" alt=""/></a><h4><a href="details.html"><img src="{% static '
            // new_txt += "'"
            // new_txt += "images/joy4.jpg'" 
            // new_txt += '%}" class="img-responsive" alt=""/></a>';

            new_txt += '<img class="img-responsive" alt=""/></a><h4><a href="details.html"><img src="http://'

            new_txt += window.location.host
            new_txt += '/static/'
            new_txt += ret[j].imgurl
            new_txt += '" width="200" height="150" alt=""/></a><h5>品牌： ';
            new_txt += ret[j].brand;
            // new_txt += ' ';
            // new_txt += ret[j].store;
            new_txt += '</h5><p class="jindu">'
            new_txt += ret[j].jindu;
            new_txt += '</p><p class="weidu">'
            new_txt += ret[j].weidu;
            new_txt +='</p><h6 class="baidumap"><a href="map.html">地址：'
            new_txt += ret[j].address;
            new_txt += '</a></h6><div class="grid_1 simpleCart_shelfItem"><div class="item_add"><span class="item_price"><p4>';
            new_txt += ret[j].discount;
            new_txt += '折</p4>'
            new_txt +='</span></div><div class="item_add"><span class="item_price"><a href="#">收藏</a></span></div></div> </div></div>';
          }

          new_txt += '<div class="clearfix"></div> </div>';
          // console.log(new_txt);
          $('#photo_list').html('');
          $('#photo_list').append(' ' + new_txt);
          $('.jindu').hide();
          $('.weidu').hide();

          $(".baidumap").click(function(){
            // alert(".baidumap " + $(this).text());
            var jindu = $(this).siblings(".jindu").text();
            var weidu = $(this).siblings(".weidu").text();
            // alert("jindu+weidu: "+jindu+" "+weidu);
            localStorage["jindu"] = jindu;
            localStorage["weidu"] = weidu;
          });
          //alert($('#photo_list').text());
        }
        // $.each(ret, function(index, item){
        //         //排布的代码了，利用item.url
        //     }

    });
  }
});

$.extend({
  refresh_checkbox:function (){
    var choose_brand = localStorage["brand"]; 
    var choose_area = localStorage["area"];
    var choose_discount = localStorage["discount"];
    // alert('local discount '+choose_brand+" "+ choose_area+' '+choose_discount)

    if (jQuery.type(choose_brand) != "undefined"){
      $("#brand_all").prop("checked",false);
      $("input[name='brand']").each(function(){
        var brand = $(this).parent().text();
        if (brand==choose_brand){
          $(this).prop("checked",true);} 
        else{
          $(this).prop("checked",false);
        } 
      })
    }
    else{
        $("input[name='brand']").each(function(){
          $(this).prop("checked",true);})
    }
    
    if (jQuery.type(choose_area) != "undefined"){
      $("input[name='area']").each(function(){
        var area = $(this).parent().text();
        if (area==choose_area){
          $(this).prop("checked",true);} 
        else{
          $(this).prop("checked",false);
        }   
      })
    }
    else{
        $("input[name='area']").each(function(){
          $(this).prop("checked",true);})
    }
    
    if (jQuery.type(choose_discount) != "undefined"){
      $("#discount_all").prop("checked",false);
      $("input[name='radio']").each(function () {
        //$(this).prop("checked",false);
        // var discount = $(this).parent().text();
        if (discount==choose_discount){
          $(this).prop("checked",true);}
        else{
          $(this).prop("checked",false);
        } 
      });
    }
  }
}); 

$(document).ready(function()
{
  
  $.refresh_checkbox();
  $.load_photos(' ');

  var brand_button = $(":checkbox");
  brand_button.click(function(){

    total = $("input[name='brand']").length
    checked = $("input[name='brand']:checked").length
    if(total!=checked && checked)
    {
      $("#brand_all").prop("checked",false);
    }

    total = $("input[name='area']").length
    checked = $("input[name='area']:checked").length
    if(total!=checked && checked)
    {
      $("#area_all").prop("checked",false);
    }
    $.load_photos($(this).prop('id'));
  });

  var discount_button = $(":radio");
  discount_button.click(function(){
    $.load_photos($(this).prop('id'));
  });

  // var map_button = $(".baidumap");
  // localStorage["jindu"] = '113.54143'
  // localStorage["weidu"] = '22.274386'
  // // alert(map_button.html());
  // map_button.click(function(){
  //   alert("lalalal");
  //   // alert($(this).text());
  //   var jindu = $(this).parents().siblings(".jindu").text();
  //   var weidu = $(this).parents().siblings(".weidu").text();
  //   alert(jindu+" "+weidu);
  //   localStorage["jindu"] = jindu;
  //   localStorage["weidu"] = weidu;
  // })

});
