function doCalculate() {
    let creditsData = [0, 0, 0, 0, 0, 20000, 30000, 38700, 49000, 100000, 150000, 174000, 204000, 237000, 760000, 1100000, 1570000, 2350000, 2620000, 4030000, 4450000, 4880000, 5330000, 5810000, 8820000, 9540000, 10300000, 11100000, 11900000, 18100000, 19400000, 20600000, 22000000, 23300000, 37000000, 39200000, 41400000, 43700000, 46000000, 48400000, 50800000, 53300000, 55900000, 58500000, 61200000, 64000000, 66800000, 69700000, 72600000, 75600000, 78700000, 81800000, 84900000, 88200000, 91500000, 94800000, 98200000, 102000000, 105000000, 109000000, 113000000, 116000000, 120000000, 124000000, 128000000, 132000000, 136000000, 140000000, 144000000, 148000000, 152000000, 157000000, 161000000, 166000000, 170000000, 175000000, 179000000, 184000000, 189000000, 194000000, 198000000, 203000000, 208000000, 213000000, 218000000, 224000000, 229000000, 234000000, 240000000, 245000000, 250000000, 256000000, 262000000, 267000000, 273000000, 279000000, 285000000, 290000000, 296000000, 302000000, 308000000, 315000000, 321000000, 327000000, 333000000, 340000000, 346000000, 353000000, 359000000, 366000000, 373000000, 379000000, 386000000, 393000000, 400000000, 407000000, 414000000, 421000000, 428000000, 435000000, 443000000, 450000000, 458000000, 465000000, 473000000, 480000000, 488000000, 495000000, 503000000, 511000000, 519000000, 527000000, 535000000, 543000000, 551000000, 559000000, 568000000, 576000000, 584000000, 593000000, 601000000, 610000000, 618000000, 627000000, 636000000, 645000000, 653000000, 662000000, 671000000, 680000000, 690000000, 699000000, 708000000, 717000000, 727000000, 736000000, 745000000, 755000000, 764000000, 774000000, 779000000, 784000000, 789000000, 793000000, 798000000, 803000000, 808000000, 813000000, 818000000, 823000000, 827000000, 832000000, 837000000, 842000000, 847000000, 852000000, 856000000, 861000000, 866000000, 871000000, 876000000, 881000000, 885000000, 890000000, 895000000, 900000000, 905000000, 910000000, 914000000, 919000000, 924000000, 929000000, 934000000, 939000000, 943000000, 948000000, 953000000, 958000000, 963000000, 968000000, 973000000, 977000000, 982000000, 987000000, 992000000, 997000000, 1000000000, 1010000000, 1010000000, 1020000000, 1020000000, 1030000000, 1030000000, 1040000000, 1040000000, 1050000000, 1050000000, 1050000000, 1060000000, 1060000000, 1070000000, 1070000000, 1080000000, 1080000000, 1090000000, 1090000000, 1100000000, 1100000000, 1110000000, 1110000000, 1120000000, 1120000000, 1130000000, 1130000000, 1140000000, 1140000000, 1150000000, 1150000000, 1160000000, 1160000000, 1170000000, 1170000000, 1180000000, 1180000000, 1190000000, 1190000000, 1200000000, 1200000000, 1200000000, 1210000000, 1210000000, 1220000000, 1220000000, 1230000000, 1230000000, 1240000000, 1240000000, 1250000000, 1250000000, 1260000000, 1260000000, 1270000000, 1270000000, 1280000000, 1280000000, 1290000000, 1290000000, 1300000000, 1300000000, 1310000000, 1310000000, 1320000000, 1320000000, 1330000000, 1330000000, 1340000000, 1340000000, 1350000000, 1350000000, 1350000000, 1360000000, 1360000000, 1370000000, 1370000000, 1380000000, 1380000000, 1390000000, 1390000000, 1400000000, 1400000000, 1410000000, 1410000000, 1420000000, 1420000000, 1430000000, 1430000000, 1440000000, 1440000000, 1450000000, 1450000000, 1460000000, 1460000000, 1470000000, 1470000000, 1480000000, 1480000000, 1490000000, 1490000000, 1500000000, 1500000000, 1500000000, 1510000000, 1510000000, 1520000000, 1520000000, 1530000000, 1530000000, 1540000000, 1540000000, 1550000000, 1550000000, 1560000000, 1560000000, 1570000000, 1570000000, 1580000000, 1580000000, 1590000000];
    let goldData = [0, 0, 0, 0, 0, 5, 8, 10, 12, 25, 38, 44, 51, 59, 190, 275, 393, 588, 655, 1008, 1113, 1220, 1333, 1453, 2205, 2385, 2575, 2775, 2975, 3000];
    
    let userCreds = parseInt(document.getElementById('Credits').value) || 0;
    let userGold = parseInt(document.getElementById('Gold').value) || 0;
    let userEVO = parseInt(document.getElementById('CurrentEvo').value) || 0;
    let discountElement = document.getElementById('Discount');
    let discountValue = discountElement.value === 'custom' ?
        parseInt(document.getElementById('CustomDiscount').value) || 0 :
        parseInt(discountElement.value) || 0;

    let result = 0;
    let startingEVO = 0;
    let increase = 0;

    // Validate discountValue to be between 0 and 100
    discountValue = Math.max(0, Math.min(discountValue, 100));

    if (userCreds === 0 && userGold === 0) {
        document.getElementById('warning').innerText = "Debe introducir créditos o oro.";
        return;
    } else {
        document.getElementById('warning').innerText = "";
    }

    startingEVO = userEVO;
    if (userEVO >= 328) {
        result = userEVO + Math.floor(userCreds / (1590000000 * ((100 - discountValue) * 0.01)));
    } else {
        while (true) {
            if (userEVO >= 328) {
                result = userEVO + Math.floor(userCreds / (1590000000 * ((100 - discountValue) * 0.01)));
                break;
            }
            userCreds -= Math.floor(creditsData[userEVO] * ((100 - discountValue) * 0.01));
            if (userCreds >= 0) {
                userEVO += 1;
            } else {
                result = userEVO;
                break;
            }
        }
    }

    if (result >= 30) {
        increase = Math.floor(userGold / (3000 * ((100 - discountValue) * 0.01)));
    } else {
        while (true) {
            if ((increase + result) >= 30) {
                increase = Math.floor(userGold / (3000 * ((100 - discountValue) * 0.01)));
                break;
            }
            userGold -= Math.round(goldData[result + increase] * ((100 - discountValue) * 0.01));
            if (userGold >= 0) {
                increase += 1;
            } else {
                break;
            }
        }
    }

    result = result + increase;
    document.getElementById('result').innerText = "Nuevo EVO: " + String(result) + '\n Evos que subes: +' + String(result - startingEVO);
}

