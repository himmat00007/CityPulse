export interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
    if (!email || email.trim() === '') {
        return { isValid: false, message: 'auth.emailRequired' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'auth.invalidEmail' };
    }

    return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
    if (!password || password.trim() === '') {
        return { isValid: false, message: 'auth.passwordRequired' };
    }

    if (password.length < 6) {
        return { isValid: false, message: 'auth.passwordTooShort' };
    }

    // Check for at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasLetter || !hasNumber) {
        return { isValid: false, message: 'auth.passwordRequirements' };
    }

    return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
    if (!name || name.trim() === '') {
        return { isValid: false, message: 'auth.nameRequired' };
    }

    if (name.trim().length < 2) {
        return { isValid: false, message: 'auth.nameTooShort' };
    }

    if (name.trim().length > 50) {
        return { isValid: false, message: 'auth.nameTooLong' };
    }

    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\u0600-\u06FF\s'-]+$/;
    if (!nameRegex.test(name.trim())) {
        return { isValid: false, message: 'auth.invalidName' };
    }

    return { isValid: true };
};

export const validateForm = (
    email: string,
    password: string,
    name?: string
): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (name !== undefined) {
        const nameValidation = validateName(name);
        if (!nameValidation.isValid && nameValidation.message) {
            errors.name = nameValidation.message;
        }
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid && emailValidation.message) {
        errors.email = emailValidation.message;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid && passwordValidation.message) {
        errors.password = passwordValidation.message;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
