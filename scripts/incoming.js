console.log(sessionStorage.getItem('will'));
var promise;
$(document).ready(function(){
    //$('.loading-screen').hide();
    var admin = {};
    const api_base_url = 'https://www.kshitijskincare.com/sweeperapi/api/complaint/';
    let ATkn = sessionStorage.getItem('ATkn');

    //send request to fetch all incoming complaints2
    if(ATkn){//if user deletes session storage (angatle kide)
         promise = validate_access();
    }
    else{
        window.location = "../";
    }
//--------------------------------------------------------------------------------
//event handler for 3 buttons
$('#_scroll-content').click(function(e){
    let cid = e.target.getAttribute('data-complaint-id');
    let czone = e.target.getAttribute('data-complaint-zone');
    let user_id = e.target.getAttribute('data-user-id');

    if(e.target.id=="complaint-View"){
        $.get('https://sweepadmin.000webhostapp.com/sweeper-admin/check.php',function(){
            console.log("view");
            $('#view-complaint-modal').modal('show');
            viewComplaint(cid,czone);
        })
        .fail(function(){
            alert("Something went wrong, try checking internet connection");
        });
        
    }
    else if(e.target.id=="complaint-Process"||e.target.id=="complaint-Reject"){
            process_removeComplaint(e.target.getAttribute('data-complaint-id'),e.target,user_id);
        
    }
    else{

    }
});

function process_removeComplaint(cid,clicked_btn,user_id){
        
    if(clicked_btn.id=="complaint-Reject"){
        if(confirm("Do you really want to remove this complaint?")){
        removeComplaint(cid,clicked_btn,user_id);
        }
    }
    else{   
        console.log("hello");
        $(clicked_btn).text('Processing..');
        $(clicked_btn).css("cursor","not-allowed");
    
        var sweeper_ids;
        
        //get sweeper ids
        promise = getSweeperIds();//see defination bellow this function
        promise.then(function(result){
            sweeper_ids = result;
            $.post(`${api_base_url}assigncomplaint.php`,{
                complaint_id: cid,
                sweeper_ids: sweeper_ids,
                admin_id: admin.id
            },
            function(){
                console.log('assigned');
                $('.alert-success').show();
                
                showComplaints();
                //send notification to sweepers and user
                notifySweepers(sweeper_ids,cid);
                notifyUser(user_id,cid,clicked_btn);
                setTimeout(()=>$('.alert-success').hide(),3000);
                
            }
            
            )
            .fail(function(){
                $(clicked_btn).text('Process');
                $(clicked_btn).css("cursor","pointer");
                alert("Something went wrong..");
            });
        });
        
    }
}

async function getSweeperIds(){
    console.log(admin.zone);
    var sweeper_ids = [];
    await $.get('https://www.kshitijskincare.com/sweeperapi/api/sweeper/available_sweepers.php',{
        zone:admin.zone
    },
    function(response){
        console.log(response);
        response.data.forEach(function(sweeper){
            sweeper_ids.push(sweeper.uuid);
        });
        
    });
    console.log(sweeper_ids);
    return(sweeper_ids.join(','));
}
//when view button is clicked
function viewComplaint(id,zone){
    console.log(id,zone);

    $.get(`${api_base_url}readsingle.php`,{
        complaint_id: id,
        zone : zone
    },
    function(data,status){
        var complaint = data;
        console.log(complaint);
        var complainer = complaint.data[0].user_name;
        console.log(complainer);
        var zone = complaint.data[0].zone;
        var disc = complaint.data[0].placename;

        var date = complaint.data[0].complaint_date;
        var time = complaint.data[0].complaint_time;
        var image_url = complaint.data[0].image_url;

        var complaint_modal = $('#view-complaint-modal');
        complaint_modal.find('#complainer').text(complainer);
        complaint_modal.find('#zone').text(zone);
        complaint_modal.find('#disc').text(disc);
        complaint_modal.find('#date').text(date);
        complaint_modal.find('#time').text(time);
        complaint_modal.find('.complaint-img img').attr('src',`${api_base_url}uploads/`+image_url);

    }
    );

}

//when process button is clicked
    

    function removeComplaint(cid,clicked_btn,user_id){ 
        $(clicked_btn).text('Rejecting..');
        $(clicked_btn).css('cursor','not-allowed');
        $.post(`${api_base_url}denycomplaint.php`,{
            complaint_id: cid
        },
        function(data){
            $('.alert-danger').show();
            notifyUser(user_id,cid,clicked_btn);
            showComplaints();
            setTimeout(()=>$('.alert-danger').hide(),3000);
        }
        )
        .fail(function(){
            $(clicked_btn).text('Reject');
            $(clicked_btn).css('cursor','pointer');
            alert('Something went wrong');
        });
    }

    async function validate_access(){
        var admin_id;
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
            showComplaints();
            //setInterval(()=>showComplaints(),5000);
        
    })
    .fail(function(jqXHR){      
        if(jqXHR.status==401){
        window.location = "../";//back to login form
        }
    });
    return admin_id;
    }


    function showComplaints(){
        jQuery.get(`${api_base_url}readall.php`,{
            q: 'incoming',
            zone:admin.zone
        },function(data,status){
            $('.wrapper').empty();
            $('.loading').hide();
            //console.log(data);
            complaints_data = data;
            console.log(complaints_data);
            let complaint_index = 0;
            let complaint_count = complaints_data.count;
            
                //I know this is bit of clumsy
            while(complaint_index<=(complaint_count-1)){
                var id = complaints_data.data[complaint_index].id;
                var complainer = complaints_data.data[complaint_index].user_name;
                var user_id = complaints_data.data[complaint_index].user_uuid;
                var zone = complaints_data.data[complaint_index].zone;
                var date = complaints_data.data[complaint_index].complaint_date;
                var time = complaints_data.data[complaint_index].complaint_time;
                var town = complaints_data.data[complaint_index].town;
                var image_url = complaints_data.data[complaint_index].image_url;
                console.log(image_url);
                // making of complaint card components(I know this is bit of clumsy:)
                var card = $('<div class="card shadow" style="width:500px;"></div>');
                var card_row = $('<div class="row no-gutters"></div>');
                var card_col_md4 = $('<div class="col-md-4"></div>');
                var img_cont = $('<div class="img-cont"></div>');
                var card_img = $('<img class="rounded img-fluid card-img" alt="no image found">');
                card_img.attr('src' ,`${api_base_url}uploads/`+image_url);
                var card_col_md8 = $('<div class="col-md-8"></div');
                var card_body = $('<div class="card-body"></div>');
                var card_text = $('<div class="card-text"></div>');
                var complaint_lable_container = $('<div class="complaint-lable-container"></div>');
                var complaint_lable_arr = ['Complainer:','Zone:','Date:','Time:'];
                for(var i=0;i<complaint_lable_arr.length;i++){
                    var complaint_lable = $('<span class="complaint-lable d-block font-weight-bold">'+complaint_lable_arr[i]+'</span>');
                    complaint_lable_container.append(complaint_lable);
                }
                var complaint_info_container = $('<div class="complaint-info-container pl-2"></div>');
                var complaint_info_arr = [complainer,zone,date,time];
                for(var i=0; i<4; i++){
                    var complant_info = $('<span class="complaint-info d-block">'+complaint_info_arr[i]+'</span>');
                    complaint_info_container.append(complant_info);
                }
                var button_grp = $('<div class="button-group float-right"></div>');
                //making of view , process, remove buttons
                var view_btn = $('<div class="btn btn-primary btn-sm mr-2" id="complaint-View" data-complaint-zone='+zone+' data-complaint-id='+id+'>View</div>');

                var process_btn = $('<div class="btn btn-success btn-sm mr-2" id="complaint-Process" data-complaint-zone='+zone+' data-complaint-id='+id+' data-user-id='+user_id+'>Process</div>');
                
                var remove_btn = $('<div class="btn btn-danger btn-sm mr-2" id="complaint-Reject" data-complaint-id='+id+' data-user-id='+user_id+' data-complaint-zone='+zone+'>Reject</div>');
                
                $('.wrapper').append(card);
                card.prepend(card_row);
                card_row.prepend(card_col_md4);
                card_col_md4.prepend(img_cont);
                img_cont.prepend(card_img);
                card_row.append(card_col_md8);
                card_col_md8.append(card_body);
                card_body.append(card_text);
                card_text.append(complaint_lable_container);
                card_text.append(complaint_info_container);
                card_body.append(button_grp);
                button_grp.append(view_btn);
                button_grp.append(process_btn);
                button_grp.append(remove_btn);

                complaint_index++;
            }
            
        
        })
        .fail(function(jqXHR){
            $('.loading').removeClass("alert-primary");
            $('.loading').addClass("alert-warning");
            $('.loading').show();
            console.log(jqXHR.status);
            if(jqXHR.status==404){
                $('.wrapper').empty();
                $('.loading').text("Complaints not found..");
            }
            else{
                $('.loading').text("Something went wrong..");
            }

        });
    }

    function setUnameAndDp(){
        $('.side-nav').find('.admin-img>img').attr("src","../register/"+admin.dp);
        $('.side-nav').find('#username').text(admin.uname);
    }

}
);

