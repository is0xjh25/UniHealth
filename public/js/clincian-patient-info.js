function show(){
	var x;
	var person=prompt("Add New Note");
}



// (function () {

//     var datepicker = window.datepicker;

//     var monthData;
//     var $wrapper;
//     //渲染函数，由于没有使用第三方插件或库，所以使用的是模板拼接的方法
//     datepicker.buildUi = function (year, month) {
//         monthData = datepicker.getMonthDate(year, month);
//         var html = '<div class="ui-datepicker-header">' +
//                         '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
//                         '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
//                         '<span class="datepicker-curr-month">'+monthData.year+'-'+monthData.month+'</span>' +
//                    '</div>' +
//                    '<div class="ui-datepicker-body">' +
//                         '<table>' +
//                             '<thead>' +
//                                 '<tr>' +
//                                     '<th>Mon</th>' +
//                                     '<th>Tue</th>' +
//                                     '<th>Wed</th>' +
//                                     '<th>Thu</th>' +
//                                     '<th>Fri</th>' +
//                                     '<th>Sat</th>' +
//                                     '<th>Sun</th>' +
//                                 '</tr>' +
//                             '</thead>' +
//                             '<tbody>';

//                                 for (var i = 0; i < monthData.days.length; i++) {
//                                     var date = monthData.days[i];
//                                     if (i % 7 === 0) {
//                                         html += '<tr>';
//                                     }
//                                     html += '<td data-date="'+date.date+'">' + date.showDate + '</td>';
//                                     if (i % 7 === 6) {
//                                         html += '</tr>';
//                                     }
//                                 }

//                             html+='</tbody>' +
//                         '</table>'+
//                     '</div>';
//         return html;
//     };
//     //日历渲染函数
//     datepicker.render = function (direction) {
//         var year, month;
//         if (monthData) {
//             year = monthData.year;
//             month = monthData.month;
//         }

//         if (direction === 'prev') month--;
//         if (direction === 'next') month++;

//         var html = datepicker.buildUi(year,month);

//         $wrapper=document.querySelector('.ui-datepicker-wrapper');

//         if(!$wrapper){
//             $wrapper = document.createElement('div');
//             $wrapper.className = 'ui-datepicker-wrapper';
//         }

//         $wrapper.innerHTML = html;

//         document.body.appendChild($wrapper);

//     };
//     //初始换函数
//     datepicker.init = function (input) {
//         datepicker.render();

//         var $input=document.querySelector(input);
//         var isOpen=false;
//         //给input框赋予点击事件
//         $input.addEventListener('click',function(){
//             if(isOpen){
//                 $wrapper.classList.remove('ui-datepicker-wrapper-show');
//                 isOpen=false;
//             }else{
//                 $wrapper.classList.add('ui-datepicker-wrapper-show');

//                 var left=$input.offsetLeft;
//                 var top=$input.offsetTop;
//                 var height=$input.offsetHeight;

//                 $wrapper.style.top=top+height+2+'px';
//                 $wrapper.style.left=left+'px';

//                 isOpen=true;
//             }
//         },false);
//         //给按钮添加点击事件
//         $wrapper.addEventListener('click',function(e){
//             var $target=e.target;

//             if(!$target.classList.contains('ui-datepicker-btn')){
//                 return false;
//             }

//             //上一月,下一月
//             if($target.classList.contains('ui-datepicker-prev-btn')){
//                 datepicker.render('prev');
//             }else if($target.classList.contains('ui-datepicker-next-btn')){
//                 datepicker.render('next');
//             }
//         },false);

//         $wrapper.addEventListener('click',function(e){
//             var $target= e.target;

//             if($target.tagName.toLocaleLowerCase()!=='td'){
//                 return false;
//             }

//             var date=new Date(monthData.year,monthData.month-1,$target.dataset.date);

//             $input.value=format(date);

//             $wrapper.classList.remove('ui-datepicker-wrapper-show');
//             isOpen=false;

//         },false);
//     };
//     //格式化数据
//     function format(date){
//         var ret='';

//         var padding=function(num){
//             if(num<=9){
//                 return '0'+num;
//             }
//             return num;
//         };

//         ret+=date.getFullYear()+'-';
//         ret+=padding(date.getMonth()+1)+'-';
//         ret+=padding(date.getDate());

//         return ret;
//     }

// })();

// (function(){
//     var datepicker = {};
//     datepicker.getMonthDate = function (year, month) {
//         var ret = [];
//         if(!year || !month){
//             var today = new Date();
//             year = today.getFullYear();
//             month = today.getMonth() + 1;
//         }
//         var firstDay = new Date(year, month-1, 1);//获取当月第一天
//         var firstDayWeekDay = firstDay.getDay();//获取星期几，才好判断排在第几列
//         if(firstDayWeekDay === 0){//周日
//             firstDayWeekDay = 7;
//         }

//         year = firstDay.getFullYear();
//         month = firstDay.getMonth() + 1;

//         var lastDayOfLastMonth = new Date(year, month-1, 0);//获取最后一天
//         var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

//         var preMonthDayCount = firstDayWeekDay - 1;
//         var lastDay = new Date(year, month, 0);
//         var lastDate = lastDay.getDate();

//         for(var i=0; i<7*6; i++){
//             var date = i + 1 - preMonthDayCount;
//             var showDate = date;
//             var thisMonth = month;
//             //上一月
//             if(date <= 0){
//                 thisMonth = month - 1;
//                 showDate = lastDateOfLastMonth + date;
//             }else if(date > lastDate){
//                 //下一月
//                 thisMonth = month + 1;
//                 showDate = showDate -lastDate;
//             } 
//             if(thisMonth === 0){
//                 thisMonth = 12;
//             }
//             if(thisMonth === 13){
//                 thisMonth = 1;
//             }
//             ret.push({
//                 month: thisMonth,
//                 date: date,
//                 showDate: showDate
//             })
            
//         }
//         return {
//             year: year,
//             month:month,
//             days: ret
//         };
//     }
//     window.datepicker = datepicker;//该函数唯一暴露的对象
// })();
