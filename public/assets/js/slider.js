$(function(){
   $('#rangeslider').slider({
      range: true,
      min: 0,
      max: 1000,
      values: [ 90, 290 ],
      slide: function( event, ui ) {
         $('#rangeval').html(ui.values[0]+" - "+ui.values[1]);
      }
   });
   $('#rangesliderumur').slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 10, 17 ],
      slide: function( event, ui ) {
         $('#rangevalumur').html(ui.values[0]+" - "+ui.values[1]);
         $('#rangeValUmurLow').html(ui.values[0]);
         $('#rangeValUmurHigh').html(ui.values[1]);
      }
   });
});