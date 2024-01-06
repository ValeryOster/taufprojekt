

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

        //Delete INFO NO JSON
        let string = newResp.split("</font>")[1];
        if (string) {
            newResp = string;
        }

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
//For testing if it helps
var QuickSort = function QuickSort(a, from, to) {
    var third_index = 0;
    while (true) {
        // Insertion sort is faster for short arrays.
        if (to - from <= 10) {
            InsertionSort(a, from, to);
            return;
        }
        if (to - from > 1000) {
            third_index = GetThirdIndex(a, from, to);
        } else {
            third_index = from + ((to - from) >> 1);
        }
        // Find a pivot as the median of first, last and middle element.
        var v0 = a[from];
        var v1 = a[to - 1];
        var v2 = a[third_index];
        var c01 = comparefn(v0, v1);
        if (c01 > 0) {
            // v1 < v0, so swap them.
            var tmp = v0;
            v0 = v1;
            v1 = tmp;
        } // v0 <= v1.
        var c02 = comparefn(v0, v2);
        if (c02 >= 0) {
            // v2 <= v0 <= v1.
            var tmp = v0;
            v0 = v2;
            v2 = v1;
            v1 = tmp;
        } else {
            // v0 <= v1 && v0 < v2
            var c12 = comparefn(v1, v2);
            if (c12 > 0) {
                // v0 <= v2 < v1
                var tmp = v1;
                v1 = v2;
                v2 = tmp;
            }
        }
        // v0 <= v1 <= v2
        a[from] = v0;
        a[to - 1] = v2;
        var pivot = v1;
        var low_end = from + 1;   // Upper bound of elements lower than pivot.
        var high_start = to - 1;  // Lower bound of elements greater than pivot.
        a[third_index] = a[low_end];
        a[low_end] = pivot;

        partition: for (var i = low_end + 1; i < high_start; i++) {
            var element = a[i];
            var order = comparefn(element, pivot);
            if (order < 0) {
                a[i] = a[low_end];
                a[low_end] = element;
                low_end++;
            } else if (order > 0) {
                do {
                    high_start--;
                    if (high_start == i) break partition;
                    var top_elem = a[high_start];
                    order = comparefn(top_elem, pivot);
                } while (order > 0);
                a[i] = a[high_start];
                a[high_start] = element;
                if (order < 0) {
                    element = a[i];
                    a[i] = a[low_end];
                    a[low_end] = element;
                    low_end++;
                }
            }
        }
        if (to - high_start < low_end - from) {
            QuickSort(a, high_start, to);
            to = low_end;
        } else {
            QuickSort(a, from, low_end);
            from = high_start;
        }
    }
};