

export const LabeledNumericalInput = ({className,label,state,setState,...rest}) => {
    return (
        <div className={`rounded border my-2 p-1 w-auto ${className}`} {...rest}>
            <p className="h4">{label}</p>
            <input
                type="number"
                className=""
                value={state}
                onChange={(e) => {
                    setState(e.target.value)
                }}
            />
        </div>
    )
}

export const LabeledInput = ({className,label,state,setState,...rest}) => {
    return (
        <div className={`rounded border my-2 p-1 ${className}`} {...rest}>
            <p className="h4">{label}</p>
            <input
                className="border-0"
                value={state}
                onChange={(e) => {
                    setState(e.target.value)
                }}
            />
        </div>
    )
}

export const LabeledTextArea = ({className,label,state,setState,...rest}) => {
    return (
        <div className={`rounded border my-2 p-1 w-100 ${className}`} {...rest}>
            <p className="h4">{label}</p>
            <textarea
                className="border-0 p-0 m-0 "
                value={state}
                onChange={(e) => {
                    setState(e.target.value)
                }}
            />
        </div>
    )
}