function toggle(source, number) {
    checkboxes = document.getElementsByName('check'+number+'[]');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function toggle1(number) {
    checkboxes = document.getElementsByName('check'+number+'[]');
    var flag = true;
    for(var i=0, n=checkboxes.length; i<n;i++) {
        if(checkboxes[i].checked == false)
            flag = false;
    }
    document.getElementById('prim'+number).checked = flag;
}
function toggleEdit(source, number) {
    checkboxes = document.getElementsByName('check'+number+'[]edit');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function toggle1Edit(number) {
    checkboxes = document.getElementsByName('check'+number+'[]edit');
    var flag = true;
    for(var i=0, n=checkboxes.length; i<n;i++) {
        if(checkboxes[i].checked == false)
            flag = false;
    }
    document.getElementById('prim'+number+'edit').checked = flag;
}
function closeEditForm() {
    $('#editProductForm').hide();
    $('#namaProductEdit').val("");
    $('#prim1edit').prop('checked', false);
    $('#prim2edit').prop('checked', false);
    $('#checkMale').prop('checked', false);
    $('#checkFemale').prop('checked', false);
    $('#cath1').prop('checked', false);
    $('#cath2').prop('checked', false);
    $('#catm1').prop('checked', false);
    $('#catm2').prop('checked', false);
    $('#catl1').prop('checked', false);
    $('#catl2').prop('checked', false);
    $(".accordion-section-title").removeClass("active");
    $(".accordion-section-content").slideUp(300).removeClass('open');
    $('#rangesliderumur').slider({disabled: "false"});
}
function editProduct(num) {
    var dataString = "productId="+num;
    $('.loading-div-edit').show();
    closeEditForm();
    $.ajax({
        type: "GET",
        url: $('#editProductDataLink').val(),
        data: dataString,
        success: function(data) {
            var data = JSON.parse(data);
            $('.loading-div-edit').hide();
            $('#editProductForm').show();
            $('#idProductEdit').val(num);

            $('#namaProductEdit').val(data[0].nama);
            if(data[0].male == 1 && data[0].female == 1) {
                $('#prim1edit').prop('checked', true);
            }
            if(data[0].male == 1) {
                $('#checkMale').prop('checked', true);
            }
            if(data[0].female == 1) {
                $('#checkFemale').prop('checked', true);
            }
            if(data[0].h1 == 1 && data[0].h2 == 1 && data[0].m1 == 1 && data[0].m2 == 1 && data[0].l1 == 1 && data[0].l2 == 1) {
                $('#prim2edit').prop('checked', true);
            }
            if(data[0].h1 == 1) {
                $('#cath1').prop('checked', true);
            }
            if(data[0].h1 == 1) {
                $('#cath2').prop('checked', true);
            }
            if(data[0].m1 == 1) {
                $('#catm1').prop('checked', true);
            }
            if(data[0].m2 == 1) {
                $('#catm2').prop('checked', true);
            }
            if(data[0].l1 == 1) {
                $('#catl1').prop('checked', true);
            }
            if(data[0].l2 == 1) {
                $('#catl2').prop('checked', true);
            }
            $('#rangevalumuredit').html(data[0].ageLow+' - '+data[0].ageHigh);
            $('#rangeValUmurLowEdit').val(data[0].ageLow);
            $('#rangeValUmurHighEdit').val(data[0].ageHigh);
            $('#rangesliderumuredit').slider({
                range: true,
                values: [data[0].ageLow, data[0].ageHigh]
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var unauthorized = "unauthorized";
            alert("Edit Product Exception: "+errorThrown);
            if(errorThrown.toUpperCase() == unauthorized.toUpperCase()) {
                // window.location.replace({{ URL::to('home') }});
            }
        }
    });
}
function deleteProduct(num) {
    var dataString = "productId="+num;
    $.ajax({
        type: "GET",
        url: $('#deleteProductLink').val(),
        data: dataString,
        success: function(data) {
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var unauthorized = "unauthorized";
            alert("Delete Product Exception: "+errorThrown);
            if(errorThrown.toUpperCase() == unauthorized.toUpperCase()) {
                // window.location.replace({{ URL::to('home') }});
            }
        }
    });
}
function validasi() {
    var name = document.getElementById('clientName').value;
    var company = document.getElementById('clientComp').value;
    var addr = document.getElementById('clientAddr').value;
    var contactPerson = document.getElementById('contactPerson').value;
    var cpPos = document.getElementById('cpPos').value;
    var contactNumber = document.getElementById('contactNumber').value;
    var clientEmail = document.getElementById('clientEmail').value;
    var clientAd = document.getElementById('clientAd').value;
    var clientProd = document.getElementById('clientProd').value;
    if(name == "" || name == null) {
        document.getElementById('errorMsg').innerHTML = "Nama client harus diisi";
        return false;
    }else if(company == "" || comapny == null) {
        document.getElementById('errorMsg').innerHTML = "Perusahaan client harus diisi";
        return false;
    }else if(addr == "" || addr == null) {
        document.getElementById('errorMsg').innerHTML = "Alamat client harus diisi";
        return false;
    }else if(contactPerson == "" || contactPerson == null) {
        document.getElementById('errorMsg').innerHTML = "Contact person client harus diisi";
        return false;
    }else if(cpPos == "" || cpPos == null) {
        document.getElementById('errorMsg').innerHTML = "Posisi contact person client harus diisi";
        return false;
    }else if(contactNumber == "" || contactNumber == null) {
        document.getElementById('errorMsg').innerHTML = "Nomor contact client harus diisi";
        return false;
    }else if(clientEmail == "" || clientEmail == null) {
        document.getElementById('errorMsg').innerHTML = "Email client harus diisi";
        return false;
    }else if(clientAd == "" || clientAd == null) {
        document.getElementById('errorMsg').innerHTML = "Advertiser client harus diisi";
        return false;
    }else {
        if(!$.isNumeric(contactNumber)) {
            document.getElementById('errorMsg').innerHTML = "Nomor contact client harus berupa angka";
            return false;
        }else if(clientEmail.lastIndexOf('@') == 0 ||
                 clientEmail.lastIndexOf('@') < 0 ||
                 clientEmail.lastIndexOf('.com') != clientEmail.length-4) {
            document.getElementById('errorMsg').innerHTML = "Format email salah, contoh: email@email.com";
            return false;
        }
    }
}
$(document).ready(function(){
    $("#myModalAddClient").on('show.bs.modal', function(event){
        var button = $(event.relatedTarget);  // Button that triggered the modal
        var titleData = button.data('title'); // Extract value from data-* attributes
        titleData = titleData.split('$');
        var clientId = titleData[1];
        var urlGet = titleData[2];
        $('#clientForm').attr('action', urlAction);
        $('.loading-div').hide();
        document.getElementById('submit').style.display = "inline";
        document.getElementById('close').style.display = "inline";
        if(titleData[0] == "addClient") {
            document.getElementById('titleModalVendor').innerHTML = "Add Client";
        }else if(titleData[0] == "editClient") {
            $('.loading-div').show();
            $('#clientForm').hide();
            document.getElementById('titleModalVendor').innerHTML = "Edit Client";
            var urlAction = titleData[3];
            $('#clientForm').attr('action', urlAction);
            var token = document.getElementById('_token').value;
            var dataString = "_token="+token+"&clientId="+clientId;
            $.ajax({
                type: "POST",
                url: urlGet,
                data: dataString,
                success: function(data) {
                    var clientData = JSON.parse(data);
                    $('.loading-div').hide();
                    $('#clientForm').show();
                    document.getElementById('clientId').value = clientData[0].idClient;
                    document.getElementById('clientName').value = clientData[0].namaClient;
                    document.getElementById('clientComp').value = clientData[0].namaPT;
                    document.getElementById('clientAddr').value = clientData[0].alamat;
                    document.getElementById('contactPerson').value = clientData[0].namaCP;
                    document.getElementById('cpPos').value = clientData[0].jabatanCP;
                    document.getElementById('contactNumber').value = clientData[0].noHPCP;
                    document.getElementById('clientEmail').value = clientData[0].emailCP;
                    document.getElementById('clientAd').value = clientData[0].advertiser;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var unauthorized = "unauthorized";
                    alert("Client Exception: "+errorThrown);
                    if(errorThrown.toUpperCase() == unauthorized.toUpperCase()) {
                        // window.location.replace({{ URL::to('home') }});
                    }
                }
            }, "json");
        }else if(titleData[0] == "detailClient") {
            $('.loading-div').show();
            $('#clientForm').hide();
            document.getElementById('titleModalVendor').innerHTML = "Client Detail";
            document.getElementById('clientName').disabled = "disabled";
            document.getElementById('clientComp').disabled = "disabled";
            document.getElementById('clientAddr').disabled = "disabled";
            document.getElementById('contactPerson').disabled = "disabled";
            document.getElementById('cpPos').disabled = "disabled";
            document.getElementById('contactNumber').disabled = "disabled";
            document.getElementById('clientEmail').disabled = "disabled";
            document.getElementById('submit').disabled = "disabled";
            var token = document.getElementById('_token').value;
            var dataString = "_token="+token+"&clientId="+clientId;
            $.ajax({
                type: "POST",
                url: urlGet,
                data: dataString,
                success: function(data) {
                    var clientData = JSON.parse(data);
                    $('.loading-div').hide();
                    $('#clientForm').show();
                    document.getElementById('clientName').value = clientData[0].namaClient;
                    document.getElementById('clientComp').value = clientData[0].namaPT;
                    document.getElementById('clientAddr').value = clientData[0].alamat;
                    document.getElementById('contactPerson').value = clientData[0].namaCP;
                    document.getElementById('cpPos').value = clientData[0].jabatanCP;
                    document.getElementById('contactNumber').value = clientData[0].noHPCP;
                    document.getElementById('clientEmail').value = clientData[0].emailCP;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var unauthorized = "unauthorized";
                    alert("Client Exception: "+errorThrown);
                    if(errorThrown.toUpperCase() == unauthorized.toUpperCase()) {
                        // window.location.replace({{ URL::to('home') }});
                    }
                }
            }, "json");
        }
    });
    $("#myModalAddClient").on('hide.bs.modal', function(event) {
        document.getElementById('errorMsg').innerHTML = "";
        document.getElementById('clientName').value = "";
        document.getElementById('clientName').disabled = "";
        document.getElementById('clientComp').value = "";
        document.getElementById('clientComp').disabled = "";
        document.getElementById('clientAddr').value = "";
        document.getElementById('clientAddr').disabled = "";
        document.getElementById('contactPerson').value = "";
        document.getElementById('contactPerson').disabled = "";
        document.getElementById('cpPos').value = "";
        document.getElementById('cpPos').disabled = "";
        document.getElementById('contactNumber').value = "";
        document.getElementById('contactNumber').disabled = "";
        document.getElementById('clientEmail').value = "";
        document.getElementById('clientEmail').disabled = "";
        document.getElementById('submit').disabled = "";
    });
    $('.deleteClient').on('click', function(event) {
        event.preventDefault();
        var clientId = $(this).data('title');
        var dataString = "clientId="+clientId;
        $.ajax({
            type: "GET",
            url: $('.deleteClientLink').val(),
            data: dataString,
            success: function(data) {
                window.location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var unauthorized = "unauthorized";
                alert("Delete Client Exception: "+errorThrown);
                if(errorThrown.toUpperCase() == unauthorized.toUpperCase()) {
                    // window.location.replace({{ URL::to('home') }});
                }
            }
        }, "json");
    });
});

$(document).ready(function(){
    $("#myModalAddProduct").on('show.bs.modal', function(event){
        var button = $(event.relatedTarget);  // Button that triggered the modal
        var titleData = button.data('title'); // Extract value from data-* attributes
        titleData = titleData.split('$');
        var clientId = titleData[0];
        var urlGet = titleData[1];
        $('#addProductForm').attr('action', urlGet);
        $('#idClient').val(clientId);
        document.getElementById('submit').style.display = "inline";
        document.getElementById('close').style.display = "inline";

        $('#rangesliderumur').slider({
            range: true,
            min: 0,
            max: 100,
            values: [ 10, 17 ],
            slide: function( event, ui ) {
                $('#rangevalumur').html(ui.values[0]+" - "+ui.values[1]);
                $('#rangeValUmurLow').val(ui.values[0]);
                $('#rangeValUmurHigh').val(ui.values[1]);
            }
        });
    });
});

$(document).ready(function(){
    $("#myModalProductDetails").on('show.bs.modal', function(event){
        $('#editProductForm').hide();
        var button = $(event.relatedTarget);  // Button that triggered the modal
        var titleData = button.data('title'); // Extract value from data-* attributes
        titleData = titleData.split('$');
        var clientId = titleData[1];
        var urlGet = titleData[2];
        $('#productDetailsForm').attr('action', urlGet);
        $('.loading-div').show();
        $('.loading-div-edit').hide();
        $('.loading-div-submit').hide();
        $('#productDetailsForm').hide();
        document.getElementById('submit').style.display = "inline";
        document.getElementById('close').style.display = "inline";
        if(titleData[0] == "productDetails") {
            document.getElementById('titleModal').innerHTML = "Product Details";
            var dataString = "clientId="+clientId;
            $.ajax({
                type: "GET",
                url: urlGet,
                data: dataString,
                success: function(data) {
                    var newRow = "<tbody id='productDetailsBody'>";
                    var productData = JSON.parse(data);
                    $('.loading-div').hide();
                    $('#productDetailsForm').show();
                    
                    for (var i = 0; i < productData.length; i++) {
                        var targetAudience = "";
                        if(productData[i].male == 1) {
                            targetAudience += "M";
                        }
                        if(productData[i].female == 1) {
                            targetAudience += " F";
                        }
                        targetAudience += ", "+productData[i].ageLow+"-"+productData[i].ageHigh+", ";
                        if(productData[i].h1 == 1) {
                            targetAudience += "H1";
                        }
                        if(productData[i].h2 == 1) {
                            targetAudience += " H2";
                        }
                        if(productData[i].m1 == 1) {
                            targetAudience += " M1";
                        }
                        if(productData[i].m2 == 1) {
                            targetAudience += " M2";
                        }
                        if(productData[i].l1 == 1) {
                            targetAudience += " L1";
                        }
                        if(productData[i].l2 == 1) {
                            targetAudience += " L2";
                        }
                        newRow += '<tr><td class="text-center">'+(i+1)+'</td><td class="text-center">'+productData[i].namaClient+'</td><td class="text-center"><input type="text" class="text-center" value="'+productData[i].nama+'" disabled="disable"></td><td class="text-center">'+productData[i].namaTa+' ('+targetAudience+')</td><td class="text-center"><a href="#" onclick="editProduct('+productData[i].idProduct+')" data-toggle="tooltip" data-placement="top" title="Edit"><span class="glyphicon glyphicon-pencil"></span></a><a href="#" onclick="deleteProduct('+productData[i].idProduct+')" data-toggle="tooltip" data-placement="top" title="Delete"><span class="glyphicon glyphicon-trash"></span></a></td></tr>';
                    }
                    newRow += "</tbody>";
                    $('#tableProductDetails').append(newRow);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var unauthorized = "unauthorized";
                    alert("Product Exception: "+errorThrown);
                    if(errorThrown.toUpperCase() == unauthorized.toUpperCase()) {
                        // window.location.replace({{ URL::to('home') }});
                    }
                }
            }, "json");
        
        }
    });
    $('#rangesliderumuredit').slider({
        range: true,
        min: 0,
        max: 100,
        values: [ 10, 17 ],
        slide: function( event, ui ) {
            $('#rangevalumuredit').html(ui.values[0]+" - "+ui.values[1]);
            $('#rangeValUmurLowEdit').val(ui.values[0]);
            $('#rangeValUmurHighEdit').val(ui.values[1]);
        }
    });
    $('#editProductForm').submit(function(event) {
        event.preventDefault();
        var temp = document.getElementsByName('check1[]edit');
        var check1 = [];
        for(var i=0;i<temp.length;i++) {
            if(temp[i].checked == true) {
                check1[i] = 1;
            }else {
                check1[i] = 0;
            }
        }
        var temp = document.getElementsByName('check2[]edit');
        var check2 = [];
        for(var i=0;i<temp.length;i++) {
            if(temp[i].checked == true) {
                check2[i] = 1;
            }else {
                check2[i] = 0;
            }
        }
        var editData = {
            productid: $('#idProductEdit').val(),
            name: $('#namaProductEdit').val(),
            check1: check1,
            check2: check2
        };
        editData = JSON.stringify(editData);
        var dataString = "data="+editData;
        $('.loading-div-submit').show();
        $.ajax({
            type: "GET",
            url: $('#editProductSubmitLink').val(),
            data: dataString,
            success: function(data) {
                closeEditForm();
                $('#productDetailsBody').remove();
                $('.loading-div-submit').hide();
                var newRow = "<tbody id='productDetailsBody'>";
                var productData = JSON.parse(data);
                $('.loading-div').hide();
                $('#productDetailsForm').show();
                
                for (var i = 0; i < productData.length; i++) {
                    var targetAudience = "";
                    if(productData[i].male == 1) {
                        targetAudience += "M";
                    }
                    if(productData[i].female == 1) {
                        targetAudience += " F";
                    }
                    targetAudience += ", "+productData[i].ageLow+"-"+productData[i].ageHigh+", ";
                    if(productData[i].h1 == 1) {
                        targetAudience += "H1";
                    }
                    if(productData[i].h2 == 1) {
                        targetAudience += " H2";
                    }
                    if(productData[i].m1 == 1) {
                        targetAudience += " M1";
                    }
                    if(productData[i].m2 == 1) {
                        targetAudience += " M2";
                    }
                    if(productData[i].l1 == 1) {
                        targetAudience += " L1";
                    }
                    if(productData[i].l2 == 1) {
                        targetAudience += " L2";
                    }
                    newRow += '<tr><td class="text-center">'+(i+1)+'</td><td class="text-center">'+productData[i].namaClient+'</td><td class="text-center"><input type="text" class="text-center" value="'+productData[i].nama+'" disabled="disable"></td><td class="text-center">'+productData[i].namaTa+' ('+targetAudience+')</td><td class="text-center"><a href="#" onclick="editProduct('+productData[i].idProduct+')" data-toggle="tooltip" data-placement="top" title="Edit"><span class="glyphicon glyphicon-pencil"></span></a><a href="#" onclick="deleteProduct('+productData[i].idProduct+')" data-toggle="tooltip" data-placement="top" title="Delete"><span class="glyphicon glyphicon-trash"></span></a></td></tr>';
                }
                newRow += "</tbody>";
                $('#tableProductDetails').append(newRow);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var unauthorized = "unauthorized";
                alert("Edit Product Exception: "+errorThrown);
                if(errorThrown.toUpperCase() == unauthorized.toUpperCase()) {
                    // window.location.replace({{ URL::to('home') }});
                }
            }
        }, "json");
    })
    $("#myModalProductDetails").on('hide.bs.modal', function(event){
        $('#productDetailsBody').remove();
        $('#editProductForm').hide();
    });
});