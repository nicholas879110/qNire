//http://datatables.net/plug-ins/pagination#bootstrap
$.extend(true, $.fn.dataTable.defaults, {
    "sDom": "rt<'row'<'col-sm-6'li><'col-sm-6'p>>",
    "sPaginationType": "bootstrap",
    "oLanguage": {
        "sLengthMenu": "每页 _MENU_ ",
        "sEmptyTable": "没有数据！",
        "sZeroRecords": "没有数据！",
        "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条记录",
        "sInfoEmpty": "",
        "sSearch": "搜索：",
        "sLoadingRecords": "查询中...",
        "sProcessing": "<div style='width: 100px; padding: 14px 0; text-align: center; position: absolute; top: 50%; left: 50%; margin-left: -50px; margin-top: -26px;'>查询中...</div>"
    },
    "sServerMethod": "POST",
    "bAutoWidth": true,
    "bProcessing": true,
    "bFilter": false,
    "bServerSide": true,
    "fnServerData": function ( sUrl, aoData, fnCallback, oSettings ) {
        oSettings.jqXHR = $.ajax( {
            "url":  sUrl,
            "data": aoData,
            "success": function (json) {
                if ( json.sError ) {
                    oSettings.oApi._fnLog( oSettings, 0, json.sError );
                }

                $(oSettings.oInstance).trigger('xhr', [oSettings, json]);
                fnCallback( json );
            },
            "dataType": "json",
            "cache": false,
            "type": oSettings.sServerMethod
        } );
    },
    "fnInitComplete": function (oSettings, json) {
        $('table th input:checkbox').on('click', function () {
            var that = this;
            $(this).closest('table').find('tr > td:first-child input:checkbox')
                .each(function () {
                    this.checked = that.checked;
                    $(this).closest('tr').toggleClass('selected');
                });
        });
    }
});

/**
 * 在iRow行之前添加行
 * @param mData
 * @param bRedraw
 * @param iRow
 */
$.fn.dataTableExt.oApi.fnAddDataInRowIndex=function( mData, bRedraw,iRow){
        if ( mData.length === 0 )
        {
            return [];
        }

        var aiReturn = [];
        var iTest;

        /* Find settings from table node */
        var oSettings = this.oApi._fnSettingsFromNode( this[$.fn.DataTable.ext.iApiIndex] );

        /* Check if we want to add multiple rows or not */
        if ( typeof mData[0] === "object" && mData[0] !== null )
        {
            for ( var i=0 ; i<mData.length ; i++ )
            {
                iTest = this.oApi._fnAddData( oSettings, mData[i] );
                if ( iTest == -1 )
                {
                    return aiReturn;
                }
                aiReturn.push( iTest );
            }
        }
        else
        {
            alert(111);
            iTest = this._fnAddDataInARow( oSettings, mData,iRow );
            if ( iTest == -1 )
            {
                return aiReturn;
            }
            aiReturn.push( iTest );
        }

        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

        if ( bRedraw === undefined || bRedraw )
        {
            this.oApi._fnReDraw( oSettings );
        }
        return aiReturn;
}



