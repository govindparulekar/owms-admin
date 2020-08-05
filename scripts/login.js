
//check if user is already logined or not
let ATkn = sessionStorage.getItem('ATkn');
if(ATkn){
$.post('http://sweepadmin.000webhostapp.com/sweeper-admin/api/admin/validate_access.php',{
    ATkn:ATkn 
},
function(response){
    window.location = "mains/incoming.php";
    
})
.fail(function(){
    window.location = "mains/incoming.php";

});
}
window.onload = function(){
    $('.loading-screen').hide();
}

$(document).ready(function(){
    let login_btn = $('.login-form #login-btn');
    login_btn.click(function(){
        login_btn.text("Logging in..");

        $('.err-msg').each(function(){
            $(this).text("");
        });
        console.log('hello');
        var $uname = $('.login-form #uname');
        var $password = $('.login-form #pwd');

        if($uname.val()==""){
            $uname.next().text("Fill this first");
        }
        if($password.val()==""){
            $password.next().text("Fill this first");
        }
        if(!($uname.val()==""&&$password.val()=="")){
            //send request to login
            
            jQuery.post('api/admin/login.php',{
                uname: $uname.val(),
                password:$password.val()
            },function(response){
                console.log(response);
                sessionStorage.setItem("ATkn",response.ATkn);
                window.location = 'mains/incoming.php';
            })
            .fail(function(jqXHR){
                
                login_btn.text("Log in");
                switch (jqXHR.status) {
                    case 0:alert("check your internet connection and try again");
                        break;
                        case 404: alert("something went wrong, try again in a while");
                        break;
                        case 401: alert("Invalid email or password!");
                    
                    default:
                        break;
                }
            });
        }

    });
});