function notifySweepers(sweeper_ids,cid){
    console.log(sweeper_ids);
    sweeper_ids = sweeper_ids.split(',');
    console.log(sweeper_ids);
    sweeper_ids.forEach((sweeper_id)=>{
        $.post('https://sweepadmin.000webhostapp.com/sweeper-admin/api/notification/create.php',{
            notificant: 'sweeper',
            sweeper_id: sweeper_id,
            complaint_id:cid,
            message: "New complaint has been assigned to you, for more info check email"
        })
        .fail(function(jqXHR){
            console.log(jqXHR);
        });
    });


    
    
}
function notifyUser(user_id,cid,clicked_btn){
    console.log(clicked_btn.id);

    if(clicked_btn.id == "complaint-Process"){
        $.post('https://sweepadmin.000webhostapp.com/sweeper-admin/api/notification/create.php',{
        notificant: 'user',
        complaint_id: cid,
        feedback_link: "",
        user_id: user_id,
        message: "Your complaint has been approved to be processed"
    })
    .fail(()=>{
        console.log('fail');
    });
    }

    if(clicked_btn.id == "complaint-Reject"){
        $.post('https://sweepadmin.000webhostapp.com/sweeper-admin/api/notification/create.php',{
        notificant: 'user',
        complaint_id: cid,
        feedback_link: "",
        user_id: user_id,
        message: "Your complaint has been rejected to be processed"
    })
    .fail(()=>{
        console.log('fail');
    });
    }
    
}


