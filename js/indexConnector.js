

function loadData(search, isDate=true) {
    let tableBody = document.getElementById("resultSearchTable");
    for (var i = 1; i < tableBody.rows.length;) {
        tableBody.deleteRow(i);
    }

    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'php/db/search.php', true);
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    httpRequest.onload = function () {
        let newResp = this.responseText.replaceAll(String.fromCharCode(92) + "u2020", "");
        newResp = newResp.split("</font>")[1];

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
    if (isDate) {
        httpRequest.send("searchDate=" + search);
    } else {
        httpRequest.send("searchName=" + search);
    }
    httpRequest.onreadystatechange = function () { };

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
        $('#pattronNameAdjustingModal').on('hidden.bs.modal', function (e) {
            document.getElementById('feiertagNamestag').value = document.getElementById('patronenNameField').value;
        });
    }
}

function search() {
    let searchName = document.getElementById('searchModalName').value;
    if (searchName) {
        loadData(searchName, false);
    } else {
        let searchDate = document.getElementById('searchModalDate').value;
        if (searchDate) {
            let month = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
            let searchElement = searchDate.split(" ")[1].trim();
            let monthNr = month.indexOf(searchElement)+1;
            let nullIfNotTen = monthNr < 10 ? "0" : "";
            searchDate="2023-"+ nullIfNotTen +""+monthNr+"-"+searchDate.split(" ")[0].trim()
            loadData(searchDate);
        }
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