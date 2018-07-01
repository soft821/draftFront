export const  STEPS = [
    {
        id: 0,
        isChecked: true,
        title: 'Game Slate',
        current: true,
        stepSubmitted: false,
        valid: true,
        key: 'gameTime',
        errorMsg: '',
        showBalanceError: false
    },
    {
        id: 1,
        isChecked: false,
        title: 'Entry Fee',
        current: false,
        stepSubmitted: false,
        valid: false,
        key: 'entryFee',
        errorMsg: 'Please select an option',
        showBalanceError: false
    },
    {
        id: 2,
        isChecked: false,
        title: 'Matchup Type',
        current: false,
        stepSubmitted: false,
        valid: false,
        key: 'matchupType',
        errorMsg: 'Please select a matchup type',
        showBalanceError: false
    },
    {
        id: 3,
        isChecked: false,
        title: 'Player Position',
        current: false,
        stepSubmitted: false,
        valid: false,
        key: 'playerPosition',
        errorMsg: 'Please select a position',
        showBalanceError: false
    },
    {
        id: 4,
        isChecked: false,
        title: 'Select Player', 
        current: false,
        stepSubmitted: false,
        valid: false,
        key: 'selectPlayer',
        errorMsg: 'Please select a player',
        showBalanceError: false
    },
    {
        id: 6,
        isChecked: false,
        isLastOne: true,
        title: 'Create Contest', 
        current: false,
        stepSubmitted: false,
        valid: true,
        key: 'createContest',
        errorMsg: '',
        showBalanceError: false
    }
];

export const OPPONENT_PLAYER = {
    id: 5,
    isChecked: false,
    title: 'Select Opponent Player', 
    current: false,
    stepSubmitted: false,
    valid: false,
    key: 'selectOpponentPlayer',
    errorMsg: 'Please select an opponent player'
}