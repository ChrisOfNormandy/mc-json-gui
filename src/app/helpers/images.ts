export function readImageAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        // if (file.type !== 'image/png') {
        //     reject(new Error('File is not a PNG image: ' + file.type));

        //     return;
        // }

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            resolve(result);
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
}

export function base64ToFile(name: string, base64: string) {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new File([ab], name);
}