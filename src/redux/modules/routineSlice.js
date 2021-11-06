import { createSlice } from '@reduxjs/toolkit'
import {
    myRoutineCreateMD,
    myRoutinePresetMD,
    myRoutineListMD,
    myRoutineDeleteMD,
    myRoutineUpdateMD,
    finRoutinesActionsMD,
} from '../async/routine'

const initialState = {
    myPage: '',
    presetRoutine: [],
    myRoutine: [],
    updateRoutineRef: '',
    habitModal: false,
    finActions: {},
    finRoutines: {},
}

const routineSlice = createSlice({
    name: 'routine',
    initialState: initialState,
    reducers: {
        changeMyPageModal: (state, action) => {
            state.myPage = action.payload
        },
        updateRoutine: (state, action) => {
            state.updateRoutineRef = action.payload
        },
        chageMyHabitModal: (state, action) => {
            state.habitModal = action.payload
        },
    },
    extraReducers: {
        [myRoutinePresetMD.fulfilled]: (state, { payload }) => {
            state.presetRoutine = payload.data.routines
        },
        [myRoutinePresetMD.pending]: (state, { payload }) => {},
        [myRoutinePresetMD.rejected]: (state, { payload }) => {},
        // * ----
        [myRoutineCreateMD.fulfilled]: (state, { payload }) => {
            console.log(payload)
        },
        [myRoutineCreateMD.pending]: (state, { payload }) => {},
        [myRoutineCreateMD.rejected]: (state, { payload }) => {},
        // * ----
        [myRoutineListMD.fulfilled]: (state, { payload }) => {
            state.myRoutine = payload.data.routines
        },
        // * ----
        [myRoutineDeleteMD.fulfilled]: (state, { payload }) => {
            const result = state.myRoutine.filter(
                (routine) => routine.id !== payload
            )
            state.myRoutine = result
        },
        // * ----
        [myRoutineUpdateMD.fulfilled]: (state, { payload }) => {
            console.log(payload)
        },
        [finRoutinesActionsMD.fulfilled]: (state, { payload }) => {
            let actions = []
            let routins = []
            const _action_data1 = payload.data.finActions.map((action) =>
                Object.values(action)
            )
            _action_data1.map((action) =>
                actions.push({
                    actionId: action[1][0].id,
                    date: action[1][0].date.slice(0, 10),
                })
            )
            state.finActions = actions

            payload.data.finRoutines[0].RoutineFins.map((routine) =>
                routins.push({
                    routineId: routine.id,
                    date: routine.date.slice(0, 10),
                    cycle: routine.cycle,
                })
            )
            state.finRoutines = routins
        },
    },
})

//* reducer export
export const { changeMyPageModal, updateRoutine, chageMyHabitModal } =
    routineSlice.actions

//* slice export
export default routineSlice
