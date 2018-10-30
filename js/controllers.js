angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  /*$ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
*/
  // Triggered in the login modal to close it
  /*$scope.closeLogin = function() {
    $scope.modal.hide();
  };*/

  // Open the login modal
  /*$scope.login = function() {
    $scope.modal.show();
  };*/

  // Perform the login action when the user submits the login form
 /* $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };*/

})

.controller('IncidentsCtrl', function($scope,$http,$ionicLoading,$window) {

//$window.location.reload(true);
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  //var user = window.localStorage.getItem("user");


  var user = "Jesse";
  $http.get("http://demo.apptestonline.com/mobileapi/incidents.php").then(function(resp) {
    
    $ionicLoading.hide();

    console.log(resp.data.items[0].rows);

    /*$scope.incidents = resp.data.items[0].rows;*/
    
    $scope.incidents = resp.data.items[0].rows;

  }, function(err) {
    //console.error('ERR', err);
    // err.status will contain the status code
  });

  

})

.controller('IncidentCtrl', function($scope, $stateParams ,$http,$ionicLoading, $location, $ionicPopup) {

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  var text = 'Check In';
  console.log($stateParams.playlistId);
  console.log($scope);
  $scope.text = text;

  $http.post('http://demo.apptestonline.com/mobileapi/incidentDetail.php/?id='+$stateParams.playlistId).then(function(resp) {
    
    $ionicLoading.hide();

    console.log(resp.data.items[0].rows[0][0]);
    $scope.incidents = resp.data.items[0].rows;

    window.localStorage.setItem("ref_no", resp.data.items[0].rows[0][1] );


  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });

   $scope.checkIn = function (checkInId) {
    console.log(checkInId);

      

    if($scope.text !== "Checked-In"){

      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

      $http.post('http://demo.apptestonline.com/mobileapi/check.php?id='+checkInId).then(function(resp) {
      
      $ionicLoading.hide();
      console.log(resp);
      $scope.text = "Checked-In";

      }, function(err) {
       console.error('ERR', err);
      // err.status will contain the status code
      });
    } else {
      var alertPopup = $ionicPopup.alert({
                title: 'Already Checked-In',
                template: 'Already Checked-In'
            });
    }

  }

  $scope.incidentId = $stateParams.playlistId;


  $scope.go = function ( path ) {
    $location.path( path );
  };


})

.controller('SignatureCtrl', function($scope, $ionicLoading, $compile,$http, $cordovaGeolocation, $ionicModal, $cordovaFileTransfer , $window) {

    //var targetPath = cordova.file.dataDirectory;
    //console.log(targetPath);

    //$scope.targetPath =  targetPath;
    localStorage.removeItem("image");
    var canvas = document.getElementById('signatureCanvas');
    var signaturePad = new SignaturePad(canvas);
 
    $scope.clearCanvas = function() {
        signaturePad.clear();
    }

 
    $scope.saveCanvas = function() {
        var sigImg = signaturePad.toDataURL();
        $scope.signature = sigImg;
        //$cordovaFileTransfer.createFile(targetPath , sigImg );
        window.localStorage.setItem("image", sigImg );
        //console.log(signaturePad);
    }

    $scope.invoicePage = function(){
      $window.location.href = "#/app/invoice";
    }
})

.controller('CartCtrl', function($scope, $ionicLoading, $compile,$http, $cordovaGeolocation, $ionicModal, $state, $stateParams, $window , $filter) {

var value = window.localStorage.getItem("key");

var cartItems = JSON.parse(value);

  console.log(cartItems);
  $scope.cartItems = cartItems;

  $scope.getTotal = function(){
        var total = 0;
    for(var i = 0; i < $scope.cartItems.length; i++){

        /*var product = $scope.cartItems.products[i];*/
        total += (parseFloat($scope.cartItems[i].price));
    }
    return total;
  }
  
  $scope.getCount = function(strCat){
    return $filter('filter')($scope.cartItems, {name:strCat}).length;
  }

  $scope.deleteCartItem = function(itemName){

    console.log(cartItems);

    for(var i = 0; i < cartItems.length; i++) {
        if(cartItems[i]['name'] === itemName ) {
            console.log(i);
            cartItems.splice(i,1);
            console.log(cartItems);
            window.localStorage.setItem("key", JSON.stringify(cartItems) );
            return false;
        }
    }
  }

  $scope.incidentId = $stateParams.incidentId;


  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  })  

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });


  $scope.esignpage = function() {
    $window.location.href = "#/app/signature/"+$scope.incidentId;
  };


})

