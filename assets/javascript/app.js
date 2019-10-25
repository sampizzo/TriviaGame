$(document).ready(function(){
        var rbValue = $("input[name=rb01]:checked").val(); 
        $('p').html("Selected Radio Button Value is: "+ rbValue);
        console.log("Selected Radio Button Value is: "+ rbValue);
});