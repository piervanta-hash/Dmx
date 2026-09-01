/**
 * Struttura dei passi del configuratore — chiavi tipizzate, non testo. Le
 * etichette vivono nei messaggi (namespace "configurator"), qui restano solo
 * gli identificatori e i vincoli. Nessun prezzo: solo dati che l'utente
 * fornisce o dati tecnici già reali (spessori pannello, classi A/B).
 */

export type UseKey = 'offices' | 'housing' | 'sanitary' | 'special' | 'hospitality';
export type FormatKey = 'classA' | 'classB';
export type InsulationKey = 'p60' | 'p80' | 'p100';
export type FitoutKey = 'basic' | 'comfort';
export type SystemsKey = 'electricalOnly' | 'electricalPlumbing';

export interface ConfiguratorAnswers {
  use?: UseKey;
  format?: FormatKey;
  insulation?: InsulationKey;
  fitout?: FitoutKey;
  systems?: SystemsKey;
  quantity: number;
}

export const USE_OPTIONS: UseKey[] = ['offices', 'housing', 'sanitary', 'special', 'hospitality'];
export const FORMAT_OPTIONS: FormatKey[] = ['classA', 'classB'];
export const INSULATION_OPTIONS: InsulationKey[] = ['p60', 'p80', 'p100'];
export const FITOUT_OPTIONS: FitoutKey[] = ['basic', 'comfort'];
export const SYSTEMS_OPTIONS: SystemsKey[] = ['electricalOnly', 'electricalPlumbing'];

export const CONFIGURATOR_STEP_COUNT = 6;

export const INITIAL_ANSWERS: ConfiguratorAnswers = { quantity: 1 };

export function isStepAnswered(step: number, answers: ConfiguratorAnswers): boolean {
  switch (step) {
    case 0:
      return answers.use !== undefined;
    case 1:
      return answers.format !== undefined;
    case 2:
      return answers.insulation !== undefined;
    case 3:
      return answers.fitout !== undefined;
    case 4:
      return answers.systems !== undefined;
    case 5:
      return answers.quantity >= 1;
    default:
      return false;
  }
}
