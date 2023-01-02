export const isValidPostcode = (postcode: string) => { 
    const cleanPostcode = postcode.replace(/\s/g, "");
    var regex = /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/;
    return regex.test(cleanPostcode);
}