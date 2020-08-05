$(document).ready(function(){
    $('.error-msg').text("");
    $('#sub-btn').on('click',function(e){
        e.preventDefault();
        var $reg_form = $('#reg-form');
        var err_count = {c:0};
        var $inp_fields = $('#reg-form .validate-inp');
        var $inp_fields_arr = $inp_fields.toArray();

        $inp_fields_arr.forEach(function(inp_field){
            validate($(inp_field),err_count);
        });
        console.log(err_count);
        if(err_count.c==0){
            var fd = new FormData($reg_form[0]);
            console.log(fd);
            //send request
            $.ajax({
                url:'register.php',
                method: 'POST',
                data: fd,
                contentType: false,
                processData: false
            })
            .done(function(response){
                if(response.message=="uname taken"){
                    $('#reg-form #uname').next().text("Username is taken");
                    $('#reg-form #uname').val("");
                }
                else{
                    alert(response.message);
                    $inp_fields.each(function(){
                        console.log($(this));
                        $(this).val("");
                    });
                }
            })
            .fail(function(jqXHR){
                if(jqXHR.status==0)
                alert('something went wrong, try checking your internet connection..');
            });
            
        }

    });



    function validate($inp_field,err_count){
        console.log($inp_field);
        let $err_msg_elem = $inp_field.siblings('.error-msg');
        let val = $inp_field.val().trim();
        console.log(val);
        if(val==""){
            if($inp_field.attr('name')=="dp"){
            $err_msg_elem.text("Select a image for Display Picture");
            }
            else{
            $err_msg_elem.text("Fill this field first");
        }
        err_count.c++;
        }
        else{
            switch ($inp_field.attr('name')) {
                case 'uname':
                if(/^\w+$/.test(val)){
                    console.log('hello');
                    $err_msg_elem.text("");
                }
                else{
                    $err_msg_elem.text("Use only alphabate and numbers");
                    err_count.c++;
                }
                
                break;
                case 'pan':
                if(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val)){
                    $err_msg_elem.text("");
                }
                else{
                    $err_msg_elem.text("Invalid PAN");
                    err_count.c++;
                }
                break;
                case 'adhaar':
                if(/^[0-9]{4}[0-9]{4}[0-9]{4}$/.test(val)){
                    $err_msg_elem.text("");
                }
                else{
                    $err_msg_elem.text("Invlid Adhaar No.");
                    err_count.c++;
                }
                break;
                case 'email':
                if(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(val)){
                    $err_msg_elem.text("");
                }
                else{
                    $err_msg_elem.text("Please write email in proper format");
                    err_count.c++;
                }
                break;
                case 'mobile':
                if(/^[0-9]{10}$/.test(val)){
                    $err_msg_elem.text("");
                }
                else{
                    $err_msg_elem.text("Invlid Mobile No.");
                    err_count.c++;
                }
                break;
                case 'pwd':
                if(val.length>=8){
                    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$!*@%&]).{8,}$/.test(val)){
                    $err_msg_elem.text("");
                }
                else{
                    $err_msg_elem.text("Passowrd should contain atleast 1 letter,digit, and 1 special character(#,$,!,*,@,%,&)");
                    err_count.c++;
                }
                }
                else{
                    $err_msg_elem.text("Password must be 8 or more characters long");
                }
                
                break;
                case 'cfm-pwd':
                if($('#reg-form #pwd').val()==val){
                    $err_msg_elem.text("");
                }
                else{
                    $err_msg_elem.text("Please enter the same password as above");
                    err_count.c++;
                }
                break;
                case 'dp':
                    console.log('sel');
                    console.log($inp_field[0].files[0].type);
                    
                    var img_types = ['image/png','image/jpeg','image/tiff'];
                    if(img_types.every(check)){
                        $err_msg_elem.text("Supported Image formats: .png, .jpg, .tif");
                        err_count.c++;
                    }
                    else{
                        $err_msg_elem.text("");
                    }
                    function check(type){ 
                        return !($inp_field[0].files[0].type==type);
                     }
                break;
                case 'check':
                if($inp_field.prop('checked')==true){
                    $err_msg_elem.text("");
                }
                else{
                    $err_msg_elem.text("Please check this box if you want to proceed");
                    err_count.c++;
                }
                break;
                
                default:
                    break;
            }
        }

    }
});