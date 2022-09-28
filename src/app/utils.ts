/**
 * Get formated date in YYYY-MM-DD format
 * @param date 
 * @returns 
 */
export function getFormatedDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

/**
 * Get formated date time in YYYY-MM-DD HH:MM:SS format
 * @param date 
 * @returns 
 */
export function getFormatedDateTime(date: Date): string {
    return date.toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * Regular expression to check if string is a valid UUID
 * @param uuid 
 * @returns 
 */
export function isValidUuid(uuid: string): boolean {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(uuid);
}

export function hasBodyObject(body: Object): boolean {
    if (Object.keys(body).length === 0 && body.constructor === Object) {
        return false;
    }
    return true;
}