import { FormEvent } from "react";

export type SubmitMethod = "POST" | "GET" | "PUT";

interface Props {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	children: React.ReactNode;
    classNames?: string;
	submitMethod?: SubmitMethod;
}

function Form({
	onSubmit,
	children,
	submitMethod,
	classNames,
}: Props) {
	return (
		<form
			onSubmit={onSubmit}
			method={submitMethod}
			className={classNames}
		>
			{children}
		</form>
	);
}

export default Form;
