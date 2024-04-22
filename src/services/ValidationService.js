class ValidationService {
    indivValidation(input) {
        if (typeof input != 'string') {
            return input
        }
        // @ts-ignore
        return input.replaceAll('https://', '').replaceAll('http://', '').replaceAll('github.com/', '').replaceAll('linkedin.com/', '')
    }

    quickValidation(input) {
        for (let [key, value] of Object.entries(input)) {
            input[key] = this.indivValidation(value)
        }
        return input
    }

    repopulate(input) {
        input = this.quickValidation(input)
        input = { ...input }
        if (input.github != "") input.github = `https://github.com/${input.github}`
        if (input.linkedin != "") input.linkedin = `https://linkedin.com/${input.linkedin}`
        if (input.coverImg != "") input.coverImg = `https://${input.coverImg}`
        if (input.picture != "") input.picture = `https://${input.picture}`
        if (input.resume != "") input.resume = `https://${input.resume}`
        return input
    }
}

export const validationService = new ValidationService()