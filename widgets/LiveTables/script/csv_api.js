function CSVToArray( strData, strDelimiter )
{
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData ))
    {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }


        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            var strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

function ArrayToCSV (arrayData, delimiter=',')
{
    var result = "";

    let rows = arrayData.length;
    for (i = 0; i < rows; i++)
    {
        let len = arrayData[i].length;
        for (j = 0; j < len; j++)
        {
            let content = arrayData[i][j];

            result += `"${content === undefined ? "undefined" : content.replace('"', '""')}"`;
            if (j < len - 1) result += delimiter;
        }
        
        if (i < rows - 1) result += '\n';
    }

    return result;
}

function DrawCSVTable(table)
{
    var csvDiv = document.querySelector("div#preview_data");

    //Clear old data
    csvDiv.innerHTML = "";
    
    //If nothing to show just stop now
    if (table.length <= 0) {
        return;
    }

    var CONTEXT_MENU = `
    <div class='window'>
        <img id='back_preview' src='${WIDGET_ROOT}assets/close_red.png'></img>
        <img id='upload_preview' src='${WIDGET_ROOT}assets/upload.png'></img>
    </div>`;

    var html = CONTEXT_MENU + `<center><table class='window' id='csv_table'><tr>`;

    //Setup header
    for (let j = 0; j < table[0].length; j++) {
        html += `<th>${table[0][j]}</th>`;
    }

    html += "</tr>";

    //Setup the table's body
    for (let i = 1; i < table.length; i++)
    {
        html += "<tr>";
        for (let j = 0; j < table[i].length; j++) {
            html += `<td class='cell' id='${i}-${j}' >${table[i][j]}</td>`;
        }
        html += "</tr>";
    }

    html += "</table></center>";
    csvDiv.innerHTML = html;
}

function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
}