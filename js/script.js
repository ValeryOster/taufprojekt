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

function loadData(searchData) {

    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'php/db/search.php', true);
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpRequest.onload = function(){
        console.log(this.responseText);
    }
    httpRequest.send("search="+searchData);

    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200)
        {
            let response = JSON.parse(httpRequest.responseText);
            let html = '';
            let serial_no = 1;
            if(response.length > 0)
            {
                for(var count = 0; count < response.length; count++)
                {
                    html += '<tr>';
                    html += '<td>'+serial_no+'</td>';
                    html += '<td>'+response[count].post_title+'</td>';
                    html += '<td>'+response[count].post_description+'</td>';
                    html += '</tr>';
                    serial_no++;
                }
            }
            else
            {
                html += '<tr><td colspan="3" class="text-center">No Data Found</td></tr>';
            }
            document.getElementById('post_data').innerHTML = html;
            document.getElementById('total_data').innerHTML = response.length;
        }
    };

}

function search() {
    let searchName = document.getElementById('searchModalName').value;
    if (searchName) {
        console.log(searchName);
        loadData(searchName);
    }else {
        let searchDate = document.getElementById('searchModalDate').value;
        console.log(searchDate);
    }
}