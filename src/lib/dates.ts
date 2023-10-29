export function getYear(value: string): number {
    if (!value) return 0;

    return new Date(value).getFullYear();
}

export function getCurrentYear(): number {
    return new Date().getFullYear()
}