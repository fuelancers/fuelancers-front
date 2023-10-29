export async function base64ToBlob(base64String: string) {

    const base64Response = await fetch(base64String);
    const blob = await base64Response.blob();

    return blob
}