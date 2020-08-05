
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sweeper|Admin-Panel</title>    
    <!-- Font awesome icons-->
    <script src="https://kit.fontawesome.com/d0b874de2f.js"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">

    <!-- Google Fonts Roboto -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
    
    <!--  material icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet">
    
    <!-- My custom css -->
    <link rel="stylesheet" href="../libs/custom.css">
    <link rel="stylesheet" href="../libs/manage-sweepers.css">

    <!-- Bootstrap css -->
    <link rel="stylesheet" href="../vendors/bootstrap.min.css">

 
    
</head>
<body>
    <div class="loading-screen">
        <div class="wrapper">
            <div class="circle" id="c1"></div>
            <div class="circle" id="c2"></div>
            <div class="circle" id="c3"></div>
        </div>
    </div>
    <!--header section-->
    <div class="row">
        <div class="col header">
            <div class="container-fluid">

                <div class="header-branding float-left">
                    <div class="logo"><i class="fas fa-user-cog"></i></div>
                    <div class="brand-name ml-3">ADMIN</div>
                </div>

                <div class="signout-notification-wrapper">
                    <!-- sign out icon -->
                    <div class="icon-tab-padding" id="notification" data-toggle="tooltip" title="Notifications" data-placement="bottom">
                        <i class="fas fa-bell fa-lg"></i>
                    </div>
                    <!-- notifiction icon -->
                    <div class="icon-tab-padding" id="logout" data-toggle="tooltip" title="Sign out" data-placement="bottom">
                        <i class="fas fa-sign-out-alt fa-lg"></i>
                    </div>
                </div>

            </div>
        </div>
    </div>
    