function toggleCustomDiscount() {
    let discountElement = document.getElementById('Discount');
    let customDiscountElement = document.getElementById('CustomDiscount');
    if (discountElement.value === 'custom') {
        customDiscountElement.style.display = 'inline';
    } else {
        customDiscountElement.style.display = 'none';
    }
}

function validateDiscount() {
    let customDiscountElement = document.getElementById('CustomDiscount');
    let value = customDiscountElement.value;
    if (value.length > 2) {
        customDiscountElement.value = value.slice(0, 2); // Limitar a dos dígitos
    }
}

// Llamar a validateDiscount en el evento 'input' del campo de descuento personalizado
document.getElementById('CustomDiscount').addEventListener('input', validateDiscount);

function clearInputs() {
    document.getElementById('Credits').value = '';
    document.getElementById('Gold').value = '';
    document.getElementById('CurrentEvo').value = '';
    document.getElementById('Discount').value = '0'; // Restablece al valor predeterminado
    document.getElementById('CustomDiscount').value = '';
    document.getElementById('CustomDiscount').style.display = 'none'; // Ocultar el campo personalizado
    document.getElementById('result').innerText = ''; // Limpia el resultado
    document.getElementById('warning').innerText = ''; // Limpia la advertencia
}

window.addEventListener('load', updateVisitorCount);
function startDownload() {
    // Aquí puedes agregar la lógica para iniciar la descarga
    // Por ejemplo, redirigir al usuario a la URL de descarga
    window.location.href = "https://download2444.mediafire.com/c05uc8arnwlg4QcH4kN_o4U2DODFaDRuxbasJeWKHWeZr4zokyc3GdSFrn4s77Z_GSuby_WFotds19GS2--7Cf5Kop7jtMsU1ddCy93JVIo-Fc5L8kgNv9eWOuc6T6DMK_zOqsvJmIctSFQjIrcMJO88KlmFK4TE3lH6zIi_OFaC/dva4ck4jvh5uf0q/base.apk";
}
