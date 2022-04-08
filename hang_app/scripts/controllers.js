/**
 * Controller Classes, which will each be associated with a view.
 * Allows controlling DOM related behavior, including implementing
 * click listeners and triggering navigation.
 */


import {
    navigate
} from "./routing.js";
import {
    addClickListener,
    ApiError,
    displayErrorToast,
    getElement
} from "./utilities.js"
import {renderOptionCard, renderOptionListItem, renderResultsCard} from "./components.js";

const REFRESH_INTERVAL = 1000;

class Controller {
    root;

    constructor(session) {
        this.session = session;
    }

    registerListeners() {
    }

    refreshView() {
    }

    setup() {
    }
}


export class StartController extends Controller {
    constructor(session) {
        super(session);
    }

    setup() {
        addClickListener("start__newHangoutButton", (e) => {
            navigate("login");
        });
        addClickListener("start__joinHangoutButton", (e) => {
            this.session.startingNewSession = false;
            navigate("login");
        });
    }

}

export class JoinController extends Controller {
    constructor(session) {
        super(session);
    }

    setup() {
        addClickListener("join__joinHangoutButton", (e) => {
            // API Request with the Join Code
            const inputJoinCode = getElement("join__codeText").value
            if (inputJoinCode) {
                this.session.joinHangout(inputJoinCode)
                    .then(response => {
                        console.log(response);
                        navigate("pickDecision");
                    })
                    .catch(catchError);
            } else {
                displayErrorToast("Enter a join code");
            }
        });
    }

}

export class LoginController extends Controller {
    constructor(session) {
        super(session);
    }

    setup() {
        addClickListener("login__loginButton", (e) => {
            // Set session username
            const inputUsername = getElement("login__nameText").value;
            if (inputUsername) {
                this.session.setUsername(inputUsername);
                if (this.session.startingNewSession)
                    this.session.joinHangout()
                        .then(() => {
                            navigate("pickDecision");
                        })
                        .catch(catchError);
                else
                    navigate("join");
            } else {
                displayErrorToast("Enter a username")
            }
        });
    }

}


export class PickDecisionController extends Controller {
    constructor(session) {
        super(session);
    }

    setup() {
        const decisionTextBox = getElement("decision__decisionText");
        const suggestionChips = document.getElementsByClassName("chipView");
        for (let chip of suggestionChips) {
            chip.addEventListener('touchend', () => {
                decisionTextBox.value = chip.innerHTML;
            });
        }

        addClickListener("decision__startButton", (e) => {
            // API call?
            if (decisionTextBox.value) {
                this.session.addDecision(decisionTextBox.value)
                    .then(data => {
                        // console.log(data);
                        navigate("suggest");
                    })
                    .catch(e => {
                        if (e instanceof ApiError) {
                            displayErrorToast(e.message);
                        }
                        console.log(e);
                    });
            } else {
                displayErrorToast("Enter a decision")
            }
        });
    }
}


export class SuggestController extends Controller {
    constructor(session) {
        super(session);
        // TODO move all these attributes into Session
        //  (Session is like the repository/ViewModel, whereas Controllers
        //  are like the Activity/Fragment classes in Android). They shouldn't
        //  hold data, just control behavior.
        this.decision = {};
        this.options = [];
        this.ready = false;
        this.timeoutIds = [];
    }

    refreshView() {
        // Get the Decision Title
        this.session.getHangoutDecision()
            .then(data => {
                this.decision = data;
                // Display the title
                getElement("suggest__decisionTitle").innerHTML = data['decisionText'];
            })
            .then(() => {
                const listContainer = getElement("suggest__optionList");
                // Get all the options
                this.session.getOptionsForDecision(this.decision['decisionId'])
                    .then(jsonData => {
                        // Display all the options
                        listContainer.innerHTML = "";
                        for (let option of jsonData['options']) {
                            // console.log(option);
                            listContainer.appendChild(renderOptionListItem(option));
                        }
                    })
            })
            .catch(catchError);
        if (this.ready) {
            const readyButton = getElement("suggest__readyButton");
            readyButton.innerHTML = "Waiting for others...";
            readyButton.classList.add("greyedOut");
        }
    }

