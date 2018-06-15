var pointDict = {
    'Cancer': 30,
    'pH': 30,
    'Sodium': 20,
    'BUN': 20,
    'Liver': 20,
    'BP': 20,
    'RR': 20,
    'Mental': 20,
    'glucose': 10,
    'Hct': 10,
    'CHF': 10,
    'CVA': 10,
    'oxygen': 10,
    'Pleural': 10,
    'Female': -10,
    'Male': 0,
    'CKD': 10,
    'HR': 10,
    'Nursing': 10,
    'BT': 15
};

var toggleDict = {
    'Cancer': false,
    'pH': false,
    'Sodium': false,
    'BUN': false,
    'Liver': false,
    'BP': false,
    'RR': false,
    'Mental': false,
    'glucose': false,
    'Hct': false,
    'CHF': false,
    'CVA': false,
    'oxygen': false,
    'Pleural': false,
    'Sexual': false,
    'AGE': false,
    'CKD': false,
    'HR': false,
    'Nursing': false,
    'BT': false
};

var toggle = function(element) {
    return new Promise((res, rej) => {
        var id = jQuery(element).attr('id');

        if (id != 'Sexual' || id != 'AGE') {
            jQuery(element).toggleClass("button-toggled");
            switch (toggleDict[id]) {
                case false:
                    toggleDict[id] = true;
                    break;
                case true:
                    toggleDict[id] = false;
                    break;
            }
        }

        if (id == 'Sexual') {
            var sexual = jQuery(element).find('h3');
            switch (sexual.html()) {
                case 'Sexual':
                    sexual.html('Female');
                    toggleDict[id] = true;
                    jQuery(element).addClass("button-toggled");
                    jQuery('#verify-sexual').hide();
                    break;
                case 'Female':
                    sexual.html('Male');
                    toggleDict[id] = true;
                    jQuery(element).addClass("button-toggled");
                    jQuery('#verify-sexual').hide();
                    break;
                case 'Male':
                    sexual.html('Sexual');
                    toggleDict[id] = false;
                    jQuery(element).removeClass("button-toggled");
                    jQuery('#verify-sexual').show();
                    break;
            }
        } else if (id == 'AGE') {
            if (element.find('input').val() != '') {
                toggleDict[id] = true;
                jQuery('#verify-age').hide();
            } else {
                toggleDict[id] = false;
                jQuery('#verify-age').show();
            }
        }
        if (!toggleDict['Sexual'] || !toggleDict['AGE'])
            jQuery('#result').find('p').show();
        else
            jQuery('#result').find('p').hide();
        res(true);
    });
};

var update = function(res) {
    if (jQuery('#AGE').find('input').val() != '' && toggleDict['Sexual']) {
        var result = 0;

        for (var metrix in toggleDict) {
            if (toggleDict[metrix] && metrix != 'Sexual' && metrix != 'AGE') {
                result += pointDict[metrix];
            } else if (metrix == 'Sexual') {
                if (jQuery('#Sexual').find('h3').html() == 'Male')
                    result += pointDict['Male'];
                else if (jQuery('#Sexual').find('h3').html() == 'Female')
                    result += pointDict['Female'];
            } else if (metrix == 'AGE') {
                result += Number(jQuery('#AGE').find('input').val());
            }
        }

        jQuery('#result').find('h1').html(result.toString() + ' points');
    }
};

jQuery(document).ready(function() {
    jQuery('.button').click(function() {
        toggle(this).then(update);
    });
    jQuery('#AGE').find('input').keyup(function() {
        toggle(jQuery('#AGE')).then(update);
    });
});