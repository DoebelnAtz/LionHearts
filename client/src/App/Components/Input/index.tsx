import React, {ChangeEvent, Dispatch, SetStateAction, SyntheticEvent} from 'react';

type InputProps = {
    placeholder?: string,
    state: string,
    type?: string,
    setState: Dispatch<SetStateAction<string>>
}

const Input: React.FC<InputProps> = ({placeholder, state, type = 'text', setState}) => {

    const handleInputChange = (e: ChangeEvent) => {
        let target = e.target as HTMLInputElement;

        setState(target.value);
    };

    return (
        <input value={state} placeholder={placeholder || undefined} type={type || 'text'} onChange={handleInputChange}/>
    )
};

export default Input;