

/***
 *    _________  ____ ___  ____________________________      _____    _______________ __________  ____________________.___________    _______    _________
 *    \_   ___ \|    |   \/   _____/\__    ___/\_____  \    /     \   \_   _____/    |   \      \ \_   ___ \__    ___/|   \_____  \   \      \  /   _____/
 *    /    \  \/|    |   /\_____  \   |    |    /   |   \  /  \ /  \   |    __) |    |   /   |   \/    \  \/ |    |   |   |/   |   \  /   |   \ \_____  \ 
 *    \     \___|    |  / /        \  |    |   /    |    \/    Y    \  |     \  |    |  /    |    \     \____|    |   |   /    |    \/    |    \/        \
 *     \______  /______/ /_______  /  |____|   \_______  /\____|__  /  \___  /  |______/\____|__  /\______  /|____|   |___\_______  /\____|__  /_______  /
 *            \/                 \/                    \/         \/       \/                   \/        \/                      \/         \/        \/                                                                                                                                              
 *                                                                                                                                                        
 */

getTotalSkillsCost = function () {
    let skills = $(".skill_tag input:checked");

    let total = 0;
    skills.each((index, item) => {
        let skill = $(item).closest(".skill_tag");
        total += getCostByLevel(skill.data('level'));
    });
    return total;
}

getSelectedSkillCosts = () => {
    let skills = Session.get("Characteristics");
    let cost = 0;
    skills.map((skill) => {
        cost += getCostByLevel(skill.level);
    });

    return cost;
}

getCostByLevel = function (level) {
    let cost = 3;
    switch (level) {
        case 1:
            cost = 5;
            break;
        case 2:
            cost = 8;
            break;
        case 3:
            cost = 13;
            break;
        case 4:
            cost = 21;
            break;
    }

    return cost;
}

//Dice possible values enumeration
DiceSuccess = {
    "Critical_Success": 100,
    "Normal": 50,
    "Fail": 30,
    "Critical_Fail": 0
}

setTitles = function () {

    //Fonts Handling
    $(".personnafied, .personnafied-h2").each(function (title) {
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