import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/pt-br";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

// Define o fuso horário padrão (UTC-3)
const DEFAULT_TIMEZONE = "America/Sao_Paulo";

/**
 * Tipos de formatação de data suportados.
 */
export type DateFormatStyle =
  | "hours"
  | "date"
  | "dateLong"
  | "short"
  | "medium"
  | "long"
  | "full"
  | "fullLong"
  | "day"
  | "dayLong"
  | "dayMonth"
  | "dayMonthLong"
  | "month"
  | "monthShort"
  | "monthLong"
  | "year"
  | "yearShort";

/**
 * Mapeia os estilos para os padrões de formatação do Day.js.
 */
const DATE_FORMATS: Record<DateFormatStyle, string> = {
  hours: "HH:mm",
  date: "DD/MM/YY",
  dateLong: "DD/MM/YYYY",
  short: "DD/MM/YY HH:mm",
  medium: "DD/MM/YYYY [às] HH:mm",
  long: "DD [de] MMMM [de] YYYY [às] HH:mm",
  full: "dddd, DD [de] MMMM [de] YYYY [às] HH:mm",
  fullLong: "DD [de] MMMM [de] YYYY",
  day: "DD",
  dayLong: "dddd", // Nome do dia da semana (ex: Terça-feira)
  dayMonth: "DD/MM", // Novo formato: Dia/Mês (ex: 27/02)
  dayMonthLong: "DD/MMMM", // Novo formato: Dia/Mês (ex: 27/02)
  month: "MM",
  monthShort: "MMM",
  monthLong: "MMMM",
  year: "YYYY",
  yearShort: "YY", // Apenas os dois últimos dígitos do ano (ex: 25 para 2025)
};

/**
 * Formata uma data conforme o estilo desejado, sem ajustar o timestamp (usa a data “como está”).
 * @param inputDate Data a ser formatada (Date, string ou undefined)
 * @param style Estilo de formatação (padrão: "medium")
 * @returns Data formatada ou mensagem de erro.
 */
export const formatDateTime = (inputDate?: Date | string, style: DateFormatStyle = "medium"): string => {
  if (!inputDate) return "Data não informada";

  const dateObj = dayjs(inputDate); // Sem conversão de fuso horário
  return dateObj.isValid() ? dateObj.format(DATE_FORMATS[style]) : `Data inválida: ${inputDate}`;
};

/**
 * Obtém a data e hora atual no formato ISO, ajustada para o fuso horário padrão.
 * @returns Data e hora formatada no padrão ISO 8601.
 */
export const getCurrentDateTimeISO = (): string => {
  return dayjs.tz(new Date(), DEFAULT_TIMEZONE).toISOString();
};