.controller('InvoiceCtrl', function($scope, $ionicLoading, $compile,$http, $cordovaGeolocation, $ionicModal, $state, $stateParams, $window, $filter, $location) {

var value = window.localStorage.getItem("key");
var ref_no = window.localStorage.getItem("ref_no");

var cartItems = JSON.parse(value);

  //console.log(value);


    /*var req = 
    {
        method: 'POST',
        url: 'http://d11.apptestonline.com/mobileDemo/incidents/createInvoice',
        data: { data :  value },
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    }

    $http(req).
    success(function(data, status, headers, config) 
    {
        //success
         console.log(data);
    }).
    error(function(data, status, headers, config) 
    {
        //error
         console.log(data);
    });*/


  $scope.cartItems = cartItems;

  $scope.getCount = function(strCat){
    return $filter('filter')($scope.cartItems, {name:strCat}).length;
  }

  $scope.getTotal = function(){

    var total = 0;
    for(var i = 0; i < $scope.cartItems.length; i++){
        /*var product = $scope.cartItems.products[i];*/
        total += (parseFloat($scope.cartItems[i].price));
    }
    return total;
  }

  var image = window.localStorage.getItem("image");
  $scope.image = image;

  $scope.incidentId = $stateParams.incidentId;

  $scope.ref_no = ref_no;

  $scope.go = function ( path ) {
    $location.path( path );
  };



})

.controller('MapCtrl', function($scope, $ionicLoading, $compile,$http, $cordovaGeolocation,$window) {
   
   //$window.location.reload(true);


    $scope.init = function() {

    var options = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      //var myLatlng = new google.maps.LatLng(24.8600,67.0100);

      var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var geocoder = new google.maps.Geocoder();
      var infowindow;
      
      var mapOptions = {
        center: myLatlng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"),
          mapOptions);


      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Ephlux Demo App'
      });

      /*google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });*/
        
        infowindow =  new google.maps.InfoWindow({
            content: "your are here"
        });

      var user = window.localStorage.getItem("user");
      $http.get('http://demo.apptestonline.com/mobileDemo/incidents/mapView/json/'+user).then(function(resp) {
      
    console.log(resp.data.items[0]);
     
    angular.forEach(resp.data.items[0].rows, function(value,index){
          

          var val0 = '';
            if(value[0] != null){
                val0 = value[0];
            }

            var val1 = '';
            if(value[1] != null){
                val1 = value[1]+ ', ';
            }

            var val2 = '';
            if(value[2] != null){
                val2 = value[2]+ ', ';
            }

            var val3 = '';
            if(value[3] != null){
                val3 = value[3]+ ', ';
            }

            var val4 = '';
            if(value[4] != null){
                val0 = value[4]+ ', ';
            }

            var address = val4 + ''+ val3 + '' + val2 + '' + val1+ '' +val0;
            var subject = '<p>Name: '+value[37]+'</p>'+'<p>Reference: '+value[28]+'</p>'+'<p>'+value[36]+'</p>';
            console.log(address);
            var markerImg = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
            if(value[6] == '1' ){
                markerImg = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
            }
            //console.log(address);

             geocoder.geocode( { 'address': address}, function(results, status) {


            //console.log(contentString);


            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    draggable: false,
                    icon: markerImg
                });

                marker.addListener('click', function() {
                    infowindow.setContent("<p>"+subject+"</p>");
                    infowindow.open(map, this);
                });

            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }

        });


    });

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });




      $scope.map = map;

  });

    }


  })

