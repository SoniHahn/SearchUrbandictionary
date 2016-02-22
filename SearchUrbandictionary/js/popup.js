function search(){
          $("#container").html('');
          var query = $("#query").val();
          query = query.replace(/\s{2,}/g, ' ');

          if(query&&query!==' '){
          var url = "http://www.urbandictionary.com/define.php?term="+encodeURIComponent(query);
          var q = encodeURIComponent('select * from html where url="'+url+'" and xpath='+"'//"+'div[contains(@class,"def-panel")]'+"'");
          var yql = 'http://query.yahooapis.com/v1/public/yql?q='+q;
          $("#container").html('<img src="/images/spinner.gif" alt="Loading...">');
          $.ajax({type: "GET",url: yql, dataType: "html",
             success: function (xml) {
                        info = $(xml).find('div.meaning').html();
                        example = $(xml).find('div.example').html();
                        

                        if(info){
                        $("#container").html('<span class="title">TOP DEFINITION</span><br><span class="description">'+info+'</span><br />');
                        if(example)
                        $("#container").append('<br><span class="title">USAGE EXAMPLE</span><br><span class="description"><em>'+example+'</span></em><br />');
                        $("#container").append('<br><a class="link" href="'+url+'" target="_blank">More..</a>');
 
                       }
                       else{
                        $("#container").html('<span class="description"><strong>'+query+'</strong> is not defined.</span>');
                       }
                    }
             });

          }
};

$(document).ready(function () {
    $("#query").focus(); 
    $("#searchform").submit(function() {
      $('#searchform').hide();
      search();
      return false;
    });

});
