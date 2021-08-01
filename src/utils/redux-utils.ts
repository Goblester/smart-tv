import {useDispatch} from 'react-redux'
import {ActionCreatorsMapObject, bindActionCreators} from 'redux'
import {useMemo} from 'react'
import {store} from '../App/store';

export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
    const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [actions, dispatch])

    return boundActions
}
