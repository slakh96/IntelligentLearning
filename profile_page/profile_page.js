$(document).ready(readyFn);

function readyFn() {
    //Load the page here
}


$(window).load(function () {
    $("#reviewPopupTrigger").click(function(){
       $('#reviewPopupWindow').show();
    });
    // $('.popupTrigger').click(function(){
    //     $('.popupWindow').hide();
    // });
    $('#reviewPopupCloseButton').click(function(){
        $('#reviewPopupWindow').hide();
    });

    $("#coursePopupTrigger1").click(function(){
        $('#coursePopupWindow1').show();
    });
    $('#coursePopupCloseButton1').click(function(){
        $('#coursePopupWindow1').hide();
    });

    $("#coursePopupTrigger2").click(function(){
        $('#coursePopupWindow2').show();
    });
    $('#coursePopupCloseButton2').click(function(){
        $('#coursePopupWindow2').hide();
    });

    $("#coursePopupTrigger3").click(function(){
        $('#coursePopupWindow3').show();
    });
    $('#coursePopupCloseButton3').click(function(){
        $('#coursePopupWindow3').hide();
    });
});