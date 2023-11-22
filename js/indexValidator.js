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

document.getElementById("searchModalDate").addEventListener("click", ev => {
    document.getElementById("searchModalName").value = "";
});
document.getElementById("searchModalName").addEventListener("click", ev => {
    document.getElementById("searchModalDate").value = "";
});