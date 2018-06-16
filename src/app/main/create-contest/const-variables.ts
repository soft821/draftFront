export const  STEPS = [
    {
        id: 0,
        isChecked: true,
        title: 'Game Slate',
        current: true,
        stepSubmitted: false,
        valid: true,
        key: 'gameTime',
        errorMsg: ''
    },
    {
        id: 1,
        isChecked: false,
        title: 'Entry Fee',
        current: false,
        stepSubmitted: false,
        valid: false,
        key: 'entryFee',
        errorMsg: 'Please select an option'
    },
    {
        id: 2,
        isChecked: false,
        title: 'Matchup Type',
        current: false,
        stepSubmitted: false,
        valid: false,
        key: 'matchupType',
        errorMsg: 'Please select a matchup type'
    },
    {
        id: 3,
        isChecked: false,
        title: 'Player Position',
        current: false,
        stepSubmitted: false,
        valid: false,
        key: 'playerPosition',
        errorMsg: 'Please select a position'
    },
    {
        id: 4,
        isChecked: false,
        title: 'Select Player', 
        current: false,
        stepSubmitted: false,
        valid: false,
        key: 'selectPlayer',
        errorMsg: 'Please select a player'
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
        errorMsg: ''
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