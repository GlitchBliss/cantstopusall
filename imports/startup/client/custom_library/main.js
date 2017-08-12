//Dice possible values enumeration
DiceSuccess = {
    "Critical_Success": 100,
    "Normal": 50,
    "Fail": 30,
    "Critical_Fail": 0
}

setTitles = function() {

    //Fonts Handling
    $(".personnafied, .personnafied-h2").each(function(title) {
        var characters = $(this).text().split("");
        var frontText = $("<div class='front'></div>");
        var backText = $("<div class='back'></div>");

        $(this).empty();

        $.each(characters, (index, character) => {
            var embeddedLetter = $("<span data-letter ='" + character + "'>" + character + "</span>");
            var variantNumber = Math.floor((Math.random() * 20) + 1);
            if (character != ' ') {
                embeddedLetter.addClass("letter-" + variantNumber);
            } else {
                embeddedLetter.addClass("spacer");
            }

            $(this).append(embeddedLetter);
        });
    });
};


T9n.setLanguage('fr');