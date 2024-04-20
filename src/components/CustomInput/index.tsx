import { ChangeEvent } from "react"
import { CustomInputProp } from "../../shared/interfaces"

export const CustomInput = ({
    label,
    placeholder,
    type,
    onChange
}: CustomInputProp) => {
    const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange(newValue);
    }

    return (
        <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
                {label}
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-stone-900 border  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type={type}
                placeholder={placeholder}
                onChange={handlerChange}
            />
        </div>
    )
}