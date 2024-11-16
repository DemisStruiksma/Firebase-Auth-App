import { ChangeEventHandler } from "react";
import Label from "./Label";

interface Props {
    value: string;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    label?: string;
    id?: string;
    required?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const InputField = ({value, type, label, id, required, onChange}: Props) => {
    return(
        <div>
            {label && <Label text={label} name={id} />}

            <input 
                value={value}
                type={type}
                id={id}
                onChange={onChange}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-secondary focus:ring-secondary"
                required={required}
            />
        </div>
    )
}

export default InputField;