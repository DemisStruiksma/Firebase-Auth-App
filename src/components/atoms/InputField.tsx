import { ChangeEventHandler, useId } from "react";
import Label from "./Label";

interface Props {
    value: string;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    label?: string;
    required?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const InputField = ({value, type, label, required, onChange}: Props) => {
    const inputFieldId = useId();

    return(
        <div>
            {label && <Label text={label} name={inputFieldId} />}

            <input 
                value={value}
                type={type}
                id={inputFieldId}
                onChange={onChange}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-secondary focus:ring-secondary"
                required={required}
            />
        </div>
    )
}

export default InputField;