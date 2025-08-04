
export function formatPhoneNumber(phone: string) {
    const digits = phone.replace(/\D/g, '');

    if (digits.length === 10) {
        return '7' + digits;
    } else if (digits.length === 11 && digits.startsWith('8')) {
        return '7' + digits.slice(1);
    } else if (digits.length === 11 && digits.startsWith('7')) {
        return digits;
    } 
    
    return digits
}