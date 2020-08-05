<?php
include '../config/path-setting.php';
include "$header_path";
include "$sidenav_path";
include "$viewcomplaintmodal_path";
?>

<!-- Complaints sectioin -->
    <input id="current-page" type="hidden" value="working">
    <div class="col-lg-9 complaints d-flex justify-content-center">
        <div class="container-complaints">
            <div class="scrollbox-complaints d-flex flex-column">
                <div class="scroll-content" id="_scroll-content">
                <div class="alert text-center alert-danger">Complaints rejected successfully</div>
                <div class="alert alert-primary loading text-center">Loading..</div>
                <div class="wrapper">
                
                </div>

                </div>
            </div>
        </div>
    </div>
</div>
    <script src="../vendors/jquery.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <!-- My own Javascript -->
    <script src="../scripts/working.js"></script>
    <script src="../scripts/main.js"></script>
    <script src="../scripts/logout.js"></script>
    

</body>

</html>
