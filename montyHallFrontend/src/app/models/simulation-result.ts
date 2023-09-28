import {Result} from './result';

export interface SimulationResult {
    numberOfSimulations: number;
    shouldSwitch: boolean;
    win: number;
    winningPercentage: number;
  results: Result[];
}
