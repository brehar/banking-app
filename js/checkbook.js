'use strict';

var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope) {
    $scope.transactions = [];
    $scope.runningTotal = 0;
    $scope.totalCredits = 0;
    $scope.totalDebits = 0;
    
    $scope.addTransaction = function() {
        $scope.transactions.push($scope.newTransaction);

        if ($scope.newTransaction.credit) {
            $scope.totalCredits += $scope.newTransaction.credit;
            $scope.runningTotal += $scope.newTransaction.credit;
        } else {
            $scope.totalDebits += $scope.newTransaction.debit;
            $scope.runningTotal -= $scope.newTransaction.debit;
        }
        
        $scope.newTransaction = {};
    };

    var deletingIndex;
    var deletingAmount;
    var deletingType;

    $scope.confirmDelete = function(transaction) {
        deletingIndex = $scope.transactions.indexOf(transaction);
        deletingAmount = transaction.credit || transaction.debit;
        deletingType = transaction.credit ? 'credit' : 'debit';
    };

    $scope.removeTransaction = function() {
        if (deletingType === 'credit') {
            $scope.totalCredits -= deletingAmount;
            $scope.runningTotal -= deletingAmount;
        } else {
            $scope.totalDebits -= deletingAmount;
            $scope.runningTotal += deletingAmount;
        }

        $scope.transactions.splice(deletingIndex, 1);

        $('#deleteModal').modal('hide');
    };

    $scope.sortBy = function(order) {
        if ($scope.sortOrder === order) {
            $scope.sortOrder = `-${order}`;
        } else if ($scope.sortOrder === `-${order}`) {
            $scope.sortOrder = '';
        } else {
            $scope.sortOrder = order;
        }
    };

    var editingIndex;
    var editingAmount;
    var editingType;

    $scope.editTransaction = function(transaction) {
        editingIndex = $scope.transactions.indexOf(transaction);
        editingAmount = transaction.credit || transaction.debit;
        editingType = transaction.credit ? 'credit' : 'debit';
        $scope.transactionToEdit = angular.copy(transaction);
    };

    $scope.saveEdit = function() {
        $scope.transactions[editingIndex] = $scope.transactionToEdit;

        if (editingType === 'credit') {
            $scope.totalCredits -= editingAmount;
            $scope.runningTotal -= editingAmount;
        } else {
            $scope.totalDebits -= editingAmount;
            $scope.runningTotal += editingAmount;
        }

        if ($scope.transactionToEdit.credit) {
            $scope.totalCredits += $scope.transactionToEdit.credit;
            $scope.runningTotal += $scope.transactionToEdit.credit;
        } else {
            $scope.totalDebits += $scope.transactionToEdit.debit;
            $scope.runningTotal -= $scope.transactionToEdit.debit;
        }

        $scope.transactionToEdit = null;

        $('#editModal').modal('hide');
    };

    $scope.cancelEdit = function() {
        $scope.transactionToEdit = null;
    };
});