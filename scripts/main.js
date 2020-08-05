
$(window).on('load',()=> $('.loading-screen').hide());

$(document).ready(function(){
   var current_page = $('#current-page').val();
    console.log(current_page);
    var arrow_icon = $('<i class="fas fa-chevron-right active-link-arraow"></i>');
    console.log($('.nav-list').find(`#${current_page}`));
    $('.nav-list').find(`#${current_page}`).append(arrow_icon);


    
//fetch notifications
promise.then((admin_id)=>{
    console.log('hello');
    $('#notification').click((e)=>{
        console.log('helow2');
        $('.notification-panel').fadeToggle('fast');
        $('#notification').find('.badge').remove();
        $.post('https://sweepadmin.000webhostapp.com/sweeper-admin/api/notification/mark-read.php',{
            notificant:'admin',
            admin_id: admin_id
        });
    });
    setInterval(()=>{
        $.post('https://sweepadmin.000webhostapp.com/sweeper-admin/api/notification/read.php',{
            notificant:'admin',
            admin_id: admin_id,
        },function(data){
            if(data.unread_count){
                $('#notification').append($(`<span class="badge badge-pill badge-danger">${data.unread_count}</span>`));
                
            }
            makeNotifications(data);

        });
    },300000);
});
function makeNotifications(data){
    $('.notification-panel .scroll-content ul').empty();
    for(let i = 0; i<data.total_count; i++){
        let cid = data.data[i].complaint_id;
        let sid = data.data[i].sweeper_id;
        let timestamp = data.data[i].timestamp.split(" ");
        let badge = " ";
        let msg;
        
        if(data.data[i].message == 'nc'){
            msg = `You have new incoming complaint with complaint ID ${cid}`;
        }
        else{

            msg =  `A sweeper has finished the complaint wint complaint ID ${cid}`;
        }
        if(data.data[i].status == '0'){
            badge = '<span class="badge badge-primary">New</span>';
        }
        let notification = $(
            `<li>
                <div class="container notification-item pb-1 mb-1 border-bottom">
                    <div class="row new justify-content-end">${badge}</div>
                    <div class="row notification-info py-1">${msg}
                    </div>
                    <div class="row timestamp justify-content-between">
                        <div class="date floatLeft">${timestamp[0]}</div>
                        <div class="time floatRight">${timestamp[1]} ${timestamp[2]}</div>
                    </div>
                </div>
            </li>`);
        
            
            $('.notification-panel .scroll-content ul').append(notification);
    }
}

});
