/**
 * Created by Eden on 05/06/2017.
 */
$(function () {

    var data = {};

    var inputsFields = $("input:text, input[type=tel] ,input[type=password],input[type=email], input[type=datetime-local], input[type=number]");
    inputsFields.focus(function(){
        $(this).css("box-shadow","0 0 4px #000");
    });

    inputsFields.blur(function(){
        $(this).css("box-shadow","none");
    });

    $(".btn").click(function (event) {
        var btnId = event.currentTarget.id;
        switch (btnId) {
            case "btn-Manager":
                if(stepOneChecking() == true) {
                    fillStepOneData();
                    $("#step-one").attr('class', 'col-xs-3 bs-wizard-step complete');
                    $("#step-two").attr('class', 'col-xs-3 bs-wizard-step active');
                    $(".Manager").hide();
                    $(".Event").show();
                }
                else
                {
                    alert("One or more from the fields was not entered correctly");
                }
                break;
            case "btn-Event":
                if (stepTwoChecking() == true) {
                    fillStepTwoData();

                    $("#step-two").attr('class', 'col-xs-3 bs-wizard-step complete');
                    $("#step-three").attr('class', 'col-xs-3 bs-wizard-step active');
                    $(".Event").hide();
                    $(".Support").show();
                }
                else
                {
                    alert("One or more from the fields was not entered correctly");
                }
                break;
            case "btn-Support":
                if (stepThreeChecking() == true) {
                    fillStepThreeData();
                    $("#step-three").attr('class', 'col-xs-3 bs-wizard-step complete');
                    $("#step-four").attr('class', 'col-xs-3 bs-wizard-step active');
                    $(".Support").hide();
                    $(".Done").show();
                }
                else
                {
                    alert("One or more from the fields was not entered correctly");
                }
                break;
            case "btn-Done":
                $("#step-four").attr('class' , 'col-xs-3 bs-wizard-step complete');
                $(".Done").hide();
                console.log(data);
                break;
        }
    });

    $("#infoIcon").click(function infoPopup() {
        var popup = document.getElementById("infoPopup");
        popup.classList.toggle("show");

    });

    function isEmpty(str) {
        return (str.length === 0 || !str);
    }

    function passwordIsOk()
    {
        var password = $("#managerEmailPassword").val();
        var res = false;

        var bigLettersCounter = 0;
        var numbersCounter = 0;

        if (password.length > 5) {
            for (i = 0; i < password.length; i++) {
                if (!isNaN(password[i])) {
                    numbersCounter++;

                }
                else {
                    if (password[i] === password[i].toUpperCase()) {
                        bigLettersCounter++;
                    }
                }
            }
        }
        if (bigLettersCounter > 0 && numbersCounter > 0) {
            res = true;
        }
        return res;
    }

    function emailIsOk(i_Element)
    {
        var emailInput = i_Element.val();
        var res = false;

        if (emailInput.indexOf("@") > -1)
        {
            res = true;
        }
        return res;
    }


    function phoneNumberIsOk(i_PhoneNumberText)
    {
        var phoneNumberCheck = /^\d{10}$/;
        if((i_PhoneNumberText.match(phoneNumberCheck)))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function markTheInputElementAsError(i_Element)
    {
        i_Element.css("background-color","#ffcecc");
        i_Element.css("border","1px solid #e80f06");
        i_Element.css("box-shadow" ,"inset 0 0 3px 3px #ffcecc");
    }

    function returnTheInputElementToNormal(i_Element)
    {
        i_Element.css("background-color","#fff");
        i_Element.css("border","1px solid #666");
        i_Element.css("box-shadow" ,"inset 0 0 3px 3px #fafafa");
    }

    function stepOneChecking() {
        var res = true;
        var stepOneInformation = $(".input-Manager").map(function() {
            return $(this);
        });

        for(i = 0; i < stepOneInformation.length; i++)
        {
            if(isEmpty(stepOneInformation[i].val()))
            {
                res = false;
                markTheInputElementAsError(stepOneInformation[i]);
            }
            else
            {
                returnTheInputElementToNormal(stepOneInformation[i]);
            }
        }
        if (!passwordIsOk())
        {
            res = false;
            $(".password-error").show();
            markTheInputElementAsError($("#managerEmailPassword"));
        }
        else
        {
            returnTheInputElementToNormal($("#managerEmailPassword"));
            $(".password-error").hide();
        }
        if (!emailIsOk($("#managerEmail")))
        {
            markTheInputElementAsError($("#managerEmail"));
            res = false;
        }
        else
        {
            returnTheInputElementToNormal($("#managerEmail"));
        }

        if (!phoneNumberIsOk($("#managerPhoneNumber").val()))
        {
            res = false;
            markTheInputElementAsError($("#managerPhoneNumber"));
        }
        else
        {
            returnTheInputElementToNormal($("#managerPhoneNumber"));
        }
        return res;
    }

    function stepTwoChecking()
    {
        var res = true;
        var stepTwoInformation = $(".input-Event").map(function() {
            return $(this);
        });

        for( i = 0; i < stepTwoInformation.length; i++)
        {
            if (isEmpty(stepTwoInformation[i].val()))
            {
                markTheInputElementAsError(stepTwoInformation[i]);
                res = false;
            }
            else
            {
                returnTheInputElementToNormal(stepTwoInformation[i]);
            }
        }

        if (res == false)
        {
            return res;
        }
        else {

            if (isNaN($("#eventNumberOfStudentsInTeam").val())) {
                res = false;
                markTheInputElementAsError($("#eventNumberOfStudentsInTeam"));
            }
            else {
                returnTheInputElementToNormal($("#eventNumberOfStudentsInTeam"));
            }

            if (isNaN($("#eventNumberOfTeams").val())) {
                res = false;
                markTheInputElementAsError($("#eventNumberOfTeams"));
            }
            else {
                returnTheInputElementToNormal($("#eventNumberOfTeams"));
            }
        }
        return res;
    }

    function stepThreeChecking() {

        var res = true;
        var stepThreeInformation = $(".input-Support").map(function() {
            return $(this);
        });

        for( i = 0; i < stepThreeInformation.length; i++)
        {
            if (isEmpty(stepThreeInformation[i].val()))
            {
                markTheInputElementAsError(stepThreeInformation[i]);
                res = false;
            }
            else
            {
                returnTheInputElementToNormal(stepThreeInformation[i]);
            }
        }

        if (!emailIsOk($("#supportEmail")))
        {
            markTheInputElementAsError($("#supportEmail"));
            res = false;
        }
        else
        {
            returnTheInputElementToNormal($("#supportEmail"));
        }

        return res;
    }

    function fillStepOneData() {
        data.firstName =  $("#managerFirstName").val();
        data.lastName = $("#managerLastName").val();
        data.password = $("#managerEmailPassword").val();
        data.Email = $("#managerEmail").val();
        data.phoneNumber = $("#managerPhoneNumber").val();
    }
    function fillStepTwoData() {
        data.EventName = $("#eventName").val();
        data.EventAdress = $("#eventAdress").val();
        data.EventDate = $("#eventDate").val();
        data.EventNumberOfTeams = $("#eventNumberOfTeams").val();
        data.EventNumberOfStudentsInTeam = $("#eventNumberOfStudentsInTeam").val();
    }
    function fillStepThreeData() {
        data.SupportEmail = $("#supportEmail").val();
        data.SupportEmailPassword = $("#supportEmailPassword").val();
    }
});