function showabout(){
    $("#about_container").css("display","inherit");
    $("#about_container").addClass("animated slideInLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideInLeft");
    },800);
}
function closeabout(){
    $("#about_container").addClass("animated slideOutLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideOutLeft");
        $("#about_container").css("display","none");
    },800);
}
function showwork(){
    $("#work_container").css("display","inherit");
    $("#work_container").addClass("animated slideInRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideInRight");
    },800);
}
function closework(){
    $("#work_container").addClass("animated slideOutRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideOutRight");
        $("#work_container").css("display","none");
    },800);
}
function showcontact(){
    $("#contact_container").css("display","inherit");
    $("#contact_container").addClass("animated slideInUp");
    // $(document).one('keydown', function(e) {        
    //     if (e.keyCode == 27) {
    //         closecontact();
    //     }
    // });
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideInUp");
    },800);

}
function closecontact(){
    $("#contact_container").addClass("animated slideOutDown");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideOutDown");
        $("#contact_container").css("display","none");
    },800);
}

// function showPage2(){
//     $("#work_container1").css("display","inherit");
//     $("#work_container1").addClass("animated slideInRight");
//     setTimeout(function(){
//         $("#work_container1").removeClass("animated slideInRight");
//     },800);
// }
// function closePage2(){
//     $("#work_container1").addClass("animated slideOutRight");
//     setTimeout(function(){
//         $("#work_container1").removeClass("animated slideOutRight");
//         $("#work_container1").css("display","none");
//     },800);
// }

$(document).ready(function () {
    //$(".pages").hide();
    $("#nav_buttons a").click(function (e) {
        e.preventDefault();
        var item = this.href.split("#")[1];
        $(".pages:visible").slideUp(function () {
            $("#" + item).slideDown();
        });
    });
    $("#home").show();
});


setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
      $("#box").css("display","none");
      $("#about").removeClass("animated fadeIn");
      $("#contact").removeClass("animated fadeIn");
      $("#work").removeClass("animated fadeIn");
    },1000);
},1500);
var origin = 0.00;
setInterval(function () {
    document.querySelector("#distance").innerHTML = Math.ceil(origin);
    origin += 1.9;
}, 100)

