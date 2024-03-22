import { cookies } from "next/headers";

export async function getCookie<ValueType>(
    key: string,
    defaultValue: ValueType
): Promise<ValueType> {
    const cookie = cookies().get(key)?.value;

    return (cookie as ValueType) ?? defaultValue;
}
