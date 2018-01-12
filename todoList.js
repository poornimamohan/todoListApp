var app = angular.module('myApp', []);
    app.controller('todoCtrl', function($scope) {
        $scope.todoList = JSON.parse(localStorage.getItem("newTaskList")) || [];
    $scope.doneList = JSON.parse(localStorage.getItem("newDoneList")) || [];
    $scope.todoInput = "";
    //$scope.targetDate = new Date();
    $scope.priorityArr = ['','Low','Med','High'];
    $scope.priorityAsc = false;
    $scope.targetDateAsc = false;
    var prevTextVal = "";


        $scope.todoAdd = function() {
            $scope.priority=$('.slctPriority').val();
            var inputObj = {'name':$scope.todoInput,'priority':$scope.priority,'targetDate':$scope.targetDate.toDateString()};
            var editIndex = -1;
            var todoLen = $scope.todoList.length;
            
            if($('.addEdit').val()=='Add'){
                for(var i=0;i<todoLen;i++){
                    if($scope.todoList[i].name.indexOf($scope.todoInput) > -1 ){
                        alert("This task is already added");
                        return;
                    }
                }
                $scope.todoList.push(inputObj);
            }else{
                for(var i=0;i<todoLen;i++){
                                if($scope.todoList[i].name.indexOf(prevTextVal) > -1 ){
                                    editIndex = i;
                                    break;
                                }
                  }
            }
            $scope.todoList.splice(editIndex,1,inputObj);
            $scope.todoInput = "";
            $('.addEdit').val('Add');
           $('.slctPriority').val("0");
            $scope.targetDate = "";
            $scope.priority = "";
    	   localStorage.setItem("newTaskList",JSON.stringify($scope.todoList));
        };

        $scope.markDone= function(index) {
        	$scope.doneList.push($scope.todoList[index]);
            $scope.todoList.splice(index,1);
        	localStorage.setItem("newTaskList",JSON.stringify($scope.todoList));
        	localStorage.setItem("newDoneList",JSON.stringify($scope.doneList));
        };

        $scope.editTask1 = function(index, event){
            $scope.todoList[index].name = $(event.target).siblings("input:text").val();
            localStorage.removeItem('newTaskList');
            localStorage.setItem("newTaskList",JSON.stringify($scope.todoList));
        }

        $scope.editTask = function(index, event){
            var liObj = $(event.target).parents("li");
            $scope.todoInput = liObj.find(".spnList").html();
            prevTextVal = $scope.todoInput;
            switch(liObj.find(".spnPriorityList").html()){
                case "High":
                    $(".slctPriority").val(3);
                    break;
                case "High":
                    $(".slctPriority").val(2);
                    break;
                default:
                    $(".slctPriority").val(1);
                    break;
            }
            $scope.targetDate = new Date(liObj.find('.spnTargetDateList').html())
            $('.addEdit').val('Update');
            localStorage.removeItem('newTaskList');
            localStorage.setItem("newTaskList",JSON.stringify($scope.todoList));
        }

    $scope.removeTask= function(index) {
    	$scope.doneList.splice(index,1);
    	localStorage.setItem("newDoneList",JSON.stringify($scope.doneList));
        };


    $scope.sortByPriority = function(asc){
        if(asc){
            $scope.todoList= $scope.todoList.sort(function(a,b){
                return a.priority - b.priority;
            });
        }else{
            $scope.todoList= $scope.todoList.sort(function(a,b){
                return b.priority - a.priority;
            });
        }
        localStorage.removeItem("newTaskList");
        localStorage.setItem("newTaskList", JSON.stringify($scope.todoList));
        $scope.priorityAsc = asc;
    }

    $scope.sortByTargetDate = function(asc){
        if(asc){
            $scope.todoList= $scope.todoList.sort(function(a,b){
                return new Date(a.targetDate) - new Date(b.targetDate);
            });
        }else{
            $scope.todoList= $scope.todoList.sort(function(a,b){
                return new Date(b.targetDate) - new Date(a.targetDate);
            });
        }
        localStorage.removeItem("newTaskList");
        localStorage.setItem("newTaskList", JSON.stringify($scope.todoList));
        $scope.targetDateAsc = asc;
    }

    });