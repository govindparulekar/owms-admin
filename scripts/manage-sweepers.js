var promise;
$(document).ready(function(){
  var admin = {};
  
  const api_base_url = "https://www.kshitijskincare.com/sweeperapi/api/sweeper/";
  
  let ATkn = sessionStorage.getItem('ATkn');
  if(ATkn){//if user deletes session storage (angatle kide)
    promise = validate_access();
  }
  else{
    window.location = "../";
  }

  $('#refresh-btn').click(()=>{
    readSweepers();
  });
    
  
  $('#add-sweeper').click((e)=>{
    var btn = $(e.target);
    $.get('http://sweepadmin.000webhostapp.com/sweeper-admin/check.php',()=>{
      $('#create_update-sweeper-modal').removeClass('update');  
      $('#create_update-sweeper-modal').addClass('add');
      
      $('#create_update-sweeper-modal').modal('show',btn);
    })
    .fail(()=>{
      alert('check your internet connection');
    }); 
  });
  
  $('#create_update-sweeper-modal').on('show.bs.modal',(e)=>{
    let btn = $(e.relatedTarget);
    let modal = $(e.target);
    let $inp_fields = $('#create-sweeper-form .form-control').not('input[type=submit]');
    
    //clear all previous msgs
    $(".form-inp-msg").each(function() {              
      $(this).text("");  
    });
    $inp_fields.not('#szone').each(function() {  
      $(this).attr('readonly',false);            
      $(this).val("");  
    });
    
    if(modal.hasClass('add')){
      modal.find('.modal-title').text('Enter Sweeper Info:');
      modal.find('#suid').text("");
    }
    if(modal.hasClass('update')){
      modal.find('.modal-title').text('Sweeper ID :');
      modal.find('#suid').text(btn.attr('data-suid'));

      $inp_fields.each(function(){
        let in_attr = $(this).attr('id');
        if(in_attr=="fname"||in_attr=="lname"||in_attr=="adhaar"||in_attr=="pan"||in_attr=="dob"){
          $(this).attr('readonly',true);
        }
      });  
      
      $.get(`${api_base_url}read.php`,{
        uuid: btn.attr('data-suid')
      },
      function(data){
        var name = data.data[0].name.split(" ");
        $inp_fields[0].value = name[0];
        $inp_fields[1].value = name[1];
        $inp_fields[2].value = data.data[0].email;
        $inp_fields[3].value = data.data[0].mobile;
        $inp_fields[4].value = data.data[0].adhaar;
        $inp_fields[5].value = data.data[0].pan;
        $inp_fields[6].value = data.data[0].dob;
        $inp_fields[7].value = data.data[0].zone;
        $inp_fields[8].value = data.data[0].address;
        
        
      }
      );
      
    }
  });

  $('#create_update-sweeper-modal').on('shown.bs.modal',()=>{
    $(".form-control").first().focus();
    
  });
  
  function addSweeper(fname,lname,email,mobile,adhaar,pan,dob,zone,address,submit_btn){
    console.log(fname,lname,email,mobile,adhaar,pan,dob,zone,address);
    fname = fname.charAt(0).toUpperCase()+fname.slice(1);
    lname = lname.charAt(0).toUpperCase()+lname.slice(1);
    $.post(`${api_base_url}create.php`,{
      name: fname.concat(" ",lname),
      email: email,
      mobile: mobile,
      adhaar: adhaar,
      pan: pan,
      dob: dob,
      zone: zone,
      address:address
    },
    function(data,jqXHR){
      submit_btn.val('Submit');
      submit_btn.attr('disabled',false);
      submit_btn.css('cursor','pointer');
      $('#create_update-sweeper-modal').modal('hide');
      alert(data.message);
    }
    
    )
    .fail(function(jqXHR){
      submit_btn.val('Submit');
      submit_btn.attr('disabled',false);
      submit_btn.css('cursor','pointer');
      
      alert("something went wrong..");
      
    });
    
  }
  
  function updateSweeper(suid,mobile,email,address,zone,submit_btn){
    console.log("request sent");
      $.post(`${api_base_url}update_sweeper.php`,{
        uuid: suid,
        mobile_no: mobile,
        email: email,
        address: address,
        zone: zone
      },
      function(response){
        submit_btn.val('Submit');
        submit_btn.attr('disabled',false);
        submit_btn.css('cursor','pointer');
        $('#create_update-sweeper-modal').modal('hide');
        alert(response.message);
      })
      .fail(function(){
        submit_btn.val('Submit');
        submit_btn.attr('disabled',false);
        submit_btn.css('cursor','pointer');
        alert("something went wrong..");
      });
      
    }
    
    
    $('#submit-btn').on('click',function(e){
      let submit_btn = $(e.target);
      let modal = $('#create_update-sweeper-modal');
      let $inp_fields = $('#create-sweeper-form .form-control').not('input[type=submit]');
      var fname = $inp_fields[0].value.toLowerCase();
      var lname = $inp_fields[1].value.toLowerCase();
      var email = $inp_fields[2].value;
      var mobile = parseInt($inp_fields[3].value);
    var adhaar = parseInt($inp_fields[4].value);
    var pan = $inp_fields[5].value;
    var dob = $inp_fields[6].value;
    var zone = $inp_fields[7].value;
    var address = $inp_fields[8].value;
    console.log($(e.target));
    submit_btn.val('Submitting..');
    submit_btn.attr('disabled',true);
    submit_btn.css('cursor','not-allowed');
    if(modal.hasClass('update')){
      var suid = $('#create_update-sweeper-modal #suid').text();
      updateSweeper(suid,mobile,email,address,zone,submit_btn);
      
    }
    else{
      
      if(fname==""||lname==""||email==""||mobile==""||adhaar==""||pan==""||dob==""||zone==""||address==""){
        alert("All fields should be filled before submitting!");
        submit_btn.val('Submit');
        submit_btn.attr('disabled',false);
        submit_btn.css('cursor','pointer');
      }
      else{
        addSweeper(fname,lname,email,mobile,adhaar,pan,dob,zone,address,submit_btn);
      }
    }
    
  });

  $('#create-sweeper-form .form-control').on('blur',function(e){
    var check = {
      valid:0,
      msg:""
    };
  
    var inp_field = $(e.target);
    console.log(inp_field);
    var val = inp_field.val().trim();
    console.log(val.length);
    console.log(inp_field.attr('id'));
    if(val.length==0){
      check.valid = 0;
      check.msg = "Hey, you left this empty!";
      setInpFieldState(check,inp_field);
      console.log(check.msg);
    }
    else{
      switch (inp_field.attr('id')) {
        case "fname":checkname(val,check);
                      console.log(val);
                     setInpFieldState(check,inp_field);
        break;
        case "lname":console.log(val);
                    checkname(val,check);
                    setInpFieldState(check,inp_field);
        break;
        case "email":checkEmail(val,check);
                     setInpFieldState(check,inp_field);

        break;
        case "mobile":checkMobile(val,check);
                      setInpFieldState(check,inp_field);
        break;
        case "adhaar":checkAdhar(val,check);
                     setInpFieldState(check,inp_field);
        break;
        case "pan":checkPan(val,check);
                   setInpFieldState(check,inp_field);

        break;
        case "address":checkAddress(val,check);
                       setInpFieldState(check,inp_field);
        break;
        case "dob": setValidCheck(check);
                    setInpFieldState(check,inp_field);

        break;
      
      }
    }
  });
  
  
  //view sweeper
  $('#view-sweeper-modal').on('show.bs.modal',function(e){
    var suid = e.relatedTarget.attr('data-suid');   
    console.log(suid); 
    //request to read sweeper
    $.get(`${api_base_url}read.php`,{
      uuid: suid
    },
    function(data){
      let sweeper = data.data[0];
      $('#view-sweeper-modal #suid').text(sweeper.uuid);
      $('#sname').text(sweeper.name);
      $('#sadhaar').text(sweeper.adhaar);
      $('#span').text(sweeper.pan);
      $('#smobile').text(sweeper.mobile);
      $('#sdob').text(sweeper.dob);
      $('#saddress').text(sweeper.address);
      $('#view-sweeper-modal #szone').text(sweeper.zone);
      $('#semail').text(sweeper.email);  
    });
  });
  

  //DELETE SWEEPER
  $('.table-wrapper').on('click',function(e){
    let btn = $(e.target);
    if(btn.attr('id')=="remove-sweeper"){
      if(confirm("You are about to remove this sweeper,press OK to continue..")){
      $.get(`${api_base_url}delete.php`,{
        uuid: btn.attr('data-suid')
      },
      function(data){
        alert(data.message);
        readSweepers();
      }
      
      )
      .fail(()=>{
        alert('Something went wrong');
      });
    }
    }
    if(btn.attr('id')=="view-sweeper"){
      $.get('http://sweepadmin.000webhostapp.com/sweeper-admin/check.php',function(){
        $('#view-sweeper-modal').modal('show',btn);

      })
      .fail(()=>{
        alert('check your internet connection');
      });
    }
    if(btn.attr('id')=="update-sweeper"){
      $.get('http://sweepadmin.000webhostapp.com/sweeper-admin/check.php',()=>{
        $('#create_update-sweeper-modal').removeClass('add');  
        $('#create_update-sweeper-modal').addClass('update');
        $('#create_update-sweeper-modal').modal('show',btn);
      })
      .fail(()=>{
        alert('check your internet connection');
      }); 
    }
    
    
  });

  //*************************SEARCH SWEEPER************************
  var $search_box = $('#search-box-container #search-box');
  var $search_by = $('#search-box-container #search-by');
  $search_by.change(function(e){
    $search_box.val("");
    $('.table-wrapper .alert-primary').show();
    $('.table-wrapper .alert-warning').hide();
    readSweepers();
  });

  $search_box.keyup(function(e){
    $('.table-wrapper .alert-primary').show();
    $('.table-wrapper .alert-warning').hide();
    let search_string = $(this).val();
    let search_by = $search_by.val();
    if(search_string==""){
      $('.table-wrapper .alert-primary').show();
      readSweepers();
    }
    else{ 
      $.get(`${api_base_url}available_sweepers.php`,{
        search_string:search_string,
        search_by:search_by,
        search_zone: admin.zone
      },
      function(response){
        $('.table-wrapper .alert-primary').hide();
        $('.table-wrapper .alert-warning').hide();
        processSweepersData(response);
      })
      .fail(function(jqXHR){
        $('.table-wrapper .alert-primary').hide();
        $('.table-wrapper .alert-warning').show();
        if(jqXHR.status==404){
          $('tbody').empty();
          $('.table-wrapper .alert-warning').text("No results found");
        }
        else{
          $('.table-wrapper .alert-warning').text("Something went wrong");

        }
      });
    }


    
  });
  //***************************************************************** */
  async function validate_access(){
    await $.post('http://sweepadmin.000webhostapp.com/sweeper-admin/api/admin/validate_access.php',{
        ATkn:ATkn 
    },
    function(response){
      console.log(response);
      admin.uname = response.uname;
      admin.dp = response.dp;
      admin.zone = response.zone;
      admin.id = response.id;
      admin_id = admin.id;
      setUnameAndDp();
      readSweepers();
    })
    .fail(function(jqXHR){      
        if(jqXHR.status==401){
        window.location = "../";//back to login form
        }
    });
    return admin_id;

  }

  function readSweepers(clear_int_id){
    console.log('read');
      $.get(`${api_base_url}available_sweepers.php`,{
      zone: admin.zone
    },
    function(data,status,xhr){
      $('.table-wrapper .alert').hide();
      processSweepersData(data);//line 273  
    }
    )
    .fail(function(jqXHR) {
      $('.table-wrapper .alert-primary').hide();
        $('.table-wrapper .alert-warning').show();
        if(jqXHR.status==404){
          $('tbody').empty();
          $('.table-wrapper .alert-warning').text("No sweepers available");
        }
        else{
          $('.table-wrapper .alert-warning').text("Something went wrong");

        }
    });
  }
  
  function processSweepersData(data){
    var sweepers_data = data;
    var $tbody = $('tbody');
    $tbody.empty();

    sweepers_data.data.forEach(function(sweeper){
      var row = $('<tr></tr>');
      row.append('<th scope="row">'+sweeper.uuid+'</th>');
      row.append('<td>'+sweeper.name+'</td>');         
      row.append('<td>'+sweeper.zone+'</td>');
      var btn_td = $('<td class="btn-td"></td>');
      //view button
      var view = $('<button class="btn btn-outline-info mr-3 btn-sm btn-check-req" id="view-sweeper" data-toggle="modal" data-suid="'+sweeper.uuid+'">View</button>');
      //update button
      var update = $('<button class="btn btn-outline-secondary mr-3 btn-sm btn-check-req" data-toggle="modal" id="update-sweeper" data-suid="'+sweeper.uuid+'">Edit</button>');
      //remove button
      var remove = $('<button class="btn btn-outline-danger mr-3 btn-sm" id="remove-sweeper" data-suid="'+sweeper.uuid+'">Remove</button>');

      btn_td.append(view);
      btn_td.append(update);
      btn_td.append(remove);
      row.append(btn_td);
      $tbody.append(row);
      
    });
  }

  //utility functions
  function checkname(name,check){
    console.log(name);
    
    if(name.length>=1&&name.length<=2){
      check.msg = "Name is too short :(";
      check.valid = 0;
      return;
      
    }
    //name = name.trim();
    var pattern = /[^A-Za-z]/;
    if(!pattern.test(name)){
      setValidCheck(check);
      
    }
    else{
      check.msg = "Name is not valid :(";
      check.valid = 0
      
    }
    console.log(check.msg);
  }

  function checkEmail(email,check){
    var p = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(p.test(email)){
      setValidCheck(check);
    }
    else{
      check.valid = 0;
      check.msg = "It seems you don't know how to write email address  :(";
    }

  }

  function checkMobile(mobile,check){
    var p = /^[0-9]{10}$/;
    if(p.test(mobile)){
      setValidCheck(check);
    }
    else{
      check.valid = 0;
      check.msg = "Invlid Contact Number :(";
    }
  }
  function checkAdhar(adhar,check){
    var p = /^[0-9]{4}[0-9]{4}[0-9]{4}$/;
    if(p.test(adhar)){
      setValidCheck(check);
    }
    else{
      check.valid = 0;
      check.msg = "Invlid adhar Number :(, try using given format";
    }
  }
  function checkPan(pan,check){
    var p = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if(p.test(pan)){
      setValidCheck(check);
    }
    else{
      check.valid = 0;
      check.msg = "Invlid PAN Number :(";
    }
  }
  function checkAddress(address,check){
    console.log(address);
    var p = /^[A-Za-z\s-\/,\.0-9]+$/;
    if(p.test(address)){
      setValidCheck(check);
    }
    else{
      check.valid = 0;
      check.msg = "Not a valid address :(";
    }

  }




  //to follow DRY principle
  function setValidCheck(check){
    check.valid = 1;
    check.msg = "Good!"; 
  }

  function setInpFieldState(check,inp_field){
    var $inp_field_msg = inp_field.next();
    $inp_field_msg.text(check.msg);
    if(check.valid==0){
      $inp_field_msg.removeClass("text-success");
      $inp_field_msg.addClass("text-danger");
      inp_field.val("");
      inp_field.focus();
    }
    else{
    $inp_field_msg.removeClass("text-danger");
    $inp_field_msg.addClass("text-success");
  }
  console.log($inp_field_msg);
  }

  function setUnameAndDp(){
    $('.side-nav').find('.admin-img>img').attr("src","../register/"+admin.dp);
    $('.side-nav').find('#username').text(admin.uname);

  }
  

  

});
    