$.fn.dataTableExt.oApi._fnAddDataInARow=function(oSettings, aDataSupplied,iRowIndex){
    var oCol;

    /* Take an independent copy of the data source so we can bash it about as we wish */
    var aDataIn = ($.isArray(aDataSupplied)) ?
        aDataSupplied.slice() :
        $.extend( true, {}, aDataSupplied );

    /* Create the object for storing information about this new row */
    var iRow=0;
    if(iRowIndex<oSettings.aoData.length){
        iRow=iRowIndex;
    }else{
        iRow = oSettings.aoData.length;
    }
    var oData = $.extend( true, {}, $.fn.DataTable.models.oRow );
    oData._aData = aDataIn;
    oSettings.aoData.push( oData );

    /* Create the cells */
    var nTd, sThisType;
    for ( var i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
    {
        oCol = oSettings.aoColumns[i];

        /* Use rendered data for filtering / sorting */
        if ( typeof oCol.fnRender === 'function' && oCol.bUseRendered && oCol.mData !== null )
        {
            this.oApi._fnSetCellData( oSettings, iRow, i, this.oApi._fnRender(oSettings, iRow, i) );
        }
        else
        {
            this.oApi._fnSetCellData( oSettings, iRow, i, this.oApi._fnGetCellData( oSettings, iRow, i ) );
        }

        /* See if we should auto-detect the column type */
        if ( oCol._bAutoType && oCol.sType != 'string' )
        {
            /* Attempt to auto detect the type - same as _fnGatherData() */
            var sVarType = this.oApi._fnGetCellData( oSettings, iRow, i, 'type' );
            if ( sVarType !== null && sVarType !== '' )
            {
                sThisType = this.oApi._fnDetectType( sVarType );
                if ( oCol.sType === null )
                {
                    oCol.sType = sThisType;
                }
                else if ( oCol.sType != sThisType && oCol.sType != "html" )
                {
                    /* String is always the 'fallback' option */
                    oCol.sType = 'string';
                }
            }
        }
    }

    /* Add to the display array */
    oSettings.aiDisplayMaster.push( iRow );

    /* Create the DOM information */
    if ( !oSettings.oFeatures.bDeferRender )
    {
        this.oApi._fnCreateTr( oSettings, iRow );
    }

    return iRow;
}



/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
    return {
        "iStart": oSettings._iDisplayStart,
        "iEnd": oSettings.fnDisplayEnd(),
        "iLength": oSettings._iDisplayLength,
        "iTotal": oSettings.fnRecordsTotal(),
        "iFilteredTotal": oSettings.fnRecordsDisplay(),
        "iPage": Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
        "iTotalPages": Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
    };
}

/* Bootstrap style pagination control */
$.extend($.fn.dataTableExt.oPagination, {
    "bootstrap": {
        "fnInit": function (oSettings, nPaging, fnDraw) {
            var oLang = oSettings.oLanguage.oPaginate;
            var fnClickHandler = function (e) {
                e.preventDefault();
                if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                    fnDraw(oSettings);
                }
            };

            $(nPaging).append(
                '<ul class="pagination">' +
                    '<li class="prev disabled"><a href="#"><i class="icon-double-angle-left"></i></a></li>' +
                    '<li class="next disabled"><a href="#"><i class="icon-double-angle-right"></i></a></li>' +
                    '</ul>'
            );
            var els = $('a', nPaging);
            $(els[0]).bind('click.DT', { action: "previous" }, fnClickHandler);
            $(els[1]).bind('click.DT', { action: "next" }, fnClickHandler);
        },

        "fnUpdate": function (oSettings, fnDraw) {
            var iListLength = 5;
            var oPaging = oSettings.oInstance.fnPagingInfo();
            var an = oSettings.aanFeatures.p;
            var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

            if (oPaging.iTotalPages < iListLength) {
                iStart = 1;
                iEnd = oPaging.iTotalPages;
            }
            else if (oPaging.iPage <= iHalf) {
                iStart = 1;
                iEnd = iListLength;
            } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                iStart = oPaging.iTotalPages - iListLength + 1;
                iEnd = oPaging.iTotalPages;
            } else {
                iStart = oPaging.iPage - iHalf + 1;
                iEnd = iStart + iListLength - 1;
            }

            for (i = 0, iLen = an.length; i < iLen; i++) {
                // Remove the middle elements
                $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                // Add the new list items and their event handlers
                for (j = iStart; j <= iEnd; j++) {
                    sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                    $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                        .insertBefore($('li:last', an[i])[0])
                        .bind('click', function (e) {
                            e.preventDefault();
                            oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                            fnDraw(oSettings);
                        });
                }

                // Add / remove disabled classes from the static elements
                if (oPaging.iPage === 0) {
                    $('li:first', an[i]).addClass('disabled');
                } else {
                    $('li:first', an[i]).removeClass('disabled');
                }

                if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                    $('li:last', an[i]).addClass('disabled');
                } else {
                    $('li:last', an[i]).removeClass('disabled');
                }
            }
        }
    }
});