import { useEffect, useState } from "react";

const PREFIX = "Health-Hub-";

export default function useLocalStorage(key, initialValue) {
	const prefixedKey = PREFIX + key;
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(prefixedKey);
		try {
			if (jsonValue === "undefined") return initialValue;
			if (jsonValue != null) return JSON.parse(jsonValue);
			if (typeof initialValue === "function") {
				return initialValue();
			} else {
				return initialValue;
			}
		} catch (err) {
			console.log(err);
		}
	});

	useEffect(() => {
		localStorage.setItem(prefixedKey, JSON.stringify(value));
	}, [prefixedKey, value]);

	return [value, setValue];
}
