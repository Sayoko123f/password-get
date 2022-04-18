export interface Rules {
    length: number;
    useAlpha?: boolean;
    useSymbol?: boolean;
    firstCharUseUpperCase?: boolean;
    excludeSymbol?: Array<string>;
}

export const defaultRules: Rules = {
    length: 6,
    useAlpha: true,
    useSymbol: true,
    firstCharUseUpperCase: false,
    excludeSymbol: [],
};

type CharType = 'number' | 'lowerAlpha' | 'upperAlpha' | 'symbol';

const nums = '0123456789';
const lowerAlphas = new Array(26)
    .fill(null)
    .map((e, i) => String.fromCharCode(i + 97));

export const symbols = '~!@#$%^&_*=+-'.split('');

/**
 * Return an integer between 0 to max-1.
 * @param max
 * @returns
 */
function getRandomInt(max: number = 10): number {
    return Math.floor(Math.random() * max);
}

function perChar(r: Rules): string {
    /**
     * First: select use number, alpha, or symbol
     */
    const choice: Array<CharType> = ['number'];
    if (r.useAlpha) {
        choice.push('lowerAlpha', 'upperAlpha');
    }
    let syms = symbols;
    if (r.useSymbol) {
        if (Array.isArray(r.excludeSymbol)) {
            syms = syms.filter((e) => !r.excludeSymbol?.includes(e));
        }
        if (syms.length) {
            choice.push('symbol');
        }
    }
    const charType: CharType = choice[getRandomInt(choice.length)];

    switch (charType) {
        case 'number':
            return nums[getRandomInt()];
        case 'lowerAlpha':
            return lowerAlphas[getRandomInt(26)];
        case 'upperAlpha':
            return lowerAlphas[getRandomInt(26)].toUpperCase();
        case 'symbol':
            return syms[getRandomInt(syms.length)];
    }
}

export function getPassword(config: Rules = defaultRules): string {
    const r = Object.assign(defaultRules, config);
    const chars = new Array(r.length).fill(null).map(() => perChar(r));
    // firstCharUseUpperCase
    if (config.useAlpha && config.firstCharUseUpperCase) {
        chars[0] = lowerAlphas[getRandomInt(26)].toUpperCase();
    }
    return chars.join('');
}