.controller('SearchCtrl', function($scope, LoginService,$http,$ionicHistory, $ionicLoading, $stateParams, $window , $ionicPopup) {



$ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
$http.get('http://demo.apptestonline.com/mobileapi/serviceProduct.php').then(function(resp) {
      
  $ionicLoading.hide();
  $scope.parts = resp.data.items[0].rows;
  console.log(resp.data.items[0].rows);

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });


  $scope.scrollBottom = function() {
    $ionicScrollDelegate.scrollBottom(true);
  };

  cart = [];
  window.localStorage.setItem("key", JSON.stringify(cart) );
  $scope.addItems = function(){

      var value = window.localStorage.getItem("key");
      cart = JSON.parse(value);
      //cart = value;
      //window.localStorage.removeItem("key");
      var element = {};
      
      
      element.name = this.part[1];
      element.price = 50;
      element.qty = 1;
      element.No = this.part[0];

      cart.push(element);

      //cart.push(value);
      //console.log(value);

      window.localStorage.setItem("key", JSON.stringify(cart) );


  }

   $scope.totalItems = function(){

    var value = window.localStorage.getItem("key");
    value = JSON.parse(value);    
    return value.length;

   }

   $scope.getTotal = function(){
    
    var value = window.localStorage.getItem("key");
    value = JSON.parse(value);    
    var total = 0;
    for(var i = 0; i < value.length; i++){

        /*var product = $scope.cartItems.products[i];*/
        total += (parseFloat(value[i].price));
    }
    return total;
  }


   $scope.incidentId = $stateParams.incidentId;

   $scope.cartpage = function(){

    var value = window.localStorage.getItem("key");
    value = JSON.parse(value);    


    if( value.length > 0 ){
        $window.location.href = "#/app/cart/"+$scope.incidentId;
    } else {
        var alertPopup = $ionicPopup.alert({
                title: 'No Items on Cart!',
                template: 'Please add items to cart first!'
            });
    }

    

   }

})

.controller('CalenderCtrl', function($scope, $state ,$location,$ionicLoading, $compile,$http, $filter) {

  /*$scope.data = {
    "error": false,
    "events": [{
      "id": 1,
      "title": "First entry",
      "date": "2014-11-04"
    }, {
      "id": 2,
      "title": "Second entry",
      "date": "2014-11-04"
    }, {
      "id": 3,
      "title": "Third entry",
      "date": "2014-11-05"
    }, {
      "id": 4,
      "title": "Fourth entry",
      "date": "2014-11-06"
    }, {
      "id": 5,
      "title": "Fifth entry",
      "date": "2014-11-06"
    }]
  }
  */

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  var user = window.localStorage.getItem("user");
  $http.post('http://demo.apptestonline.com/mobileDemo/incidents/task_list').then(function(resp) {
    
    $ionicLoading.hide();
    console.log(resp.data.items[0].rows);    
    var count = resp.data.items[0].rows.length;
    var events = [];


    for(i=0 ; i < count; i++){

      var data = {};
      data.id = resp.data.items[0].rows[i][5];
      data.title = resp.data.items[0].rows[i][3];
      data.date = $filter('date')(resp.data.items[0].rows[i][4], "yyyy-MM-dd");
      events.push(data);
    }
    //console.log(events);
    $scope.data = events;

  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });

  $scope.arrayToString = function(string){
    return string.join(", ");
  };


  })

.controller('ContactsCtrl', function($scope, $state ,$location,$ionicLoading, $compile,$http) {

  $scope.data = {}

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $http.post('http://demo.apptestonline.com/mobileDemo/incidents/contacts').then(function(resp) {
    
    $ionicLoading.hide();
    console.log(resp.data.items[0].rows);
    $scope.data = resp.data.items[0].rows;

  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });

  })


.controller('ProfileCtrl', function($scope, $state ,$location,$ionicLoading, $compile,$http) {

$scope.data = {}

var profileId = $state.params.profileId;

$http.post('http://demo.apptestonline.com/mobileDemo/incidents/profile/'+profileId).then(function(resp) {
    
    $ionicLoading.hide();
    console.log(resp.data);
    $scope.profile = resp.data;

  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });


})


.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state ,$location) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            //$state.go('app.playlists');
            $location.path("app/incidents");
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('BarcodeScanCtrl', function($scope,$http,$ionicLoading ,$cordovaBarcodeScanner ) {

     /*console.log("Barcode");
     $scope.scanBarcode = function() {
      console.log("button click Barcode");*/

        $cordovaBarcodeScanner.scan().then(function(imageData) {
            //alert(imageData.text);
            //console.log("Barcode Format -> " + imageData.format);
            //console.log("Cancelled -> " + imageData.cancelled);

              $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
              });
            $http.get("http://demo.apptestonline.com/mobileapi/assets.php/?id="+imageData.text).then(function(resp) {
    
            $ionicLoading.hide();
            console.log(resp.data.items[0].rows);            
            $scope.assets = resp.data.items[0].rows[0];

            }, function(err) {
            //console.error('ERR', err);
            // err.status will contain the status code
            });

        }, function(error) {
            console.log("An error happened -> " + error);
        });
    //};

    


});


