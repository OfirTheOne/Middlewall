import { _isString } from "../types/validation-logic";

export const _isIntegerString = (target) => _isString(target) && parseInt(target) != NaN;
export const _isBooleanString = (target) => target === 'true' || target === 'false';

// _isEmail

// isPhoneNumber

// isAlfa

// isAlfaNumeric

// isSnake

// 