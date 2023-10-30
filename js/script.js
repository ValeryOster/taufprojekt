function validate() {
    if (document.getElementById('vaterId').checked) {
        document.getElementById('vaterForm').style.display = '';
        setVater(true);
    } else {
        document.getElementById('vaterForm').style.display = 'none';
        setVater(false);
    }

    if (document.getElementById('mutterId').checked) {
        document.getElementById('mutterForm').style.display = '';
        setMutter(true);
    } else {
        document.getElementById('mutterForm').style.display = 'none';
        setMutter(false);
    }

    if (document.getElementById('taufpateId').checked) {
        document.getElementById('taufpateForm').style.display = '';
        setTaufpate(true);
    } else {
        document.getElementById('taufpateForm').style.display = 'none'
        setTaufpate(false);
    }

    if (document.getElementById('taufpatinId').checked) {
        document.getElementById('taufpatinForm').style.display = '';
        setTaufpatin(true);
    } else {
        document.getElementById('taufpatinForm').style.display = 'none';
        setTaufpatin(false);
    }
}

function setVater(myVar) {
    document.getElementById('vornameVater').required = myVar;
    document.getElementById('nameVater').required = myVar;
    document.getElementById('dateVater').required = myVar;
    document.getElementById('geburstortVater').required = myVar;
}

function setMutter(myVar) {
    document.getElementById('vornameMutter').required = myVar;
    document.getElementById('nameMutter').required = myVar;
    document.getElementById('dateMutter').required = myVar;
    document.getElementById('geburstortMutter').required = myVar;
}

function setTaufpate(myVar) {
    document.getElementById('vornameTaufpate').required = myVar;
    document.getElementById('nameTaufpate').required = myVar;
    document.getElementById('dateTaufpate').required = myVar;
    document.getElementById('geburstortTaufpate').required = myVar;
}

function setTaufpatin(myVar) {
    document.getElementById('vornameTaufpatin').required = myVar;
    document.getElementById('nameTaufpatin').required = myVar;
    document.getElementById('dateTaufpatin').required = myVar;
    document.getElementById('geburstortTaufpatin').required = myVar;
}

function loadData(searchName) {
    let tableBody = document.getElementById("resultSearchTable");
    for (var i = 1; i < tableBody.rows.length;) {
        tableBody.deleteRow(i);
    }

    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'php/db/search.php', true);
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    function dateFormating(date) {
        let splice = date.split("-");
        return splice[2] + "." + splice[1] + "." + splice[0];
    }

    function dateFormatingAmis(date) {
        let splice = date.split(".");
        return splice[2] + "-" + splice[1] + "-" + splice[0];
    }


    function adjustToField(str) {
        const myModal = new bootstrap.Modal(document.getElementById('pattronNameAdjustingModal'), {keyboard: false});
        document.getElementById('patronenNameField').value = str;
        myModal.show();
    }

    httpRequest.onload = function () {

        let newResp = this.responseText.replaceAll(String.fromCharCode(92) + "u2020", "");
        try {
            let resultTexting = JSON.parse(newResp);
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {

                let iterator = 1;
                if (resultTexting.length > 0) {
                    resultTexting.forEach(rsText => {
                        let htmlTableRowElement = tableBody.insertRow(iterator);
                        htmlTableRowElement.insertCell(0).innerHTML = rsText.name.charAt(0) + rsText.name.slice(1).toLowerCase();
                        htmlTableRowElement.insertCell(1).innerHTML = dateFormating(rsText.date);
                        htmlTableRowElement.insertCell(2).innerHTML = rsText.description;
                        htmlTableRowElement.addEventListener("click", function () {
                            document.getElementById('sacramenteDatum').value = dateFormatingAmis(this.querySelectorAll("*")[1].innerHTML.trim());
                            adjustToField(this.querySelectorAll("*")[2].innerHTML.trim());
                        });
                        iterator++;
                    });


                } else {
                    html += '<tr><td colspan="3" class="text-center">No Data Found</td></tr>';
                }

            }
        } catch (e) {
            console.log("Error: ", e.message);
        }
    }

    httpRequest.send("search=" + searchName);


    httpRequest.onreadystatechange = function () {
    };

}

function search() {
    let searchName = document.getElementById('searchModalName').value;
    if (searchName) {
        loadData(searchName);
    } else {
        let searchDate = document.getElementById('searchModalDate').value;
    }
}

var date = new Date();
$(function () {
    $(".searchModalDate").datepicker({language: "de"});
    $("#searchModalDate").datepicker({
        prevText: '&#x3c;zurück', prevStatus: '',
        prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
        nextText: 'Vor&#x3e;', nextStatus: '',
        nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
        currentText: 'heute', currentStatus: '',
        todayText: 'heute', todayStatus: '',
        clearText: '-', clearStatus: '',
        closeText: 'schließen', closeStatus: '',
        monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
            'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        dateFormat: "dd MM",
        changeMonth: true,
        minDate: new Date(date.getFullYear(), 0, 1),
        maxDate: new Date(date.getFullYear(), 12, 31),
    });
});