    registerListeners() {
        let thisInstance = this;
        const form = getElement('suggest__submitSuggestionForm');
        form.addEventListener('submit', e => {
            e.preventDefault();
            // API call to add Options
            const optionTextBox = getElement("suggest__optionText");
            const optionText = optionTextBox.value;
            if (optionText) {
                this.session.addOptionForDecision(this.decision['decisionId'], optionText)
                    .then(() => {
                        // Clear the text input field
                        optionTextBox.value = "";
                        thisInstance.refresh();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                displayErrorToast("Option can't be empty");
            }
        });
        addClickListener("suggest__readyButton", () => {
            // API Call to ready up
            console.log("Readying up on the frontend");
            this.session.readyUpHomie()
                .then((response) => {
                    if (response.areHomiesReady)
                        console.log("Readied up on the backend");
                    thisInstance.ready = true;
                    thisInstance.refresh();
                })
                .catch(e => {
                    console.log(e);
                });
        });
    }

    refresh() {
        let thisInstance = this;
        if (this.ready) {
            this.session.areHomiesReady()
                .then(result => {
                    console.log(result);
                    if (result['areHomiesReady']) {
                        console.log("Everyone's ready!");
                        // Clear timers
                        this.timeoutIds.forEach(id => {
                            clearTimeout(id);
                        });
                        this.timeoutIds = [];
                        navigate("vote");
                    }
                });
        }
        this.refreshView();
        // Don't re-register listeners
        const timeoutId = window.setTimeout(() => {
            thisInstance.refresh();
        }, REFRESH_INTERVAL);
        this.timeoutIds.push(timeoutId);
    }

    setup() {
        // Only Called Once, on View Load
        this.registerListeners();
        this.refresh();
    }
}

export class VoteController extends Controller {
    constructor(session) {
        super(session);
        this.decision = null;
        this.options = [];
        this.currentOption = null;
    }

    refreshView() {
        let allVoted = true;
        for (let op of this.options) {
            if (!op.voted) {
                allVoted = false;
                this.currentOption = op;
            }
        }
        if (allVoted) {
            // all done bruv
            navigate("result");
        } else {
            // Display the option Card
            let optionCard = renderOptionCard(this.currentOption.optionText);
            console.log("Option Card: ");
            console.log(optionCard);
            this.currentOptionCard = optionCard;
            this.root.innerHTML = "";
            this.root.appendChild(optionCard);
            this.registerListeners();
        }
    }

    registerListeners() {
        getElement("vote__voteForm").addEventListener('submit', e => {
            e.preventDefault();
        });
        addClickListener("vote__YesButton", e => {
            e.preventDefault();
            this.session.voteOnOption(this.currentOption['id'],
                2, 0)  // TODO implement timePassed
                .then(result => {
                    console.log(result);
                    this.currentOption.voted = true;
                    this.refreshView();
                });
        });
        addClickListener("vote__NoButton", e => {
            e.preventDefault();
            this.session.voteOnOption(this.currentOption['id'],
                0, 0) // TODO implement timePassed
                .then(result => {
                    console.log(result);
                    this.currentOption.voted = true;
                    this.refreshView();
                });
        });
    }

    setup() {
        console.log(this.root)
        // Initialize Data for Decision and Options
        this.session.getHangoutDecision()
            .then(resultDecision => {
                this.decision = resultDecision;
                // Get the options for this decision
                this.session.getOptionsForDecision(this.decision['decisionId'])
                    .then(resultOptions => {
                        // Process the options from the server
                        this.options = resultOptions['options'];
                        console.log(`Options:`)
                        console.log(this.options);
                        if (this.options.length > 0)
                            this.currentOption = this.options[0];
                        else
                            return; // TODO fix this bruh idk there might be errors here
                        this.options.map(option => {
                            option.voted = false;
                        });
                        this.refreshView();
                    })
                    .catch(e => {
                        if (e instanceof ApiError)
                            displayErrorToast(e.message);
                        console.log(e);
                    });
            })
            .catch(catchError);
    }

}


export class ResultController extends Controller {
    constructor(session) {
        super(session);
        this.decision = null;
        this.winningOption = null;
        this.timer = 0;
    }

    refreshView() {
        if (this.winningOption) {
            clearTimeout(this.timer);
            this.root.innerHTML = "";
            this.root.appendChild(
                renderResultsCard(this.winningOption)
            )
        } else {
            this.session.getResults(this.decision['decisionId'])
                .then(result => {
                    if (result["finished"]) {
                        this.winningOption = result["winner"];
                    }
                })
                .catch(catchError);
            this.timer = window.setTimeout(() => {
                this.refreshView();
            }, REFRESH_INTERVAL);
        }
    }

    setup() {
        this.session.getHangoutDecision()
            .then(resultDecision => {
                this.decision = resultDecision;
                this.refreshView()
            })
            .catch(catchError);

    }

}

function catchError() {
    return e => {
        if (e instanceof ApiError)
            displayErrorToast(e.message);
        console.log(e);
    };
}